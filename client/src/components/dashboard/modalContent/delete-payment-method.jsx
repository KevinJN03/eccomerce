import { useState } from 'react';
import axios from '../../../api/axios';
import close_icon from '../../../assets/icons/close.png';
import { usePaymentMethods } from '../../../context/paymentMethodContext';
import { useUserDashboardContext } from '../../../context/userContext';
import DeleteModalContent from './deleteModalContent';
function DeletePaymentMethod() {
    const { setModalCheck, setFooterMessage } = useUserDashboardContext();

    const closeModal = () => {
        setModalCheck(false);
    };

    const { modalContent } = useUserDashboardContext();
    const { PaymentMethodsDispatch } = usePaymentMethods();

    const [loading, setLoading] = useState(false);
    const deleteMethod = async () => {
        let success = false;
        try {
            setLoading(() => true);
            const { data } = await axios.delete(
                `user/payment-method/delete/${modalContent.id}`
            );
            console.log({ data });

            PaymentMethodsDispatch({
                type: 'set',
                payload: data?.paymentMethods,
            });

            success = true;
        } catch (error) {
            setFooterMessage({
                success: false,
                text: 'Failed to delete Payment Method. Please try again later.',
            });
            console.error('error while deleting: ', error);
        } finally {
            // closeModal();

            if (success) {
                setLoading(() => false);
                closeModal();
                setFooterMessage({
                    success: null,
                    text: 'Payment method deleted.',
                });
            }
        }
    };
    return (
        <DeleteModalContent
            buttonText="DELETE"
            text={'delete payment method'}
            loading={loading}
            description={'Are you sure you want to delete this payment method?'}
            handleClick={deleteMethod}
        />
    );
}

export default DeletePaymentMethod;
