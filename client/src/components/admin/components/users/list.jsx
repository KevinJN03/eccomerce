import SideBar from '../sidebar/sidebar.jsx';
import Navbar from '../navbar/navbar.jsx';
import './list.scss';
import '../sidebar/sidebar.scss';
import Datatable from './datatable/datatable.jsx';
import DragDropFile from '../product/new product/dragDropFile.jsx';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios, { adminAxios } from '../../../../api/axios.js';
import { userColumn } from './datatable/datatable-source.jsx';
import actionColumn from './datatable/actionColumn.jsx';
import { useAdminContext } from '../../../../context/adminContext.jsx';
import SearchInput from '../../order/home/searchInput.jsx';
import { AddRounded, ContentCopyRounded } from '@mui/icons-material';
import dayjs from 'dayjs';
import {
    Button,
    CircularProgress,
    Modal,
    Pagination,
    Toolbar,
    Tooltip,
} from '@mui/material';
import { useContent } from '../../../../context/ContentContext.jsx';

import emptyFolder from '../../../../assets/icons/empty-folder (1).png';
import BoxWithProps, {
    CloseModalButton,
} from '../../../common/BoxwithProps.jsx';
import BubbleButton from '../../../buttons/bubbleButton.jsx';
import ThemeBtn from '../../../buttons/themeBtn.jsx';
import { motion } from 'framer-motion';
function All_Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);

    const [selection, setSelection] = useState([]);
    const [todayDate, setTodayDate] = useState(dayjs());

    const [isCopied, setCopied] = useState(false);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();
    const abortControllerRef = useRef(new AbortController());
    const { allUsers, logoutUser, setAllUsers } = useAdminContext();
    const [modalOpen, setModalOpen] = useState(false);
    const { setShowAlert } = useContent();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchText, setSearchText] = useState(
        searchParams.get('searchText') || ''
    );

    const [triggerSearch, setTriggerSearch] = useState(false);

    const [userInfo, setUserInfo] = useState({ id: '', status: '' });

    const deleteButtonClick = (type, id) => {
        setId(id);
        setModalCheck(true);
        // setCheckBox(false)
    };

    const columnAction = actionColumn({
        viewBtn: false,
        selection,
        deleteButtonClick,
    });

    const handleSearchText = async () => {
        try {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            const getSearchText = searchParams.get('searchText') || '';
            const { data } = await adminAxios.get(
                `user/search?searchText=${searchText}`
            );
            setAllUsers(() => data.result);
            // setSearchText(() => data?.searchText || '');
        } catch (error) {
            console.error(error);
            logoutUser(error);

            if (error.response.status != 401) {
                setShowAlert(() => ({
                    on: true,
                    bg: 'bg-red-900',
                    icon: 'sadFace',
                    msg: 'We could not search for user. Please try again',
                    size: 'medium',
                }));
            }
        } finally {
            timeoutRef.current = setTimeout(() => {
                setLoading(() => false);
            }, 1000);
        }
    };

    useEffect(() => {
        setLoading(() => true);

        handleSearchText();
        return () => {
            abortControllerRef.current?.abort();
        };
    }, [searchParams.get('searchText'), triggerSearch]);

    const handleCopyToClipBoard = (id) => {
        navigator.clipboard.writeText(id);
        setCopied(() => true);
    };

    const handleStatus = async () => {
        try {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            setBtnLoading(() => true);
            const { data } = await adminAxios.post(
                `user/status`,
                {
                    ...userInfo,
                },
                { signal: abortControllerRef.current?.signal }
            );
            handleSearchText();
        } catch (error) {
            logoutUser({ error });

            if (error.response.status != 401) {
                setShowAlert(() => ({
                    on: true,
                    bg: 'bg-red-900',
                    icon: 'sadFace',
                    msg: 'We could not update the status of the user. Please try again',
                    size: 'medium',
                }));
            }
        } finally {
            handleClose();
        }
    };

    const handleClose = () => {
        setBtnLoading(() => false);
        setUserInfo(() => {});
        setModalOpen(() => false);
    };
    return (
        <section className="mb-12 h-full w-full">
            <header className="flex h-full max-h-20 w-full flex-row items-center justify-between border-b-2 py-4 pl-6 pr-12">
                <h1 className="flex-1  text-2xl font-semibold">Users </h1>

                <section className="flex flex-[0.6] flex-row gap-x-6 self-end">
                    <SearchInput
                        handleOnchange={(e) => {
                            setSearchText(() => e.target.value);
                        }}
                        searchText={searchText}
                        handleClick={() => {
                            if (searchText) {
                                searchParams.set('searchText', searchText);
                            } else {
                                searchParams.delete('searchText');
                            }
                            setSearchParams(searchParams);
                            setTriggerSearch((prevState) => !prevState);
                        }}
                        placeHolder="Enter a name, id or email"
                    />
                    <div
                        onClick={() => navigate('new')}
                        className="flex cursor-pointer flex-row items-center gap-1 rounded-sm bg-black px-3 hover:bg-opacity-80"
                    >
                        <AddRounded className="!fill-white" />
                        <p className="whitespace-nowrap py-3 font-medium text-white">
                            Add a User
                        </p>
                    </div>
                </section>
            </header>

            <section className="my-8 flex w-full flex-col items-center gap-1 px-6">
                {loading ? (
                    <div className="spinner-circle spinner-lg overflow-hidden ![--spinner-color:var(--slate-12)]"></div>
                ) : allUsers.length <= 0 ? (
                    <section className="mt-20 flex h-full w-full flex-col items-center justify-center gap-4">
                        <div className=" w-fit rounded-full bg-light-grey/70 p-5 transition-all hover:bg-light-grey/100">
                            <img
                                src={emptyFolder}
                                alt="empty folder with magnifying glass"
                                srcSet=""
                                className="h-28 w-28  "
                            />
                        </div>

                        <p className="text-lg font-medium">No users found</p>
                    </section>
                ) : (
                    <section className="flex h-full w-full flex-col gap-10">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th className="!font-semibold">Id</th>
                                    <th className="!font-semibold">Name</th>
                                    <th className="!font-semibold">Email</th>
                                    <th className="!font-semibold">Interest</th>
                                    <th className="!font-semibold">Age</th>
                                    <th className="!font-semibold">Status</th>
                                    <th className="!font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers.map(
                                    ({
                                        _id,
                                        firstName,
                                        lastName,
                                        email,
                                        interest,
                                        dob,
                                        status,
                                    }) => {
                                        return (
                                            <tr key={`user-${_id}`}>
                                                <th>
                                                    <div className="flex w-fit flex-nowrap items-center gap-2">
                                                        <p
                                                            title={_id}
                                                            className="truncate "
                                                        >
                                                            {_id}
                                                        </p>
                                                        <Tooltip
                                                            title={
                                                                isCopied
                                                                    ? 'Copied'
                                                                    : 'Copy to clipboard'
                                                            }
                                                            arrow
                                                            placement="top"
                                                            componentsProps={{
                                                                tooltip: {
                                                                    sx: {
                                                                        backgroundColor:
                                                                            'black',
                                                                    },
                                                                },
                                                                arrow: {
                                                                    sx: {
                                                                        color: 'black',
                                                                    },
                                                                },
                                                            }}
                                                            slotProps={{
                                                                popper: {
                                                                    modifiers: [
                                                                        {
                                                                            name: 'offset',
                                                                            options:
                                                                                {
                                                                                    offset: [
                                                                                        0,
                                                                                        -12,
                                                                                    ],
                                                                                },
                                                                        },
                                                                    ],
                                                                },
                                                            }}
                                                        >
                                                            <Button
                                                                onClick={() =>
                                                                    handleCopyToClipBoard(
                                                                        _id
                                                                    )
                                                                }
                                                                onMouseLeave={() => {
                                                                    clearTimeout(
                                                                        timeoutRef.current
                                                                    );
                                                                    timeoutRef.current =
                                                                        setTimeout(
                                                                            () => {
                                                                                setCopied(
                                                                                    () =>
                                                                                        false
                                                                                );
                                                                            },
                                                                            200
                                                                        );
                                                                }}
                                                                style={{
                                                                    textTransform:
                                                                        'none',
                                                                    padding:
                                                                        '8px 0px',
                                                                }}
                                                            >
                                                                <ContentCopyRounded />
                                                            </Button>
                                                        </Tooltip>
                                                    </div>
                                                </th>
                                                <td>{`${firstName} ${lastName}`}</td>
                                                <td>{email}</td>
                                                <td>{interest}</td>
                                                <td>
                                                    {todayDate.diff(
                                                        dayjs(dob),
                                                        'y'
                                                    )}
                                                </td>

                                                <td>
                                                    <p
                                                        className={`w-full max-w-20 rounded-md p-1.5 ${status == 'active' ? 'bg-green-100' : 'bg-red-100'} text-center`}
                                                    >
                                                        {status}
                                                    </p>
                                                </td>

                                                <td>
                                                    <div className="flex flex-nowrap gap-2">
                                                        {/* <button type="button">View</button> */}

                                                        <motion.button
                                                            type="button"
                                                            initial={{
                                                                borderRadius:
                                                                    '8px',
                                                            }}
                                                            whileHover={{
                                                                // scale: 1.1,
                                                                borderRadius:
                                                                    '30px',

                                                                transition: {
                                                                    duration: 0.4,
                                                                },
                                                            }}
                                                            className={`w-full max-w-20 border-dashed p-2 outline-dashed outline-2 outline-offset-2  ${status == 'active' ? 'bg-red-300 outline-red-900  hover:bg-red-200' : 'bg-green-300  outline-green-900 hover:bg-green-200'}`}
                                                            onClick={() => {
                                                                setUserInfo(
                                                                    () => ({
                                                                        id: _id,
                                                                        status,
                                                                    })
                                                                );
                                                                setModalOpen(
                                                                    () => true
                                                                );
                                                            }}
                                                        >
                                                            <p>
                                                                {status ==
                                                                'active'
                                                                    ? 'Suspend'
                                                                    : 'Activate'}
                                                            </p>
                                                        </motion.button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                        <div className="flex w-full justify-end px-6">
                            <Pagination />
                        </div>
                    </section>
                )}
            </section>

            <Modal open={modalOpen} onClose={handleClose}>
                <BoxWithProps>
                    <CloseModalButton handleClick={handleClose} />
                    <section className="h-full w-full rounded-3xl  bg-white p-8">
                        <h1 className="font-EBGaramond text-3xl font-normal">
                            {userInfo?.status == 'active'
                                ? 'Suspend'
                                : 'Activate'}{' '}
                            Account
                        </h1>
                        <p className="mt-2 text-base">
                            {userInfo?.status == 'active'
                                ? `Suspending this account will prevent the customer
                                from logging in, placing orders, and accessing
                                account services, including order history and
                                personal information. They will also not receive
                                notifications or be able to submit support requests.`
                                : `Activating this account will restore the customer's ability to log in, place orders, and access all account services, including their order history and personal information. They will also begin receiving notifications and will be able to submit support requests. `}{' '}
                            Are you sure you want to proceed?
                        </p>{' '}
                        <div className="mt-10 flex flex-nowrap justify-between">
                            <BubbleButton
                                text={'Cancel'}
                                handleClick={handleClose}
                            />

                            <ThemeBtn
                                text={'Suspend'}
                                handleClick={handleStatus}
                                disabled={btnLoading}
                            >
                                {btnLoading ? (
                                    <div className="spinner-circle spinner-sm ![--spinner-color:255,255,255]"></div>
                                ) : (
                                    <span className=" relative !z-[1] w-full cursor-pointer text-base font-medium text-white">
                                        {userInfo?.status == 'active'
                                            ? 'Suspend'
                                            : 'Activate'}
                                    </span>
                                )}
                            </ThemeBtn>
                        </div>
                    </section>
                </BoxWithProps>
            </Modal>
        </section>
    );
}

export default All_Users;
