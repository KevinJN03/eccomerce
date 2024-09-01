import { Fragment } from 'react';
import { usePaymentTypeContext } from '../../../../context/paymentTypeContext.jsx';
function ItemTemplate({ icon, text, isDefault, alt, handleClick, id }) {
    const { selectedMethod, setSelectedMethod } = usePaymentTypeContext();
    return (
        <section
            className="flex cursor-pointer flex-row flex-nowrap justify-between py-5"
            onClick={handleClick}
        >
            <div className="left flex flex-[3] flex-col gap-y-4">
                <div className="top flex flex-row items-center gap-x-4">
                    <img src={icon} alt={alt} className="h-10 w-10" />
                    <p className="text-sm">{text?.toUpperCase()}</p>
                </div>

                <div className="bottom">
                    {isDefault ? (
                        <p>This is your default payment method</p>
                    ) : (
                        <div className="flex flex-row flex-nowrap items-center gap-x-4 text-sm">
                            <input
                                type="checkbox"
                                className="daisy-checkbox !rounded-none"
                            />
                            <p>Set as default payment method</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="right mr-10 flex-1 self-start text-right">
                <input
                    type="radio"
                    id={id}
                    name="select-method"
                    className="daisy-radio"
                    readOnly={true}
                    checked={selectedMethod.id == id}
                />
            </div>
        </section>
    );
}

export default ItemTemplate;
