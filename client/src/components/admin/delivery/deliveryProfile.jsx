import {
    AddRounded,
    ArrowDropDown,
    ModeEditOutlineRounded,
} from '@mui/icons-material';
import BubbleButton from '../../buttons/bubbleButton.jsx';
import { useContent } from '../../../context/ContentContext.jsx';

import { useEffect, useRef, useState } from 'react';
import UserLogout from '../../../hooks/userLogout.jsx';
import { adminAxios } from '../../../api/axios.js';
import SeamlessDropdown, {
    ThemeDropDown,
} from '../../common/dropdown/seamlessDropdown.jsx';
import { v4 as uuidv4 } from 'uuid';

import Pagination from '../../dashboard/pagination/pagination.jsx';
import Table from './table.jsx';
import EditOriginPostCode from './editOriginPostCode.jsx';
import { useDeliveryContext } from '../../../context/deliveryContext.jsx';
function DeliveryProfile({ status, setStatus }) {
    const { logoutUser } = UserLogout();
    const { setModalCheck, setModalContent, modalContent } = useContent();
    const [selection, setSelection] = useState(new Set());
    const [show, setShow] = useState(false);
    const [originPostCode, setOriginPostCode] = useState('');
    const [triggerRefresh, setTriggerRefresh] = useState(false);
    const [refreshLoading, setRefreshLoading] = useState(true);
    const [showEditOrigin, setShowEditOrigin] = useState(false);
    const abortControllerRef = useRef(new AbortController());
    const [currentPageProfiles, setCurrentPageProfiles] = useState([]);
    const [page, setPage] = useState(1);
    const [profileData, setProfileData] = useState({});
    const [loading, setLoading] = useState(true);
    const { fetchSetting } = useContent();
    const [triggerFetchSetting, setTriggerFetchSetting] = useState(false);
    const [postageSetting, setPostageSetting] = useState({});

    const [profiles, setProfiles] = useState([]);
    const options = [
        {
            _id: 1,
            text: `Select ${currentPageProfiles.length} ${currentPageProfiles?.length > 1 ? 'profiles' : 'profile'} on this page`,
            handleClick: () => {
                setSelection(
                    () => new Set(currentPageProfiles.map(({ _id }) => _id))
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

    if (profiles.length > 5) {
        options.splice(1, 0, {
            _id: 2,

            text: `Select ${profiles.length} on all pages`,

            handleClick: () => {
                setSelection(() => new Set(profiles.map(({ _id }) => _id)));
            },
        });
    }

    useEffect(() => {
        fetchSetting({ setPostageSetting });
    }, [triggerFetchSetting]);

    useEffect(() => {
        const fetchData = async () => {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            setRefreshLoading(() => true);
            try {
                const { data } = await adminAxios.get('/delivery/all', {
                    signal: abortControllerRef?.current?.signal,
                });

                setProfiles(() => data);

                const currentProfiles = data.slice(5 * (page - 1), page * 5);

                if (currentProfiles.length < 1) {
                    setPage(() => 1);
                }
            } catch (error) {
                logoutUser({ error });
            } finally {
                setTimeout(() => {
                    setRefreshLoading(() => false);
                    setLoading(() => false);
                }, 500);
            }
        };

        fetchData();

        return () => {
            abortControllerRef.current?.abort();
        };
    }, [triggerRefresh]);

    useEffect(() => {
        setCurrentPageProfiles(() => profiles.slice(5 * (page - 1), page * 5));
    }, [profiles, page]);

    useEffect(() => {
        setSelection(() => new Set());
    }, [page]);

    return (
        <section className=" flex flex-col gap-6 sm+md:w-full lg:w-10/12">
            {loading ? (
                <div className="flex w-full justify-center">
                    <div className="spinner-circle spinner-lg [--spinner-color:0,0,0]" />
                </div>
            ) : (
                <>
                    <div className="">
                        <h3 className="text-lg font-semibold">
                            Your order processing schedule
                        </h3>
                        <p className="text-base">
                            Let us know the days of the week you prepare,
                            package, or dispatch orders. This can help improve
                            the accuracy of buyers' delivery dates and your
                            dispatch-by dates.
                        </p>
                    </div>
                    <div className="flex flex-row flex-nowrap items-center justify-between rounded-lg border border-dark-gray px-8 py-6">
                        <p className="text-base font-semibold">
                            {`Monday-Friday${postageSetting?.processing_schedule?.saturday ? ', Saturday' : ''}${postageSetting?.processing_schedule?.sunday ? ', Sunday' : ''}`}
                        </p>
                        <BubbleButton
                            key={uuidv4()}
                            handleClick={() => {
                                setModalCheck(() => true);
                                setModalContent(() => ({
                                    type: 'processOrder',
                                    setTriggerFetchSetting,
                                }));
                            }}
                        >
                            <div className="flex flex-row flex-nowrap items-center gap-2  ">
                                <ModeEditOutlineRounded className="" />

                                <p className="text-base font-semibold">Edit</p>
                            </div>
                        </BubbleButton>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">
                            Delivery profiles
                        </h2>
                        <p className="text-base">
                            Delivery profiles can be used for multiple listings
                            with similar postage costs. This helps save time if
                            you want to add new items to your shop or update
                            multiple listings at once.
                        </p>
                    </div>
                    <section className="w-full">
                        <div className="flex w-full flex-row pl-4">
                            <div className="flex flex-row flex-nowrap items-center">
                                <input
                                    checked={selection.size > 0 ? true : false}
                                    onChange={(e) => {
                                        if (selection.size) {
                                            setSelection(() => new Set());
                                        } else {
                                            setSelection(
                                                () =>
                                                    new Set(
                                                        profiles
                                                            .map(
                                                                ({ _id }) => _id
                                                            )
                                                            .slice(
                                                                5 * (page - 1),
                                                                page * 5
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
                                    <ThemeDropDown
                                        {...{
                                            defaultIcon: (
                                                <BubbleButton
                                                    key={uuidv4()}
                                                    className={
                                                        'border border-transparent px-2 py-1'
                                                    }
                                                    handleClick={() => {
                                                        setShow(() => true);
                                                    }}
                                                >
                                                    <ArrowDropDown />
                                                </BubbleButton>
                                            ),
                                            showIcon: <ArrowDropDown />,
                                            setShow,
                                            show,
                                            options,
                                        }}
                                    />
                                </section>
                                <EditOriginPostCode
                                    {...{
                                        selection,
                                        setShowEditOrigin,
                                        showEditOrigin,
                                        setTriggerRefresh,
                                        options,
                                    }}
                                />
                            </div>

                            <div className="flex w-full justify-end">
                                <BubbleButton
                                    key={uuidv4()}
                                    className={''}
                                    handleClick={() => {
                                        setModalContent(() => ({
                                            type: 'createProfile',
                                            version: 'create',
                                            setTriggerRefresh,
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
                        <Table
                            {...{
                                selection,
                                profiles: currentPageProfiles,
                                refreshLoading,
                                page,

                                setTriggerRefresh,
                                setSelection,
                            }}
                        />

                        <div className="delivery-pagination mt-4 flex flex-row flex-nowrap justify-end gap-1.5 ">
                            <Pagination
                                activeClassName={'border-2 border-black'}
                                buttonClassName={
                                    'rounded-full active:border-black active:border-2 focus:border-black focus:border-2  h-10 w-10 bg-light-grey flex justify-center items-center hover:bg-dark-gray/50 text-s font-semibold'
                                }
                                divideBy={Math.ceil(profiles.length / 5)}
                                setPage={setPage}
                                page={page}
                            />
                        </div>
                    </section>
                </>
            )}
        </section>
    );
}

export default DeliveryProfile;
