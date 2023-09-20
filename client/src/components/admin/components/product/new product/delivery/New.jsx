import { useState } from 'react';
import { useContent } from '../../../../../../context/ContentContext';
import Input from '../input';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CustomTime from './customTime';
import CurrencyPoundSharpIcon from '@mui/icons-material/CurrencyPoundSharp';
const processingTimes = [
    {value: 'Select your processing time...', disabled: true},
    { value: '1 day' },
    { value: '1-2 day' },
    { value: '1-3 day' },
    { value: '3-5 day' },
    { value: 'Custom range' },
];
function New({ profile, setContent, MainContent }) {
    const { content, dispatch } = useContent();
    const [customRange, setCustomRange] = useState(false);
    const back = () => {
        dispatch({ type: 'Main' });
    };

    const handleOnchange = (value) => {

        if(value == 'Custom range'){
            return setCustomRange(true)
        }
        return  setCustomRange(false)
    }
    return (
        <section className="new-delivery flex w-full flex-col gap-3">
            <span
                className="mb-2 flex items-center justify-center self-end rounded-full bg-slate-100 p-1 hover:bg-slate-300"
                onClick={back}
            >
                {' '}
                <CloseRoundedIcon />{' '}
            </span>
            <h3 className="text-center font-gotham text-lg">
                CREATE A DELIVERY PROFILE
            </h3>
            <input
                className="font-poppins border-1 w-full border-black p-2 text-sm font-light"
                type="text"
                placeholder="Name Your Delivery Profile"
                defaultValue={profile ? profile.name : ''}
            />

            <div className="flex flex-row flex-wrap items-center justify-between">
                <label htmlFor="processing-time">Processing Time</label>
                <select className="select max-w-[50%] !border-1 rounded-none  appearance-none" onChange={(e) => handleOnchange(e.target.value)}>
                    
                    {processingTimes.map((time, idx) => {
                        return (
                            <>
                                <option key={idx} value={time.value}  disabled={time.disabled || false}>
                                    {time.value}
                                </option>
                            </>
                        );
                    })}
                </select>

                {customRange && <CustomTime/>}
            </div>
            <span className='flex flex-row justify-between items-center'>
                 <label htmlFor='cost'>Cost</label>
                 <span className='relative'>
                    <input type='text' id='cost-input' className='border-1 py-2 pl-7 pr-4 cost-input relative'/>
                    <CurrencyPoundSharpIcon fontSize='small' className='absolute left-2 top-[25%]'/>
                 </span>
                    
            </span>
                   
            <button onClick={back}>Save</button>
        </section>
    );
}

export default New;
