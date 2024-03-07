import Payment_Btn from '../../common/btn/payment-btn';
import credit_icon from '../../../assets/icons/credit-card.png';
import paypal_icon from '../../../assets/icons/payment-icons/paypal.svg';
import klarna_logo from '../../../assets/icons/payment-icons/klarna.svg';
import clearPay_logo from '../../../assets/icons/payment-icons/afterpay.png';
import Payment_Methods from '../../cart/payment_methods';
import { usePaymentTypeContext } from '../../../context/paymentTypeContext';
import { useCheckoutContext } from '../../../context/checkOutContext';
import calculateTotal from '../../common/calculateTotal';

function Payment_Options({}) {
    const { setView, loading, setLoading } = usePaymentTypeContext();
    const { setSelectedMethod, setIsFirstPaymentSet } = useCheckoutContext();

    const { withShipping } = calculateTotal();

    const total = withShipping;
    function handlePaymentOption() {
        setLoading(true);
        setSelectedMethod(() => ({
            type: this.method,
            title: this.title,
        }));

        setIsFirstPaymentSet(() => true);

        setView(() => 'selectedMethod');

        setTimeout(() => {
            setLoading(false);
        }, 2100);
    }
    const paymentMethodArray = [
        {
            button_text: 'ADD CREDIT / DEBIT CARD',
            button_img: credit_icon,
            disable: false,
            handleClick: () => setView('card'),
        },
        {
            button_text: 'PAYPAL',
            button_img: paypal_icon,
            view: 'paypal',
            title: 'Pay With',
            method: 'paypal',
            handleClick: handlePaymentOption,

            disable: false,
        },

        {
            button_text: 'PAY IN 3',
            additional_text: 'with PayPal Pay Later',
            button_img: paypal_icon,
            view: 'paypal',
            title: 'Pay Later',
            method: 'paypal-pay-in-3',
            handleClick: handlePaymentOption,
            disable: total < 30 || total > 2000,
            disableMsg:
                'Pay in 3 is only available for orders above £30.00 and below £2,000.00',
        },
        {
            button_text: 'PAY LATER',
            additional_text: 'with Klarna',
            button_img: klarna_logo,
            view: 'klarna',
            method: 'klarna',
            title: 'PAY LATER WITH KLARNA',
            disable: false,
            handleClick: handlePaymentOption,
        },
        {
            button_text: 'PAY IN 3',
            additional_text: 'with Klarna',
            button_img: klarna_logo,
            view: 'klarna',
            title: 'PAY IN 3 WITH KLARNA',
            method: 'klarna',
            handleClick: handlePaymentOption,
            disable: total < 25 || total > 800,
            disableMsg:
                'Pay in 3 with Klarna is only available for orders above £25.00 and below £800.00',
        },
        {
            button_text: 'CLEARPAY',

            button_img: clearPay_logo,
            view: 'clearpay',
            title: 'PAY NOW WITH CLEARPAY',
            method: 'clearpay',
            handleClick: handlePaymentOption,
            disable: total < 25 || total > 800,
            disableMsg:
                'Clearpay is only available for orders above £25.00 and below £800.00',
        },
    ];

    return (
        <div className=" flex w-6/12 sm:w-full flex-col">
            {paymentMethodArray.map((item, idx) => {
                let handleClick = item.handleClick;
                if (idx > 0) {
                    handleClick = item.handleClick.bind(item);
                }
                return (
                    <>
                        {idx == 0 ? (
                            <>
                                {' '}
                                <Payment_Btn
                                    {...item}
                                    key={idx}
                                    // disable={false}
                                    handleClick={handleClick}
                                />
                                <h1 className="mb-3 self-center font-gotham text-sm font-semibold tracking-widest text-slate-500">
                                    OR
                                </h1>
                            </>
                        ) : (
                            <Payment_Btn
                                {...item}
                                key={idx}
                                // disable={false}
                                handleClick={handleClick}
                                className={'max-h-12'}
                            />
                        )}
                    </>
                );
            })}
        </div>
    );
}

export default Payment_Options;
