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
                className="!max-w-[120px] "
                ref={ref}
                tabIndex={'0'}
            >
                {options.map((num, index) => {
                    return (
                        <option
                            key={index}
                            value={type == 'size' ? num.size : num}
                            selected={
                                type == 'size'
                                    ? num.size == select
                                    : num == select
                            }
                        >
                            {type == 'size' ? num.size : num}
                        </option>
                    );
                })}
            </select>
        </span>
    );
});

export default QTY_SIZE_OPTION;
