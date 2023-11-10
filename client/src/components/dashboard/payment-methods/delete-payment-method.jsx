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
        PaymentMethodsDispatch({ type: 'delete', id: modalContent.id });
    };
    return (
        <DeleteModalContent
            text={'payment method'}
            deleteMethod={deleteMethod}
        />
    );
}

export default DeletePaymentMethod;
