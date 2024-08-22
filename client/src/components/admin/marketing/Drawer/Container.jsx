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
    } = useOfferContext();

    const [offerType, setOfferType] = useState(() =>
        _.upperFirst(details?.offer_type).replace(/_/g, ' ')
    );

    useEffect(() => {
        setOfferType(() =>
            _.upperFirst(details?.offer_type).replace(/_/g, ' ')
        );
    }, [loading]);
    const handleDeactivate = async () => {
        try {
            const { data } = await adminAxios.get(
                `/offers/deactivate/${details._id}`
            );

            setDetails(() => data);
        } catch (error) {
            logoutUser({ error });
        }
    };

    const isActive =
        dayjs.unix(details?.start_date).diff(dayjs(), 'minute') <= 0;

    const isExpired = !details?.end_date
        ? false
        : dayjs.unix(details?.end_date).diff(dayjs(), 'minute') <= 0;

    const generatePromoDuration = () => {
        const formatDate = (date, additionalFormat = '') => {
            return dayjs
                .unix(date)
                .format(`${dateFormat} ${additionalFormat}`);
        };

        if (isExpired) {
            return `Duration: ${formatDate(details?.start_date, 'HH:mm')} - ${formatDate(details?.end_date, 'HH:mm')}`;
        }

        if (!details?.active) {
            return `Ended on: ${formatDate(details?.end_date)}`;
        } else {
            return `Starts on: ${formatDate(details?.start_date)}`;
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
                            {details?.code}{' '}
                            <span
                                className={`rounded-full ${isExpired ? 'bg-dark-gray/50' : isActive ? 'bg-green-100' : 'bg-dark-gray/50'} px-2 py-1 text-xs font-light tracking-wide`}
                            >
                                {!details?.active || isExpired
                                    ? 'Ended'
                                    : isActive
                                      ? 'Active'
                                      : 'Scheduled'}
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
                                        {details?.code}
                                    </span>
                                </p>
                                <p className="text-base">
                                    {generatePromoDuration()}
                                </p>
                            </div>
                        </div>
                    </header>
                    <body className="">
                        <div className="mt-4 flex flex-col gap-2">
                            <p className="text-lg font-semibold">Share</p>
                            <CopyLink
                                url={`https://${VITE_WEBSITE}?coupon=${details?.code}`}
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
                    {!isExpired && (
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
