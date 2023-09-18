import { createContext, useContext, useState } from 'react';
import DropDown_Detail from '../common/dropdown/dropdown_detail';
import Promo_Student from './promo-student';
import Voucher from './voucher';
import AppliedCoupon from './appliedCoupon';
import { usePromo } from '../../hooks/promoContext';


function Promo({}) {
    const [option, setOption] = useState('promo');
    // const [Promo, setPromo] = useState({ bool: false });
    const {Promo} = usePromo()
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
                    <Promo_Student triggerClose={setTriggerClose}  />
                ) : (
                    <Voucher />
                )}
            </div>
        );
    };
    return (
       
            <section id="promo-section">
                <DropDown_Detail
                    header={'PROMO/STUDENT CODE OR VOUCHERS'}
                    headerClass="promo-header"
                    details={details()}
                    borderNone="true"
                    className={'px-6'}
                    trigger={{ triggerClose, setTriggerClose }}
                />
                {Promo.bool && <AppliedCoupon code={Promo.code} setPromo={ setPromo} />}
            </section>
      
    );
}

export default Promo;
