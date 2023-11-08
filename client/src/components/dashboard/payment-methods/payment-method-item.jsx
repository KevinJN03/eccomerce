import delete_icon from '../../../assets/icons/delete-icon.png';

function PaymentMethodItem({
    icon,
    isDefault,
    method,
    handleDefault,

    handleDelete,
}) {
    return (
        <section className="flex flex-col  bg-white p-4">
            <section className="mb-3 flex flex-row">
                <div className="top flex-[0.7] self-start">
                    <img src={icon} className="h-8 w-8" />
                </div>
                <div className="middle flex-[5]">
                    <p className="mb-2 text-base font-medium">{method}</p>
                    <p className="w-11/12">
                        You'll need to enter your login details when you place
                        your order.
                    </p>
                </div>
                <button
                    className={`bottom flex w-fit flex-[1.2] cursor-pointer items-center gap-x-2 self-start disabled:opacity-40`}
                    disabled={isDefault}
                    onClick={handleDelete}
                >
                    <p className="font-bold tracking-widest !text-[var(--grey)]">
                        DELETE
                    </p>
                    <img
                        src={delete_icon}
                        alt="bin outline icon with transparent background"
                        className="h-7 w-7"
                    />
                </button>
            </section>

            {isDefault ? (
                <p className="text-sm opacity-60">
                    This is your default payment method
                </p>
            ) : (
                <button
                    className="flex flex-row items-center gap-x-4"
                    onClick={handleDefault}
                >
                    <div className="flex h-7 w-7 self-start border-[1px] border-black"></div>
                    <p className="w-fit text-sm">
                        Set as default payment method
                    </p>
                </button>
            )}
        </section>
    );
}

export default PaymentMethodItem;
