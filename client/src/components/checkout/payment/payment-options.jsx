import Payment_Btn from '../../common/btn/payment-btn';
import credit_icon from '../../../assets/icons/credit-card.png';
import paypal_icon from '../../../assets/icons/payment-icons/paypal.svg';
import klarna_logo from '../../../assets/icons/payment-icons/klarna.svg';
import Payment_Methods from '../../cart/payment_methods';
const paymentMethodArray = [
    {
        button_text: 'ADD CREDIT / DEBIT CARD',
        button_img: credit_icon,
        view: 'card',
    },
    {
        button_text: 'PAYPAL',
        button_img: paypal_icon,
        view: 'paypal',
    },

    {
        button_text: 'PAY IN 3',
        additional_text: 'with PayPal Pay Later',
        button_img: paypal_icon,
        view: 'paypal',
    },
    {
        button_text: 'PAY LATER',
        additional_text: 'with Klarna',
        button_img: klarna_logo,
        view: 'klarna',
    },
    {
        button_text: 'PAY IN 3',
        additional_text: 'with Klarna',
        button_img: klarna_logo,
        view: 'klarna',
    },
];
function Payment_Options({ setView }) {
    return (
        <div className="flex w-6/12 flex-col">
            {paymentMethodArray.map((item, idx) => {
                return (
                    <>
                        <Payment_Btn
                            {...item}
                            key={idx}
                            disable={false}
                            handleClick={() => setView(item.view)}
                        />
                        {idx == 0 && (
                            <h1 className="mb-3 self-center font-gotham text-sm font-semibold tracking-widest text-slate-500">
                                OR
                            </h1>
                        )}
                    </>
                );
            })}
        </div>
    );
}

export default Payment_Options;
