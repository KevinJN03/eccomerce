import Payment_Btn from '../../common/btn/payment-btn';
import credit_icon from '../../../assets/icons/credit-card.png';
import paypal_icon from '../../../assets/icons/payment-icons/paypal.svg';
import klarna_logo from '../../../assets/icons/payment-icons/klarna.svg';
import Payment_Methods from '../../cart/payment_methods';
function Payment_Type({ disable }) {
    const paymentMethodArray = [
        {
            button_text: 'ADD CREDIT / DEBIT CARD',
            button_img: credit_icon,
        },
        {
            button_text: 'PAYPAL',
            button_img: paypal_icon,
        },

        {
            button_text: 'PAY IN 3',
            additional_text: 'with PayPal Pay Later',
            button_img: paypal_icon,
        },
        {
            button_text: 'PAY LATER',
            additional_text: 'with Klarna',
            button_img: klarna_logo,
        },
        {
            button_text: 'PAY IN 3',
            additional_text: 'with Klarna',
            button_img: klarna_logo,
        },
    ];
    return (
        <section
            id="payment-type"
            className={`mt-4 px-6 ${
                disable ? 'disable-component' : 'display-component'
            }`}
        >
            <p className="mb-8 font-gotham font-semibold tracking-widest ">
                PAYMENT TYPE
            </p>
            <div id="payment-btn-container">
                {paymentMethodArray.map((item, idx) => {
                    return (
                        <>
                            <Payment_Btn
                                {...item}
                                key={idx}
                                disable={disable}
                            />
                            {idx == 0 && (
                                <h1 className="mb-3 self-center text-lg font-semibold tracking-widest">
                                    OR
                                </h1>
                            )}
                        </>
                    );
                })}
            </div>

            <div className="checkout-payment-methods">
                <h2 className="font-semibold tracking-widest">WE ACCEPT:</h2>
                <Payment_Methods className="w-10" />
            </div>
        </section>
    );
}

export default Payment_Type;
