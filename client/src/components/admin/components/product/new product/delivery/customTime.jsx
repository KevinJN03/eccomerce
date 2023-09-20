export default function CustomTime() {
    return (
        <>
        <span className=" flex flex-row justify-end gap-6 w-full mt-3 items-center">
                    <input type="number" className='w-16 py-2 px-3 border-1'/>
                    <p>-</p>
                    <input type="number" className='w-16 py-2 px-3 border-1'/>
                    
                </span>
                <span className='flex flex-row gap-2 w-full justify-end mt-1'>
                    <label htmlFor="days">Days</label>
                    <input type='radio' defaultChecked id='days' name='dayorweek'/>
                    <label htmlFor="weeks" className='ml-4'>Weeks</label>
                    <input type='radio' id='weeks' name='dayorweek'/>
                </span>
        </>
    )
}