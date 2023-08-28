
import american_exp from "../../assets/icons/payment-icons/american-express.svg"
import visa from "../../assets/icons/payment-icons/visa.svg"
import discover from "../../assets/icons/payment-icons/discover.svg"
import klarna from "../../assets/icons/payment-icons/klarna.svg"
import paypal from "../../assets/icons/payment-icons/paypal.svg"
import mastercard from "../../assets/icons/payment-icons/mastercard-alt.svg"
import maestro from "../../assets/icons/payment-icons/maestro.svg"
const payment_icons = [american_exp, visa, discover, klarna, paypal, mastercard, maestro]
function Payment_Methods({}) {
    return (
        <section id="payment-methods" className="w-full">
            <p className="font-semibold tracking-wider">WE ACCEPT:</p>
            <div className="payment-icons">
            {payment_icons.map(img => {
                return (
                   <img src={img} alt={img.split("/", 6).slice(-1)} /> 
                )
                
            })}
            </div>
            <p className="font-light text-black text-sm mt-2">Got a discount code? Add it in the next step.</p>
        </section>
    );
}

export default Payment_Methods;
