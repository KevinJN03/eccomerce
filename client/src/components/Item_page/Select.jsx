import { forwardRef, useEffect, useState } from 'react';
import { useAddItemToBagContext } from '../../context/addItemToBagContext';

const Select = forwardRef(function Select(
    {
        variationName,
        single,
        array,

        property,
        //setOutOfStock,

        // variationSelect,
        // setVariationSelection,
        //  handleOnChange,
    },
    ref
) {
    const [stockState, setStockState] = useState();
    const {
        handleOnChange,
        setOutOfStock,
        variationSelect,
        setVariationSelection,
        setPriceState,
    } = useAddItemToBagContext();

    useEffect(() => {
        if (stockState <= 0) {
            setOutOfStock(() => true);
        } else {
            setOutOfStock(() => false);
        }
    }, [stockState]);
    
    return (
        <>
            {array.length == 1 && (
                <p className="mb-2">
                    <span className="!text-xxs font-bold  tracking-wider">
                        {variationName}:
                    </span>
                    <span className="ml-1 text-[1rem] font-light">
                        {single}
                    </span>
                </p>
            )}

            {array?.length > 1 && (
                <section>
                    <p className="mb-2 !text-xxs font-bold  tracking-wider">
                        {variationName}:
                    </p>
                    <select
                        ref={ref}
                        onChange={(e) =>
                            handleOnChange({
                                e,
                                setStockState,
                                stockState,
                                property,
                            })
                        }
                        className="item-select select mb-3 min-h-0 min-w-full  !rounded-none border-[1px] border-black !text-sm !outline-none focus:!drop-shadow-2xl"
                    >
                        <option value={'null'}>Please Select</option>
                        {array.map((item, index) => {
                            // const all properties in the object to an array, then create an object assigning data- infront of the prop
                            const props = Object.entries(item).reduce(
                                (accumulator, [field, value]) => {
                                    accumulator[`data-${field}`] = value;
                                    return accumulator;
                                },
                                {}
                            );
                            return (
                                <option
                                    className=""
                                    // value={property ? { ...item } : item}
                                    key={index}
                                    {...props}
                                    // data-_id={item['_id']}
                                    // data-variation={item['variation']}
                                    // data-price={item?.price}
                                    // data-stock={item?.stock}
                                    // data-variation_id ={}
                                    // disabled={item?.stock == 0}
                                >
                                    {`${item['variation'] || item}${
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
