import Switch from '../switch';
import { useEffect, useRef, useState } from 'react';
import { useClickAway } from '@uidotdev/usehooks';
import OptionError from '../optionError';
function Row({ variation, checkAll, setSelected, selected, variations }) {
    const [error, setError] = useState({ price: null, stock: null });
    const [state, setState] = useState(true);
    const [check, setCheck] = useState(false);
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();

    useEffect(() => {
        const count = variations[0].options.length;
        if(checkAll) {
           setCheck(checkAll); 
        }else if(!checkAll && selected == count) {
            setCheck(checkAll); 
        }
        
    }, [checkAll]);

    useEffect(() => {
        if (check) {
            return setSelected((prevState) => prevState + 1);
        } else if (selected > 0) {
            return setSelected((prevState) => prevState - 1);
        }
    }, [check]);
    const priceRef = useClickAway(() => {
        formatData(price, 2, setPrice);
    });

    const stockRef = useClickAway(() => {
        formatData(stock, 0, setStock);
    });

    const formatData = (data, num, setState) => {
        try {
            let newData = parseFloat(data).toFixed(num);

            if (newData != data) {
                setState(newData);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

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
    };

    return (
        <tr
            className={`h-full max-h-28 hover:bg-[var(--light-grey)] ${
                check && 'bg-gray-200'
            }`}
        >
            <td>
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={check}
                    onChange={handleCheck}
                />
            </td>

            <td
                className={`pl-4 ${
                    !error.stock && !error.price && '!align-middle'
                } `}
            >
                {variation}
            </td>
            <td>
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
                    />
                </div>

                {error.price && (
                    <OptionError msg={error.price} className={'w-full'} />
                )}
            </td>
            <td>
                <input
                    ref={stockRef}
                    onChange={(e) => handleStock(e.target.value)}
                    value={stock}
                    type="number"
                    className={`input-number input input-lg w-full rounded-lg  px-2 py-4 ${
                        error.stock && 'border-red-300 bg-red-200'
                    }`}
                />
                {error.stock && <OptionError msg={error.stock} />}
            </td>
            <td className="flex !h-16 items-center justify-end ">
                {soldOut() && (
                    <span className="mr-4 h-5 rounded-full bg-black px-2 text-s text-white">
                        Sold out
                    </span>
                )}
                <Switch state={state} setState={setState} />
            </td>
        </tr>
    );
}

export default Row;
