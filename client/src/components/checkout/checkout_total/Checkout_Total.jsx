import { Link } from 'react-router-dom';
import { useCart } from '../../../context/cartContext';
import Checkout_Item from './checkout-item';
import calculateTotal from '../../common/calculateTotal';
import { useEffect, useState } from 'react';
import { usePromo } from '../../../hooks/promoContext';
import calculatePromo from '../../common/calculatePromo';

function Checkout_Total({}) {
    const [cart] = useCart();
    let total = calculateTotal();
    // const [total, setTotal] = useState(count);
    const { promo } = usePromo();
    const { savePercent, amountOff, totalAfterPromo } = calculatePromo();
    useEffect(() => {
        // setTotal(calculateTotal())
    }, []);

    const product = {
        img: 'https://images.asos-media.com/cart/dr-martens-garin-sandals-in-back-brando-leather/203997482-1-black',
        title: 'Dr Martens Garin sandals in back brando leather',
        color: 'BLACK',
        size: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        price: 90.99,
        qty: 1,
        delivery: 'Free',
    };

    return (
        <section id="checkout-total">
            <div className="flex flex-row items-center justify-between border-b-2 pb-4">
                <h1 className="font-gotham text-xl font-bold tracking-wider">
                    {cart.length} {cart.length > 1 ? 'ITEMS' : 'ITEM'}
                </h1>
                <Link to="/cart">Edit</Link>
            </div>
            <div className="product-container">
                {cart &&
                    cart.map((product) => {
                        return (
                            <Checkout_Item
                                product={product}
                                key={product.cartId}
                            />
                        );
                    })}
            </div>

            <div className="flex flex-col gap-3">
                <p className="flex justify-between">
                    Subtotal <span>£{total}</span>
                </p>
                {promo.bool && (
                    <p className="flex justify-between">
                        Promo <span>-£{amountOff}</span>
                    </p>
                )}

                <p className="flex justify-between">
                    Delivery <span>{product.delivery}</span>
                </p>
                <p className="flex justify-between font-gotham font-bold">
                    TOTAL TO PAY{' '}
                    <span>£{totalAfterPromo || total}</span>
                </p>
            </div>
        </section>
    );
}

export default Checkout_Total;
