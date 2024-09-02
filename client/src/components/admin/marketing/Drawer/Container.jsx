import { Fragment, useEffect, useRef, useState } from 'react';
import ThemeBtn from '../../../buttons/themeBtn';
import CopyLink from '../copyLink';
import { adminAxios } from '../../../../api/axios.js';
import {
    offerTypes,
    useSalesDiscountContext,
} from '../../../../context/SalesDiscountContext';
import { useAdminContext } from '../../../../context/adminContext';
import dayjs from 'dayjs';
import _ from 'lodash';
import Table from '../table';
import { Box, Modal, Slide } from '@mui/material';
import BoxWithProps from '../../../common/BoxwithProps';
import SelectedListings from '../selectedListings';
import OfferContextProvider, {
    useOfferContext,
} from '../../../../context/offerContext';
import IncludedListings from './includedListings';

const { VITE_WEBSITE } = import.meta.env;

function Container({}) {
    const {
        searchParams,

        dateFormat,
    } = useSalesDiscountContext();
    const { logoutUser } = useAdminContext();

    const timeoutRef = useRef(null);
    const [openListingsModal, setOpenListingsModal] = useState(false);
    const [onMountChosenListings, setOnMountChosenListings] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const abortControllerRef = useRef(new AbortController());

    const {
        details,
        setDetails,
        generateDiscountText,
        chosenListings,
        setChosenListings,
        initialFetch,
        setListingIdsSet,
        categories,
        categoriesMap,
        setChosenMap,
        loading,
        setLoading,
        count,
        setCount,

        setTrigger,
    } = useOfferContext();

    const [offerType, setOfferType] = useState(() =>
        _.upperFirst(details?.offer_type).replace(/_/g, ' ')
    );

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
            clearTimeout(timeoutRef);
        };
    }, []);
    useEffect(() => {
        setOfferType(() =>
            _.upperFirst(details?.offer_type).replace(/_/g, ' ')
        );
    }, [loading]);
    const handleDeactivate = async () => {
        try {
            const { data } = await adminAxios.get(
                `/offer/deactivate/${details._id}?offer_type=${details.offer_type}`
            );

            setDetails(() => data);
        } catch (error) {
            logoutUser({ error });
        }
    };

    const offer = new offerTypes[details?.offer_type](details);

    const values = {
        promo_code: {
            text: 'share',
            url: `https://${VITE_WEBSITE}?coupon=${details?.code}`,
            button: { default: 'Copy Link', clicked: 'Copied!' },
        },
        gift_card: {
            text: 'Resend Email',
            url: details?.email,
            button: { default: 'Resend', clicked: 'Resent!' },
        },
    };

    const handleAction = async () => {
        try {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            clearTimeout(timeoutRef.current);
            setTrigger(() => true);

            const data = await adminAxios.get(
                `giftcard/resend/${details._id}`,
                { signal: abortControllerRef.current.signal }
            );
        } catch (error) {
            logoutUser({ error });
            console.error(error);
        } finally {
            timeoutRef.current = setTimeout(() => {
                setTrigger(() => false);
            }, 5000);
        }
    };
    return (
        <section className="flex h-full flex-col bg-white p-5">
            {loading ? (
                <div className="spinner-circle spinner-lg mt-12 self-center ![--spinner-color:var(--slate-12)]"></div>
            ) : (
                <Fragment>
                    <header>
                        <p className="text-black/70">{offerType}</p>

                        <h2 className="mt-2 flex items-center gap-3 text-3xl font-semibold">
                            {details?.redacted_code || details?.code}{' '}
                            <span
                                className={`rounded-full ${offer.isExpired ? 'bg-dark-gray/50' : offer.isActive ? 'bg-green-100' : 'bg-dark-gray/50'} px-2 py-1 text-xs font-light tracking-wide`}
                            >
                                {offer.currentState}
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
                                    {offerType}:{' '}
                                    <span className="font-semibold">
                                        {offer.code}
                                    </span>
                                </p>
                                <p className="text-base">
                                    {offer.generatePromoDuration}
                                </p>
                            </div>
                        </div>
                    </header>
                    <body className="">
                        <div className="mt-4 flex flex-col gap-2">
                            <p className="text-lg font-semibold">{'Share'}</p>
                            <CopyLink
                                url={values[details?.offer_type].url}
                                button={values[details?.offer_type].button}
                                handleAction={handleAction}
                            />
                        </div>

                        <div className="mt-12">
                            <p className="mb-4">For all time</p>
                            <div className="flex flex-row justify-between border  border-dark-gray px-8 py-8">
                                <div className="left">
                                    <p className="text-xl font-semibold">
                                        USED
                                    </p>
                                    <p className="text-3xl">
                                        {details?.orders?.uses || '—'}
                                    </p>
                                </div>
                                <div className="right">
                                    <h3 className="text-xl font-semibold">
                                        REVENUE
                                    </h3>
                                    <h2 className="text-3xl font-semibold">
                                        {parseFloat(
                                            details?.orders?.revenue || 0
                                        ).toLocaleString('en-GB', {
                                            style: 'currency',
                                            currency: 'GBP',
                                        })}
                                    </h2>
                                </div>
                            </div>
                        </div>

                        {details.audits?.length > 0 && (
                            <div className="mt-12">
                                <p className="mb-4 text-xl font-semibold">
                                    Logs{' '}
                                </p>
                                <div className="flex flex-row justify-between">
                                    <div className="flex w-full overflow-x-auto">
                                        <table className="table table-zebra">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    {/* <th>Event</th> */}
                                                    <th>Description</th>
                                                    {/* <th>Amount</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {details.audits?.map(
                                                    ({ timestamp, msg }) => {
                                                        return (
                                                            <tr>
                                                                <th>
                                                                    {dayjs(
                                                                        timestamp
                                                                    ).format(
                                                                        'DD MMM YYYY HH:MM:ss'
                                                                    )}
                                                                </th>
                                                                {/* <td>
                                                                Cy Ganderton
                                                            </td> */}
                                                                <td>{msg}</td>
                                                                {/* <td>Blue</td> */}
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* <div className="left">
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
                                </div> */}
                                </div>
                            </div>
                        )}

                        <div className="middle mb-8 w-full">
                            <div className="top mt-6 flex w-full flex-row justify-between ">
                                <h2 className="text-xl font-semibold">
                                    {`Included listings ${count ? `(${count})` : ''}`}
                                </h2>
                                {details?.active &&
                                    details?.listings_type == 'select' && (
                                        <ThemeBtn
                                            bg={
                                                'bg-white border-black border-2'
                                            }
                                            className={'px-3 py-2'}
                                            handleClick={() =>
                                                setOpenListingsModal(() => true)
                                            }
                                        >
                                            <span className=" relative !z-[1] w-full cursor-pointer text-sm font-medium text-black">
                                                {'Edit included listings'}
                                            </span>
                                        </ThemeBtn>
                                    )}
                            </div>

                            {details?.listings_type == 'all' && (
                                <p className="mt-3 text-sm">
                                    This discount applies to your whole shop.
                                </p>
                            )}

                            <Table disableDelete={true} />
                        </div>
                    </body>
                    {!offer.isExpired && (
                        <footer className=" flex w-full flex-col">
                            <div className="bottom flex w-full flex-col items-center gap-3 text-center ">
                                <ThemeBtn
                                    bg={'bg-white border-black border-2'}
                                    className={'px-3 py-2'}
                                    handleClick={handleDeactivate}
                                >
                                    <span className=" relative !z-[1] w-full cursor-pointer text-sm font-medium text-black">
                                        {'Deactivate code'}
                                    </span>
                                </ThemeBtn>
                                <p className="mb-2 text-black/70">
                                    Once deactivated, no one will be able to
                                    redeem this offer. This action can’t be
                                    undone.
                                </p>
                            </div>
                        </footer>
                    )}
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
                            maxWidth: isUpdated ? '37.5rem' : '85.375rem',
                            borderRadius: isUpdated ? '1.8rem' : '0.5rem',
                            width: '100%',
                        }}
                    >
                        <Slide
                            direction="up"
                            mountOnEnter
                            unmountOnExit
                            in={openListingsModal}
                            timeout={500}
                        >
                            <section className="h-full w-full rounded-inherit bg-white">
                                {' '}
                                <OfferContextProvider>
                                    <IncludedListings
                                        {...{
                                            openListingsModal,
                                            setOpenListingsModal,
                                            isUpdated,
                                            setIsUpdated,
                                            setDetails,
                                            setChosenListings,
                                            setCount,
                                        }}
                                    />
                                </OfferContextProvider>
                            </section>
                        </Slide>
                    </BoxWithProps>
                </section>
            </Modal>
        </section>
    );
}

export default Container;
