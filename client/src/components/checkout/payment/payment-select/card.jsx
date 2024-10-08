import Card_Item from '../wallet/card_item';
import ElementDiv from '../element-div';
import cvv_icon from '../../../../assets/icons/cvv-icon.png';
import { useEffect, useState } from 'react';
import { useElements } from '@stripe/react-stripe-js';
import { usePaymentTypeContext } from '../../../../context/paymentTypeContext';
import { useCheckoutContext } from '../../../../context/checkOutContext';
function CardSelect({}) {
    const elements = useElements();

    const { selectedMethod, setNextView } = usePaymentTypeContext();

    const { footerMessage, setFooterMessage, error, setError } =
        useCheckoutContext();

    useEffect(() => {
        if (elements) {
            console.log('create cardcvc');
            var cardCvcElement = elements.create('cardCvc', {
                classes: {
                    base: 'card-number-input',
                },

                placeholder: '',
            });

            cardCvcElement.mount('#cardCvc');
            cardCvcElement.on('change', (e) => {
                setError((prevState) => ({ ...prevState, cvc: null }));
            });
        }

        return () => {
            if (cardCvcElement) {
                console.log('destroy cardcvc');
                cardCvcElement.destroy();
                setError((prevState) => ({ ...prevState, cvc: null }));
            }
        };
    }, [elements]);

    const handleClick = () => {};
    return (
        <section className="h-fit">
            <h2 className="font-gotham text-sm">CREDIT / DEBIT CARD</h2>
            <Card_Item
                {...selectedMethod}
                disableRadioBtn={true}
                handleClick={handleClick}
            />

            <ElementDiv
                label={'CVC'}
                id={'cardCvc'}
                icon={{ img: cvv_icon, alt: 'cvc icon' }}
                error={error}
                property={'cvc'}
                className={'m-0 w-3/12 p-0'}
            />
        </section>
    );
}

export default CardSelect;
