import { useCart } from '../../context/cartContext';
import calculatePromo from '../common/calculatePromo';
import PromoSavings from './promoSavings';
calculatePromo;
function MultiplePromo({ setCheck, check }) {
    const { promo, setPromo } = useCart();

    const handleClick = (item) => {
        const promoArr = [...promo];
        const filtered = promoArr.filter((promo) => promo.id == item.id);
        setPromo(filtered);
        setCheck(false);
        // console.log(filtered)
    };
    return (
        <>
            <input
                className="modal-state"
                id="modal-3"
                type="checkbox"
                checked={check}
                readOnly={true}
            />
            <div className="modal">
                <label className="modal-overlay"></label>
                <div className="modal-content flex max-w-[600px] flex-col !gap-7 gap-5 rounded-none border-none">
                    <h2 className="mb-2 self-center font-gotham text-3xl">
                        MULTIPLE PROMO CODES
                    </h2>
                    <span className="mt-0">
                        Sorry, you can only use one promo code per order. What
                        would you like to do?
                    </span>

                    <div className="">
                        {promo.map((item, idx) => {
                                const { savePercent, amountOff } = calculatePromo(idx);
                                return (
                                    <div
                                        className="flex flex-col gap-y-4"
                                        key={item.id}
                                    >
                                        <PromoSavings
                                            promo={item}
                                            key={item.code}
                                            savePercent={savePercent}
                                            amountOff={amountOff}
                                        />
                                        <label
                                            onClick={() => handleClick(item)}
                                            htmlFor="modal-3"
                                            className="mb-4 w-full border-2 py-2 text-center font-gotham text-xl hover:bg-[#f9f9f9]"
                                        >{`USE ${item.code}`}</label>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MultiplePromo;
