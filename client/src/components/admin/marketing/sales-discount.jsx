import saleIcon from '../../../assets/icons/shopping.png';
import saleIcon2 from '../../../assets/icons/promo-code.png';
import saleIcon3 from '../../../assets/icons/icons8-sale-price-tag-100.png';
import emailIcon from '../../../assets/icons/email.png';
import {
    ArrowDropDown,
    ArrowRightAltRounded,
    Height,
    KeyboardArrowRightRounded,
    KeyboardBackspaceRounded,
    Padding,
} from '@mui/icons-material';
import { useState } from 'react';
import Actions from '../components/product/actions';
import _ from 'lodash';
import {
    Box,
    Modal,
    Popover,
    Popper,
    Typography,
    createStyles,
} from '@mui/material';
import exampleData from './exampleData';

import BoxWithProps from '../../common/BoxwithProps.jsx';
import Template from './template.jsx';
import { useSalesDiscountContext } from '../../../context/SalesDiscountContext.jsx';
import Step4 from './step4.jsx';
import dayjs from 'dayjs';
import Drawer from './Drawer/drawer.jsx';
import { useSearchParams } from 'react-router-dom';
import OfferContextProvider, {
    useOfferContext,
} from '../../../context/offerContext.jsx';
function SalesDiscount({}) {
    const {
        showAction,
        setShowAction,
        anchorEl,
        setAnchorEl,
        selectedId,
        setSelectedId,
        modalOpen,
        setModalOpen,

        allOffers,
        setOpenDrawer,
        setSearchParams,
        dateFormat,
    } = useSalesDiscountContext();

    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(() => null);
    };

    const handleMouseEnter = (e, title) => {
        setAnchorEl(() => e.currentTarget);
        setSelectedId(() => title);
    };

    const [option, setOption] = useState('this_month');

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

            <section className="mt-6 flex w-full flex-nowrap gap-4">
                {[
                    {
                        icon: saleIcon,
                        title: 'Create a gift card',
                        description: `Gift cards are a wonderful way to offer your customers a flexible and thoughtful gifting option. With a gift card, customers can choose their own perfect present from your store`,
                        className: '-rotate-45',
                    },
                    {
                        icon: saleIcon2,
                        title: 'Create a promo code',
                        description: `
                    Share your code with customers, and they can apply it for a discount at checkout`,
                    },
                ].map(({ icon, title, description, className }) => {
                    return (
                        <div
                            onClick={() => setModalOpen(() => true)}
                            className="group flex flex-1 cursor-pointer flex-nowrap gap-5 rounded-xl border border-dark-gray p-6 transition-all hover:shadow-my-shadow"
                        >
                            <img
                                src={icon}
                                className={`h-14 w-14 object-cover ${className || ''}`}
                                alt=""
                                srcset=""
                            />

                            <div className="flex h-full flex-col gap-2">
                                <div>
                                    <h3 className="mb-1 text-base font-semibold">
                                        {title}
                                    </h3>
                                    <p className="text-sm">{description}</p>
                                </div>

                                <button
                                    type="button"
                                    className="mt-auto flex flex-nowrap items-center gap-2"
                                >
                                    <p className="text-base font-medium">
                                        Set up
                                    </p>
                                    <div className="transition-all !duration-500 ease-in-out group-hover:!translate-x-2">
                                        <KeyboardBackspaceRounded className="!rotate-180 " />
                                    </div>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </section>

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
                                {_.upperFirst(option).replace(/_/g, ' ')}
                            </p>

                            <ArrowDropDown className="!fill-black/40" />
                        </button>

                        {/* <Actions
                                {...{
                                    product,
                                    showAction,
                                    setShowAction,
                                    className: 'translate-y-2',
                                }}
                            /> */}
                    </section>
                </div>

                <div className="middle mt-14 flex flex-nowrap justify-between gap-5">
                    {[
                        {
                            title: 'Orders with a discount',
                            amount: 0,
                            currency: false,
                            description: `This is the total number of orders placed that included a discount offer or a sale item.`,
                        },
                        {
                            title: `Average order value`,
                            amount: 0,
                            currency: true,
                            description: `Average order value is revenue divided by number of orders, used to estimate how much buyers typically spent per order.`,
                        },
                        {
                            title: 'Revenue from discounts',
                            amount: 0,
                            currency: true,
                            description: `This is the total revenue from all orders that included a discount or sale.`,
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
            <section className="bottom mt-6 w-full rounded-md border border-dark-gray">
                <header className="border-b border-dark-gray">
                    <h2 className="p-4 text-lg font-semibold">
                        Offer details and stats
                    </h2>
                </header>

                <table className="w-full">
                    <colgroup>
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '30%' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '15%' }} />
                    </colgroup>
                    <thead className="bg-black/5 py-4">
                        <tr className="!py-5">
                            {[
                                { text: 'Offer', addBorder: true },
                                { text: 'Duration' },
                                { text: 'Emails sent' },
                                { text: 'Uses' },
                                { text: 'Revenue' },
                            ].map(({ text, addBorder }) => {
                                return (
                                    <th
                                        key={text}
                                        className={`${addBorder ? 'border-r border-r-dark-gray' : ''} border-b border-b-dark-gray  px-5 py-3 text-left text-sm font-medium underline underline-offset-1`}
                                    >
                                        {text}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {allOffers.map(
                            ({
                                type,
                                code,
                                emails_sent,
                                revenue,
                                start_date,
                                end_date,
                                offer_type,
                                no_end_date,
                                uses,
                                _id,
                            }) => {
                                const isActive =
                                    dayjs
                                        .unix(start_date)
                                        .diff(dayjs(), 'minute') <= 0;
                                return (
                                    <tr
                                        key={code}
                                        className="border-b border-dark-gray"
                                    >
                                        <td className="border-r border-dark-gray px-5 py-5">
                                            <p className="text-sm">
                                                {_.upperFirst(
                                                    offer_type
                                                ).replace('_', ' ')}
                                            </p>
                                            <p className="text-sm font-semibold">
                                                {code}
                                            </p>
                                            <button
                                                type="button"
                                                className="group flex cursor-pointer flex-nowrap items-center"
                                                onClick={() => {
                                                    setSearchParams({
                                                        offer: _id,
                                                    });
                                                    setOpenDrawer(() => true);
                                                }}
                                            >
                                                <p className="text-sm text-black/90 underline underline-offset-1">
                                                    Details
                                                </p>
                                                <KeyboardArrowRightRounded className="!text-base" />
                                            </button>
                                        </td>

                                        <td className="px-5">
                                            <div>
                                                <p className="text-sm">
                                                    {isActive
                                                        ? (() => {
                                                              const array = [
                                                                  'year',
                                                                  'month',
                                                                  'week',
                                                                  'day',
                                                                  'hour',
                                                                  'minute',
                                                                  'second',
                                                              ];

                                                              const findDurationValue =
                                                                  (
                                                                      value = 0
                                                                  ) => {
                                                                      const diffFromToday =
                                                                          dayjs
                                                                              .unix(
                                                                                  start_date
                                                                              )
                                                                              .diff(
                                                                                  dayjs(),
                                                                                  array[
                                                                                      value
                                                                                  ]
                                                                              );

                                                                      if (
                                                                          value ==
                                                                          array.length -
                                                                              1
                                                                      ) {
                                                                          return '';
                                                                      }

                                                                      if (
                                                                          diffFromToday <
                                                                          0
                                                                      ) {
                                                                          const positiveValue =
                                                                              Math.abs(
                                                                                  diffFromToday
                                                                              );
                                                                          return `${positiveValue} ${_.upperFirst(array[value])}${positiveValue > 1 ? 's' : ''}`;
                                                                      } else {
                                                                          return findDurationValue(
                                                                              value +
                                                                                  1
                                                                          );
                                                                      }
                                                                  };

                                                              return findDurationValue(
                                                                  0
                                                              );
                                                          })()
                                                        : `0 Days`}
                                                    <span
                                                        className={`ml-2 rounded-full px-2 py-0.5 text-xxs font-medium ${isActive ? 'bg-green-100' : 'bg-dark-gray/40'}`}
                                                    >
                                                        {isActive
                                                            ? 'Active'
                                                            : 'Scheduled'}
                                                    </span>
                                                </p>

                                                <p className="mt-1.5 text-xs text-black/70">
                                                    {!isActive
                                                        ? `${dayjs.unix(start_date).utc().format(`[Starts on] ${dateFormat}`)}`
                                                        : `${dayjs
                                                              .unix(start_date)
                                                              .utc()
                                                              .format(
                                                                  dateFormat +
                                                                      ' HH:mm'
                                                              )}—${
                                                              !end_date
                                                                  ? 'no end date'
                                                                  : dayjs
                                                                        .unix(
                                                                            end_date
                                                                        )
                                                                        .utc()
                                                                        .format(
                                                                            dateFormat +
                                                                                ' HH:mm'
                                                                        )
                                                          } `}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-5" align="left">
                                            <p className="text-sm">
                                                {emails_sent || 'N/A'}
                                            </p>
                                        </td>
                                        <td className="px-5">
                                            <p className="text-sm">{uses}</p>
                                        </td>
                                        <td className="px-5">
                                            <p className="text-sm">
                                                {parseFloat(
                                                    revenue || 0
                                                ).toLocaleString('en-GB', {
                                                    style: 'currency',
                                                    currency: 'GBP',
                                                })}
                                            </p>
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </section>

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
