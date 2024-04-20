import { AnimatePresence } from 'framer-motion';
import OptionError from '../variation/error/optionError';

import { forwardRef, useEffect, useState } from 'react';
import { useNewProduct } from '../../../../../../context/newProductContext';
import _ from 'lodash';
export const Input = forwardRef(function Input(
    { visible, value, property, handleOnchange, enablePoundSign },
    ref
) {
    const { publishError } = useNewProduct();
    const handleOnWheel = (e) => {
        e.stopPropagation();
        e.target.blur();

        e.cancelable && e.preventDefault()
    };
    return (
        <section className="!bg-transparent">
            <div className="relative flex !h-fit items-center">
                {enablePoundSign && (
                    <span className=" absolute left-2 top-2/4 !my-auto translate-y-[-50%] animate-none items-center font-medium transition-none">
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
                    onWheel={handleOnWheel}
                    type="number"
                    className={` input-number	input !h-full w-full touch-none rounded-lg ${
                        enablePoundSign ? '!px-6' : '!px-2'
                    }  py-3 ${
                        _.get(publishError, property) &&
                        '!border-red-700 bg-red-100'
                    }`}
                    disabled={!visible}
                />
            </div>
            <AnimatePresence>
                {_.get(publishError, property) && visible && (
                    <OptionError
                        msg={_.get(publishError, property)}
                        className={'!items-start !pl-0 '}
                    />
                )}{' '}
            </AnimatePresence>
        </section>
    );
});
