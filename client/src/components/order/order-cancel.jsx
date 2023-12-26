import { useEffect, useState } from 'react';
import Template from './template';
import { OrderInfo } from './order-success';
import cancelOptions from './cancelOptions';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorMessagePointerUp } from '../Login-SignUp/errorMessage';
import axios from '../../api/axios';
import Checkout_Item from '../checkout/checkout_total/checkout-item';
import GLoader from '../Login-SignUp/socialRegister/gloader';
import userLogout from '../../hooks/userLogout';
import { AnimatePresence, motion } from 'framer-motion';

import OrderCancelContainer from './cancel-order-container';
import LoadingPage from './loadingPage';
function OrderCancel({}) {
    const [order, setOrder] = useState({});

    const [searchParams, setSearchParams] = useSearchParams();
    const [footerMessage, setFooterMessage] = useState({
        success: null,
        text: null,
    });
    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const { logoutUser } = userLogout();
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await axios.get(
                    `order/${searchParams.get('order-number')}`
                );
                setOrder(() => data?.order);
            } catch (error) {
                console.error('error message', error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };

        fetchOrder();
    }, []);

    const cancelOrder = async ({ reason, info }) => {
        let success = false;
        try {
            if (!reason) {
                setErrors((prevState) => ({
                    ...prevState,
                    reason: 'Please select a reason for cancellation',
                }));
                return;
            }

            setLoading(() => true);
            const { data } = await axios.post('/user/cancel-order', {
                orderNumber: order?._id,
                reason,
                additional_information: info,
                redirect: false,
            });

            success = true;
        } catch (error) {
            logoutUser({ error });

            if (error?.response?.status == 400) {
                setErrors((prevState) => ({
                    ...prevState,
                    ...error?.response?.data?.error,
                }));
            }

            if (error?.response?.status == 500) {
                setFooterMessage({
                    success: false,
                    text: 'Failed to apply changes. Please try again a next time ',
                });
            }
        } finally {
            if (success) {
                setTimeout(() => {
                    navigate(`/order-cancelled?order-number=${order?._id}`);
                    setLoading(() => false);
                }, 1000);
            } else {
                setLoading(() => false);
            }
        }
    };
    const props = {
        loading,
        setLoading,
        errors,
        setErrors,
        order,
        cancelOrder,
        footerMessage,
        setFooterMessage,
    };
    return (
        <section className="relative h-full w-full">
            <AnimatePresence>{loading && <LoadingPage />}</AnimatePresence>

            {!loading && (
                <Template>
                    <OrderCancelContainer {...props} />
                </Template>
            )}
        </section>
    );
}

export default OrderCancel;
