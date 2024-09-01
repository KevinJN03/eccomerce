import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './sidebar.scss';
import { useDarkMode } from '../../../../context/darkModeContext';

import shop_icon from '../../../../assets/icons/shop.png';
import axios from '../../../../api/axios';
import { v4 as uuidv4 } from 'uuid';

import optionsArray from './sideBarOption';
import {
    ArrowDropUpSharp,
    ArrowForwardIos,
    KeyboardArrowRightRounded,
    KeyboardDoubleArrowRightRounded,
    SearchOutlined,
} from '@mui/icons-material';
import {
    Box,
    ClickAwayListener,
    Fade,
    Paper,
    Slide,
    Tooltip,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import SearchSideBar from './searchSideBar';
import { useContent } from '../../../../context/ContentContext';
import { useState } from 'react';
import { delay } from 'lodash';
import comingSoonIcon from '../../../../assets/icons/coming-soon.png';
import AdditionalSideBar from './addditonalSideBar';
function SideBar({}) {
    const { darkMode, dispatch } = useDarkMode();

    const [showAction, setShowAction] = useState(false);
    const navigate = useNavigate();
    const logout = async () => {
        try {
            await axios.get('user/logout');
            navigate('/admin/login');
        } catch (error) {
            console.error('error while loginning out', error);
        }
    };
    const {
        setOpenSearch,
        open,
        setOpen,
        additionalSideBar,
        setAdditionalSideBar,
    } = useContent();

    const location = useLocation();

    const route = location?.pathname?.split('/').slice(0, 3).join('/');

    // .substring(1);

    const variant = {
        section: {
            initial: {
                maxWidth: open ? '15rem' : '5rem',
            },
            animate: {
                maxWidth: open ? '15rem' : '5rem',
                transition: {
                    duration: 0.7,
                    // ease: 'easeInOut',

                    // delay: '0.3'
                },
            },
        },

        p: {
            initial: {
                opacity: 0,
            },
            animate: {
                opacity: 1,
                transition: {
                    duration: 0.7,
                },
            },
            exit: {
                opacity: 0,
                transition: {
                    duration: 0.7,
                },
            },
        },
    };

    return (
        <section className="fixed left-0 z-[1] w-screen ">
            <Box
                sx={{
                    zIndex: (theme) => {
                        return theme.zIndex.drawer + 1;
                    },
                }}
            >
                <motion.section
                    variants={variant.section}
                    animate={'animate'}
                    initial={'initial'}
                    className={`fixed left-0 top-0 z-[inherit]  flex h-screen !w-full flex-col  !bg-white`}
                    onAnimationStart={(animation, e) => {
                        setOpenSearch(() => false);
                    }}
                >
                    {/* overflow-y-scroll */}
                    <section className="side-bar !relative h-full w-full overflow-y-auto  overflow-x-hidden border-r border-dark-gray/50 ">
                        {open && <AdditionalSideBar />}
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
                                <AnimatePresence>
                                    {open && (
                                        <motion.p
                                            variants={variant.p}
                                            initial={'initial'}
                                            animate={'animate'}
                                            exit={'exit'}
                                            className="font-gotham text-xl"
                                        >
                                            glamo
                                        </motion.p>
                                    )}
                                </AnimatePresence>
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

                                        <AnimatePresence>
                                            {open && (
                                                <motion.p
                                                    variants={variant.p}
                                                    initial={'initial'}
                                                    animate={'animate'}
                                                    exit={'exit'}
                                                    className="ml-3"
                                                >
                                                    Search
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </Tooltip>
                                </div>
                                {optionsArray.map(
                                    ({
                                        link,
                                        title,
                                        icon,
                                        coming_soon,
                                        additional,
                                    }) => {
                                        return (
                                            <button
                                                type="button"
                                                key={title}
                                                className={`w-full py-2 ${
                                                    route == link
                                                        ? 'bg-light-grey'
                                                        : ''
                                                }`}
                                                onClick={() => {
                                                    if (additional) {
                                                        setAdditionalSideBar(
                                                            () => ({
                                                                ...additional,
                                                                on: true,
                                                            })
                                                        );
                                                    } else {
                                                        navigate(
                                                            link || '/admin'
                                                        );
                                                    }
                                                }}
                                            >
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
                                                                        offset: [
                                                                            0,
                                                                            -3,
                                                                        ],
                                                                    },
                                                                },
                                                            ],
                                                        },
                                                    }}
                                                >
                                                    {icon}
                                                    <AnimatePresence>
                                                        {' '}
                                                        <div className="flex w-full flex-nowrap justify-between">
                                                            {open && (
                                                                <motion.p
                                                                    variants={
                                                                        variant.p
                                                                    }
                                                                    initial={
                                                                        'initial'
                                                                    }
                                                                    animate={
                                                                        'animate'
                                                                    }
                                                                    exit={
                                                                        'exit'
                                                                    }
                                                                    className="ml-3 whitespace-nowrap"
                                                                >
                                                                    {title}

                                                                    {coming_soon && (
                                                                        <span className="inline-block  !font-medium !text-red-600">
                                                                            Not
                                                                            Yet!
                                                                            🚧
                                                                        </span>
                                                                    )}
                                                                </motion.p>
                                                            )}

                                                            {additional && (
                                                                <button
                                                                    type="button"
                                                                    className=" !w-fit pr-4"
                                                                >
                                                                    <KeyboardArrowRightRounded fontSize="small" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </AnimatePresence>
                                                </Tooltip>
                                            </button>
                                        );
                                    }
                                )}

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

                    <motion.div
                        // justifyContent: open ? 'center' : 'flex-start',
                        //${open ? '1rem flex-row' : '0rem !flex-col '}
                        className={`relative flex w-full items-center gap-3 border border-dark-gray/50 ${
                            open ? '!flex-row' : '!flex-col'
                        } `}
                    >
                        {showAction && (
                            <ClickAwayListener
                                onClickAway={() => setShowAction(() => false)}
                            >
                                <div className="show-action absolute bottom-16 left-3 flex flex-col rounded-md border border-dark-gray/50 bg-white py-3">
                                    {[
                                        {
                                            text: 'Account Information',
                                        },
                                        {
                                            text: 'Your Profile',
                                        },
                                        {
                                            text: 'Logout',
                                            handleClick: logout,
                                        },
                                    ].map(({ text, handleClick }) => {
                                        return (
                                            <button
                                                onClick={handleClick}
                                                className={`px-5 py-3 hover:bg-dark-gray/30`}
                                            >
                                                <p className="text-left  text-s">
                                                    {text}
                                                </p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </ClickAwayListener>
                        )}
                        <div
                            className={`border-b border-dark-gray/50 py-2 ${
                                open ? ' !min-h-8 ml-4 !min-w-8' : 'w-full'
                            } flex items-center justify-center `}
                        >
                            <img
                                className="h-8 w-8  rounded-full object-cover"
                                src="https://aws-glamo-upload-bucket.s3.eu-west-2.amazonaws.com/products/65678b9cd4593491cfa021c3/primary.png"
                                alt=""
                            />
                        </div>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: {
                                        duration: 0.1,
                                        delay: 0.7,
                                    },
                                }}
                                exit={{ opacity: 0 }}
                                onClick={() =>
                                    setShowAction((prevState) => !prevState)
                                }
                                className="flex w-full cursor-pointer flex-row flex-nowrap items-center justify-between"
                            >
                                <p className="whitespace-nowrap text-xs">
                                    Kevin Jean
                                </p>

                                <ArrowDropUpSharp />
                            </motion.div>
                        )}

                        <motion.div
                            key={open}
                            initial={{ opacity: 1 }}
                            animate={{
                                rotate: open ? '180deg' : '0deg',
                                opacity: [0, 1],
                                transition: {
                                    opacity: {
                                        duration: 0.7,
                                    },
                                    rotate: {
                                        delay: 0.7,
                                    },
                                },
                            }}
                            onClick={() => setOpen((prevState) => !prevState)}
                            className={`!w-fit max-w-fit cursor-pointer px-3 py-2
                        
                      
                        
                        `}
                        >
                            <KeyboardDoubleArrowRightRounded
                                className={`cursor-pointer  `}
                            />
                        </motion.div>
                    </motion.div>
                </motion.section>{' '}
            </Box>

            {!open && <AdditionalSideBar closed={true} />}

            <SearchSideBar />
        </section>
    );
}

export default SideBar;
