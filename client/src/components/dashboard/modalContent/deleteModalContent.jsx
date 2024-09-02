import { useUserDashboardContext } from '../../../context/userContext.jsx';
import close_icon from '../../../assets/icons/close.png';
function DeleteModalContent({
    handleClick,
    text,
    description,
    buttonText,
    loading,
}) {
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
                    className="flex h-12 items-center justify-center !bg-primary font-bold tracking-wider text-white opacity-90 transition-all hover:opacity-100"
                >
                    {loading ? (
                        <svg
                            className="spinner-ring spinner-xs ![--spinner-color:var(--gray-1)]"
                            viewBox="25 25 50 50"
                            strokeWidth="5"
                        >
                            <circle cx="50" cy="50" r="20" />
                        </svg>
                    ) : (
                        <>{buttonText}</>
                    )}
                </button>
                <button
                    className="flex h-12  items-center justify-center border-2 bg-white font-bold tracking-wider !text-primary transition-all hover:!bg-[var(--light-grey)]"
                    onClick={closeModal}
                >
                    CANCEL
                </button>
            </div>
        </section>
    );
}

export default DeleteModalContent;
