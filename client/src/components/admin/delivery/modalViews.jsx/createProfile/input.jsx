import { ClickAwayListener } from '@mui/material';
import { useCreateProfileContext } from '../../../../../context/createProfileContext';
import { forwardRef } from 'react';
import _, { cloneDeep } from 'lodash';

const Input = forwardRef(function Input(
    { text, property, index, service, prop, setCharges, charges, handleUpdate },
    clickAwayRef
) {
    const { errors, setErrors } = useCreateProfileContext();

    const handleOnChange = (e) => {
        clickAwayRef.current[prop] = true;
        setCharges((prevState) => ({
            ...prevState,
            [prop]: e.target.value,
        }));

        setErrors((prevState) => {
            const cloneErrors = cloneDeep(prevState);
            if (e.target.value < 0 || e.target.value > 15865.4) {
                // cloneErrors[property][service._id][prop] = 'Price must be between £0.00 and £15,865.40.';
                _.set(
                    cloneErrors,
                    [property, service._id, prop],
                    'Price must be between £0.00 and £15,865.40.'
                );
            } else if (
                prop === 'additional_item' &&
                e.target.value > charges?.one_item
            ) {
                _.set(
                    cloneErrors,
                    [property, service._id, prop],
                    `Price can't be greater than the One item price.`
                );
            } else {
                _.unset(cloneErrors, [property, service._id, prop]);
            }

            return cloneErrors;
        });
    };
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
                        onChange={handleOnChange}
                        type="text"
                        className={`daisy-input daisy-input-bordered w-full pl-6 ${errors?.[property]?.[service._id]?.[prop] ? 'border-red-700 bg-red-100' : ''}`}
                    />
                </div>
            </ClickAwayListener>
        </div>
    );
});

export default Input;
