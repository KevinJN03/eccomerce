import { AnimatePresence, motion } from 'framer-motion';
import { useContent } from '../../../../context/ContentContext';
import { CloseSharp } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import SearchInput from '../../order/home/searchInput';
import search_icon from './search_icon.png';
function SearchSideBar({}) {
    const { openSearch, setOpenSearch, open } = useContent();
    const [searchText, setSearchText] = useState('');
    // useEffect(() => {
    //     setOpenSearch(() => false);
    // }, [open]);

    const variants = {
        overlay: {
            initial: {
                left: open ? '14rem' : '3.875rem',
            },
            animate: {
                left: open ? '14rem' : '3.875rem',
                transition: {
                    duration: 0.7,

                    ease: 'easeInOut',
                },
            },
            // exit: {
            //   opacity: 1,
            //     transition: {
            //         delay: 1,
            //     },
            // },
        },

        container: {
            initial: {
                translateX: '-100%',
            },
            animate: {
                translateX: 0,
                transition: {
                    duration: 0.5,
                    ease: 'easeIn',
                },
            },
            exit: {
                translateX: '-100%',
                transition: {
                    duration: 0.2,
                    ease: 'easeOut',
                },
            },
        },
    };
    return (
        <AnimatePresence mode="wait">
            {openSearch && (
                <motion.section
                    variants={variants.overlay}
                    animate={'animate'}
                    initial={'initial'}
                    exit={'exit'}
                    className={`absolute top-0 flex h-screen w-full min-w-full max-w-fit flex-row !bg-black/30 `}
                >
                    {/* <AnimatePresence> */}
                    <motion.section
                        variants={variants.container}
                        animate={'animate'}
                        initial={'initial'}
                        exit={'exit'}
                        className="flex w-full max-w-md flex-row"
                    >
                        <div className="flex h-screen w-full max-w-md flex-col bg-white p-5">
                            <SearchInput
                                searchText={searchText}
                                setSearchText={setSearchText}
                                handleClick={() => console.log('hi')}
                                placeHolder="Enter a title, id"
                            />

                            {/* <div className="divider"></div> */}

                            <div className="mt-14 flex w-full flex-col items-center justify-center self-center border-t pt-5">
                                <img src={search_icon} />

                                <p className="w-6/12 text-center text-dark-gray">
                                    Search accros your order, listing and
                                    settings
                                </p>
                            </div>
                        </div>
                        <div
                            className="cursor-pointer p-2"
                            onClick={() => setOpenSearch(() => false)}
                        >
                            <CloseSharp className="!fill-white" />
                        </div>
                    </motion.section>
                    {/* </AnimatePresence> */}
                </motion.section>
            )}
        </AnimatePresence>
    );
}

export default SearchSideBar;
