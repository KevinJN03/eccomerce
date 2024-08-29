import emailIcon from '../../../assets/icons/email.png';
import '../../../CSS/mui-calender.scss';
import { ArrowDropDown } from '@mui/icons-material';
import _ from 'lodash';
import { Modal, Popover } from '@mui/material';
import Template from './template.jsx';
import { useSalesDiscountContext } from '../../../context/SalesDiscountContext.jsx';
import dayjs from 'dayjs';
import Drawer from './Drawer/drawer.jsx';
import OfferContextProvider from '../../../context/offerContext.jsx';
import OfferDetails from './offerDetails.jsx';
import OfferTypes from './offerTypes.jsx';
import ActionsForSales from './actionsforSales.jsx';
import CustomDateRange from './CustomDateRange.jsx';
function SalesDiscount({}) {
    const {
        anchorEl,
        setAnchorEl,
        selectedId,
        setSelectedId,
        modalOpen,
        setModalOpen,
        dateFormat,
        showCustomPicker,
        setShowCustomPicker,
        option,
        showAction,
        setShowAction,
        overallPerformance,
    } = useSalesDiscountContext();

    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(() => null);
    };

    const handleMouseEnter = (e, title) => {
        setAnchorEl(() => e.currentTarget);
        setSelectedId(() => title);
    };

    const generateDatePeriod = ({
        start_date,
        end_date,
        active,
        no_end_date,
    }) => {
        const array = [
            'year',
            'month',
            'week',
            'day',
            'hour',
            'minute',
            'second',
        ];

        const today = dayjs();
        let isActive = active;

        const findDurationValue = (value = 0) => {
            const endPeriod = dayjs();
            const startPeriod = dayjs.unix(start_date);

            // decide a start period and an end period, based on that calculate the difference in minute
            // if in future, set the value as 0 days
            // if end_date is past from today, calculate period from start to end
            // if end_date is in future, calculate from today;

            if (end_date) {
                const endDateDayjs = dayjs.unix(end_date);
                const endDateFromNow = endDateDayjs.diff(today, 'minute');
                const endDiffFromStart = endDateDayjs.diff(
                    startPeriod,
                    'minute'
                );

                // if (endDiffFromStart <= 0) {
                //     //end on end_date
                //     return `0 Days`;
                // }

                if (endDateFromNow <= 0) {
                    isActive = false;
                    _.assign(endPeriod, endDateDayjs);
                } else {
                    _.assign(endPeriod, endDateDayjs);
                }

                // else {
                //     endPeriod = today;
                // }
            }

            const diffFromPeriod = startPeriod.diff(endPeriod, array[value]);

            if (value == array.length - 1) {
                return ``;
            }

            if (diffFromPeriod < 0) {
                const positiveValue = Math.abs(diffFromPeriod);
                return {
                    text: `${positiveValue} ${_.upperFirst(array[value])}${positiveValue > 1 ? 's' : ''}`,
                    dateText: `${startPeriod.format(`${dateFormat} HH:mm`)}—${
                        !end_date
                            ? 'no end date'
                            : endPeriod.format(dateFormat + ' HH:mm')
                    }`,
                    isActive,
                };
            } else if (diffFromPeriod > 0) {
                // 0 days
                return {
                    isActive,
                    text: `0 Days`,
                    dateText: (active ? startPeriod : endPeriod).format(
                        `[${active ? 'Starts on' : 'Ended on'}] ${dateFormat}`
                    ),
                };
            } else {
                // return `${diffFromPeriod}`;
                return findDurationValue(value + 1);
            }
        };

        return findDurationValue();
    };

    return (
        <section className="payment h-full w-full p-10">
            <header>
                <h2 className="font-EBGaramond text-5xl">
                    Sales and discounts
                </h2>

                <p className="mt-4 text-sm">
                    A special offer can help grow your business, whether it's a
                    seasonal sale, a promo code for a discount, or a targeted
                    offer.
                </p>
            </header>

            <OfferTypes />
            <section className="mt-5 rounded-xl bg-blue-300/40 p-5">
                <header className="flex w-full flex-nowrap gap-8">
                    <img src={emailIcon} className="h-14 w-14" />

                    <div className="flex w-full flex-col gap-1">
                        <p className="text-xl font-semibold">
                            Automatically send offers to interested shoppers
                        </p>

                        <p className="text-base">
                            Choose which targeted offers you want to set up, and
                            we’ll email your discount to eligible shoppers.
                        </p>
                    </div>
                </header>

                <section className="mt-5 flex w-full flex-row gap-5">
                    {[{}, {}, {}].map(() => {
                        return (
                            <div className="flex-1 rounded-xl  bg-white p-5 py-24 transition-all hover:shadow-my-shadow"></div>
                        );
                    })}
                </section>
            </section>

            <section className="mt-6 ">
                <div className="top flex flex-row justify-between">
                    <h2 className="font-EBGaramond !text-4xl">
                        Overall performance
                    </h2>

                    <section className="relative flex  justify-center">
                        <button
                            onClick={() =>
                                setShowAction((prevState) => !prevState)
                            }
                            className={`relative flex flex-row  flex-nowrap items-center justify-center rounded border !border-dark-gray px-2.5 py-1 outline-2 outline-offset-2  outline-green-500 focus:outline active:outline`}
                        >
                            <p className="whitespace-nowrap text-sm font-semibold">
                                {_.upperFirst(option?.value).replace(/_/g, ' ')}
                            </p>

                            <ArrowDropDown className="!fill-black/40" />
                        </button>
                        <ActionsForSales />

                        <CustomDateRange
                            {...{ showCustomPicker, setShowCustomPicker }}
                        />
                    </section>
                </div>

                <div className="middle mt-14 flex flex-nowrap justify-between gap-5">
                    {[
                        {
                            title: 'Orders with a discount',
                            amount: overallPerformance?.orders_with_discount,
                            currency: false,
                            description: `This is the total number of orders placed that included a discount offer or a sale item.`,
                        },
                        {
                            title: `Average order value`,
                            amount: overallPerformance?.average_order_value,
                            currency: true,
                            description: `Average order value is revenue divided by number of orders, used to estimate how much buyers typically spent per order.`,
                        },

                        {
                            title: 'Revenue from discounts',
                            amount: overallPerformance?.revenue_from_discounts,
                            currency: true,
                            description: `This is the total revenue from all orders that included a discount or sale.`,
                        },
                        {
                            title: `Total Discount Amount`,
                            amount: overallPerformance?.total_discount_amount,
                            currency: true,
                            description: `This is the total value of all discounts applied to orders, representing the cumulative savings given to customers`,
                            anchorOrigin: {
                                vertical: 'center',
                                horizontal: 'left',
                            },
                            transformOrigin: {
                                vertical: 'center',
                                horizontal: 'right',
                            },
                            transform: 'translate(-1rem, -1rem)',
                        },
                    ].map(
                        ({
                            title,
                            currency,
                            amount,
                            description,
                            anchorOrigin,
                            transformOrigin,
                            transform,
                        }) => {
                            return (
                                <div
                                    className="flex flex-col gap-2"
                                    key={title}
                                >
                                    <p className="font-gotham text-4xl ">
                                        {currency
                                            ? parseFloat(amount).toLocaleString(
                                                  'en-US',
                                                  {
                                                      style: 'currency',
                                                      currency: 'GBP',
                                                  }
                                              )
                                            : amount}
                                    </p>
                                    <div className="">
                                        <p
                                            onMouseEnter={(e) =>
                                                handleMouseEnter(e, title)
                                            }
                                            className="cursor-help text-sm underline decoration-dashed decoration-2 underline-offset-2		"
                                        >
                                            {title}
                                        </p>
                                        <Popover
                                            id={title}
                                            open={open && selectedId == title}
                                            anchorEl={anchorEl}
                                            onClose={handleClose}
                                            anchorOrigin={
                                                anchorOrigin || {
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }
                                            }
                                            transformOrigin={
                                                transformOrigin || {
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }
                                            }
                                            slotProps={{
                                                paper: {
                                                    style: {
                                                        boxShadow:
                                                            'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                                        border: 'none',
                                                        backgroundColor:
                                                            'white',
                                                        padding: '1rem',
                                                        borderRadius: '0.8rem',
                                                        transform:
                                                            transform ||
                                                            'translate(0rem, 1rem)',
                                                    },
                                                },
                                            }}
                                        >
                                            <div className="relative w-full max-w-72 bg-white">
                                                <p className="text-base font-semibold">
                                                    {title}
                                                </p>

                                                <p className="mt-1">
                                                    {description}
                                                </p>
                                            </div>
                                        </Popover>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            </section>

            <OfferDetails />

            <section className="mt-10 w-full bg-blue-200/50 py-8">
                <p className="text-center text-base font-medium">
                    Have feedback about sales and discounts? We want to hear
                    from you.{' '}
                    <span className="underline underline-offset-1">
                        Fill out our survey.
                    </span>
                </p>
            </section>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(() => false)}
                style={{
                    overflowY: 'auto',
                }}
            >
                <OfferContextProvider>
                    <Template />
                </OfferContextProvider>
            </Modal>
            <Drawer />
        </section>
    );
}

export default SalesDiscount;
