import _ from 'lodash';
import { useSalesDiscountContext } from '../../../context/SalesDiscountContext';
import dayjs from 'dayjs';
const { VITE_CLIENT_URL } = import.meta.env;

function Step3({}) {
    const { details, listingIdsSet } = useSalesDiscountContext();

    const listingAmount = listingIdsSet.size;
    return (
        <section className="flex justify-center">
            <section className="flex w-full max-w-2xl flex-col gap-5">
                <header>
                    <h2 className="text-xl font-semibold">
                        Review details for your promo code
                    </h2>
                </header>
                <section className="flex flex-col gap-7">
                    {[
                        {
                            title: 'Discount',
                            value: `${
                                details?.type == 'fixed'
                                    ? `${parseFloat(
                                          details?.amount
                                      ).toLocaleString('en-GB', {
                                          style: 'currency',
                                          currency: 'GBP',
                                      })} GBP`
                                    : `${details.amount}% off`
                            }`,
                        },
                        {
                            title: 'Order minimum',
                            value: _.upperFirst(details?.order_minimum).replace(
                                /_/g,
                                ' '
                            ),
                        },
                        {
                            title: 'Duration',
                            value: `${dayjs.unix(details?.start_date).format('DD MMM YYYY')} - ${dayjs.unix(details?.end_date).format('DD MMM YYYY')}`,
                        },

                        {
                            title: 'Included listings',
                            value: ` ${details?.listings_type == 'all' ? 'Whole shop' : `${listingAmount} ${listingAmount > 1 ? 'listings' : 'listing'}`}`,
                        },
                        {
                            title: `Promo code`,
                            value: details.code,
                        },
                        {
                            title: 'Shareable URL',
                            value: `${VITE_CLIENT_URL}?coupon=${details.code}`,
                        },
                    ].map(({ title, value }) => {
                        return (
                            <div
                                key={title}
                                className="flex flex-row flex-nowrap"
                            >
                                <p className="flex-1 text-sm font-semibold">
                                    {title}
                                </p>

                                <p className="flex-1 text-sm">{value}</p>
                            </div>
                        );
                    })}
                </section>
            </section>
        </section>
    );
}

export default Step3;
