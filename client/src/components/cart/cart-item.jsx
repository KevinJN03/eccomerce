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
    const [size, setSize] = useState(product?.selectSize);
    let quantityArr = arrayRange(1, 10, 1);

    const qtyRef = useRef(null);
    const sizeRef = useRef(null);
    const [state, dispatch] = useCart();

    useEffect(() => {
        console.log('update item');
        dispatch({ type: 'edit item', quantity, size, cartId: product.cartId });
    }, [quantity, size]);

    const handleRemove = (id) => {
        console.log('Id:', id);
        dispatch({ type: 'remove', cartId: product.cartId });
    };

    const onClick = () => {
        qtyRef.current.focus();
    
    };
    return (
        <div id="cart-product">
            <button
                type="button"
                id="cart-close"
                className="h-full w-full hover:bg-slate-100"
                onClick={() => handleRemove(product.cartId)}
            >
                <img loading="lazy" src={close} />{' '}
            </button>
            <Link to={`/product/${product.id}`} className="cart-img-container">
                <img
                    src={product.images[0]}
                    className="h-full w-full object-cover"
                ></img>
            </Link>
            <section id="cart-info">
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
                <p className="">{product.title}</p>
                <div className="cart-options">
                    {product?.color && (
                        <span className="border-r-[1px] pr-2">
                            {product?.color}
                        </span>
                    )}
                    {product.isSizePresent && (
                        <div className="cursor-pointer border-r-[1px] pr-2">
                            <QTY_SIZE_OPTION
                                options={product.size}
                                select={size}
                                setSelect={setSize}
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
                            options={quantityArr}
                            select={quantity}
                            setSelect={setQuantity}
                            ref={qtyRef}
                        />
                    </div>
                </div>
                <button type="button" id="save-later-btn">
                    <img loading="lazy" src={heart} ref={heart_icon_ref} />
                    <p className="m-0 text-xs">Save for later</p>
                </button>
            </section>
        </div>
    );
}

export default Cart_Item;
