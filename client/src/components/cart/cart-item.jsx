import heart from '../../assets/heart.png';
import QTY_SIZE_OPTION from './qty-size-options';
import close from '../../assets/icons/close.png';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '../../context/cartContext';
import { Link } from 'react-router-dom';
const arrayRange = (start, stop, step) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );

function Cart_Item({ product }) {
    const heart_icon_ref = useRef();

    const [quantity, setQuantity] = useState(product?.quantity);
    const [findSize, setFindSize] = useState(null);
    const [sizeOptionArray, setSizeOptionArray] = useState([]);
    const [findColor, setFindColor] = useState(null);
    const [size, setSize] = useState(product?.selectSize);
    let quantityArr = arrayRange(1, 10, 1);

    const qtyRef = useRef(null);
    const sizeRef = useRef(null);
    const { dispatch } = useCart();

    const handleRemove = (id) => {
        'Id:', id;
        dispatch({ type: 'remove', cartId: product.cartId });
    };

    const onClick = () => {
        qtyRef.current.focus();
    };

    const handleSizeChange = () => {};

    const handleQuantityChange = (e) => {
        setQuantity(() => e.target.value);
        dispatch({
            type: 'edit quantity',
            quantity: e.target.value,
            cartId: product.cartId,
        });
    };

    useEffect(() => {
        const variationSelectArray = Object.entries(
            product?.variationSelect
        ).map(([key, value]) => {
            console.log(key, value);

            if (value?.title == 'Colour') {
                setFindColor(() => ({
                    variation: value?.variation,
                    variationType: key,
                }));
            }

            if (value?.title == 'Size') {
                setFindSize(() => ({
                    variation: value?.variation,
                    variationType: key,
                }));

                setSizeOptionArray(() => product?.[key]?.array || []);
            }
        });
    }, []);
    return (
        <section className="white relative flex h-full flex-row gap-x-4 px-4 py-4">
            <button
                type="button"
                id="cart-close"
                className="h-full w-full hover:bg-slate-100"
                onClick={() => handleRemove(product.cartId)}
            >
                <img loading="lazy" src={close} />{' '}
            </button>
            <Link
                to={`/product/${product.id}`}
                className="cart-img-container min-h-full"
            >
                <img
                    src={product.images[0]}
                    className="h-auto w-full object-center"
                ></img>
            </Link>

            <section
                id="cart-info"
                className="flex !min-h-full flex-col flex-nowrap"
            >
                <p className="flex gap-x-3 text-sm font-bold tracking-wider text-[var(--primary-2)]">
                    <span
                        className={
                            product.price?.previous > product.price.current &&
                            'text-red-600'
                        }
                    >
                        £{product.price.current}
                    </span>
                    {product.price?.previous &&
                        product.price?.previous > product.price.current && (
                            <span className="text-[12px] font-medium text-[var(--grey)] line-through">
                                £{product.price?.previous}
                            </span>
                        )}
                </p>

                <div className=" bottom relative flex h-full !max-h-full w-full flex-col justify-between mt-2">
                    <p className="w-11/12 text-gray-500">
                        {product.title}
                    </p>
                    <div className="cart-options">
                        {findColor && (
                            <span className="border-r-[1px] pr-2 text-s">
                                {findColor?.variation?.toUpperCase()}
                            </span>
                        )}
                        {findSize && (
                            <div className="cursor-pointer border-r-[1px] pr-2">
                                <QTY_SIZE_OPTION
                                    handleOnChange={handleSizeChange}
                                    options={sizeOptionArray}
                                    select={findSize.variation}
                                    type="size"
                                />
                                <div className="border-r-2 pr-2"></div>
                            </div>
                        )}
                        <div
                            className="flex !cursor-pointer flex-nowrap  gap-x-2"
                            onClick={onClick}
                        >
                            <p>Qty</p>
                            <QTY_SIZE_OPTION
                                handleOnChange={handleQuantityChange}
                                options={quantityArr}
                                select={quantity}
                                ref={qtyRef}
                            />
                        </div>
                    </div>
                    <button type="button" id="save-later-btn" className="">
                        <img loading="lazy" src={heart} ref={heart_icon_ref} />
                        <p className="m-0 text-xs">Save for later</p>
                    </button>
                </div>
            </section>
        </section>
    );
}

export default Cart_Item;
