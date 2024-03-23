import { ClickAwayListener } from '@mui/material';
import { useCreateProfileContext } from '../../../../../context/createProfileContext';
import { forwardRef } from 'react';

const Input = forwardRef(function Input(
    { text, property, index, service, prop, setCharges, charges, handleUpdate },
    clickAwayRef
) {
const {errors} = useCreateProfileContext()
    return (
        <div
            key={`${service._id}-${property}-${index}`}
            className=" flex flex-col gap-1 "
        >
            <p className="whitespace-nowrap text-base font-semibold">{text}</p>
            <ClickAwayListener
                onClickAway={() => {
                    if (!clickAwayRef.current[prop]) {
                        return;
                    }

                    let parseValue = parseFloat(charges?.[prop]).toFixed(2);

                    if (isNaN(parseValue)) {
                        parseValue = '0.00';
                    }

                    setCharges((prevState) => ({
                        ...prevState,
                        [prop]: parseValue,
                    }));

                    handleUpdate({
                        updateProperty: {
                            charges: {
                                ...service?.charges,
                                [prop]: parseValue,
                            },
                        },
                    });

                    clickAwayRef.current[prop] = false;
                }}
            >
                <div className="relative">
                    <p className="absolute left-2 top-1/2 translate-y-[-50%] text-base">
                        £
                    </p>
                    <input
                        value={charges?.[prop]}
                        onChange={(e) => {
                            clickAwayRef.current[prop] = true;
                            setCharges((prevState) => ({
                                ...prevState,
                                [prop]: e.target.value,
                            }));
                        }}
                        type="text"
                        className={`daisy-input daisy-input-bordered w-full pl-6 ${errors?.[property]?.[service._id]?.[prop] ? 'bg-red-100 border-red-700': ''}`}
                    />
                </div>
            </ClickAwayListener>
        </div>
    );
});

export default Input;
