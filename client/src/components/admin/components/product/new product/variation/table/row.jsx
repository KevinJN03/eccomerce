import Switch from '../toggleSwitch/switch';
import { useEffect, useRef, useState } from 'react';
import { useClickAway } from '@uidotdev/usehooks';
import OptionError from '../error/optionError';
import formatData from '../formatData';
import ErrorAlert from '../error/errorAlert';
import { useVariation } from '../../../../../../../context/variationContext';
function Row({
    variation,
    checkAll,
    setCheckAll,
    variationList,
    variationId,
    quantityOn,
    priceOn,
    selected, setSelected,
    update
}) {
    const [error, setError] = useState({ price: null, stock: null });
    const [state, setState] = useState(true);
    const [check, setCheck] = useState(false);
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const { setVariations } = useVariation();

    const priceRef = useClickAway(() => {
        formatData(price, 2, setPrice);
    });
    const stockRef = useClickAway(() => {
        formatData(stock, 0, setStock);
    });

    let count = variationList.options.length;


    useEffect(() => {
        // const newVariations = [...variationList];
        // const findVariations = newVariations.find(
        //     (item) => item.id == variationId
        // );
        // if (findVariations) {
        //     const { options } = findVariations;
        //     const newOptions = options.map((item) => {
        //         if (item.id == variation.id) {
        //             return {
        //                 ...item,
        //                 disabled: !state,
        //                 price: price,
        //                 stock: stock,
        //             };
        //         }
        //         return item;
        //     });
        //     setVariations(
        //         variationList.map((item) => {
        //             if (item.id == variationId) {
        //                 return { ...item, options: newOptions };
        //             }
        //             return item;
        //         })
        //     );
        // }
    }, [state, stock, price]);

    useEffect(() => {
        if (selected.length == 0 || selected.length == count || checkAll) {
            return setCheck(checkAll);
        }
    }, [checkAll]);

    // once update is apply, update input field
    useEffect(() => {
        const findItemInSelect = selected.some(
            (item) => item.id == variation.id
        );
        if (update.quantity != stock && findItemInSelect) {
            return setStock(update.quantity);
        }
    }, [update.quantity]);

    useEffect(() => {
        const findItemInSelect = selected.some(
            (item) => item.id == variation.id
        );
        if (update.price != price && findItemInSelect) {
            return setPrice(update.price);
        }
    }, [update.price]);

    const handlePrice = (value) => {
        if (!value) {
            setError({ ...error, price: 'Please enter a valid price.' });
        } else if (value == 0) {
            setError({
                ...error,
                price: 'Price must be between £0.99 and £42,977.48',
            });
        } else {
            setError({ ...error, price: null });
        }

        setPrice(value);
    };

    const handleStock = (value) => {
        if (!value) {
            setError({ ...error, stock: 'Please enter a valid quantity.' });
        } else {
            setError({ ...error, stock: null });
        }
        setStock(value);
    };

    const soldOut = () => {
        const newArr = Array.from(String(stock));
        if (newArr.length > 0) {
            let check = newArr.every((item) => item == '0');
            return check;
        } else {
            return null;
        }
    };

    const handleCheck = () => {
        setCheck(!check);
        if (!check) {
            return setSelected([...selected, variation]);
        } else {
            setCheckAll(false);
            return setSelected(
                selected.filter((item) => item.id != variation.id)
            );
        }
    };

    const handleVisibility = () => {
        setState(!state);
    };
    return (
        <tr
            className={`h-full max-h-28 min-w-full w-full ${
                !variation.disabled && 'hover:bg-[var(--light-grey)]'
            } ${check && !variation.disabled && 'bg-gray-200'}`}
        >
            
                <td
                    className={` ${
                        (error.price || error.stock) && '!align-top'
                    } align-middle`}
                >
                    {
                        (priceOn || quantityOn) &&    <input
                        type="checkbox"
                        className={`checkbox`}
                        checked={check && !variation.disabled}
                        onChange={handleCheck}
                        disabled={variation.disabled}
                    />
                    }
                 
                </td>
            

            <td
                className={`pl-4 ${
                    !error.stock && !error.price && '!align-middle'
                } 
                
                ${!state && '!opacity-60 '}`}
            >
                {variation.variation}
            </td>

            <td className={`relative ${!state && 'opacity-0'}`}>
                {priceOn && (
                    <>
                        <div className="relative">
                            <span className="pound absolute left-2 top-2/4 translate-y-[-50%] font-medium">
                                £
                            </span>
                            <input
                                ref={priceRef}
                                type="number"
                                step=".01"
                                className={`price-input input-number input input-lg w-full rounded-lg px-4 py-4 ${
                                    error.price && 'border-red-300 bg-red-200'
                                }`}
                                onChange={(e) => handlePrice(e.target.value)}
                                value={price}
                                disabled={!state}
                            />
                        </div>

                        {error.price && state && (
                            <OptionError
                                msg={error.price}
                                className={'w-full'}
                            />
                        )}
                    </>
                )}
            </td>

            {
                <td className={`relative ${!state && 'opacity-0'}`}>
                    {quantityOn && (
                        <>
                            <input
                                ref={stockRef}
                                onChange={(e) => handleStock(e.target.value)}
                                value={stock}
                                type="number"
                                className={`input-number input input-lg w-full rounded-lg  px-2 py-4 ${
                                    error.stock && 'border-red-300 bg-red-200'
                                }`}
                                disabled={!state}
                            />
                            {error.stock && state && (
                                <OptionError msg={error.stock} />
                            )}
                        </>
                    )}
                </td>
            }
            <td
                className={` ${
                    !error.stock && !error.price && '!align-middle !min-w-full w-full !ml-auto'
                }  !text-right`}
            >
                <div className="flex h-auto items-center justify-end">
                    {soldOut() && (
                        <span
                            className={`mr-4 flex h-5 items-center justify-center rounded-full bg-black px-2 py-2 text-s text-white ${
                                !state && '!opacity-0'
                            }`}
                        >
                            Sold out
                        </span>
                    )}
                    <Switch state={state} toggle={handleVisibility} />
                </div>
            </td>
        </tr>
    );
}

export default Row;
