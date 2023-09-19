import { usePromo } from "../../hooks/promoContext";
import calculatePromo from "../common/calculatePromo";
import PromoSavings from "./promoSavings";
calculatePromo
function MultiplePromo({setCheck,
    check}) {
    const {promo, setPromo} = usePromo()

    
   
    const handleClick = (item) => {
         const promoArr = [...promo]
    const filtered = promoArr.filter((promo) => promo.code == item.code)
        setPromo(filtered)
        setCheck(false)
// console.log(filtered)
    }
    return (
       <>

            <input className="modal-state" id="modal-3" type="checkbox"  checked={check} />
            <div className="modal">
                <label className="modal-overlay"></label>
                <div className="modal-content flex flex-col gap-5 rounded-none border-none max-w-[600px] !gap-7">
                    
                    <h2 className="text-3xl font-gotham self-center mb-2">MULTIPLE PROMO CODES</h2>
                    <span className="mt-0">
                    Sorry, you can only use one promo code per order. What would you like to do?
                    </span>

                    <div className="">
                        {promo && promo.map((item, idx) => {
                            const {savePercent, amountOff} = calculatePromo(idx)
                            return (
                                <span className="flex flex-col gap-y-4"> 
                                <PromoSavings  promo={item} key={item.code} savePercent={savePercent} amountOff={amountOff} />
                                <label onClick={() => handleClick(item)} htmlFor="modal-3" className="w-full mb-4 text-center py-2 border-2 font-gotham text-xl hover:bg-[#f9f9f9]">{`USE ${item.code}`}</label>
                                </span >
                               
                            )
                        })}
                    </div>
                  
                </div>
            </div>
        </>
    );
}

export default MultiplePromo;
