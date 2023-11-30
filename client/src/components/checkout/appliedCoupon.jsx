import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

import calculatePromo from '../common/calculatePromo';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import { useCart } from '../../context/cartContext';
function AppliedCoupon() {
    const { promo, setPromo } = useCart();
    const { savePercent, amountOff } = calculatePromo();
    // (promo)
    return (
        <section className="applied-coupon h-24  w-full self-center  !bg-green-200 p-6">
            <div className="flex flex-row items-end gap-2 font-gotham">
                {promo[0].promoType == 'coupon' && (
                    <LocalOfferOutlinedIcon className="scale-x-[-1] self-start" />
                )}
                {promo[0].promoType == 'voucher' && (
                    <CardGiftcardRoundedIcon className="self-start" />
                )}
                <div className="flex flex-col gap-2">
                    <h3 className="font-gotham tracking-wider">
                        {promo.promoType == 'coupon'
                            ? 'PROMO/STUDENT CODE'
                            : 'VOUCHER'}
                    </h3>
                    <span className="flex flex-row items-center gap-2">
                        <p className="text-base">{promo[0].code}</p>
                        <p className="text-base font-light text-[var(--primary-2)]">
                            Saving £{amountOff} ({savePercent}%)
                        </p>
                    </span>
                </div>

                <button
                    className="ml-auto flex self-start text-s text-[var(--primary-2)]"
                    onClick={() => setPromo([{ bool: false }])}
                >
                    Remove
                </button>
            </div>
        </section>
    );
}

export default AppliedCoupon;
