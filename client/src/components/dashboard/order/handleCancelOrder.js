import { useEffect, useState } from 'react';
import { useUserDashboardContext } from '../../../context/userContext';
import logOutUser from '../../common/logoutUser';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

function submitCancellation({ setLoading, setError, setShow, orderNumber }) {
    const { setOrdersArray, setFooterMessage } = useUserDashboardContext();
    const [handleCancelOrder, setHandleCancelOrder] = useState();
    const { authDispatch } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        console.log('handleCancelOrder');
        const fetchFunction = async ({ reason, extraInfo, }) => {
            let success = false;

            try {
                if (!reason) {
                    setError((prevState) => ({
                        ...prevState,
                        reason: 'Please select a reason for cancellation',
                    }));

                    return;
                }

                setLoading(true);
                const { data } = await axios.post('/user/cancel-order', {
                    orderNumber,
                    reason,
                    additional_information: extraInfo,
                });
                success = true;
                setOrdersArray(() => data?.orders);
            } catch (error) {
                console.error('error while cancelling order: ', error);

                logOutUser({ error, navigate, authDispatch });
                if (error?.response?.status == 500) {
                    setFooterMessage({
                        success: false,
                        text: 'Order failed to cancel. Please try again later',
                    });
                }
                if (error?.response?.status == 400) {
                    setError({ ...error?.response?.data?.error });
                }
            } finally {
                if (success) {
                    setTimeout(() => {
                        setLoading(false);
                        setShow(() => false);
                        setTimeout(() => {
                            setFooterMessage({
                                success: true,
                                text: 'Order cancellation requested',
                            });
                        }, 2000);
                    }, 1000);
                }else {
                    setLoading(false);
                }
            }
        };

        setHandleCancelOrder(() => fetchFunction);
    }, []);

    return { handleCancelOrder };
}

export default submitCancellation;
