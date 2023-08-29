import { useState } from 'react';
import DropDown_Detail from '../common/dropdown/dropdown_detail';
import Promo_Student from './promo-student';
import Voucher from './voucher';

function Promo({}) {
    const [option, setOption] = useState("promo")
    const details = () => {
        return (
            <div class="promo-container">
                <section className="promo-header-container">
                    <span  onClick={()=> setOption("promo")}>PROMO / STUDENT CODE</span>
                    <span onClick={()=> setOption("voucher")}>VOUCHER</span>
                </section>
                {option == "promo" ? <Promo_Student/> : <Voucher/>}
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
            />
        </section>
    );
}

export default Promo;
