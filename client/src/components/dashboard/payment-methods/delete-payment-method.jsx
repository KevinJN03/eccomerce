import close_icon from '../../../assets/icons/close.png';
import { usePaymentMethods } from '../../../context/paymentMethodContext';
import { useUserDashboardContext } from '../../../context/userContext';
function DeletePaymentMethod({}) {
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
        <section className="delete-payment-method flex w-full flex-col items-center justify-center gap-y-5 p-2">
            <div className="top relative flex w-full flex-row items-center justify-center">
                <p className="text-lg font-bold ">DELETE PAYMENT METHOD</p>
                <img
                    src={close_icon}
                    alt="black outline X icon"
                    className="absolute right-0 top-2/4 h-4 w-4 translate-y-[-50%]"
                    onClick={closeModal}
                />
            </div>
            <div className="middle">
                <p className="text-center">
                    Are you sure you want to delete this payment method?
                </p>
            </div>
            <div className="bottom flex w-full flex-col gap-y-3">
                <button onClick={deleteMethod} className="!bg-primary py-[10px] font-bold tracking-wider text-white opacity-90 transition-all hover:opacity-100">
                    DELETE
                </button>
                <button
                    className="border-2 bg-white py-[10px] font-bold tracking-wider !text-primary transition-all hover:!bg-[var(--light-grey)]"
                    onClick={closeModal}
                >
                    CANCEL
                </button>
            </div>
        </section>
    );
}

export default DeletePaymentMethod;
