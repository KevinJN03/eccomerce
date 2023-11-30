import { createContext, useContext, useEffect, useState } from 'react';
import DropDown_Detail from '../common/dropdown/dropdown_detail';
import Promo_Student from './promo-student';
import Voucher from './voucher';
import AppliedCoupon from './appliedCoupon';
import MultiplePromo from './multiplePromo';
import { useCart } from '../../context/cartContext';
import { useCheckoutContext } from '../../context/checkOutContext';

function Promo({ disable }) {
    const [option, setOption] = useState('promo');
    // const [Promo, setPromo] = useState({ bool: false });
    const [openMultiple, setOpenMultiple] = useState(false);
    const [display, setDisplay] = useState(false);
    const { promo } = useCart();
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (promo.length > 1) {
            setOpenMultiple(true);
        }
    }, [promo]);
    const [triggerClose, setTriggerClose] = useState(false);
    const details = () => {
        return (
            <div className="promo-container">
                <section className="promo-header-container">
                    <span
                        className={
                            option == 'promo'
                                ? 'active-promo-voucher'
                                : 'promo-voucher'
                        }
                        onClick={() => setOption('promo')}
                    >
                        PROMO / STUDENT CODE
                    </span>
                    <span
                        className={
                            option == 'voucher'
                                ? 'active-promo-voucher'
                                : 'promo-voucher'
                        }
                        onClick={() => setOption('voucher')}
                    >
                        VOUCHER
                    </span>
                </section>
                {option == 'promo' ? (
                    <Promo_Student
                        triggerClose={setTriggerClose}
                        setDisplay={setDisplay}
                        display={display}
                    />
                ) : (
                    <Voucher
                        triggerClose={setTriggerClose}
                        setDisplay={setDisplay}
                        display={display}
                    />
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
            className={`${!promo[0].bool ? '!pb-8' : ''} ${
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
                className={` ${promo[0].bool && 'pb-4'} px-6`}
                triggerClose={triggerClose}
                setTriggerClose={setTriggerClose}
                display={display}
                setDisplay={setDisplay}
                disable={disable}
            />
            {promo[0].bool && display && <AppliedCoupon />}
            <MultiplePromo setCheck={setOpenMultiple} check={openMultiple} />
        </section>
    );
}

export default Promo;
