import Card_Item from '../card_item';
import ElementDiv from '../element-div';
import cvv_icon from '../../../../assets/icons/cvv-icon.png';
import { useEffect } from 'react';
import { useElements } from '@stripe/react-stripe-js';
import { usePaymentTypeContext } from '../../../../context/paymentTypeContext';
function CardSelect({}) {
    const elements = useElements();

    const { selectedMethod, setNextView } = usePaymentTypeContext();
    useEffect(() => {
        var cardCvcElement = elements.create('cardCvc', {
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

    const handleClick = () => {};
    return (
        <section>
            <h2 className="font-gotham text-sm">CREDIT / DEBIT CARD</h2>
            <Card_Item
                {...selectedMethod}
                disableRadioBtn={true}
                handleClick={handleClick}
            />
            {
                <ElementDiv
                    label={'CVC'}
                    id={'cardCvc'}
                    icon={{ img: cvv_icon, alt: 'cvc icon' }}
                    className={'w-3/12'}
                />
            }
        </section>
    );
}

export default CardSelect;
