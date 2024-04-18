import { Link } from 'react-router-dom';
import Input from './input';
import Promo_Voucher_header from './promo-voucher-header';
import axios from '../../api/axios';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ActivePromo from './active-promo';
import { useCart } from '../../context/cartContext';
import calculateTotal from '../common/calculateTotal';
import _ from 'lodash';
function Promo_Student({ setShow,}) {
    const [promoText, setPromoText] = useState();
    const [error, setError] = useState({ bool: false });
    const { savePercent, amountOff } = calculateTotal();
    const { promo, setPromo, updateItemProperty } = useCart();
    const handleClick = async () => {
        try {
            console.log({ promo });
            if (promoText) {
                const { data } = await axios.get(`/coupon?code=${promoText}`);

                // const { code, amount, type } = data;
                const newObj = {
                    bool: true,
                    ...data,
                    promoType: 'coupon',
                };

                if (promo?.length < 1) {
                    updateItemProperty({ property: 'coupon', value: data._id });
                    setShow(() => false);
                }
                setPromo((prevState) => [...prevState, newObj]);
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
            {_.get(promo, [0, 'bool']) &&
                _.get(promo, [0, 'promoType']) == 'coupon' && (
                    <ActivePromo type="promo" />
                )}
            <Promo_Voucher_header header_text="ADD A PROMO / STUDENT CODE" />
            <div id="promo-input-container" className="flex flex-col">
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
