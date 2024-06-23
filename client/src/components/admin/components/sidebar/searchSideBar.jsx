import { AnimatePresence, motion } from 'framer-motion';
import { useContent } from '../../../../context/ContentContext';
import { ArrowForward, ArrowForwardIos, CloseSharp } from '@mui/icons-material';
import { useEffect, useState, useRef } from 'react';
import SearchInput from '../../order/home/searchInput';
import search_icon from './search_icon.png';
import UserLogout from '../../../../hooks/userLogout';
import { adminAxios } from '../../../../api/axios';
import _ from 'lodash';
import {
    Backdrop,
    Box,
    Collapse,
    Drawer,
    Fade,
    Paper,
    Slide,
} from '@mui/material';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@mui/styles';
import StyledBackdrop from './styledBackdrop';
import StyledPaper from './styledPaper';
import OptionSelection from '../../order/home/optionSelection.jsx';
import { useClickAway } from '@uidotdev/usehooks';
function SearchSideBar({}) {
    const { openSearch, setOpenSearch, open } = useContent();
    const [option, setOption] = useState('shop_manger');
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [results, setResults] = useState({
        listings: [],
        orders: [],
    });

    const [firstSearch, setFirstSearch] = useState(true);
    const { logoutUser } = UserLogout();
    const abortControllerRef = useRef(new AbortController());
    const timeoutRef = useRef(null);
    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef?.current);
            abortControllerRef.current?.abort();
        };
    }, []);

    // const StyledBackdrop = withStyles({
    //     root: {
    //         zIndex: 1200
    //         // zIndex: (theme)=> console.log({theme})
    //     },
    // })(Backdrop);

    const variants = {
        overlay: {
            initial: {
                left: open ? '14rem' : '5rem',
            },
            animate: {
                left: open ? '14rem' : '5rem',
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

    const handleClick = async () => {
        try {
            setLoading(() => true);
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            const [{ data: productResult }, { data: orderResult }] =
                await Promise.all([
                    adminAxios.get(
                        `product/search?searchText=${searchText}`,

                        { signal: abortControllerRef.current?.signal }
                    ),

                    adminAxios.post(
                        `searchOrder`,
                        {
                            searchText,
                            limit: 50,
                            page: 1,
                        },

                        { signal: abortControllerRef.current.signal }
                    ),
                ]);
            setResults(() => ({
                listings: productResult,
                orders: _.get(orderResult, 'searchResult'),
                totalCount:
                    _.get(productResult, 'result.length') +
                    _.get(orderResult, 'searchResult.length'),
            }));

            setFirstSearch(() => false);
        } catch (error) {
            logoutUser({ error });
        } finally {
            timeoutRef.current = setTimeout(() => {
                setLoading(() => false);
            }, 1000);
        }
    };

    const closeSideBar = () => {
        setOpenSearch(() => false);
    };

    const clickAwayRef = useClickAway(() => {
        closeSideBar();
    });
    return (
        <StyledBackdrop
            open={openSearch}
            sx={{
                width: '100%',
            }}
            style={{
                left: open ? '15rem' : '5rem',
            }}
        >
            <Slide
                in={openSearch}
                mountOnEnter
                unmountOnExit
                direction="right"
                timeout={{ enter: 300, exit: 300, appear: 300 }}
            >
                <StyledPaper ref={clickAwayRef}>
                    <button
                        type="button"
                        id="close-search-button"
                        className="absolute right-[-3.5rem] top-3 cursor-pointer rounded border-2 border-transparent p-1 focus:border-white active:border-white"
                        onClick={() => setOpenSearch(() => false)}
                    >
                        <CloseSharp className="!fill-white" fontSize="large" />
                    </button>
                    <section className="relative flex h-full min-h-screen min-w-full flex-row">
                        <div className="flex h-full min-h-screen min-w-full flex-col overflow-y-auto ">
                            <div className="p-5">
                                <SearchInput
                                    handleOnchange={(e) => {
                                        setSearchText(e.target.value);
                                    }}
                                    searchText={searchText}
                                    handleClick={handleClick}
                                    placeHolder="Enter a title, id"
                                    className={'h-10'}
                                />
                            </div>

                            <div className="subheader w-full px-5">
                                <OptionSelection
                                    status={option}
                                    setStatus={setOption}
                                    textClassName={'text-sm'}
                                    options={[
                                        {
                                            text: 'Shop Manager',
                                            amount: results.totalCount,
                                            select: 'shop_manger',
                                            showAmount: true,
                                        },
                                        {
                                            text: 'Glamo Marketplace',
                                            amount: 0,
                                            select: 'glamo_marketplace',
                                            showAmount: true,
                                        },
                                    ]}
                                />
                            </div>

                            {loading ? (
                                <div className="flex w-full justify-center py-14">
                                    <span className="daisy-loading daisy-loading-spinner daisy-loading-lg text-black"></span>
                                </div>
                            ) : firstSearch ? (
                                <div className="mt-6 flex w-full flex-col items-center justify-center self-center pt-5">
                                    <img src={search_icon} />

                                    <p className="w-6/12 text-center text-dark-gray">
                                        Search across your order, listing and
                                        settings
                                    </p>
                                </div>
                            ) : (
                                <section className="flex flex-col gap-2 px-8 py-6">
                                    {option == 'shop_manger' ? (
                                        <>
                                            {[
                                                {
                                                    title: 'LISTING',
                                                    result: _.get(
                                                        results,
                                                        'listings.result'
                                                    ),
                                                    dateField: 'timestamp',
                                                },
                                                {
                                                    title: 'ORDER',
                                                    result: results.orders,
                                                    dateField: 'createdAt',
                                                },
                                            ].map(
                                                ({
                                                    title,
                                                    result,
                                                    dateField,
                                                }) => {
                                                    return (
                                                        <div>
                                                            <div className="group mb-2 flex flex-row flex-nowrap items-center">
                                                                <Link
                                                                    to={
                                                                        title ==
                                                                        'ORDER'
                                                                            ? `/admin/orders/complete?searchText=${searchText}`
                                                                            : `/admin/products?searchText=${searchText}`
                                                                    }
                                                                    onClick={
                                                                        closeSideBar
                                                                    }
                                                                    className="cursor-pointer pr-1 text-sm font-medium text-black/90 underline underline-offset-1 group-hover:text-black/70"
                                                                >
                                                                    {`${result?.length || 0} ${title}${result?.length > 1 ? 'S' : ''}`}
                                                                </Link>

                                                                <ArrowForwardIos className="cursor-pointer !text-xs group-hover:fill-black/70" />
                                                            </div>

                                                            {result?.length >
                                                            0 ? (
                                                                <section className="flex w-full flex-col gap-3 ">
                                                                    {result.map(
                                                                        ({
                                                                            _id,
                                                                            status,
                                                                            ...element
                                                                        }) => {
                                                                            return (
                                                                                <Link
                                                                                    onClick={
                                                                                        closeSideBar
                                                                                    }
                                                                                    to={
                                                                                        title ==
                                                                                        'ORDER'
                                                                                            ? `/admin/orders/${status == 'received' ? 'new' : 'complete'}?orderId=${_id}`
                                                                                            : `/admin/products/edit/${_id}`
                                                                                    }
                                                                                    key={`resultItem-${_id}`}
                                                                                    className="flex w-full flex-nowrap gap-6 rounded border border-dark-gray p-3"
                                                                                >
                                                                                    <div className="left relative !h-20  w-full max-w-20">
                                                                                        {title ==
                                                                                        'ORDER' ? (
                                                                                            <>
                                                                                                {_.get(
                                                                                                    element,
                                                                                                    'items'
                                                                                                )?.map(
                                                                                                    (
                                                                                                        {
                                                                                                            images,
                                                                                                        },
                                                                                                        idx
                                                                                                    ) => {
                                                                                                        return (
                                                                                                            <img
                                                                                                                src={
                                                                                                                    images?.[0]
                                                                                                                }
                                                                                                                key={`${_id}-images-${idx}`}
                                                                                                                className={`${idx == 0 ? 'left-0 z-[2]' : 'left-2 z-0 opacity-70'}  absolute top-0 h-full w-20 object-cover`}
                                                                                                            ></img>
                                                                                                        );
                                                                                                    }
                                                                                                )}
                                                                                            </>
                                                                                        ) : (
                                                                                            <img
                                                                                                src={_.get(
                                                                                                    element,
                                                                                                    'images.0'
                                                                                                )}
                                                                                                key={`${_id}-images`}
                                                                                                className={`h-full w-20 object-cover`}
                                                                                            />
                                                                                        )}
                                                                                    </div>
                                                                                    <div className="right flex w-full flex-col gap-1">
                                                                                        <p className="text-sm">
                                                                                            {title ==
                                                                                            'LISTING'
                                                                                                ? _.get(
                                                                                                      element,
                                                                                                      'title'
                                                                                                  )
                                                                                                : _.get(
                                                                                                      element,
                                                                                                      'items.0.title'
                                                                                                  )}
                                                                                        </p>

                                                                                        <p className="text-xs">
                                                                                            {title ==
                                                                                            'ORDER'
                                                                                                ? `${_.get(element, 'customer.firstName')} ${_.get(element, 'customer.lastName')}`
                                                                                                : dayjs(
                                                                                                      _.get(
                                                                                                          element,
                                                                                                          dateField
                                                                                                      )
                                                                                                  ).format(
                                                                                                      'DD MMM, YYYY'
                                                                                                  )}
                                                                                        </p>

                                                                                        <p className="flex w-full flex-nowrap justify-between text-xs ">
                                                                                            {title ==
                                                                                            'ORDER'
                                                                                                ? dayjs(
                                                                                                      _.get(
                                                                                                          element,
                                                                                                          dateField
                                                                                                      )
                                                                                                  ).format(
                                                                                                      'DD MMM, YYYY'
                                                                                                  )
                                                                                                : `${_.get(element, 'additional_data.stock.total')} in stock`}

                                                                                            <span className="border-l-2 border-dark-gray pl-1 text-right text-xs font-semibold">
                                                                                                {title ==
                                                                                                'ORDER'
                                                                                                    ? `#${_id}`
                                                                                                    : `£${parseFloat(
                                                                                                          _.get(
                                                                                                              element,
                                                                                                              'additional_data.price.min'
                                                                                                          )
                                                                                                      ).toFixed(
                                                                                                          2
                                                                                                      )} GBP`}
                                                                                            </span>
                                                                                        </p>
                                                                                    </div>
                                                                                </Link>
                                                                            );
                                                                        }
                                                                    )}
                                                                </section>
                                                            ) : (
                                                                <p>
                                                                    No results
                                                                </p>
                                                            )}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </>
                                    ) : (
                                        <section className="flex flex-col gap-4">
                                            <p className="text-sm font-semibold">
                                                SEARCH{' '}
                                                {_.toUpper(
                                                    import.meta.env.VITE_WEBSITE
                                                )}
                                            </p>
                                            <a className="text-sm underline underline-offset-1">
                                                Search{' '}
                                                {_.upperFirst(
                                                    import.meta.env.VITE_WEBSITE
                                                )}{' '}
                                                for{' '}
                                                {`"${_.get(results, 'listings.searchText')}"`}
                                            </a>

                                            <p className="text-sm font-semibold">
                                                0 SEARCH SUGGESTIONS
                                            </p>
                                        </section>
                                    )}
                                </section>
                            )}
                        </div>
                    </section>
                </StyledPaper>
            </Slide>
        </StyledBackdrop>
    );
}

export default SearchSideBar;
