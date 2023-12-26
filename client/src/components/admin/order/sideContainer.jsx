import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import { useState } from 'react';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { AnimatePresence, motion } from 'framer-motion';
import '../home/admin.scss';
function Label({ option }) {
    return (
        <label
            className={`  my-1 flex w-full items-center gap-1 px-3  text-xxs`}
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

    const containerVariant = {
        initial: {
            // opacity: 0,
            scale: 0.95,
        },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.1,
                ease: 'easeIn',
            },
        },
        exit: {
            scale: 0,
            translateY: -120,
            translateX: -80,
            opacity: 0,
            transition: {
                duration: 0.3,

                ease: 'easeOut',
            },
        },
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
            <div className=" absolute top-0 h-fit rounded-full bg-white z-[1]">
                <AnimatePresence>
                    {' '}
                    {!show && (
                        <motion.button
                            initial={{ scale: 0.97 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.1 }}
                            onClick={() => setShow((prevState) => !prevState)}
                            className="rounded-full border-2 border-black !shadow-lg transition-all active:scale-95"
                        >
                            <Label option={option} />
                        </motion.button>
                    )}
                    {show && (
                        <motion.div
                            className="box-shadow  h-full w-fit rounded-lg bg-white"
                            variants={containerVariant}
                            initial={'initial'}
                            animate={'animate'}
                            exit={'exit'}
                        >
                            <button
                                className="w-full rounded-t-lg border-2 border-white "
                                onClick={() =>
                                    setShow((prevState) => !prevState)
                                }
                            >
                                <Label option={option} />
                            </button>

                            <div
                                className="flex list-none flex-col
                        rounded-b-lg   p-0"
                            >
                                {optionsArray.map((item, idx) => {
                                    return (
                                        <span
                                            className={`item-center flex gap-x-2 p-2 ${
                                                option == item
                                                    ? 'bg-light-grey/50'
                                                    : ''
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
                        </motion.div>
                    )}
                </AnimatePresence>
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

            <button
            onClick={reset}
                type="button"
                className="w-fit rounded-full bg-light-grey px-4 py-2 text-s font-semibold text-gray-700 hover:bg-dark-gray/50 hover:!shadow-my-shadow transition-all hover:scale-x-105 "
            >
                Reset filters
            </button>
        </section>
    );
}

export default SideContainer;
