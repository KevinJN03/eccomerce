import { useEffect } from 'react';
import { usePaymentTypeContext } from '../../../context/paymentTypeContext';
import Card_Item from './card_item';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import cvv_icon from '../../../assets/icons/cvv-icon.png';
import ElementDiv from './element-div';
function Selected_Method({}) {
    const elements = useElements();
    const stripe = useStripe();

    const { selectedMethod, setNextView } = usePaymentTypeContext();

    useEffect(() => {
        console.log('emelents: ', elements);
        const cardCvcElement = elements.create('cardCvc', {
            classes: {
                base: 'card-number-input',
            },

            placeholder: '',
        });

        cardCvcElement.mount('#cardCvc');

        return () => {
            cardCvcElement.destroy();
        };
    }, []);

    const handleClick = () => {
        console.log('hdajgjhd');
    };

    return (
        <section className="mb-6">
            <h2 className="font-gotham text-sm">
                {selectedMethod['type'] == 'card'
                    ? 'CREDIT / DEBIT CARD'
                    : selectedMethod['type'] == 'paypal' && 'PayPal'}
            </h2>

            {selectedMethod['type'] == 'card' && (
                <>
                    {' '}
                    <Card_Item
                        {...selectedMethod}
                        disableRadioBtn={true}
                        handleClick={handleClick}
                    />
                    <ElementDiv
                        label={'CVC'}
                        id={'cardCvc'}
                        icon={{ img: cvv_icon, alt: 'cvc icon' }}
                        className={'w-3/12'}
                    />
                </>
            )}
        </section>
    );
}

export default Selected_Method;
