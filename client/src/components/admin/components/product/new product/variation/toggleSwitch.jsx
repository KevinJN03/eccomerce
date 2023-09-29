import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useEffect, useRef, useState } from 'react';

import { useVariation } from '../../../../../../context/variationContext.jsx';
function ToggleSwitch({ label, state, setState }) {
    
    const { variations } = useVariation();
    const inputRef = useRef(null);

    const changeBackground = () => {};

    useEffect(() => {
        changeBackground();
    }, [state]);


    return (
        <section className="flex flex-row gap-x-4 items-center h-12">
            <div className=" flex flex-row items-center gap-3">
                <div
                    className={`relative flex h-full max-w-fit cursor-pointer flex-row items-center`}
                    onClick={() => setState(!state)}
                >
                    <input
                        type="checkbox"
                        className={`/* toggle toggle-lg ${
                            !state ? '!bg-black ' : '!bg-black'
                        } */`}
                        readOnly
                        checked={state}
                        ref={inputRef}
                    />
                    <span className="absolute right-[5px] flex items-center justify-center bg-transparent">
                        <CheckRoundedIcon
                            fontSize="small"
                            className="bg-transparent  !fill-white"
                        />
                    </span>
                    <span className="absolute left-[6px] flex items-center justify-center bg-transparent">
                        <CloseRoundedIcon
                            fontSize="small"
                            className="bg-transparent !fill-white"
                        />
                    </span>
                </div>

                <label>
                    <span className="font-semibold">{label} </span> vary{' '}
                    {variations.length > 1 && state &&  'for each'}
                </label>
            </div>

            {variations.length > 1 &&  state && (
                <select class=" select max-w-[200px] max-h-min">
                    <option>{`${variations[0].name} and ${variations[1].name}`}</option>

                    {variations &&
                        variations.map((variation) => {
                            return <option>{variation.name}</option>;
                        })}
                </select>
            )}
        </section>
    );
}

export default ToggleSwitch;
