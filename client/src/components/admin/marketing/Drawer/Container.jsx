import { Fragment, useEffect, useRef, useState } from 'react';
import ThemeBtn from '../../../buttons/themeBtn';
import CopyLink from '../copyLink';
import { adminAxios } from '../../../../api/axios';
import { useSalesDiscountContext } from '../../../../context/SalesDiscountContext';
import { useAdminContext } from '../../../../context/adminContext';
import dayjs from 'dayjs';
import _ from 'lodash';
import Table from '../table';
import { Box, Modal, Slide } from '@mui/material';
import BoxWithProps from '../../../common/BoxwithProps';
import SelectedListings from '../selectedListings';
import { useOfferContext } from '../../../../context/offerContext';
const { VITE_WEBSITE } = import.meta.env;

function Container({}) {
    const {
        searchParams,

        dateFormat,
        categories,
        categoriesMap,
    } = useSalesDiscountContext();
    const { logoutUser } = useAdminContext();

    const abortControllerRef = useRef(new AbortController());
    const timeoutRef = useRef(null);
    const [chosenMap, setChosenMap] = useState(new Map());
    const [count, setCount] = useState(0);
    const [openListingsModal, setOpenListingsModal] = useState(false);

    const {
        details,
        setDetails,
        generateDiscountText,
        chosenListings,
        setChosenListings,
        btnLoading: loading,
        setBtnLoading: setLoading,
        setListingIdsSet,
    } = useOfferContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(() => true);
                const { data } = await adminAxios.get(
                    `offers/${searchParams.get('offer')}`,
                    {
                        signal: abortControllerRef.current?.signal,
                    }
                );

                setDetails(() => data[0]);

                const newChosenListings = [];

                const newChosenMap = new Map();

                const newListingIdSet = new Set();

                data[0]?.listings.forEach((element) => {
                    newListingIdSet.add(element._id);
                    if (newChosenMap.has(element.category)) {
                        const getMapItem = _.cloneDeep(
                            newChosenMap.get(element.category)
                        );

                        getMapItem.listings.push(element);

                        newChosenMap.set(element.category, getMapItem);
                    } else {
                        const getMapItem = categoriesMap.get(element.category);

                        newChosenMap.set(element.category, {
                            ...getMapItem,
                            listings: [element],
                        });
                    }
                });
                setListingIdsSet(() => newListingIdSet);
                setChosenMap(() => newChosenMap);
                clearTimeout(timeoutRef.current);

                timeoutRef.current = setTimeout(() => {
                    setLoading(() => false);
                }, 500);
            } catch (error) {
                console.error(error.message, error);
                logoutUser({ error });
            } finally {
                // clearTimeout(timeoutRef.current);
                // timeoutRef.current = setTimeout(() => {
                //     setLoading(() => false);
                // }, 500);
            }
        };

        fetchData();
        return () => {
            abortControllerRef.current?.abort();
            clearTimeout(timeoutRef.current);
        };
    }, []);

    useEffect(() => {
        let newCount = 0;
        setChosenListings(() =>
            Array.from(chosenMap, ([name, value]) => {
                newCount += value.listings?.length;
                return { _id: name, ...value };
            })
        );
        setCount(() => newCount);
    }, [chosenMap]);

    const isActive =
        dayjs.unix(details?.start_date).diff(dayjs(), 'minute') <= 0;
    return (
        <section className="flex h-full flex-col bg-white p-5">
            {loading ? (
                <div className="spinner-circle spinner-lg mt-12 self-center ![--spinner-color:var(--slate-12)]"></div>
            ) : (
                <Fragment>
                    <header>
                        <p className="text-black/70">Promo code</p>

                        <h2 className="mt-2 flex items-center gap-3 text-3xl font-semibold">
                            {details?.code}{' '}
                            <span
                                className={`rounded-full ${isActive ? 'bg-green-100' : 'bg-dark-gray/50'} px-2 py-1 text-xs font-light tracking-wide`}
                            >
                                {isActive ? 'Active' : 'Scheduled'}
                            </span>
                        </h2>

                        <div className="mt-7">
                            <h3 className="text-2xl font-semibold">
                                Your offer
                            </h3>
                            <div>
                                <p className="text-base">
                                    Discount: {generateDiscountText(details)}
                                </p>
                                <p className="text-base">
                                    Promo code:{' '}
                                    <span className="font-semibold">
                                        {details?.code}
                                    </span>
                                </p>
                                <p className="text-base">
                                    {dayjs
                                        .unix(details?.start_date)
                                        .utc()
                                        .format(
                                            `[${isActive ? 'Active since' : 'Starts on'}:] ${dateFormat} ${isActive ? 'HH:mm' : ''}`
                                        )}
                                </p>
                            </div>
                        </div>
                    </header>
                    <body>
                        <div className="mt-4 flex flex-col gap-2">
                            <p className="text-lg font-semibold">Share</p>
                            <CopyLink
                                url={`https://${VITE_WEBSITE}?coupon=Save20`}
                            />
                        </div>

                        <div className="mt-12">
                            <p className="mb-4">For all time</p>
                            <div className="flex flex-row justify-between border  border-dark-gray px-8 py-8">
                                <div className="left">
                                    <p className="text-xl font-semibold">
                                        USED
                                    </p>
                                    <p className="text-3xl">—</p>
                                </div>
                                <div className="right">
                                    <h3 className="text-xl font-semibold">
                                        REVENUE
                                    </h3>
                                    <h2 className="text-3xl font-semibold">
                                        {parseFloat(0).toLocaleString('en-GB', {
                                            style: 'currency',
                                            currency: 'GBP',
                                        })}
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div className="middle">
                            <div className="top mt-6 flex flex-row justify-between ">
                                <h2 className="text-xl font-semibold">
                                    Included listings ({count})
                                </h2>
                                <ThemeBtn
                                    bg={'bg-white border-black border-2'}
                                    className={'px-3 py-2'}
                                    handleClick={() =>
                                        setOpenListingsModal(() => true)
                                    }
                                >
                                    <span className=" relative !z-[1] w-full cursor-pointer text-sm font-medium text-black">
                                        {'Edit included listings'}
                                    </span>
                                </ThemeBtn>
                            </div>

                            <Table
                                chosenListings={chosenListings}
                                setChosenListings={setChosenListings}
                                disableDelete={true}
                            />
                        </div>
                    </body>
                    <footer className="mt-8 flex w-full flex-col">
                        <div className="bottom flex w-full flex-col items-center gap-3 text-center ">
                            <ThemeBtn
                                bg={'bg-white border-black border-2'}
                                className={'px-3 py-2'}
                            >
                                <span className=" relative !z-[1] w-full cursor-pointer text-sm font-medium text-black">
                                    {'Deactivate code'}
                                </span>
                            </ThemeBtn>
                            <p className="text-bleck/70">
                                Once deactivated, no one will be able to redeem
                                this offer. This action can’t be undone.
                            </p>
                        </div>
                    </footer>
                </Fragment>
            )}

            <Modal
                open={openListingsModal}
                onClose={() => setOpenListingsModal(() => false)}
                sx={{
                    height: '100%',
                    overflowY: 'auto',
                }}
            >
                <section>
                    <BoxWithProps
                        customSx={{
                            top: '5%',
                            left: '50%',

                            transform: 'translate(-50%, -0%)',
                            // padding: '2rem',
                            borderRadius: '1.8rem',
                            maxWidth: '80vw',
                        }}
                    >
                        <Slide
                            direction="up"
                            mountOnEnter
                            unmountOnExit
                            in={openListingsModal}
                            timeout={500}
                        >
                            <section className="h-full bg-white">
                                <header className=" border-b border-dark-gray p-7">
                                    <h2 className="text-xl font-semibold ">
                                        Choose listings for discount
                                    </h2>
                                </header>
                                <body className="mt-5 flex flex-col px-32">
                                    <h2 className="text-xl font-semibold">
                                        Included Listings (2)
                                    </h2>

                                    <p className="text-base">
                                        Choose which listings will be eligible
                                        for the discount. You can start by
                                        adding all your listings, and easily
                                        narrow it down from there if you want to
                                        exclude any items.
                                    </p>

                                    <SelectedListings />
                                </body>
                                <footer className="flex justify-between border-t border-t-dark-gray px-14 py-5">
                                    <button
                                        type="button"
                                        className="rounded-sm border border-dark-gray p-2 text-sm font-medium hover:bg-dark-gray/30"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-sm border border-black bg-black p-2 text-sm font-medium text-white transition-all hover:bg-black/80"
                                    >
                                        Save changes
                                    </button>
                                </footer>
                            </section>
                        </Slide>
                    </BoxWithProps>
                </section>
            </Modal>
        </section>
    );
}

export default Container;
