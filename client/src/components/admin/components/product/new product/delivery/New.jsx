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
    console.log('New Render');
    const { content, dispatch, setLoading } = useContent();
    const [customRange, setCustomRange] = useState(false);
    const [name, setName] = useState();
    const [cost, setCost] = useState();
    const [processingTime, setProcessingTime] = useState();
    const [selected, setSelected] = useState();
    const [error, setError] = useState({});
    const back = () => {
        dispatch({ type: 'Main' });
    };

    useEffect(() => {
        if (profile) {
            console.log(profile);
            console.log('cost', profile.cost);
            setCost((prev) => (prev = profile.cost));
            const newArr = defaultTimes.slice(1, 4);
            console.log({newArr})
            const findTime = newArr.find((time) => {
                const { start, end, type } = time.processingTime;
              

                if (
                    time.processingTime &&
                    start == profile.processingTime.start &&
                    end == profile.processingTime.end &&
                    type == profile.processingTime.type
                ) {
                    profile.processingTime.start == start;
                    console.log(profile.processingTime.start);
                    console.log('timestart ', time);
                    return time;
                }
            });
            console.log('findTime', findTime);
            if (findTime) {
                console.log('contains');
                setSelected(findTime.name);
            } else {
                // if its a custom range, set the selected type to custom
                setSelected('Custom range');
                setCustomRange(true);
            }

            setProcessingTime(profile.processingTime);
        } else {
            // if a new profile is being created set the default processing time to 0
            setCost(0);
            setProcessingTime(defaultTimes[1].processingTime);
        }
    }, []);

    const handleCost = (value) => {
        console.log('handleCost triggered');

        const newValue = parseFloat(value).toFixed(2);
        setCost(newValue);
    };
    const save = () => {
        console.log('name: ', name);
        if (profile) {
            adminAxios
                .put(`/delivery/update/${profile._id}`, {
                    name,
                    processingTime,
                    cost,
                })
                .then((res) => {
                    console.log('resoult', res.data);

                    if (res.status == 200) {
                        setLoading(true);
                        back();
                    }
                })
                .catch((error) => {
                    console.log('error whilst creating or adding:', error);
                    const message = error.response.data.msg;
                    setError({ bool: true, msg: message });
                });
        } else {
            adminAxios
                .post(`/delivery/create`, {
                    name,
                    processingTime,
                    cost,
                })
                .then((res) => {
                    if (res.status == 201) {
                        setLoading(true);
                        back();
                    }
                })
                .catch((error) => {
                    console.log('error whilst creating or adding:', error);
                    const message = error.response.data.msg;
                    const messageArr = message.map((msg) => {
                        return {
                            id: uuidv4(),
                            msg,
                        };
                    });
                    setError(messageArr);
                });
        }
    };

    const handleOnchange = (e, value) => {
        console.log('onchange triggered');
        const fetchProfile = value[event.target.selectedIndex].dataset.profile;
        const profileToJson = JSON.parse(fetchProfile);

        if (profileToJson.name === 'Custom range') {
            setCustomRange(true);
        } else {
            const currentTime = profileToJson.processingTime;
            setProcessingTime(currentTime);

            setCustomRange(false);
        }

        setSelected(profileToJson.name);
    };

    const closeError = (id) => {
        const newErrors = [...error];
        const filter = newErrors.filter((item) => item.id != id);

        setError(filter);
    };
    return (
        <section className="new-delivery flex w-full flex-col gap-3">
            <div className="error">
                {error.length > 0 &&
                    error.map((item) => {
                        const { id, msg } = item;
                        return (
                            <div
                                key={id}
                                class="alert alert-error mb-2 rounded-none py-2"
                            >
                                <svg
                                    onClick={() => closeError(id)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6 shrink-0 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="text-s">{msg}</span>
                            </div>
                        );
                    })}
            </div>

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
                onChange={(e) => setName(e.target.value)}
                defaultValue={profile ? profile.name : ''}
            />

            <div className="flex flex-row flex-wrap items-center justify-between">
                <label htmlFor="processing-time">Processing Time</label>
                <select
                    key={uuidv4()}
                    className="!border-1 select max-w-[50%] appearance-none  rounded-none"
                    onChange={(e) => handleOnchange(e, e.target.options)}
                >
                    {defaultTimes.map((time, idx) => {
                        return (
                            <>
                                <option
                                    key={idx}
                                    value={time.name}
                                    data-profile={JSON.stringify(time)}
                                    disabled={time.disabled || false}
                                    selected={selected == time.name}
                                >
                                    {time.name}
                                </option>
                            </>
                        );
                    })}
                </select>

                {customRange && (
                    <CustomTime
                        setProcessingTime={setProcessingTime}
                        processingTime={processingTime}
                    />
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

            <button
                onClick={save}
                className="bg-green-300 py-2 hover:bg-green-400"
            >
                Save
            </button>
        </section>
    );
}

export default New;
