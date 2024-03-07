import {
    AddRounded,
    ArrowDropDown,
    ContentCopySharp,
    DeleteRounded,
    EastRounded,
    EditRounded,
    ModeEditOutlineRounded,
    WestRounded,
} from '@mui/icons-material';
import BubbleButton from '../../buttons/bubbleButton.jsx';
import { useContent } from '../../../context/ContentContext.jsx';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ClickAwayListener } from '@mui/material';
import UserLogout from '../../../hooks/userLogout.jsx';
import { adminAxios } from '../../../api/axios.js';
function DeliveryProfile({ status, setStatus }) {
    const { logoutUser } = UserLogout();
    const exampleProfile = {
        name: '2-3 Weeks Delivery',
        processing_time: {
            start: 2,
            end: 3,
            type: 'weeks',
        },
        origin: 'KY15 7AA',
        active_listings: 1,
    };

    const { setModalCheck, setModalContent } = useContent();

    const [selection, setSelection] = useState(new Set());

    const [show, setShow] = useState(false);

    const [profiles, setProfiles] = useState([]);

    const options = [
        {
            _id: 1,
            text: `Select ${5} profiles on this page`,
        },
        {
            _id: 2,

            text: `Select ${7} on all pages`,
        },
        {
            _id: 3,
            handleClick: () => {
                setSelection(() => new Set());
            },
            text: 'Deselect all',
        },
    ];

    const exampleData = [
        { ...exampleProfile, _id: 1 },
        { ...exampleProfile, _id: 2 },
        { ...exampleProfile, _id: 3 },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await adminAxios.get('/delivery/all');

                setProfiles(() => data);
            } catch (error) {
                logoutUser({ error });
            }
        };

        fetchData();
    }, []);

    return (
        <section className=" flex flex-col gap-6 sm+md:w-full lg:w-10/12">
            <div className="">
                <h3 className="text-lg font-semibold">
                    Your order processing schedule
                </h3>
                <p className="text-base">
                    Let us know the days of the week you prepare, package, or
                    dispatch orders. This can help improve the accuracy of
                    buyers' delivery dates and your dispatch-by dates.
                </p>
            </div>

            <div className="flex flex-row flex-nowrap items-center justify-between rounded-lg border border-dark-gray px-8 py-6">
                <p className="text-base font-semibold">Monday-Friday</p>
                <BubbleButton
                    handleClick={() => {
                        setModalCheck(() => true);
                        setModalContent(() => ({ type: 'processOrder' }));
                    }}
                >
                    <div className="flex flex-row flex-nowrap items-center gap-2  ">
                        <ModeEditOutlineRounded className="" />

                        <p className="text-base font-semibold">Edit</p>
                    </div>
                </BubbleButton>
            </div>

            <div>
                <h2 className="text-lg font-semibold">Delivery profiles</h2>
                <p className="text-base">
                    Delivery profiles can be used for multiple listings with
                    similar postage costs. This helps save time if you want to
                    add new items to your shop or update multiple listings at
                    once.
                </p>
            </div>

            <section className="w-full">
                <div className="flex w-full flex-row pl-4">
                    <div className="flex flex-row flex-nowrap items-center">
                        <input
                            checked={selection.size > 0 ? true : false}
                            onChange={(e) => {
                                if ( selection.size == profiles.length) {
                                    setSelection(() => new Set());
                                } else {
                                    setSelection(
                                        () =>
                                            new Set(
                                                profiles.map(
                                                    ({ _id }) => _id
                                                )
                                            )
                                    );
                                }
                                console.log(e.target.checked);
                            }}
                            type="checkbox"
                            className="daisy-checkbox h-[1.125rem] w-[1.125rem] rounded-sm border-dark-gray"
                        />

                        {selection.size > 0 && (
                            <p className="ml-2">{selection.size}</p>
                        )}
                        <section className="relative  mx-2">
                            <BubbleButton
                                className={
                                    'border border-transparent px-2 py-1'
                                }
                                handleClick={() => {
                                    setShow(() => true);
                                }}
                            >
                                <ArrowDropDown />
                            </BubbleButton>
                            {show && (
                                <div
                                    onClick={() => setShow(() => false)}
                                    className="absolute left-0 top-0 !z-[3] rounded-xl border border-transparent px-2 py-1"
                                >
                                    <ArrowDropDown />
                                </div>
                            )}
                            <AnimatePresence>
                                {show && (
                                    <ClickAwayListener
                                        onClickAway={() => setShow(() => false)}
                                    >
                                        <motion.div
                                            exit={{
                                                scale: 0,
                                                opacity: 0,

                                                transition: {
                                                    ease: 'easeOut',
                                                    scale: {
                                                        duration: 0.3,
                                                    },
                                                    opacity: {
                                                        duration: 0.15,
                                                    },
                                                },
                                            }}
                                            className="shadow-normal absolute left-0 top-0 z-[2] w-fit  origin-top-left rounded-xl border bg-white pt-1"
                                        >
                                            {/* <div
                                                className={` w-fit  px-2 ${!show ? 'opacity-0' : 'opacity-100'}`}
                                                onClick={() =>
                                                    setShow(() => false)
                                                }
                                            >
                                                <ArrowDropDown />
                                            </div> */}

                                            <ul className="relative mt-7 w-full list-none">
                                                {options.map(
                                                    (
                                                        { text, handleClick },
                                                        idx
                                                    ) => {
                                                        return (
                                                            <li
                                                                key={text}
                                                                onClick={() => {
                                                                    handleClick();
                                                                    setShow(
                                                                        () =>
                                                                            false
                                                                    );
                                                                }}
                                                                className={`w-full whitespace-nowrap rounded-b-inherit py-3 pl-4 pr-8 text-sm hover:bg-light-grey ${idx == options.length - 1 ? 'rounded-b-xl' : 'rounded-none'}`}
                                                            >
                                                                {text}
                                                            </li>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        </motion.div>
                                    </ClickAwayListener>
                                )}
                            </AnimatePresence>
                        </section>
                    </div>

                    <button
                        type="button"
                        className=" flex flex-row items-center gap-2 rounded-full border-2 border-black p-3"
                    >
                        <ModeEditOutlineRounded />

                        <p className="whitespace-nowrap text-sm ">
                            Edit origin post code
                        </p>
                        <ArrowDropDown />
                    </button>
                    <div className="flex w-full justify-end">
                        <button
                            type="button"
                            className="flex flex-nowrap items-center gap-3 self-center  rounded-full border-2 border-black p-3"
                        >
                            <AddRounded />
                            <p className="whitespace-nowrap">Create profile</p>
                        </button>
                    </div>
                </div>

                <table className="mt-5 w-full">
                    <colgroup>
                        <col span="1" width={'5%'} className="bg-red-500/0" />
                        <col
                            span="1"
                            width={'40%'}
                            className="bg-yellow-500/0"
                        />
                        <col
                            span="1"
                            width={'25%'}
                            className="bg-orange-500/0"
                        />
                        <col
                            span="1"
                            width={'7.5%'}
                            className="bg-pink-500/0"
                        />
                        <col
                            span="1"
                            width={'7.5%'}
                            className="bg-purple-500/0"
                        />
                        <col span="1" width={'15%'} className="bg-blue-500/0" />
                    </colgroup>
                    <tr
                        className="
                    "
                    >
                        <th className=" pb-2" />
                        <th className=" pb-2" />
                        <th className="whitespace-nowrap pb-2 text-left text-xs font-medium underline">
                            Processing Time
                        </th>
                        <th className="pb-2 text-left text-xs font-medium">
                            Origin
                        </th>

                        <th className="pb-2 text-left text-xs font-medium">
                            Active Listings
                        </th>
                        <th className="pb-2" />
                    </tr>

                    {profiles.map(
                        ({
                            _id,
                            name,
                            processingTime,
                            origin,
                            active_listings,
                        }) => {
                            return (
                                <tr
                                    key={_id}
                                    className={`border-dak-grey border-b-2 hover:bg-light-grey  ${selection.has(_id) ? 'bg-light-grey/60' : ''}`}
                                >
                                    <td className="py-6 pl-4">
                                        <input
                                            onChange={() => {
                                                console.log('clicked here');
                                                setSelection(
                                                    (prevSelection) => {
                                                        const newSelection =
                                                            new Set(
                                                                prevSelection
                                                            );

                                                        if (
                                                            newSelection.has(
                                                                _id
                                                            )
                                                        ) {
                                                            newSelection.delete(
                                                                _id
                                                            );
                                                        } else {
                                                            newSelection.add(
                                                                _id
                                                            );
                                                        }

                                                        return newSelection;
                                                    }
                                                );
                                            }}
                                            type="checkbox"
                                            checked={selection.has(_id)}
                                            className={`daisy-checkbox h-[1.125rem] w-[1.125rem] rounded-sm border-dark-gray `}
                                        />
                                    </td>
                                    <td className="py-6 pl-5">
                                        <p className="text-base font-semibold">
                                            {name}
                                        </p>
                                    </td>

                                    <td className="py-6">
                                        <p className="text-base ">
                                            {`${processingTime.start}-${processingTime.end} ${processingTime.type}`}
                                        </p>
                                    </td>

                                    <td className="py-6">
                                        <p className="w-2/4 text-base">
                                            {origin || 'KY15 7AA'}
                                        </p>
                                    </td>

                                    <td className="py-6">
                                        <p className="text-base">
                                            {active_listings}
                                        </p>
                                    </td>

                                    <td className="py-6 pr-3">
                                        <div className="flex w-full flex-nowrap items-center justify-end">
                                            <button
                                                type="button"
                                                className="rounded-full p-2 transition-all hover:bg-dark-gray/30"
                                            >
                                                <EditRounded />
                                            </button>

                                            <button
                                                type="button"
                                                className="rounded-full p-2 transition-all hover:bg-dark-gray/30"
                                            >
                                                <ContentCopySharp />
                                            </button>
                                            <button
                                                type="button"
                                                className="rounded-full p-2 transition-all hover:bg-dark-gray/30"
                                            >
                                                <DeleteRounded />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        }
                    )}
                </table>

                <div className="delivery-pagination mt-4 flex flex-row flex-nowrap justify-end gap-1.5">
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-light-grey">
                        <WestRounded fontSize="small" />
                    </button>

                    {[1, 2, 3, 4].map((item) => {
                        return (
                            <button
                                type="button"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-light-grey"
                            >
                                <p className="text-sm font-medium">{item}</p>
                            </button>
                        );
                    })}

                    <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-light-grey"
                    >
                        <EastRounded fontSize="small" />
                    </button>
                </div>
            </section>
        </section>
    );
}

export default DeliveryProfile;
