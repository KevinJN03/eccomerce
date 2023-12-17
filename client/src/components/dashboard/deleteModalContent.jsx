import { useUserDashboardContext } from '../../context/userContext';
import close_icon from '../../assets/icons/close.png';
function DeleteModalContent({ handleClick, text, description, buttonText }) {
    const { setModalCheck } = useUserDashboardContext();

    const closeModal = () => {
        setModalCheck(false);
    };
    return (
        <section className="delete-payment-method flex w-full flex-col items-center justify-center gap-y-5 p-2">
            <div className="top relative flex w-full flex-row items-center justify-center">
                <p className="text-lg font-bold ">{text.toUpperCase()}</p>
                <img
                    src={close_icon}
                    alt="black outline X icon"
                    className="absolute right-0 top-2/4 h-4 w-4 translate-y-[-50%]"
                    onClick={closeModal}
                />
            </div>
            <div className="middle">
                <p className="text-center">{description}</p>
            </div>
            <div className="bottom flex w-full flex-col gap-y-3">
                <button
                    onClick={handleClick}
                    className="!bg-primary py-[10px] font-bold tracking-wider text-white opacity-90 transition-all hover:opacity-100"
                >
                    {buttonText}
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

export default DeleteModalContent;
