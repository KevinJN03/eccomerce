import { DeleteButton } from '../delete-btn';

function PaymentMethodItem({
    icon,
    isDefault,
    method,
    handleDefault,
    handleDelete,
    logo,
    arrayLength,
}) {
    const requirements = {
        klarna: 'You may be required to enter further personal details at checkout.',
        paypal: "You'll need to enter your login details when you place your order.",
    };
    return (
        <section className="flex flex-col  bg-white p-4">
            <section className="mb-3 flex flex-row">
                <div className="top flex-[0.7] self-start">
                    <img src={icon} className="h-8 w-8" />
                </div>
                <div className="middle flex-[5]">
                    <p className="mb-2 text-base font-medium">{method}</p>
                    <p className="w-11/12">{requirements[logo]}</p>
                </div>

                <DeleteButton
                    isDefault={isDefault && arrayLength > 1}
                    handleDelete={handleDelete}
                />
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
