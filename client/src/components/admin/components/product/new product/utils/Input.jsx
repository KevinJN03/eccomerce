import { AnimatePresence, motion } from 'framer-motion';
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

        e.cancelable && e.preventDefault();
    };
    return (
        <section className="!w-full !bg-transparent">
            <div className="relative flex !h-fit !w-full items-center">
                {/* {enablePoundSign && ( */}
                <motion.div
                    key={`pound-sign-${property}`}
                    animate={enablePoundSign ? { opacity: 1 } : { opacity: 0 }}
                    className=" absolute left-2 top-2/4 !my-auto translate-y-[-50%] items-center font-medium"
                >
                    £
                </motion.div>
                {/* )} */}

                <motion.input
                    ref={ref}
                    id={property}
                    name={property}
                    onChange={handleOnchange}
                    autoComplete="off"
                    value={value}
                    onWheel={handleOnWheel}
                    type="number"
                    animate={
                        enablePoundSign
                            ? { padding: '0.75rem 1.5rem' }
                            : { padding: '0.75rem 0.5rem' }
                    }
                    className={`input-number input !h-full !w-full	!min-w-full  touch-none rounded-lg ${
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
