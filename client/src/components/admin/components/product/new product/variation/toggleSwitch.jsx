import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useEffect, useRef, useState } from 'react';

import { useVariation } from '../../../../../../context/variationContext.jsx';
import Switch from './switch.jsx';
function ToggleSwitch({ label, state, setState, notDisabled }) {
    const { temporaryVariation } = useVariation();
    const inputRef = useRef(null);

    const changeBackground = () => {};

    useEffect(() => {
        changeBackground();
    }, [state]);

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
                <select class=" select max-h-min max-w-[200px]">
                    <option>{`${temporaryVariation[0].name} and ${temporaryVariation[1].name}`}</option>

                    {temporaryVariation &&
                        temporaryVariation.map((variation) => {
                            if (variation.disabled == false) {
                                return <option>{variation.name}</option>;
                            }
                        })}
                </select>
            )}
        </section>
    );
}

export default ToggleSwitch;
