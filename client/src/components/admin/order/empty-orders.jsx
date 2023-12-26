import box_icon from '../../../assets/icons/box.png';
function EmptyOrders({}) {
    return (
        <section className=" flex w-full justify-center items-center h-2/4">
            <section className='flex justify-center items-center flex-col gap-4'>
                  <div className='bg-light-grey w-fit h-fit rounded-full p-5 items-center justify-center flex'>
                 <img src={box_icon} alt="box outline icon" className='w-20 h-20' /> 

            </div> 
            <p className='font-semibold text-base'>
            No orders here right now

            </p>
            </section>
         
          
        </section>
    );
}

export default EmptyOrders;
