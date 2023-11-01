import { forwardRef, useEffect, useState } from 'react';

const Select = forwardRef(function Select(
    { text, single, array, setSelect, property, setOutOfStock, setPrice, isSecond},
    ref
) {
    const [stockState, setStockState] = useState();

    useEffect(() => {
        if (stockState == 0) {
            setOutOfStock(() => true);
        } else {
            setOutOfStock(() => false);
        }
    }, [stockState]);
    const onChange = (e) => {
        const stock = e.target.options[e.target.selectedIndex].dataset?.stock;
        const price = e.target.options[e.target.selectedIndex].dataset?.price;

       
        setSelect(() => e.target.value);

        if (stock == 0 || stock) {
            setStockState(() => stock);
        }

        if (price) {
            setPrice(() => price);
        }
    };
    return (
        <>
            {array?.length == 1 && (
                <p className="mb-2 text-sm">
                    {' '}
                    <span className="text-s font-bold  tracking-wide">
                        {text}:{' '}
                    </span>
                    {single}
                </p>
            )}

            {array?.length > 1 && (
                <section>
                    <p className="mb-2 text-s font-bold tracking-wide">
                        {text}:
                    </p>
                    <select
                        ref={ref}
                        onChange={onChange}
                        className="item-select select mb-3 min-h-0  min-w-full rounded-none border-[1px] border-black !outline-none focus:!drop-shadow-2xl"
                    >
                        <option value={'null'}>Please Select</option>
                        {array.map((item, index) => {
                            return (
                                <option
                                    value={property ? item[property] : item}
                                    key={index}
                                    data-price={item?.price}
                                    data-stock={item?.stock}
                                    // disabled={item?.stock == 0}
                                >
                                    {`${property ? item[property] : item}${
                                        item?.stock == 0
                                            ? ' - Out of Stock'
                                            : ''
                                    }`}
                                </option>
                            );
                        })}
                    </select>
                </section>
            )}
        </>
    );
});

export default Select;
