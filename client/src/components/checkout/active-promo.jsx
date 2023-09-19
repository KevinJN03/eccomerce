import Promo_Voucher_header from './promo-voucher-header';

import calculatePromo from '../common/calculatePromo';
import { usePromo } from '../../hooks/promoContext';
import PromoSavings from './promoSavings';
export default function ActivePromo({type }) {
    const {savePercent, amountOff} = calculatePromo()
    const {promo, setPromo} = usePromo()
     return (
        <section className="mb-4 flex flex-col gap-4 border-b-[thin] pb-4">
            <Promo_Voucher_header
                header_text={`${
                    type == 'promo' ? 'ACTIVE PROMO/STUDENT CODE' : 
                    type == 'voucher' && 'ACTIVE VOUCHER CODE'
                } `}
                className={'!mb-0'}
            />
            <span className="flex flex-row items-center gap-2">
               <PromoSavings amountOff={amountOff } savePercent={savePercent} promo={promo[0]}/>
                <button className="ml-auto text-sm font-semibold text-[var(--primary-2)]" onClick={() => {setPromo([{bool: false}])}}>
                    Remove
                </button>
            </span>
        </section>
    );
}
