import layer_icon from '../../../../../../assets/icons/layers.png';
function Empty({}){
  return (
   
 <div className='w-full flex flex-col h-full items-center justify-center'>
 <div className="flex h-28 w-28 self-center rounded-full !bg-[var(--light-grey)] p-4">
                    <img
                        src={layer_icon}
                        alt="icon of stack"
                        className="bg-transparent"
                    />
                </div>

                <div className="mt-3 text-center">
                    <h3 className="">You don't have any variations</h3>
                    <p>
                        Use variations if your item is offered in different
                        colours, sizes, materials, etc.
                    </p>
                </div>
 </div>
            
 
  )
};

export default Empty
