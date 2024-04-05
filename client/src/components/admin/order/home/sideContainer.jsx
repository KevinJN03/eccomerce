import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import { useState } from 'react';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { AnimatePresence, motion } from 'framer-motion';

import containerVariants from './containerVariants';
import { ClickAwayListener } from '@mui/material';
import { ThemeDropDown } from '../../../common/dropdown/seamlessDropdown';
import ThemeBtn from '../../../buttons/themeBtn';
function Label({ option }) {
    return (
        <label
            className={` flex w-full items-center gap-1  whitespace-nowrap text-s`}
            tabIndex="0"
        >
            <span className="font-semibold">Sort by</span>
            <span>{option}</span>
            <ArrowDropDownSharpIcon />
        </label>
    );
}
function SideContainer({}) {
    const [show, setShow] = useState(false);
    const [option, setOption] = useState('Dispatch by date');

    const [dispatchBy, setDispatchBy] = useState('All');
    const [destination, setDestination] = useState('All');
    const [orderDetail, setOrderDetail] = useState({
        'Has note from buyer': null,
        'Mark as gift': null,
    });
    const optionsArray = [
        'Dispatch by date',
        'Destination',
        'Newest',
        'Oldest',
    ];

    const handleClick = (item) => {
        setOption(() => item);
        setShow(() => false);
    };

    const reset = () => {
        setDestination(() => 'All');
        setDispatchBy(() => 'All');
        setOrderDetail(() => ({
            'Has note from buyer': null,
            'Mark as gift': null,
        }));
        setOption(() => 'Dispatch by date');
    };
    return (
        <section className="side-container relative mt-4 flex flex-1 flex-col justify-start gap-5">
            <div className=" absolute top-0 z-[1] h-fit rounded-full bg-white">
                <ThemeDropDown
                    {...{
                        defaultIcon: (
                            <ThemeBtn
                                isDisableHoverEffect={show}
                                className={'z-[3] px-3 py-1.5'}
                                bg={`bg-transparent  ${!show ? 'border-2 border-black' : ''}`}
                                handleClick={() =>
                                    setShow((prevState) => !prevState)
                                }
                            >
                                <Label option={option} />
                            </ThemeBtn>
                        ),
                        // showIcon: ( <div className='px-4'><Label option={option} /></div>),

                        show,
                        setShow,
                    }}
                >
                    <div className="pt-8">
                        {optionsArray.map((item, idx) => {
                            return (
                                <span
                                    // key={`${item}-${idx}`}
                                    className={`item-center flex gap-x-2 whitespace-nowrap py-2 pl-4 pr-8 ${
                                        option == item ? 'bg-light-grey/50' : ''
                                    }  hover:bg-light-grey ${
                                        idx == optionsArray.length - 1
                                            ? 'rounded-b-lg'
                                            : ''
                                    }`}
                                    onClick={() => handleClick(item)}
                                >
                                    {item}
                                    {item == option && (
                                        <CheckRoundedIcon className="self-center !text-base" />
                                    )}
                                </span>
                            );
                        })}
                    </div>
                </ThemeDropDown>
            
            </div>

            <div className="dispatch-by-date mt-12 flex flex-col gap-y-2">
                <p className="text-base font-semibold">Dispatch by date</p>
                {[
                    'All',
                    'Overdue',
                    'Today',
                    'Tomorrow',
                    'Within a week',
                    'No estimate',
                ].map((item) => {
                    return (
                        <div
                            key={item}
                            className="flex flex-row flex-nowrap gap-x-2"
                        >
                            <input
                                onChange={() => setDispatchBy(item)}
                                checked={dispatchBy == item}
                                type="radio"
                                name="dispatch-by-date"
                                className="daisy-radio daisy-radio-sm"
                            />
                            <p>{item}</p>
                        </div>
                    );
                })}
            </div>

            <div className="destination flex flex-col gap-y-2">
                <p className="text-base font-semibold">Destination</p>
                {[
                    'All',
                    'United Kingdom',
                    'United States',
                    'Everywhere else',
                ].map((item) => {
                    return (
                        <div
                            key={item}
                            className="flex flex-row flex-nowrap gap-x-2"
                        >
                            <input
                                onChange={() => setDestination(item)}
                                checked={destination == item}
                                type="radio"
                                name="destination"
                                className="daisy-radio daisy-radio-sm"
                            />
                            <p>{item}</p>
                        </div>
                    );
                })}
            </div>

            <div className="destination flex flex-col gap-y-2">
                <p className="text-base font-semibold">Order details</p>
                {['Has note from buyer', 'Mark as gift'].map((item) => {
                    return (
                        <div
                            key={item}
                            className="flex flex-row flex-nowrap gap-x-2"
                        >
                            <input
                                onChange={() =>
                                    setOrderDetail((prevState) => ({
                                        ...prevState,
                                        [item]: !prevState[item],
                                    }))
                                }
                                checked={orderDetail?.[item]}
                                type="checkbox"
                                name="order-detail"
                                className="daisy-checkbox daisy-checkbox-sm rounded-md"
                            />
                            <p>{item}</p>
                        </div>
                    );
                })}
            </div>


<ThemeBtn  bg={'bg-light-grey'} className={'px-3 py-2'} handleClick={reset}>
    <p className='font-medium text-sm'>
    Reset filters
    </p>
</ThemeBtn>
            {/* <button
                onClick={reset}
                type="button"
                className="w-fit rounded-full bg-light-grey px-4 py-2 text-s font-semibold text-gray-700 transition-all hover:scale-x-105 hover:bg-dark-gray/50 hover:!shadow-my-shadow "
            >
                Reset filters
            </button> */}
        </section>
    );
}

export default SideContainer;
