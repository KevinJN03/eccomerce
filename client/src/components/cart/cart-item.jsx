import heart from '../../assets/heart.png';
import QTY_SIZE_OPTION from './qty-size-options';
import close from '../../assets/icons/close.png';
import { useRef } from 'react';
import { useCart } from '../../context/cartContext';
import { Link } from 'react-router-dom';
const arrayRange = (start, stop, step) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );

function Cart_Item({ product }) {
    const heart_icon_ref = useRef();
    let quantityArr = arrayRange(1, 10, 1);
    const [state, dispatch] = useCart();
    console.log('cartProduct', product);
    return (
        <div id="cart-product">
            <button
                type="button"
                id="cart-close"
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
                <p className="text-sm font-bold tracking-wider text-[var(--primary-2)]">
                    £{product.price.current}
                </p>
                <p className="">{product.title}</p>
                <div className="cart-options">
                    {/* <span>{product.color}</span> */}
                    {product.size.length > 0 && (
                        <QTY_SIZE_OPTION
                            options={product.size}
                            selectSize={product.selectSize}
                            type="size"
                        />
                    )}
                    <div>
                        <p>Qty</p>
                        <QTY_SIZE_OPTION options={quantityArr} />
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
