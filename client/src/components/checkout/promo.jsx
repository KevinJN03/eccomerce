import { createContext, useContext, useEffect, useState } from 'react';
import DropDown_Detail from '../common/dropdown/dropdown_detail';
import Promo_Student from './promo-student';
import Voucher from './voucher';
import AppliedCoupon from './appliedCoupon';
import { usePromo } from '../../hooks/promoContext';
import MultiplePromo from './multiplePromo';


function Promo({}) {
    const [option, setOption] = useState('promo');
    // const [Promo, setPromo] = useState({ bool: false });
    const [openMultiple, setOpenMultiple] = useState(false)
    const [display, setDisplay] = useState(false)
    const {promo, setPromo} = usePromo()

    useEffect(() => {
        if(promo.length > 1){
            setOpenMultiple(true)
        }
    }, [promo])
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
                    <Promo_Student triggerClose={setTriggerClose}  setDisplay={setDisplay} display={display} />
                ) : (
                    <Voucher triggerClose={setTriggerClose}  setDisplay={setDisplay} display={display}/>
                )}
            </div>
        );
    };
    return (
       
            <section id="promo-section" className={`${!promo.bool && '!pb-8'}`}>
                <DropDown_Detail
                    header={'PROMO/STUDENT CODE OR VOUCHERS'}
                    headerClass="promo-header"
                    details={details()}
                    borderNone="true"
                    className={` ${promo.bool && 'pb-4'} px-6`}
                    trigger={{ triggerClose, setTriggerClose }}
                    displayPromo={{display,setDisplay}}
                />
                {promo[0].bool && display &&  <AppliedCoupon />}
                <MultiplePromo setCheck={setOpenMultiple} check={openMultiple}/>
            </section>
      
    );
}

export default Promo;
