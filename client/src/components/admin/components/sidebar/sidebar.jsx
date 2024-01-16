import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './sidebar.scss';
import { useDarkMode } from '../../../../context/darkModeContext';
import glamo_icon from '../../../../../dist/assets/glamo-black-logo-61d90fbe.svg';

import shop_icon from '../../../../assets/icons/shop.png';
import axios from '../../../../api/axios';
import { v4 as uuidv4 } from 'uuid';

import optionsArray from './sideBarOption';
import {
    KeyboardDoubleArrowRightRounded,
    SearchOutlined,
} from '@mui/icons-material';
import { Tooltip } from '@mui/material';
function SideBar({ open, setOpen }) {
    const { darkMode, dispatch } = useDarkMode();
    const navigate = useNavigate();
    const logout = async () => {
        try {
            await axios.get('user/logout');
            navigate('/admin/login');
        } catch (error) {
            console.error('error while loginning out', error);
        }
    };

    const location = useLocation();

    const route = location?.pathname?.split('/').slice(0, 3).join('/');
    // .substring(1);

    return (
        <section
            className={`fixed left-0 top-0 flex h-screen w-full ${
                open ? 'max-w-56' : 'max-w-[3.875rem]'
            } flex-col`}
        >
            <section className="side-bar h-full w-full overflow-y-auto  border-r border-dark-gray/50 ">
                <div className="top my-5 flex pl-4">
                    <Link
                        to="/admin"
                        className="flex flex-row flex-nowrap items-center gap-2"
                    >
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black">
                            <img
                                src={shop_icon}
                                alt="shop icon"
                                className="h-5 w-5 invert"
                            />
                        </div>

                        {open && (
                            // <img
                            //     src={glamo_icon}
                            //     alt="glamo icon"
                            //     className="h-9 w-20 object-contain"
                            // />

                            <p className="font-gotham text-xl">glamo</p>
                        )}
                    </Link>
                </div>
                <div className="center w-full">
                    <ul>
                        <div className="flex flex-row flex-nowrap items-center gap-3 py-2 hover:bg-light-grey">
                            <Tooltip
                                arrow
                                title={`${open ? '' : 'Search'}`}
                                placement="right"
                                className="!m-0 flex !w-full flex-row flex-nowrap items-center pl-4 !font-normal"
                                slotProps={{
                                    popper: {
                                        modifiers: [
                                            {
                                                name: 'offset',
                                                options: {
                                                    offset: [0, -3],
                                                },
                                            },
                                        ],
                                    },
                                }}
                            >
                                <SearchOutlined className="!text-[30px]" />
                                <p className='ml-3'>Search</p>
                            </Tooltip>
                        </div>
                        {optionsArray.map(({ link, title, icon }) => {
                            return (
                                <Link
                                    key={title}
                                    to={link || '/admin'}
                                    className={`w-full py-2 ${
                                        route == link ? 'bg-light-grey' : ''
                                    }`}
                                >
                                    {' '}
                                    <Tooltip
                                        arrow
                                        title={`${open ? '' : title}`}
                                        placement="right"
                                        className="!m-0 flex !w-full flex-row flex-nowrap items-center pl-4 !font-normal"
                                        slotProps={{
                                            popper: {
                                                modifiers: [
                                                    {
                                                        name: 'offset',
                                                        options: {
                                                            offset: [0, -3],
                                                        },
                                                    },
                                                ],
                                            },
                                        }}
                                    >
                                        {icon}
                                        {open && (
                                            <p className="ml-3">{title}</p>
                                        )}
                                    </Tooltip>
                                </Link>
                            );
                        })}

                        {/* <button
                            type="button"
                            className="py-2 pl-4"
                            onClick={logout}
                        >
                            <LogoutOutlinedIcon className="icons" />
                            <span>Logout</span>
                        </button> */}
                    </ul>
                </div>{' '}
            </section>
            <div
                className={`${
                    open ? 'flex-row pl-4' : 'flex-col justify-center'
                } flex w-full  flex-nowrap items-center border border-dark-gray/50 `}
            >
                <div
                    className={`${
                        !open
                            ? 'w-full justify-center border-b border-dark-gray/50'
                            : 'border-none'
                    } left flex flex-row flex-nowrap items-center gap-3 py-3`}
                >
                    <div className="h-6 w-6 rounded-full bg-black"></div>
                    {open && <p className="text-xs">Kevin Jean</p>}
                </div>
                <div
                    onClick={() => setOpen((prevState) => !prevState)}
                    className={`cursor-pointer py-3 ${
                        open
                            ? 'right ml-auto border-l px-2'
                            : 'h-full w-full text-center'
                    }`}
                >
                    <KeyboardDoubleArrowRightRounded
                        className={`cursor-pointer ${
                            open ? '!rotate-180' : ''
                        } `}
                    />
                </div>
            </div>
        </section>
    );
}

export default SideBar;
