import { createContext, useContext, useEffect, useState } from 'react';
import DropDown_Detail from '../common/dropdown/dropdown_detail';
import Promo_Student from './promo-student';
import Voucher from './voucher';
import AppliedCoupon from './appliedCoupon';
import MultiplePromo from './multiplePromo';
import { useCart } from '../../context/cartContext';
import { useCheckoutContext } from '../../context/checkOutContext';
import _ from 'lodash';

function Promo({ disable }) {
    const [option, setOption] = useState('promo');
    // const [Promo, setPromo] = useState({ bool: false });
    const [modalCheck, setModalCheck] = useState(false);
    const { promo } = useCart();
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (promo.length > 1) {
            setModalCheck(true);
        }
    }, [promo]);

    const details = () => {
        return (
            <div className="promo-container">
                <section className="promo-header-container">
                    {[
                        { text: 'PROMO / STUDENT CODE', type: 'promo' },
                        { text: 'VOUCHER', type: 'voucher' },
                    ].map(({ text, type }) => {
                        return (
                            <div
                                className={`mb-2 flex h-20 cursor-pointer items-center justify-center text-center font-semibold tracking-wider ${
                                    option == type
                                        ? 'active-promo-voucher'
                                        : 'promo-voucher'
                                }`}
                                onClick={() => setOption(type)}
                            >
                                {text}
                            </div>
                        );
                    })}
                </section>
                {option == 'promo' ? (
                    <Promo_Student setShow={setShow} />
                ) : (
                    <Voucher setShow={setShow} />
                )}
            </div>
        );
    };

    const toggleShow = () => {
        'disable: ', disable;
        if (disable) {
            setShow(() => false);
        } else {
            setShow(() => !show);
        }
    };

    useEffect(() => {
        if (disable) {
            setShow(false);
        }
    }, [disable]);
    return (
        <section
            id="promo-section"
            className={`${!_.get(promo, [0, 'bool']) ? '!pb-8' : ''} ${
                disable ? 'disable-component' : 'display-component'
            }`}
        >
            <DropDown_Detail
                show={show}
                toggleShow={toggleShow}
                header={'PROMO/STUDENT CODE OR VOUCHERS'}
                headerClass="promo-header"
                details={details()}
                borderNone="true"
                className={` ${_.get(promo, [0, 'bool']) && 'pb-4'} px-6`}
                disable={disable}
            />
            {_.get(promo, [0]) && !show && <AppliedCoupon />}
            <MultiplePromo
                setCheck={setModalCheck}
                check={modalCheck}
                setShow={setShow}
            />
        </section>
    );
}

export default Promo;
