import Input from './input';
import Promo_Voucher_header from './promo-voucher-header';
import { useState } from 'react';
import axios from '../../api/axios';
import ActivePromo from './active-promo';
import { v4 as uuidv4 } from 'uuid';
import { useCart } from '../../context/cartContext.jsx';

function Voucher({ triggerClose, setDisplay, display }) {
    const [voucherText, setVoucherText] = useState();
    const [error, setError] = useState({ bool: false });
    const { promo, setPromo } = useCart();
    const handleClick = (e) => {
        if (voucherText) {
            axios
                .get(`/giftCard?code=${voucherText}`)
                .then((res) => {
                    if (res.status == 200) {
                        const { code, amount, type } = res.data;
                        let newObj = {
                            id: uuidv4(),
                            bool: true,
                            code,
                            amount,
                            type,
                            promoType: 'voucher',
                        };

                        if (!promo[0].code) {
                            setPromo([newObj]);
                        } else {
                            setPromo([...promo, newObj]);
                        }

                        setDisplay(true);
                        setError({ bool: false });
                        triggerClose(true);
                    }
                    res;
                })
                .catch((error) => {
                    'error at promo', error;
                    setError({ msg: 'invalidCoupon', bool: true });
                });

            voucherText;
        } else {
            setError({ msg: 'emptyField', bool: true });
        }
    };

    return (
        <section id="promo-body">
            {promo[0].bool && promo[0].promoType == 'voucher' && (
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
