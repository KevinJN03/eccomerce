import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useVariation } from '../../../../../../../context/variationContext.jsx';
import Switch from './switch.jsx';
import SelectOptions from './selectOptions.jsx';
function ToggleSwitch({
    label,
    state,
    setState,
    notDisabled,
    notDisabledVariation,
    setSelect,
    select,
    property,
}) {
    const { temporaryVariation, setTemporaryVariation } = useVariation();

    useEffect(() => {
        const checkSelect = () => {
            const newTemporary = [...temporaryVariation].filter(
                (item) => item.disabled == false
            );
            let value = '';
            let count = 0;
            newTemporary.map((item) => {
                if (item[property].on == true) {
                    if (value.length < 1) {
                        value += item.name;
                    } else {
                        value += ` and ${item.name}`;
                    }

                    count += 1;
                }
            });
            return value;
        };

        let check = checkSelect();
        setSelect(check);
    }, []);

    const handleSelect = (value, both) => {

        console.log('handleSelect triggered')
        console.log('both', both);
        const newTemporaryVariation = [...temporaryVariation].filter(
            (item) => item.disabled !== true
        );

        let update;
        if (both == 'true') {
            update = newTemporaryVariation.map((item) => {
                return { ...item, [property]: { on: true } };
            });
        } else {
            update = newTemporaryVariation.map((item) => {
                if (item.name == value) {
                    return { ...item, [property]: { on: true } };
                }

                return { ...item, [property]: { on: false } };
            });
        }

        setTemporaryVariation(update);
        setSelect(value);
    };

 

    const handleToggle = () => {
        setState(!state);
    };

    return (
        <section className="flex h-12 flex-row items-center gap-x-4">
            <div className=" flex flex-row items-center gap-3">
                <Switch state={state} toggle={handleToggle} />

                <label>
                    <span className="font-semibold">{label} </span> vary{' '}
                    {temporaryVariation.length > 1 && state && 'for each'}
                </label>
            </div>

            {notDisabled > 1 && state && (
                <SelectOptions
                    handleSelect={handleSelect}
                    select={select}
                    setSelect={setSelect}
                />
            )}
        </section>
    );
}

export default ToggleSwitch;
