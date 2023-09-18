import { Link } from 'react-router-dom';
import Input from './input';
import Promo_Voucher_header from './promo-voucher-header';
import axios from '../../api/axios';
import { useState } from 'react';
function Promo_Student({}) {
    const [promoText, setPromoText] = useState();
    const [error, setError] = useState({ bool: false });
    const handleClick = (e) => {
        if (promoText) {
            axios
                .get(`/coupon?code=${promoText}`)
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log('error at promo', error);
                    setError({ msg: 'invalidCoupon', bool: true });
                });

            console.log(promoText);
        }else {
            setError({ msg: 'emptyField', bool: true });
        }
    };
    return (
        <section id="promo-body">
            <Promo_Voucher_header header_text="ADD A PROMO / STUDENT CODE" />
            <div id="promo-input-container">
                <Input
                    header={'PROMO/STUDENT CODE:'}
                    button_text="APPLY CODE"
                    handleClick={handleClick}
                    setText={setPromoText}
                    error={error}
                    setError={setError}
                />
                
                <Link target="_blank" to="/refer-a-friend" className="mb-12">
                    Have you been{' '}
                    <strong className="underline underline-offset-1">
                        referred by a friend?
                    </strong>
                </Link>
                <div className="need-to-know-container">
                    <h2 className="text-xl font-bold tracking-widest">
                        NEED TO KNOW
                    </h2>
                    <ul>
                        <li className="mb-3">
                            You can only use one discount/promo code per order.
                            This applies to our free-delivery codes, too.
                        </li>
                        <li className="mb-5">
                            Discount/promo codes cannot be used when buying gift
                            vouchers.
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default Promo_Student;
