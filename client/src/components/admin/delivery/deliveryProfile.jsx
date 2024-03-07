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
import SeamlessDropdown from '../../common/dropdown/seamlessDropdown.jsx';
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
    const [showEditOrigin, setShowEditOrigin] = useState(false);

    const options = [
        {
            _id: 1,
            text: `Select ${5} profiles on this page`,
        },
        {
            _id: 2,

            text: `Select ${7} on all pages`,

            handleClick: () => {
                setSelection(
                    (prevSelection) =>
                        new Set([
                            ...prevSelection,
                            ...profiles.map(({ _id }) => _id),
                        ])
                );
            },
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
                                if (selection.size == profiles.length) {
                                    setSelection(() => new Set());
                                } else {
                                    setSelection(
                                        () =>
                                            new Set(
                                                profiles.map(({ _id }) => _id)
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
                        <AnimatePresence mode="wait">
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

                                <SeamlessDropdown
                                    {...{ setShow, show, options }}
                                />
                            </section>
                            <section className="relative  mx-2">
                                <button
                                    onClick={() =>
                                        setShowEditOrigin(() => true)
                                    }
                                    type="button"
                                    className=" flex flex-row items-center gap-2 rounded-full border-2 border-black p-3"
                                >
                                    <ModeEditOutlineRounded />

                                    <p className="whitespace-nowrap text-sm ">
                                        Edit origin post code
                                    </p>
                                    <ArrowDropDown />
                                </button>
                                {showEditOrigin && (
                                    <button
                                        type="button"
                                        className=" absolute left-0 top-0 !z-[3]  flex flex-row items-center gap-2 border-2 border-transparent p-3"
                                    >
                                        <ModeEditOutlineRounded />

                                        <p className="whitespace-nowrap text-sm ">
                                            Edit origin post code
                                        </p>
                                        <ArrowDropDown />
                                    </button>
                                )}

                                <SeamlessDropdown
                                    {...{
                                        setShow: setShowEditOrigin,
                                        show: showEditOrigin,
                                        options,
                                    }}
                                >
                                    <div className="mt-12 flex flex-col gap-5 px-4 py-4">
                                        <p className="text-sm ">
                                            This is the post code that you
                                            dispatch your items from.
                                        </p>

                                        <div className="flex flex-col gap-1">
                                            <p className="text-base font-semibold">
                                                Origin post code
                                            </p>

                                            <input
                                                type="text"
                                                className="daisy-input daisy-input-bordered"
                                                placeholder="EC2R 7DA"
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            className="w-fit self-end rounded-full bg-black px-5 py-3 font-semibold text-white"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </SeamlessDropdown>
                            </section>
                        </AnimatePresence>
                    </div>

                    <div className="flex w-full justify-end">
                        <BubbleButton
                            className={''}
                            handleClick={() => {
                                setModalContent(() => ({
                                    type: 'createProfile',
                                }));
                                setModalCheck(() => true);
                            }}
                        >
                            <div className="flex flex-row flex-nowrap items-center gap-2">
                                <AddRounded className="!text-3xl" />
                                <p className="whitespace-nowrap text-base font-semibold">
                                    Create profile
                                </p>
                            </div>
                        </BubbleButton>
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
                                                onClick={() => {
                                                    setModalContent(() => ({
                                                        type: 'deleteProfile',
                                                        profileId: _id,
                                                    }));
                                                    setModalCheck(() => true);
                                                }}
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
