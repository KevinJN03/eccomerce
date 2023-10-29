import { AnimatePresence } from 'framer-motion';
import OptionError from '../variation/error/optionError';

import { forwardRef, useEffect, useState } from 'react';
import { useNewProduct } from '../../../../../../context/newProductContext';
export const Input = forwardRef(function Input({ visible, value, error, property, handleOnchange }, ref) {
      

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
                    onChange={(e) => handleOnchange(e.target.value)}
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
