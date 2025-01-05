import { useEffect, useState } from 'react';
import { useVariation } from '../../../../../../../context/variationContext';
import { v4 as uuidv4 } from 'uuid';
function SelectOptions({ property, selection, setSelection }) {
    const { temporaryVariation, setTemporaryVariation } = useVariation();
    const [bothName, setBothName] = useState('');

    useEffect(() => {
        const filterDisabled = filterDisabledVariation();
        let count = 0;
        let value = '';
        filterDisabled.map((item) => {
            if (item?.[property].on == true) {
                value = item.name;
                count++;
            }
        });
        // if only 1 header is on, change selection value to that variation name
        if (count == 1) {
            setSelection(() => value);
        }
    }, []);

    useEffect(() => {
        const value = getBothVariation();
        setBothName(() => value);
    }, [temporaryVariation]);

    function filterDisabledVariation() {
        return [...temporaryVariation].filter((item) => !item?.disabled);
    }

    function getBothVariation() {
        let value;
        // debugger
        const filterDisabled = filterDisabledVariation();
        if (filterDisabled.length >= 2) {
            value = `${filterDisabled[0].name} and ${filterDisabled[1].name}`;
        }

        return value;
    }

    const handleSelect = (e) => {
        debugger
        const value = e.target.value;
        const { both, _id } = e.target.options[e.target.selectedIndex].dataset;
        debugger;
        setSelection(() => value);
        const newTemporaryVariation = filterDisabledVariation();

        let updatedVariation = [];
        if (both == 'true') {
            updatedVariation.push(
                ...newTemporaryVariation.map((item) => {
                    return { ...item, [property]: { on: true } };
                })
            );
        } else {
            // update if variation name match
            updatedVariation.push(
                ...newTemporaryVariation.map((item) => {
                    if (item._id == _id) {
                        return { ...item, [property]: { on: true } };
                    }

                    return { ...item, [property]: { on: false } };
                })
            );
        }

        setTemporaryVariation(() => updatedVariation);
    };

    const handleToggle = () => {
        setState(!state);
    };

    return (
        <select
            id="options"
            name="options"
            className=" daisy-select daisy-select-bordered max-h-min w-full max-w-[200px]"
            onChange={handleSelect}
        >
            <option
                key={`${property}-both-option`}
                selected={selection == bothName}
                data-both="true"
                value={bothName}
            >
                {bothName}
            </option>

            {temporaryVariation &&
                temporaryVariation.map((variation) => {
                    if (!variation?.disabled) {
                        return (
                            <option
                                key={`${variation._id}-${property}-option`}
                                selected={selection == variation.name}
                                value={variation.name}
                                data-both="false"
                                data-_id={variation._id}
                            >
                                {variation.name}
                            </option>
                        );
                    }
                })}
        </select>
    );
}

export default SelectOptions;
