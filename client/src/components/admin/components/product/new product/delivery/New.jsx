import { useEffect, useState } from 'react';

import CustomTime from './customTime';

import { adminAxios } from '../../../../../../api/axios';
import defaultTimes from './defaultTimes';
import { v4 as uuidv4 } from 'uuid';

import handleError, { closeError } from '../../../../../common/handleError';
import { useNewProduct } from '../../../../../../context/newProductContext';
function New({ setModalState, edit }) {
    const { contentDispatch, modalContent } = useNewProduct();
    const [disable, setDisable] = useState();
  
    const [customRange, setCustomRange] = useState(false);
    const [name, setName] = useState('');
    const [cost, setCost] = useState(0);
    const [processingTime, setProcessingTime] = useState(
        defaultTimes[1].processingTime
    );
    const [selected, setSelected] = useState();
    const [error, setError] = useState([]);
    const [fetchRoute, setFetchRoute] = useState('create');

    useEffect(() => {
        setDisable(() => true);

        if (edit) {
            const { profile } = modalContent;

            setName(() => profile?.name);
            setCost(() => profile?.cost);
            setFetchRoute(() => 'update');
            const newArr = defaultTimes.slice(1, 4);
            const findTime = newArr.find(({ start, end, type }) => {
                if (
                    // time.processingTime &&
                    start == profile?.processingTime.start &&
                    end == profile?.processingTime.end &&
                    type == profile?.processingTime.type
                ) {
                    profile.processingTime.start == start;

                    return time;
                }
            });

            if (findTime) {
                setSelected(() => findTime.name);
            } else {
                setSelected(() => 'Custom range');
                setCustomRange(() => true);
            }

            setProcessingTime(() => profile.processingTime);
        }
    }, []);

    const handleCost = (e) => {
        // const newValue = parseFloat(value).toFixed(2);
        setCost(() => e.target.value);
        setDisable(() => false);
    };
    const save = () => {
        const url = `/delivery/${fetchRoute}`;
        const fetchUrl = modalContent?.profile
            ? `${url}/${modalContent?.profile._id}`
            : url;
        const fetchOptions = {
            name,
            processingTime,
            cost,
        };
        const axiosThen = (res) => {
            if (res.status == 200 || 201) {
                setModalState
                    ? setModalState(() => false)
                    : contentDispatch({ type: 'delivery_main' });
            }
        };
        const axiosCatch = (error) => {
            setError(handleError(error));
        };

        const axiosFetch = (result) => {
            return result
                .then((res) => axiosThen(res))
                .catch((error) => axiosCatch(error));
        };

        if (modalContent?.profile) {
            axiosFetch(adminAxios.put(fetchUrl, fetchOptions));
        } else {
            axiosFetch(adminAxios.post(fetchUrl, fetchOptions));
        }
    };

    const handleOnchange = (e, value) => {
        const fetchProfile = value[e.target.selectedIndex].dataset.profile;
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
                                    onClick={() =>
                                        closeError(id, error, setError)
                                    }
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
            <h3 className="text-center font-gotham text-lg">
                {modalContent?.profile
                    ? 'EDIT A DELIVERY PROFILE'
                    : 'CREATE A DELIVERY PROFILE'}
            </h3>
            <input
                className="font-poppins w-full  rounded border border-dark-gray p-2 text-sm font-light"
                type="text"
                placeholder="Name Your Delivery Profile"
                onChange={(e) => {
                    setName(e.target.value);
                    setDisable(() => false);
                }}
                value={name}
            />

            <div className="flex flex-row flex-wrap items-center justify-between">
                <label htmlFor="processing-time">Processing Time</label>
                <select
                    id="options"
                    name="options"
               
                    className=" !border-1 daisy-select daisy-select-bordered daisy-select-md rounded "
                    onChange={(e) => {
                        handleOnchange(e, e.target.options);
                        setDisable(() => false);
                    }}
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
                        setDisable={setDisable}
                    />
                )}
            </div>
            <span className="flex flex-row items-center justify-between">
                <label htmlFor="cost">Cost</label>
                <div className="relative flex !h-fit flex-nowrap items-center">
                    <p className="pound absolute left-3 z-10 items-center text-sm font-medium">
                        £
                    </p>

                    <input
                        type="text"
                        id="cost-input"
                        min="0"
                        value={cost}
                        onChange={handleCost}
                        className="border-1 input-number daisy-input  daisy-input-bordered daisy-input-md relative !rounded pl-7 pr-4"
                        step=".01"
                    />
                    {/* <CurrencyPoundSharpIcon
                        fontSize="small"
                        className="absolute left-2 top-[25%]"
                    /> */}
                </div>
            </span>

            <section className="flex flex-row gap-x-2">
                <button
                    onClick={() => {
                        setModalState
                            ? setModalState(() => false)
                            : contentDispatch({ type: 'delivery_main' });
                    }}
                    className="flex-1 rounded-md bg-red-300 py-2 hover:bg-red-400"
                >
                    Cancel
                </button>

                <button
                    onClick={save}
                    className="flex-1 rounded-md bg-green-300 py-2 hover:bg-green-400 disabled:bg-slate-100"
                    disabled={disable}
                >
                    Save
                </button>
            </section>
        </section>
    );
}

export default New;
