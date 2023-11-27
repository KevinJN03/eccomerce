import { useEffect } from 'react';
import { usePaymentTypeContext } from '../../../context/paymentTypeContext';
import Card_Item from './card_item';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import cvv_icon from '../../../assets/icons/cvv-icon.png';
import ElementDiv from './element-div';
import CardSelect from './payment-select/card';
import PayPalSelect from './payment-select/paypal';
import KlarnaSelect from './payment-select/klarna';
import ClearPaySelect from './payment-select/clearpay';
function Selected_Method({}) {
    const elements = useElements();

    const { selectedMethod, setNextView } = usePaymentTypeContext();

    return (
        <section className="mb-6">
        

            {selectedMethod['type'] == 'card' && <CardSelect />}
            {selectedMethod['type'] == 'paypal' && <PayPalSelect />}
            {selectedMethod['type'] == 'klarna' && <KlarnaSelect />}
            {selectedMethod['type'] == 'clearpay' && <ClearPaySelect />}
        </section>
    );
}

export default Selected_Method;
