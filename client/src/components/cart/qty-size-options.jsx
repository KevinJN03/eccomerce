import { Link } from 'react-router-dom';

import { forwardRef } from 'react';

const QTY_SIZE_OPTION = forwardRef(function QTY_SIZE_OPTION(
    { options, label, type, select, handleOnChange },
    ref
) {
    return (
        <span id="qty-size-option">
            <label htmlFor="qty-size-select">{label}</label>
            <select
                onChange={handleOnChange}
                name="quantity-select"
                id="qty-size-select"
                className="!max-w-[80px] text-s"
                ref={ref}
                tabIndex={'0'}
            >
                {options.map((item, index) => {
                    return (
                        <option
                            key={index}
                            value={type == 'size' ? item?.variation : item}
                            selected={
                                type == 'size'
                                    ? item?.variation == select
                                    : item == select
                            }
                        >
                            {type == 'size' ? item?.variation : item}
                        </option>
                    );
                })}
            </select>
        </span>
    );
});

export default QTY_SIZE_OPTION;
