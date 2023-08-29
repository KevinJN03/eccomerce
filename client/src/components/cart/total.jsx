import {Link} from "react-router-dom"
import Payment_Methods from "./payment_methods";
import Shipping from "./shipping";

function Total({}) {
    return (
        <section id="total-container">
            <h1 className="mb-3 border-b-2 pb-4 text-xl font-bold tracking-widest">
                TOTAL
            </h1>
            <section id="total-delivery-container">
            <div className="flex flex-row items-baseline justify-between">
                <p className="text-base font-semibold tracking-wide">
                    Sub-total
                </p>
                <p>£90.50</p>
            </div>
            <div id="delivery-container">
                <p className="text-base font-semibold tracking-wide">
                    Delivery
                </p>
                <p>£3.99</p>
            </div>
            <Shipping/>
            <p className="text-red-800 text-sm flex justify-center">Yay! You've saved £38.50</p>
            <Link to="/checkout" className="checkout-btn">CHECKOUT</Link>
            <section id="payment-methods" className={"w-full"}>
            <p className="font-semibold tracking-wider">WE ACCEPT:</p>
            
           <Payment_Methods />
            
            <p className="font-light text-black text-sm mt-2">Got a discount code? Add it in the next step.</p>
        </section>
            
            </section>
            
        </section>
    );
}

export default Total;
