import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
function PromoSavings({amountOff, savePercent,  promo, className}){
  return (
  <span className='flex flex-row gap-2'>
   <CheckCircleOutlineRoundedIcon className="active-green" />
                <p className="text-base">{promo.code}</p>
                <p className="text-base font-light text-[var(--primary-2)]">
                    Saving £{amountOff} ({savePercent}%)
                </p>
  </span>
  )
};

export default PromoSavings
