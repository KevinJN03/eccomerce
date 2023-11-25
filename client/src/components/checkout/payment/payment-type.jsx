import credit_icon from '../../../assets/icons/credit-card.png';

import Payment_Methods from '../../cart/payment_methods';
import { SubHeader } from './SubHeader';
import Payment_Options from './payment-options';
import { useEffect, useState } from 'react';

import PaymentMethodProvider from '../../../context/paymentMethodContext';

import logos from '../../dashboard/payment-methods/logos';
import { Input } from 'postcss';
import ErrorMessage from '../../Login-SignUp/errorMessage';
import Add_Card from './add_card';

function Payment_Type({ disable }) {
    const [viewContent, setView] = useState('options');
    const [disableChangeBtn, setDisableChangeBtn] = useState(false);
    const views = {
        options: <Payment_Options setView={setView} />,
        card: <Add_Card setViewContent={setView} />,
    };
    useEffect(() => {
        if (viewContent == 'options') {
            setDisableChangeBtn(true);
        }
    }, [viewContent]);

    return (
        <PaymentMethodProvider>
            <section
                id="payment-type"
                className={`mt-4 px-6 ${
                    disable ? 'disable-component' : 'display-component'
                }`}
            >
                <div className="mb-6 mt-3">
                    <SubHeader
                        disablePadding={true}
                        text={'PAYMENT TYPE'}
                        disableChangeBtn={disableChangeBtn}
                    />
                </div>

                {views[viewContent]}

                <div className="checkout-payment-methods">
                    <h2 className="font-semibold tracking-widest">
                        WE ACCEPT:
                    </h2>
                    <Payment_Methods className="w-10" />
                </div>
            </section>
        </PaymentMethodProvider>
    );
}

export default Payment_Type;
