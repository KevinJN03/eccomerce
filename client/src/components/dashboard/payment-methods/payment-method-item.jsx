import { DeleteButton } from '../delete-btn';

function PaymentMethodItem({
    check,
    icon,
    isDefault,
    method,
    handleDefault,
    handleDelete,
    logo,
    arrayLength,
    inputDisable,
    cardData,
}) {
    const requirements = {
        klarna: 'You may be required to enter further personal details at checkout.',
        paypal: "You'll need to enter your login details when you place your order.",
    };
    return (
        <section className="flex !h-full  !min-h-[106px] flex-col bg-white p-4">
            <section className="mb-3 flex flex-row h-full">
                <div className="top flex-[0.7] self-start h-full">
                    <img src={icon || cardData.icon} className="h-8 w-8" />
                </div>
                <div className="middle flex-[5] h-full">
                    <p className="mb-2 text-base font-[400] ">{method}</p>
                    {requirements[logo] && (
                        <p className="w-11/12">{requirements[logo]}</p>
                    )}

                    {Object.keys(cardData).length > 1 && (
                        <>
                            <p className="text-base font-[400]">
                                Exp:{' '}
                                {`${cardData?.exp_month}/${cardData.exp_year
                                    .toString()
                                    .slice(-2)}`}
                            </p>
                            <p className="text-base font-[400]">
                                {cardData.name}
                            </p>
                        </>
                    )}
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
                <div className="flex items-center gap-x-3">
                    <input
                        disabled={inputDisable}
                        type="checkbox"
                        checked={check}
                        className="daisy-checkbox rounded-none border-[1px] border-black"
                        onChange={handleDefault}
                    />
                    <p className="w-fit text-sm">
                        Set as default payment method
                    </p>
                </div>
            )}
        </section>
    );
}

export default PaymentMethodItem;
