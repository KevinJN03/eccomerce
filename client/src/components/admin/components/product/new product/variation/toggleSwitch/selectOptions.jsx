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
        // if 2 both variation has header is on, setOnMountSelection value to both variation name
    }, []);

    useEffect(() => {
        const value = getBothVariation();
        setBothName(() => value);
    }, [temporaryVariation]);

    function filterDisabledVariation() {
        return [...temporaryVariation].filter((item) => item.disabled == false);
    }

    function getBothVariation() {
        let value;
        const filterDisabled = filterDisabledVariation();
        if (filterDisabled.length >= 2) {
            value = `${filterDisabled[0].name} and ${filterDisabled[1].name}`;
        }

        return value;
    }

    const handleSelect = (value, both) => {
        setSelection(() => value);
        ('handleSelect triggered');
        'both', both;
        const newTemporaryVariation = filterDisabledVariation();

        let update;
        if (both == 'true') {
            update = newTemporaryVariation.map((item) => {
                return { ...item, [property]: { on: true } };
            });
        } else {
            // update if variation name match
            update = newTemporaryVariation.map((item) => {
                if (item.name == value) {
                    return { ...item, [property]: { on: true } };
                }

                return { ...item, [property]: { on: false } };
            });
        }

        setTemporaryVariation(() => update);
    };

    const handleToggle = () => {
        setState(!state);
    };

    return (
        <select
            id="options"
            name="options"
            className=" select max-h-min max-w-[200px]"
            onChange={(e) =>
                handleSelect(
                    e.target.value,
                    e.target.options[e.target.selectedIndex].dataset.both
                )
            }
        >
            <option
                selected={selection == bothName}
                data-both="true"
                value={bothName}
            >
                {bothName}
            </option>

            {temporaryVariation &&
                temporaryVariation.map((variation) => {
                    if (variation.disabled == false) {
                        return (
                            <option
                                key={uuidv4()}
                                selected={selection == variation.name}
                                value={variation.name}
                                data-both="false"
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
