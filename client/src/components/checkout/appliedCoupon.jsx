
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
function AppliedCoupon({code, setPromo}){
  return (
    <section className='applied-coupon !bg-green-200  w-full h-24  self-center p-6' >
        <div className='flex flex-row gap-2 items-end font-gotham'>
           <LocalOfferOutlinedIcon className='scale-x-[-1] self-start'/>  
           <div className='flex flex-col gap-2'>
             <h3 className='font-gotham tracking-wider'>PROMO/STUDENT CODE</h3>
             <span className='flex flex-row gap-2 items-center'>
        <p className='text-base'>{code}</p>
        <p className='text-base text-[var(--primary-2)] font-light'>Saving  £3.75 (15%)</p>
        </span>
           </div>
          
           <button className='flex text-s ml-auto text-[var(--primary-2)] self-start' onClick={()=> setPromo({bool: false})}>Remove</button>
         
        </div>
       
      
    </section>
  )
};

export default AppliedCoupon
