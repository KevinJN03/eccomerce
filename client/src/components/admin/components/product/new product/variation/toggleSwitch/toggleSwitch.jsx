import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useVariation } from '../../../../../../../context/variationContext.jsx';
import Switch from './switch.jsx';
import SelectOptions from './selectOptions.jsx';
import { useNewProduct } from '../../../../../../../context/newProductContext.jsx';
function ToggleSwitch({
    label,
    state,
    setState,
    notDisabled,
    property,
    selection,
    setSelection,
}) {
    const { temporaryVariation, setTemporaryVariation } = useVariation();
    const { combine } = useNewProduct();
    // useEffect(() => {
    //     debugger;
    //     const newArr = temporaryVariation.map((item) => {
    //         const obj = { ...item, [property]: { on: state } };
    //         state == false && (obj.combine = false);
    //         return obj;
    //     });
    //     setTemporaryVariation(() => newArr);
    // }, [state]);

    useEffect(() => {
        const checkSelect = () => {
            const newTemporary = [...temporaryVariation].filter(
                (item) => item.disabled == false
            );
            let value = {};

            newTemporary.map((item) => {
                if (item[property].on == true) {
                    // add the values to the select array

                    if (value.length < 1) {
                        value += item.name;
                    } else {
                        value += ` and ${item.name}`;
                    }
                }
            });

            return value;
        };

        // let check = checkSelect();
    }, []);

    const handleToggle = () => {
        const newArr = temporaryVariation.map((item) => {
            const obj = { ...item, [property]: { on: !state } };
            state == false && (obj.combine = false);
            return obj;
        });

        if (!state == true) {
            const bothName = getBothVariation();
            setSelection(() => bothName);
        }
        setState(() => !state);
        setTemporaryVariation(() => newArr);
    };
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
    return (
        <section className="flex h-12 flex-row items-center gap-x-4">
            <div className=" flex flex-1 flex-row items-center gap-3">
                <Switch state={state} toggle={handleToggle} />

                <label>
                    <span className="font-semibold">{label} </span> vary{' '}
                    {temporaryVariation.length > 1 && state && 'for each'}
                </label>
            </div>

            {notDisabled > 1 && state && (
                <div className="flex w-full flex-1 justify-end">
                    <SelectOptions
                        property={property}
                        selection={selection}
                        setSelection={setSelection}
                        getBothVariation={getBothVariation}
                        filterDisabledVariation={filterDisabledVariation}
                    />
                </div>
            )}
        </section>
    );
}

export default ToggleSwitch;
