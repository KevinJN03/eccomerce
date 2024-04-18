import Payment_Methods from './payment_methods';
import Shipping from './shipping';
import {  useState } from 'react';
import { useCart } from '../../context/cartContext';

function Total({ subTotal, delivery_cost }) {
    const [shippingOptions, setShippingOptions] = useState([]);

    return (
        <section className="white sticky top-3 my-4 h-fit py-5  sm:px-3 md:mr-3 md:px-5 sm+md:flex sm+md:w-full sm+md:justify-center lg:w-96 lg:px-8">
            <h1 className="mb-3 border-b-2 pb-4 text-xl font-bold tracking-widest sm+md:!hidden">
                TOTAL
            </h1>
            <section id="total-delivery-container">
                <div className="flex flex-row items-baseline justify-between">
                    <p className="text-base font-semibold tracking-wide">
                        Sub-total
                    </p>
                    <p>£{subTotal}</p>
                </div>
                <div id="delivery-container" className='flex flex-row items-baseline justify-between mb-6'>
                    <p className="text-base font-semibold tracking-wide">
                        Delivery
                    </p>
                    <p>
                        {delivery_cost
                            ? `£${delivery_cost}`
                            : 'FREE'}
                    </p>
                </div>
            {/* {    <p className="flex justify-center text-sm text-red-800 ">
                    Yay! You've saved £38.50
                </p>} */}
                <a href="/checkout" className="checkout-btn">
                    CHECKOUT
                </a>
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
}

export default Total;
