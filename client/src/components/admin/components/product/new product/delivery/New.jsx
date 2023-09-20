import { useEffect, useState } from 'react';
import { useContent } from '../../../../../../context/ContentContext';
import Input from '../input';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CustomTime from './customTime';
import CurrencyPoundSharpIcon from '@mui/icons-material/CurrencyPoundSharp';
import axios, { adminAxios } from '../../../../../../api/axios';
import defaultTimes from './defultTimes';
import { v4 as uuidv4 } from 'uuid';
function New({ profile }) {
    const { content, dispatch } = useContent();
    const [customRange, setCustomRange] = useState(false);
    const [name, setName] = useState('');
    const [cost, setCost] = useState();
    const [processingTime, setProcessingTime] = useState({});
    const back = () => {
        dispatch({ type: 'Main' });
    };

    useEffect(() => {
        if (profile) {
            // debugger
            console.log(profile);
            console.log('cost', profile.cost);
            return setCost((prev) => (prev = profile.cost));
        }
        return setCost(0);
    }, []);

    const handleCost = (value) => {
        const newValue = parseFloat(value).toFixed(2);
        setCost(newValue);
    };
    const save = () => {
        if (profile) {
            adminAxios
                .put(`/delivery/update/${profile._id}`, {
                    name,
                    processingTime,
                    cost,
                })
                .then((res) => {})
                .catch((error) => {
                    console.log('error whilst creating or adding:', error);
                });
        } else {
            adminAxios
                .post(`/delivery/create`, {
                    name,
                    processingTime,
                    cost,
                })
                .then((res) => {})
                .catch((error) => {
                    console.log('error whilst creating or adding:', error);
                });
        }
    };
    const handleOnchange = (value) => {
        const fetchProfile = value[event.target.selectedIndex].dataset.profile;
        const profileToJson = JSON.parse(fetchProfile);
    const  {name } = profileToJson
    console.log({name,processingTime })
        if (name === 'Custom range') {
         setCustomRange(true);
        } else {
            const currentTime = profileToJson.processingTime
            const {start, end} = currentTime
            console.log({currentTime})
            setProcessingTime((prev)  => {
                
                return {...prev , start: start, end: end}
            });
          
            setCustomRange(false);
        }

        
    };

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
                onClick={(e) => setName(e.target.value)}
                defaultValue={profile ? profile.name : ''}
            />

            <div className="flex flex-row flex-wrap items-center justify-between">
                <label htmlFor="processing-time">Processing Time</label>
                <select
                    key={uuidv4()}
                    className="!border-1 select max-w-[50%] appearance-none  rounded-none"
                    onChange={(e) => handleOnchange(e.target.options)}
                >
                    {defaultTimes.map((time, idx) => {
                        return (
                            <>
                                <option
                                    key={idx}
                                    value={time.name}
                                    data-profile={JSON.stringify(time)}
                                    disabled={time.disabled || false}
                                >
                                    {time.name}
                                </option>
                            </>
                        );
                    })}
                </select>

                {customRange && (
                    <CustomTime setProcessingTime={setProcessingTime} />
                )}
            </div>
            <span className="flex flex-row items-center justify-between">
                <label htmlFor="cost">Cost</label>
                <span className="relative">
                    <input
                        type="number"
                        id="cost-input"
                        min="0"
                        defaultValue={cost}
                        onChange={(e) => handleCost(e.target.value)}
                        className="border-1 cost-input relative py-2 pl-7 pr-4"
                        step=".01"
                    />
                    <CurrencyPoundSharpIcon
                        fontSize="small"
                        className="absolute left-2 top-[25%]"
                    />
                </span>
            </span>

            <button onClick={save}>Save</button>
        </section>
    );
}

export default New;
