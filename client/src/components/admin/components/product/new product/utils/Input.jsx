import { AnimatePresence } from 'framer-motion';
import OptionError from '../variation/error/optionError';

import { forwardRef, useEffect } from 'react';
export const Input = forwardRef(function Input(props, ref) {
    const { visible, value, error, property, handleOnchange } = props;
    useEffect(() => {
        props?.setValue &&
            props.setValue((obj) => {
                return { value: null, on: true };
            });
        return () => {
            props?.setValue &&
                props.setValue((obj) => {
                    return { value: null, on: false };
                });
        };
    }, []);
    return (
        <section className="bg-transparent">
            <div className="relative flex !h-fit items-center">
                {property == 'price' && (
                    <span className="pound absolute left-2 top-2/4 !my-auto translate-y-[-50%] items-center font-medium">
                        £
                    </span>
                )}
                <input
                    ref={ref}
                    id={property}
                    name={property}
                    onChange={handleOnchange}
                    autoComplete="off"
                    value={value}
                    type="number"
                    className={`input-number input w-full rounded-lg ${
                        property == 'price' ? 'px-4' : 'px-2'
                    }  py-4 ${
                        error?.[property] && '!border-red-300 !bg-red-200'
                    }`}
                    disabled={!visible}
                />
            </div>
            <AnimatePresence>
                {error?.[property] && visible && (
                    <OptionError
                        msg={error?.[property]}
                        className={'!items-start !pl-0'}
                    />
                )}{' '}
            </AnimatePresence>
        </section>
    );
});
