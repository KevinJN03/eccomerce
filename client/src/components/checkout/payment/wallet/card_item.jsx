import { useCheckoutContext } from '../../../../context/checkOutContext';
import { usePaymentTypeContext } from '../../../../context/paymentTypeContext';
import logos from '../../../dashboard/payment-methods/logos';

function Card_Item({
    brand,
    last4,
    exp_month,
    exp_year,
    name,
    handleClick,
    disableRadioBtn,
    id,
}) {
    const { selectedMethod, setSelectedMethod } = usePaymentTypeContext();

    return (
        <section
            className="flex w-full flex-row gap-x-4 py-5 cursor-pointer"
            onClick={handleClick}
        >
            <div className="left">
                <img
                    src={logos[brand.toLowerCase()]}
                    alt=""
                    className="h-10 w-10"
                />
            </div>
            <div className="middle">
                <p className="text-sm">{`${brand} (${last4})`}</p>
                <p className="text-sm">{`Exp: ${exp_month}/${exp_year}`}</p>
                <p className="text-sm">{name}</p>
            </div>
            {!disableRadioBtn && (
                <div className="right ml-auto mr-10">
                    <input
                        type="radio"
                        name="select-method"
                        id={id}
                        className="daisy-radio"
                        readOnly={true}
                        checked={selectedMethod.id == id}
                    />
                </div>
            )}
        </section>
    );
}

export default Card_Item;
