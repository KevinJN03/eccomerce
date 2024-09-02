import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

import calculatePromo from '../utils/calculatePromo';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import { useCart } from '../../context/cartContext';
import _ from 'lodash';
function AppliedCoupon() {
    const { promo, setPromo, total, updateItemProperty } = useCart();
    const { savePercent, amountOff } = calculatePromo(
        promo[0],
        total?.withOutShipping
    );
    const remove = async () => {
        updateItemProperty({
            property: _.get(promo, [0, 'promoType']),
            value: null,
        });

        updateItemProperty({
            property: promo?.promoType == 'coupon' ? 'giftCard' : 'coupon',
            value: null,
        });

        setPromo([]);
    };
    return (
        <section className="applied-coupon h-24  w-full self-center  !bg-green-200 p-6">
            <div className="flex flex-row items-end gap-2 font-gotham">
                {promo[0].promoType == 'coupon' ? (
                    <LocalOfferOutlinedIcon className="scale-x-[-1] self-start" />
                ) : (
                    <CardGiftcardRoundedIcon className="self-start" />
                )}
                <div className="flex flex-col gap-2">
                    <h3 className="font-gotham tracking-wider">
                        {_.get(promo, [0, 'promoType']) == 'coupon'
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
                    onClick={remove}
                >
                    Remove
                </button>
            </div>
        </section>
    );
}

export default AppliedCoupon;
