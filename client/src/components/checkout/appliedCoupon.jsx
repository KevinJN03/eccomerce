
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { usePromo } from '../../hooks/promoContext';
import calculatePromo from '../common/calculatePromo';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
function AppliedCoupon(){
  const {promo, setPromo} = usePromo()
  const {savePercent, amountOff} = calculatePromo()
  // console.log(promo)
  return (
    <section className='applied-coupon !bg-green-200  w-full h-24  self-center p-6' >
        <div className='flex flex-row gap-2 items-end font-gotham'>
           { promo[0].promoType == 'coupon' && <LocalOfferOutlinedIcon className='scale-x-[-1] self-start'/>  }
           {promo[0].promoType == 'voucher' && <CardGiftcardRoundedIcon className='self-start'/>  }
           <div className='flex flex-col gap-2'>
             <h3 className='font-gotham tracking-wider'>{promo.promoType == 'coupon' ? 'PROMO/STUDENT CODE' : 'VOUCHER' }</h3>
             <span className='flex flex-row gap-2 items-center'>
        <p className='text-base'>{promo[0].code}</p>
        <p className='text-base text-[var(--primary-2)] font-light'>Saving  £{amountOff} ({savePercent}%)</p>
        </span>
           </div>
          
           <button className='flex text-s ml-auto text-[var(--primary-2)] self-start' onClick={()=> setPromo([{bool: false}])}>Remove</button>
         
        </div>
       
      
    </section>
  )
};

export default AppliedCoupon
