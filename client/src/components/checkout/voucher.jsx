import Input from './input';
import Promo_Voucher_header from './promo-voucher-header';
import { useState } from 'react';
import axios from '../../api/axios';
function Voucher({}) {
    const [voucherText, setVoucherText] = useState();
    const [error, setError] = useState({ bool: false });

    const handleClick = (e) => {
        if (voucherText) {
            axios
                .get(`/coupon?code=${voucherText}`)
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log('error at promo', error);
                    setError({ msg: 'invalidCoupon', bool: true });
                });

            console.log(voucherText);
        }else {
            setError({ msg: 'emptyField', bool: true });
        }
    };

    return (
        <section id="promo-body">
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
