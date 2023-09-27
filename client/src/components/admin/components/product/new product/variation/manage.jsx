import AddRoundedIcon from '@mui/icons-material/AddRounded';
import layer_icon from '../../../../../../assets/icons/layers.png'
function Manage({setContent}) {
    return (
        <section className="variation-manage w-full relative flex flex-col">
            <h2 className="text-left font-semibold text-2xl ">Manage variations</h2>
 <button onClick={()=> setContent({type: 'main'})} className='flex flex-row flex-nowrap justify-start items-center px-2 mt-3 py-2 box-border border-black border-1 hover:!px-[12.5px] transition-all ease-in-out rounded-full max-w-fit self-start'>
            <AddRoundedIcon className='bg-transparent' />
                <span className='bg-transparent text-sm'>Add a variation</span>
            </button>
            <section className="manage-body mt-4 flex flex-col items-center gap-y-3 max-w-[400px] self-center">
           

    <div className='h-28 w-28 flex self-center rounded-full !bg-[var(--light-grey)] p-4'><img src={layer_icon} alt="icon of stack" className='bg-transparent'/></div>
            
            <div className='text-center mt-3'>
                <h3 className=''>You don't have any variations</h3>
            <p>Use variations if your item is offered in different colours, sizes, materials, etc.</p> 
            </div>
           
        
            </section>
            <footer className="fixed bottom-0 left-0 p-7 flex flex-row justify-between w-full">
                <button type="button" className='cancel-btn px-3 py-2 rounded-full'>Cancel</button>
                <button type="button" className="bg-black text-white px-3 py-2 rounded-full disabled:opacity-40" disabled >
                    Apply
                </button>
            </footer>
        </section>
    );
}

export default Manage;
