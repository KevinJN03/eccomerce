import SideBar from '../sidebar/sidebar.jsx';
import Navbar from '../navbar/navbar.jsx';
import './list.scss';
import '../sidebar/sidebar.scss';
import Datatable from './datatable/datatable.jsx';
import DragDropFile from '../product/new product/dragDropFile.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios, { adminAxios } from '../../../../api/axios.js';
import { userColumn } from './datatable/datatable-source.jsx';
import actionColumn from './datatable/actionColumn.jsx';
import { useAdminContext } from '../../../../context/adminContext.jsx';
import SearchInput from '../../order/home/searchInput.jsx';
import { AddRounded, ContentCopyRounded } from '@mui/icons-material';
import dayjs from 'dayjs';
import { Button, Modal, Pagination, Toolbar, Tooltip } from '@mui/material';
import { useContent } from '../../../../context/ContentContext.jsx';

import emptyFolder from '../../../../assets/icons/empty-folder (1).png';
import BoxWithProps, {
    CloseModalButton,
} from '../../../common/BoxwithProps.jsx';
import BubbleButton from '../../../buttons/bubbleButton.jsx';
import ThemeBtn from '../../../buttons/themeBtn.jsx';
function All_Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selection, setSelection] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [todayDate, setTodayDate] = useState(dayjs());

    const [isCopied, setCopied] = useState(false);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();
    const abortControllerRef = useRef(new AbortController());
    const { allUsers, logoutUser, setAllUsers } = useAdminContext();
    const [modalOpen, setModalOpen] = useState(!false);
    const { setShowAlert } = useContent();

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);
    // useEffect(() => {
    //     adminAxios
    //         .get('/user/all')
    //         .then((res) => {
    //             if (res.status == 200) {
    //                 setUsers(res.data);
    //             }
    //         })
    //         .catch((error) => {
    //             'error at fetchng users in admin', error;
    //         });
    // }, [loading]);

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
            setLoading(() => true);
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            const { data } = await adminAxios.get(
                `user/search?searchText=${searchText}`
            );
            setAllUsers(() => data.result);
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

    const handleCopyToClipBoard = (id) => {
        navigator.clipboard.writeText(id);
        setCopied(() => true);
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
                        handleClick={handleSearchText}
                        placeHolder="Enter a title, id"
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

            <section className="my-8 flex w-full flex-col items-center gap-10 overflow-x-auto px-6">
                {loading ? (
                    <div className="flex w-full justify-center">
                        <div class="spinner-circle ![--spinner-color:var(--gray-9)]"></div>
                    </div>
                ) : allUsers.length <= 0 ? (
                    <section className="mt-20 flex h-full w-full flex-col items-center justify-center gap-4">
                        <div className=" w-fit rounded-full bg-light-grey/70 p-5 transition-all hover:bg-light-grey/100">
                            <img
                                src={emptyFolder}
                                alt="empty folder with magnifying glass"
                                srcset=""
                                className="h-28 w-28  "
                            />
                        </div>

                        <p className="text-lg font-medium">No users found</p>
                    </section>
                ) : (
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Interest</th>
                                <th>Age</th>
                                <th>Status</th>
                                <th>Action</th>
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
                                                            // sx={{
                                                            //     width: '20px !important',
                                                            // }}

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

                                            <td>{status}</td>

                                            <td>
                                                <div className="flex flex-nowrap gap-2">
                                                    {/* <button type="button">View</button> */}
                                                    <button
                                                        type="button"
                                                        className="rounded-lg bg-red-100 p-2 transition-all hover:bg-red-200"
                                                        onClick={() =>
                                                            setModalOpen(
                                                                () => true
                                                            )
                                                        }
                                                    >
                                                        Suspend
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                )}

                <div className="flex w-full justify-end px-6">
                    <Pagination />
                </div>
            </section>

            <Modal open={modalOpen} onClose={() => setModalOpen(() => false)}>
                <BoxWithProps>
                    <CloseModalButton
                        handleClick={() => {
                            setModalOpen(() => false);
                        }}
                    />
                    <section className="h-full w-full rounded-3xl  bg-white p-8">
                        <h1 className="font-EBGaramond text-3xl font-normal">
                            Suspend Account{' '}
                        </h1>
                        <p className="mt-2 text-base">
                            Suspending this account will prevent the customer
                            from logging in, placing orders, and accessing
                            account services, including order history and
                            personal information. They will also not receive
                            notifications or be able to submit support requests.
                            Are you sure you want to proceed?
                        </p>{' '}
                        <div className="mt-10 flex flex-nowrap justify-between">
                            <BubbleButton
                                text={'Cancel'}
                                handleClick={() => setModalOpen(() => false)}
                            />

                            <ThemeBtn text={'Suspend'} handleClick={() => {}} />
                        </div>
                    </section>
                </BoxWithProps>
            </Modal>
        </section>
    );
}

export default All_Users;
