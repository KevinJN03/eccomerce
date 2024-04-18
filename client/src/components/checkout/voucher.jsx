import Input from './input';
import Promo_Voucher_header from './promo-voucher-header';
import { useState } from 'react';
import axios from '../../api/axios';
import ActivePromo from './active-promo';
import { v4 as uuidv4 } from 'uuid';
import { useCart } from '../../context/cartContext.jsx';
import _ from 'lodash';
function Voucher({setShow}) {
    const [voucherText, setVoucherText] = useState();
    const [error, setError] = useState({ bool: false });
    const { promo, setPromo, updateItemProperty } = useCart();
    const handleClick = async (e) => {
        try {
            if (voucherText) {
                const { data } = await axios.get(
                    `/giftCard?code=${voucherText}`
                )

                if (promo?.length < 1) {
                    updateItemProperty({ property: 'giftCard', value: data._id });
                    setShow(() => false);
                }

                setPromo((prevState) => [
                    ...prevState,
                    {
                        bool: true,
                        ...data,
                        promoType: 'giftCard',
                    },
                ]);

                setError({ bool: false });
            } else {
                setError({ msg: 'emptyField', bool: true });
            }
        } catch (error) {
            setError({ msg: 'invalidCoupon', bool: true });
        }
    };

    return (
        <section id="promo-body">
            {_.get(promo, [0]) &&
                _.get(promo, [0, 'promoType']) == 'giftCard' && (
                    <ActivePromo type="voucher" />
                )}
            <Promo_Voucher_header header_text="ADD A VOUCHER" />
            <div id="promo-input-container">
                <Input
                    header="16-DIGIT VOUCHER CODE:"
                    button_text="ADD VOUCHER"
                    setText={setVoucherText}
                    error={error}
                    setError={setError}
                    handleClick={handleClick}
                />
            </div>
        </section>
    );
}

export default Voucher;
