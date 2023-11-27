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
import '../../../CSS/checkout.scss';
import PayPalPayIn3 from './payment-select/paypal-pay-in-3';

function Selected_Method({}) {
    const elements = useElements();

    const { selectedMethod, setNextView } = usePaymentTypeContext();
    const content = {
        card: <CardSelect />,
        paypal: <PayPalSelect />,
        'paypal-pay-in-3': <PayPalPayIn3 />,
        'klarna-pay-later': <KlarnaSelect />,
        'klarna-pay-in-3': <KlarnaSelect />,
        clearpay: <ClearPaySelect/>
    };

    return (
        <section className="mb-8 mt-4">{content[selectedMethod.type]}</section>
    );
}

export default Selected_Method;
