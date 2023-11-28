import Payment_Btn from '../../common/btn/payment-btn';
import credit_icon from '../../../assets/icons/credit-card.png';
import paypal_icon from '../../../assets/icons/payment-icons/paypal.svg';
import klarna_logo from '../../../assets/icons/payment-icons/klarna.svg';
import clearPay_logo from '../../../assets/icons/payment-icons/afterpay.png';
import Payment_Methods from '../../cart/payment_methods';
import { usePaymentTypeContext } from '../../../context/paymentTypeContext';
import { useCheckoutContext } from '../../../context/checkOutContext';

function Payment_Options({}) {
    const { setView } = usePaymentTypeContext();
    const { setSelectedMethod } = useCheckoutContext();
    function handlePaymentOption() {
        setSelectedMethod(() => ({
            type: this.method,
            title: this.title,
        }));
        setView('selectedMethod');
    }
    const paymentMethodArray = [
        {
            button_text: 'ADD CREDIT / DEBIT CARD',
            button_img: credit_icon,

            handleClick: () => setView('card'),
        },
        {
            button_text: 'PAYPAL',
            button_img: paypal_icon,
            view: 'paypal',
            title: 'Pay With',
            method: 'paypal',
            handleClick: handlePaymentOption,
        },

        {
            button_text: 'PAY IN 3',
            additional_text: 'with PayPal Pay Later',
            button_img: paypal_icon,
            view: 'paypal',
            title: 'Pay Later',
            method: 'paypal-pay-in-3',
            handleClick: handlePaymentOption,
        },
        {
            button_text: 'PAY LATER',
            additional_text: 'with Klarna',
            button_img: klarna_logo,
            view: 'klarna',
            method: 'klarna-pay-later',
            title: 'PAY LATER WITH KLARNA',

            handleClick: handlePaymentOption,
        },
        {
            button_text: 'PAY IN 3',
            additional_text: 'with Klarna',
            button_img: klarna_logo,
            view: 'klarna',
            title: 'PAY IN 3 WITH KLARNA',
            method: 'klarna-pay-in-3',
            handleClick: handlePaymentOption,
        },
        {
            button_text: 'CLEARPAY',
            
            button_img: clearPay_logo,
            view: 'clearpay',
            title: 'PAY NOW WITH CLEARPAY',
            method: 'clearpay',
            handleClick: handlePaymentOption,
        },
    ];

    return (
        <div className="flex w-6/12 mb-6 flex-col">
            {paymentMethodArray.map((item, idx) => {
                let handleClick = item.handleClick;
                if (idx > 0) {
                    handleClick = item.handleClick.bind(item);
                }
                return (
                    <>
                    {idx == 0 ?
                        <>  <Payment_Btn
                            {...item}
                            key={idx}
                            disable={false}
                            handleClick={handleClick}
                        />
                       
                            <h1 className="mb-3 self-center font-gotham text-sm font-semibold tracking-widest text-slate-500">
                                OR
                            </h1>
                        </>
                       
                       :<Payment_Btn
                        {...item}
                        key={idx}
                        disable={false}
                        handleClick={handleClick}
                        className={'max-h-12'}
                    />
                


                    }
                        
                    </>
                );
            })}
        </div>
    );
}

export default Payment_Options;
