import { useEffect } from 'react';

function MountCardComponents({ elements, setError }) {
    useEffect(() => {
        if (elements) {
            const cardNumberElement = elements.create('cardNumber', {
                classes: {
                    base: 'card-number-input',
                },
                placeholder: '',
            });
            var cardCvcElement = elements.create('cardCvc', {
                classes: {
                    base: 'card-number-input card-cvc',
                },

                placeholder: '',
            });

            const cardExpiryDateElement = elements.create('cardExpiry', {
                classes: {
                    base: 'card-number-input',
                },
            });
            cardExpiryDateElement.mount('#cardExpiry');
            cardNumberElement.mount('#cardNumber');
            cardCvcElement.mount('#cardCvc');

            cardCvcElement.on('change', () => {
                setError((prevState) => ({ ...prevState, cvc: null }));
            });

            cardExpiryDateElement.on('change', () => {
                setError((prevState) => ({ ...prevState, expiryDate: null }));
            });

            cardNumberElement.on('change', () => {
                setError((prevState) => ({ ...prevState, number: null }));
            });

            return () => {
                'cleaning up elements', cardNumberElement;
                cardNumberElement.destroy();
                cardCvcElement.destroy();
                cardExpiryDateElement.destroy();
                // elements.off();
            };
        }
    }, []);
}

export default MountCardComponents;
