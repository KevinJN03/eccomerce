import dayjs from 'dayjs';
import { useSalesDiscountContext } from '../../../context/SalesDiscountContext';
import _ from 'lodash';
import { KeyboardArrowRightRounded } from '@mui/icons-material';
import { Fragment, useState } from 'react';
import { text } from '@fortawesome/fontawesome-svg-core';
import IndividualOffer from './individualOffer';

function OfferDetails({}) {
    const {
        allOffers,
        setOpenDrawer,
        setSearchParams,
        dateFormat,
        selectedOfferType,
        setSelectedOfferType,
        loading,
        
    } = useSalesDiscountContext();

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
        <section className="mt-24">
            <div className="tabs tabs-boxed !mb-4 gap-1">
                {[
                    { text: 'Promo code', value: 'promo_code' },
                    { text: 'Gift card', value: 'gift_card' },
                ].map(({ value, text }) => {
                    return (
                        <Fragment key={value}>
                            <input
                                type="radio"
                                id={`radio-${value}`}
                                name="tab-5"
                                className="tab-toggle"
                                checked={value === selectedOfferType}
                                onChange={() => {
                                    setSelectedOfferType(value);
                                }}
                            />
                            <label htmlFor={`radio-${value}`} className="tab">
                                {text}
                            </label>
                        </Fragment>
                    );
                })}
            </div>
            <section className="bottom w-full rounded-md border border-dark-gray">
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
                        {loading ? (
                            <tr>
                                <td className=" h-80" colSpan={5}>
                                    <div className="flex w-full items-center justify-center">
                                        <div className="spinner-circle spinner-lg ![--spinner-color:var(--slate-12)]"></div>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <>
                                {allOffers.map((props) => {
                                    // const isActive =
                                    //     dayjs
                                    //         .unix(start_date)
                                    //         .diff(dayjs(), 'minute') <= 0;

                                    // const isExpired = !end_date
                                    //     ? false
                                    //     : dayjs
                                    //           .unix(end_date)
                                    //           .diff(dayjs(), 'minute') <= 0;

                                    // const { text, dateText } =
                                    //     generateDatePeriod({
                                    //         start_date,
                                    //         end_date,
                                    //         no_end_date,
                                    //         active,
                                    //     });

                                    return (
                                        <IndividualOffer
                                            {...props}
                                            key={props._id}
                                        />
                                    );

                                    //     return (
                                    //         <tr
                                    //             key={redacted_code || code}
                                    //             className="border-b border-dark-gray"
                                    //         >
                                    //             <td className="border-r border-dark-gray px-5 py-5">
                                    //                 <p className="text-sm">
                                    //                     {_.upperFirst(
                                    //                         offer_type
                                    //                     ).replace('_', ' ')}
                                    //                 </p>
                                    //                 <p className="text-sm font-semibold">
                                    //                     {redacted_code || code}
                                    //                 </p>
                                    //                 <button
                                    //                     type="button"
                                    //                     className="group flex cursor-pointer flex-nowrap items-center"
                                    //                     onClick={() => {
                                    //                         setSearchParams({
                                    //                             offer: _id,
                                    //                             offer_type,
                                    //                         });
                                    //                         setOpenDrawer(
                                    //                             () => true
                                    //                         );
                                    //                     }}
                                    //                 >
                                    //                     <p className="text-sm text-black/90 underline underline-offset-1">
                                    //                         Details
                                    //                     </p>
                                    //                     <KeyboardArrowRightRounded className="!text-base" />
                                    //                 </button>
                                    //             </td>

                                    //             <td className="px-5">
                                    //                 <div>
                                    //                     {/* <p>
                                    //     expired:{' '}
                                    //     {new String(isExpired)}
                                    // </p> */}
                                    //                     <p className="text-sm">
                                    //                         {text}
                                    //                         {/* {isActive
                                    //         ? generateDatePeriod({
                                    //               start_date,
                                    //               end_date,
                                    //               no_end_date,
                                    //           })
                                    //         : `0 Days`} */}
                                    //                         {active &&
                                    //                             !isExpired && (
                                    //                                 <span
                                    //                                     className={`ml-2 rounded-full px-2 py-0.5 text-xxs font-medium ${isActive ? 'bg-green-100' : 'bg-dark-gray/40'}`}
                                    //                                 >
                                    //                                     {isActive
                                    //                                         ? 'Active'
                                    //                                         : 'Scheduled'}
                                    //                                 </span>
                                    //                             )}
                                    //                     </p>

                                    //                     {/* <p>dateText: {dateText}</p> */}
                                    //                     <p className="mt-1.5 text-xs text-black/70">
                                    //                         {dateText}
                                    //                     </p>
                                    //                 </div>
                                    //             </td>

                                    //             <td
                                    //                 className="px-5"
                                    //                 align="left"
                                    //             >
                                    //                 <p className="text-sm">
                                    //                     {emails_sent || 'N/A'}
                                    //                 </p>
                                    //             </td>
                                    //             <td className="px-5">
                                    //                 <p className="text-sm">
                                    //                     {uses}
                                    //                 </p>
                                    //             </td>
                                    //             <td className="px-5">
                                    //                 <p className="text-sm">
                                    //                     {parseFloat(
                                    //                         revenue || 0
                                    //                     ).toLocaleString(
                                    //                         'en-GB',
                                    //                         {
                                    //                             style: 'currency',
                                    //                             currency: 'GBP',
                                    //                         }
                                    //                     )}
                                    //                 </p>
                                    //             </td>
                                    //         </tr>
                                    //     );
                                })}
                            </>
                        )}
                    </tbody>
                </table>
            </section>
        </section>
    );
}

export default OfferDetails;
