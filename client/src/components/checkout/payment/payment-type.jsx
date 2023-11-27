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
import Selected_Method from './selectedMethod';
import Wallet from './wallet';
import axios from '../../../api/axios';
import PaymentTypeProvider from '../../../context/paymentTypeContext';
import { useCheckoutContext } from '../../../context/checkOutContext';

const views = {
    options: <Payment_Options />,
    card: <Add_Card />,
    selectedMethod: <Selected_Method />,

    wallet: <Wallet />,
};
function Payment_Type({ disable }) {
    const [viewContent, setView] = useState('selectedMethod');
    const [disableChangeBtn, setDisableChangeBtn] = useState(false);
    const [userPaymentMethods, setUserPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [selectedMethod, setSelectedMethod] = useState({});
    const { selectedMethod, setSelectedMethod } = useCheckoutContext();
    const [nextView, setNextView] = useState('');
    useEffect(() => {
        axios
            .get('user/payment-method/all')
            .then(({ data }) => {
                setUserPaymentMethods(() => data.paymentMethods);
                // setSelectedMethod(() => data.paymentMethods[0]);

                setSelectedMethod(() => ({
                    type: 'klarna',
                    title: 'PAY IN 3 WITH KLARNA',
                }));
            })
            .catch((error) => {
                console.error('error while fetching payment methods', error);
            });
    }, []);

    useEffect(() => {
        if (viewContent == 'options' || viewContent == 'wallet') {
            setDisableChangeBtn(true);
        } else {
            setDisableChangeBtn(false);
        }

        if (viewContent == 'selectedMethod') {
            setNextView('wallet');
        }
    }, [viewContent]);

    const handleClick = () => {
        setView(nextView);
    };
    const value = {
        viewContent,
        setView,
        disableChangeBtn,
        setDisableChangeBtn,
        loading,
        setLoading,
        selectedMethod,
        setSelectedMethod,
        nextView,
        setNextView,
    };
    return (
        <PaymentTypeProvider value={value}>
            <PaymentMethodProvider userPaymentMethods={userPaymentMethods}>
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
                            onClick={handleClick}
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
        </PaymentTypeProvider>
    );
}

export default Payment_Type;
