import { Link } from 'react-router-dom';
import Payment_Methods from './payment_methods';
import Shipping from './shipping';
import { forwardRef, useEffect, useState } from 'react';
import { useCart } from '../../context/cartContext';

const Total = forwardRef(function ({}, ref) {
    const [totalAmount, setTotalAmount] = useState(0)
    const [products, dispatch] = useCart();
    useEffect(()=> {
calculateTotal()
    }, [])
    const calculateTotal = () => {
            let total = 0;

            for ( let item of products){
               total += item.price 
            }
setTotalAmount(total)
            
    }
    return (
        <section id="total-container">
            <h1 className="mb-3 border-b-2 pb-4 text-xl font-bold tracking-widest sm+md:!hidden">
                TOTAL
            </h1>
            <section id="total-delivery-container">
                <div className="flex flex-row items-baseline justify-between">
                    <p className="text-base font-semibold tracking-wide">
                        Sub-total
                    </p>
                    <p>£{totalAmount}</p>
                </div>
                <div id="delivery-container">
                    <p className="text-base font-semibold tracking-wide">
                        Delivery
                    </p>
                    <p>£3.99</p>
                </div>
                <Shipping />
                <p className="flex justify-center text-sm text-red-800">
                    Yay! You've saved £38.50
                </p>
                <Link to="/checkout" className="checkout-btn" ref={ref}>
                    CHECKOUT
                </Link>
                <section id="payment-methods" className="w-full ">
                    <p className="font-semibold tracking-wider">WE ACCEPT:</p>

                    <Payment_Methods />

                    <p className="mt-2 text-sm font-light text-black">
                        Got a discount code? Add it in the next step.
                    </p>
                </section>
            </section>
        </section>
    );
});

export default Total;
