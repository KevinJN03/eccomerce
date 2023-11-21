import axios from '../../../api/axios';
import close_icon from '../../../assets/icons/close.png';
import { usePaymentMethods } from '../../../context/paymentMethodContext';
import { useUserDashboardContext } from '../../../context/userContext';
import DeleteModalContent from '../deleteModalContent';
function DeletePaymentMethod() {
    const { setModalCheck } = useUserDashboardContext();

    const closeModal = () => {
        setModalCheck(false);
    };

    const { modalContent } = useUserDashboardContext();
    const { PaymentMethodsDispatch } = usePaymentMethods();
    const deleteMethod = () => {
        closeModal();

        axios
            .delete(`user/payment-method/delete/${modalContent.id}`)
            .then((res) => {
                PaymentMethodsDispatch({
                    type: 'set',
                    payload: res.data.paymentMethods,
                });
            })
            .catch((error) => {
                console.error('error while deleting: ', error);
            });
    };
    return (
        <DeleteModalContent
            text={'payment method'}
            deleteMethod={deleteMethod}
        />
    );
}

export default DeletePaymentMethod;
