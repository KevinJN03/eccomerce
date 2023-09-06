import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Size from './size';
import Color from './color';
import Category from './category';
function Mobile_Filter({filterCount, count,setFilterCount}) {
return (
    
      <>
<input className="modal-state" id="modal-2" type="checkbox" />
<div className="modal w-screen m-0 p-0 items-end">
	<label className="modal-overlay" htmlFor="modal-2"></label>
	<div className="modal-content flex flex-col gap-5 w-full h-full pt-0">

    
           <div className="mobile-filter-header sticky top-0 !bg-white z-[1] flex sm:!items-center mx-[-24px] min-full border-b-2 !justify-center !h-full !min-h-16 !max-h-16">
             
		<h2 className="text-base font-medium flex mx-auto items-center h-full pl-11" >Filter & Sort</h2> 
          <label htmlFor="modal-2" className=" rounded-full h-8 w-8 flex items-center justify-center !self-center bg-[--light-grey] mr-3"><CloseRoundedIcon className='!text-2xl'/></label>
       
           </div>
        
      
        <div className="mobile-filter-container">
            <Size addToFilter={setFilterCount}/>
            <Color/>
            <Category/>
        </div>

        <div className="mobile-filter-bottom flex place-self-end h-full !items-end w-full gap-3 mb-[-10px]">
           <button className='flex-1 text-[var(--grey)] bg-[var(--light-grey)] py-3 rounded-full font-semibold text-sm' onClick={() => setFilterCount(count => count = 0)}>{filterCount > 0 ? `Clear (${filterCount})` : "Clear"}</button>
           <button className='flex-[2] bg-black text-white py-3 rounded-full font-semibold text-sm '>See {count} items</button>
        </div>

		
		
	</div>
</div>
      
      </>


    
)
}

export default Mobile_Filter