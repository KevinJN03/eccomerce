import { useEffect, useRef, useState } from 'react';
import UserLogout from '../../../../hooks/userLogout';
import BubbleButton from '../../../buttons/bubbleButton';
import { useContent } from '../../../../context/ContentContext';
import {
    AddRounded,
    ArrowDropDown,
    CheckCircleRounded,
    ContentCopyOutlined,
    EditRounded,
    MoreHorizRounded,
} from '@mui/icons-material';
import { adminAxios } from '../../../../api/axios';
import _ from 'lodash';
import ThemeBtn from '../../../buttons/themeBtn';
import Pagination from '../../../dashboard/pagination/pagination';
import SeamlessDropdown from '../../../common/dropdown/seamlessDropdown';
import { Tooltip } from '@mui/material';

function DeliveryProfile(props) {
    const {
        _id,
        name,
        processing_time,
        origin_post_code,
        active_listings,
        applied,
        children,
        handleCancel,
    } = props;
    const [show, setShow] = useState(false);
    const { setModalContent, modalContent, setModalCheck } = useContent();
    const [loading, setLoading] = useState(false);
    const handleClick = (version) => {
        setModalContent(() => ({
            type: 'createProfile',
            version: version,
            profileId: _id,
            handleCancel,
            button: {
                text: 'Save and apply',
                handleClick: (data) => {
                    modalContent.setProfile(() => data);
                },
            },
        }));
    };

    const apply = () => {
        setLoading(() => true);

        setTimeout(() => {
            const { handleCancel, ...profileProp } = props;
            modalContent.setProfile(() => profileProp);
            setLoading(() => false);
            setModalCheck(() => false);
        }, 500);
    };
    return (
        <div
            className={`flex w-full items-center justify-between   rounded-lg ${applied ? 'border-2 border-black' : 'border border-light-grey '} p-4`}
        >
            <div className="flex-col gap-1">
                <p className="text-base font-medium">{name}</p>

                <p className="text-black/70">
                    {`${processing_time?.start == processing_time?.end ? processing_time?.start : `${processing_time?.start}-${processing_time?.end}`} ${processing_time?.type} processing time, from ${origin_post_code}`}
                </p>

                {active_listings > 0 && (
                    <p className="text-black/70">
                        {`${active_listings} active ${active_listings > 1 ? 'listings' : 'listing'}`}
                    </p>
                )}
            </div>
            <div className="flex items-center gap-2">
                {applied ? (
                    <div className="mr-2 flex flex-nowrap items-center gap-1">
                        <CheckCircleRounded className="!fill-green-500 !text-[25px]" />
                        <p className="text-base font-medium text-green-700">
                            Applied
                        </p>
                    </div>
                ) : (
                    <ThemeBtn
                        bg={'bg-light-grey'}
                        handleClick={apply}
                        className={
                            'flex w-fit min-w-20 items-center justify-center px-2 py-3'
                        }
                    >
                        {loading ? (
                            <div className="w-fit">
                                <div className="spinner-circle   [--spinner-color:var(--slate-10)] [--spinner-size:25px]"></div>
                            </div>
                        ) : (
                            <p className="text-base font-medium text-black ">
                                Apply
                            </p>
                        )}
                    </ThemeBtn>
                )}
                {children || (
                    <section className="relative  mx-2">
                        <BubbleButton
                            className={'border border-transparent p-1.5'}
                            handleClick={() => {
                                setShow(() => true);
                            }}
                        >
                            <MoreHorizRounded fontSize="large" />{' '}
                        </BubbleButton>
                        {show && (
                            <div
                                onClick={() => setShow(() => false)}
                                className="absolute left-0 top-0 !z-[3] rounded-xl border border-transparent p-1.5"
                            >
                                <MoreHorizRounded fontSize="large" />{' '}
                            </div>
                        )}

                        <SeamlessDropdown
                            {...{
                                setShow,
                                show,
                                options: [
                                    {
                                        text: 'Edit',
                                        handleClick: () => handleClick('edit'),
                                    },
                                    {
                                        text: 'Duplicate',
                                        handleClick: () =>
                                            handleClick('duplicate'),
                                    },
                                ],
                                className: `right-0 top-0 pt-3 origin-top-right`,
                            }}
                        >
                            {/* <ul className="relative mt-7 w-full list-none">
                                {[{ text: 'Edit' }, { text: 'Duplicate' }].map(
                                    () => {
                                        return <p></p>;
                                    }
                                )}
                            </ul> */}
                        </SeamlessDropdown>
                    </section>

                    // <BubbleButton className={'p-2'}>
                    //     <MoreHorizRounded fontSize="large" />
                    // </BubbleButton>
                )}
            </div>
        </div>
    );
}
function DeliveryOption({}) {
    const abortControllerRef = useRef(new AbortController());
    const { logoutUser } = UserLogout();
    const { setModalCheck, setModalContent, modalContent } = useContent();
    const [page, setPage] = useState(1);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const [selectedProfile, setSelectedProfile] = useState({});

    const editBtnRef = useRef(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(() => true);
                abortControllerRef.current?.abort;
                abortControllerRef.current = new AbortController();

                const promiseArray = [
                    adminAxios.get(`/delivery/paginate?page=${page}&limit=5`, {
                        signal: abortControllerRef?.current?.signal,
                    }),
                ];

                if (modalContent?.profileId) {
                    promiseArray.push(
                        adminAxios.get(`/delivery/${modalContent.profileId}`)
                    );
                }
                const [{ data }, profileResult] =
                    await Promise.all(promiseArray);

                setData(() => data);

                if (profileResult?.data) {
                    setSelectedProfile(() => profileResult.data?.[0]);
                }
            } catch (error) {
                console.error(error);
                logoutUser({ error });
            } finally {
                setTimeout(() => {
                    setLoading(() => false);
                }, 500);
            }
        };

        fetchData();

        return () => {
            abortControllerRef.current?.abort;
        };
    }, [page]);

    const handleCancel = () => {
        setModalContent((prevState) => _.cloneDeep(modalContent));
    };

    const buttonObj = {
        text: 'Save and apply',
        handleClick: (data) => {
            modalContent.setProfile(() => data);
        },
    };
    return (
        <section className="relative mb-10 flex w-fit justify-center">
            <section className="flex  flex-col rounded-3xl bg-white p-8 sm+md:w-10/12 lg:w-[43.75rem]">
                <div className="top">
                    <h2 className="text-2xl font-semibold">Delivery options</h2>
                    <p>Select a delivery profile or create a new one.</p>
                </div>
                {loading ? (
                    <div className="flex  h-44 w-full items-center justify-center">
                        <div className="spinner-circle spinner-lg [--spinner-color:var(--slate-12)]"></div>
                    </div>
                ) : (
                    <>
                        <div className="bottom mt-2 flex flex-col gap-5">
                            {!_.isEmpty(selectedProfile) && (
                                <>
                                    <div className="w-full">
                                        <DeliveryProfile
                                            {...{
                                                ...selectedProfile,
                                                applied: true,
                                                handleCancel,
                                            }}
                                        >
                                            {[
                                                {
                                                    title: 'Edit',
                                                    button: (
                                                        <ThemeBtn
                                                            bg={'bg-light-grey'}
                                                            className={'p-2.5'}
                                                            handleClick={() => {
                                                                setModalContent(
                                                                    () => ({
                                                                        type: 'createProfile',
                                                                        version:
                                                                            'edit',
                                                                        profileId:
                                                                            selectedProfile?._id,
                                                                        button: buttonObj,
                                                                        handleCancel,
                                                                    })
                                                                );
                                                            }}
                                                        >
                                                            <EditRounded />
                                                        </ThemeBtn>
                                                    ),
                                                },
                                                {
                                                    title: 'Duplicate',
                                                    button: (
                                                        <ThemeBtn
                                                            bg={'bg-light-grey'}
                                                            className={'p-2.5'}
                                                            handleClick={() => {
                                                                setModalContent(
                                                                    () => ({
                                                                        type: 'createProfile',
                                                                        version:
                                                                            'duplicate',
                                                                        profileId:
                                                                            selectedProfile?._id,
                                                                        handleCancel,
                                                                        button: buttonObj,
                                                                    })
                                                                );
                                                            }}
                                                        >
                                                            <ContentCopyOutlined />
                                                        </ThemeBtn>
                                                    ),
                                                },
                                            ].map(({ button, title }) => {
                                                return (
                                                    <Tooltip
                                                        key={`${title}-${selectedProfile?._id}`}
                                                        title={title}
                                                        arrow
                                                        slotProps={{
                                                            arrow: {
                                                                sx: {
                                                                    fontSize:
                                                                        '1rem',
                                                                    '&:before':
                                                                        {
                                                                            // border: '1px solid #E6E8ED',
                                                                            borderColor:
                                                                                'rgb(0,0,0,0.90)',

                                                                            backgroundColor:
                                                                                'rgb(0,0,0,0.90)',
                                                                        },
                                                                },
                                                            },
                                                            tooltip: {
                                                                sx: {
                                                                    fontSize:
                                                                        '0.8rem',
                                                                    backgroundColor:
                                                                        'rgb(0,0,0,0.90)',
                                                                    padding:
                                                                        '0.8rem 1.2rem',
                                                                    borderRadius:
                                                                        '0.7rem',
                                                                    borderWidth:
                                                                        '0px',
                                                                    borderColor:
                                                                        'rgb(0,0,0,0.90)',
                                                                },
                                                            },
                                                        }}
                                                        classes={{
                                                            arrow: {
                                                                fontSize:
                                                                    '1rem',
                                                                '&:before': {
                                                                    // border: '1px solid #E6E8ED',
                                                                    borderColor:
                                                                        'rgb(0,0,0,0.90)',

                                                                    backgroundColor:
                                                                        'rgb(0,0,0,0.90)',
                                                                },
                                                            },
                                                        }}
                                                    >
                                                        <div>{button}</div>
                                                    </Tooltip>
                                                );
                                            })}
                                        </DeliveryProfile>
                                    </div>

                                    <hr className="border" />
                                </>
                            )}
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium">
                                    Delivery profiles
                                </h3>

                                <BubbleButton
                                    handleClick={() => {
                                        setModalContent(() => ({
                                            type: 'createProfile',
                                            version: 'create',
                                            button: {
                                                text: 'Apply',
                                                handleClick: (data) => {
                                                    modalContent.setProfile(
                                                        () => data
                                                    );
                                                },
                                            },

                                            handleCancel,
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

                            <div className="flex flex-col gap-3 ">
                                {data?.profiles?.map((props) => {
                                    return (
                                        <DeliveryProfile
                                            key={props?._id}
                                            {...{
                                                ...props,
                                                applied:
                                                    selectedProfile?._id ==
                                                    props?._id,
                                                handleCancel,
                                            }}
                                        />
                                    );
                                })}

                                <div className="delivery-pagination mt-4 flex flex-row flex-nowrap justify-center gap-1.5 ">
                                    <Pagination
                                        activeClassName={
                                            'border-2 border-black'
                                        }
                                        buttonClassName={
                                            'rounded-full active:border-black active:border-2 focus:border-black focus:border-2  h-12 w-12 bg-light-grey flex justify-center items-center hover:bg-dark-gray/50 text-s font-semibold'
                                        }
                                        divideBy={Math.ceil(
                                            parseInt(data?.total || 0) / 5
                                        )}
                                        setPage={setPage}
                                        page={page}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <div className="mt-8 w-fit">
                    <BubbleButton
                        handleClick={() => {
                            setModalCheck(() => false);
                        }}
                    />
                </div>
            </section>
        </section>
    );
}

export default DeliveryOption;
