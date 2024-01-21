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
import { AnimatePresence, motion } from 'framer-motion';
import SearchSideBar from './searchSideBar';
import { useContent } from '../../../../context/ContentContext';
function SideBar({}) {
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
    const { setOpenSearch, open, setOpen } = useContent();

    const location = useLocation();

    const route = location?.pathname?.split('/').slice(0, 3).join('/');
    // .substring(1);

    const variant = {
        initial: {
            maxWidth: open ? '14rem' : '3.875rem',
        },
        animate: {
            maxWidth: open ? '14rem' : '3.875rem',
            transition: {
                duration: 0.7,
                // ease: 'easeInOut',
            },
        },
    };
    return (
        <section className="fixed left-0 z-[2] w-screen">
            <motion.section
                variants={variant}
                animate={'animate'}
                initial={'initial'}
                className={`fixed left-0 top-0 z-[3] flex h-screen w-full ${
                    open ? 'max-w-56' : 'max-w-[3.875rem]'
                } flex-col`}
            >
                <section className="side-bar h-full w-full overflow-y-auto overflow-x-hidden  border-r border-dark-gray/50 ">
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
                                <p className="font-gotham text-xl">glamo</p>
                            )}
                        </Link>
                    </div>
                    <div className="center w-full">
                        <ul>
                            <div
                                onClick={() =>
                                    setOpenSearch((prevState) => !prevState)
                                }
                                className="flex flex-row flex-nowrap items-center gap-3 py-2 hover:bg-light-grey"
                            >
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
                                    <p className="ml-3">Search</p>
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
                                            <AnimatePresence>
                                                {open && (
                                                    <motion.p
                                                        initial={{
                                                            opacity: 0,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            transition: {
                                                                duration: 0.7,
                                                            },
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            transition: {
                                                                duration: 0.7,
                                                            },
                                                        }}
                                                        className="ml-3 whitespace-nowrap"
                                                    >
                                                        {title}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
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

                {/* 

                   animate={{
                        flexDirection: open ? 'row' : 'col',
                        paddingLeft: open ? '1rem' : '0rem',
                        justifyContent: open ? 'center' : 'flex-start',
                    }}

                      ${
                        open ? 'flex-row pl-4' : 'flex-col justify-center'
                    } 

                 */}
                <motion.div
                    key={open}
                    animate={{
                        flexDirection: open ? 'row' : 'col',
                        paddingLeft: open ? '1rem' : '0rem',
                        justifyContent: open ? 'center' : 'flex-start',
                    }}
                    className={`
                    
                    
                   
                    
                    
                    flex w-full  flex-nowrap items-center border border-dark-gray/50 `}
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
                </motion.div>
            </motion.section>{' '}
            <SearchSideBar />
        </section>
    );
}

export default SideBar;
