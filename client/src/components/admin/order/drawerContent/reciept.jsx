import { Fragment, useState } from 'react';
import { useAdminOrderContext } from '../../../../context/adminOrderContext';
import dayjs from 'dayjs';
import _ from 'lodash';

function Receipt({}) {
    const { orderInfo } = useAdminOrderContext();

    const [itemTotal, setItemTotal] = useState(() => {
        const value = orderInfo.items?.reduce(
            (total, currentValue) => (total += currentValue?.price),
            0
        );
        return value?.toFixed(2);
    });

    return (
        <section className="mt-4 flex w-full flex-col gap-4">
            <h3 className="text-sm font-semibold">
                Receipt <span className=" align-top font-gotham">#</span>
                {orderInfo?._id}
            </h3>
            <section className=" rounded-sm border-[1px] p-4">
                <table className="w-full ">
                    <colgroup>
                        <col span="1" width={'40%'} />
                        <col span="1" width={'20%'} />
                        <col span="1" width={'30%'} />
                    </colgroup>
                    <thead>
                        <tr className="border-b-2">
                            <th className="pb-2 text-start text-xs font-medium">
                                {orderInfo?.items?.length} Item(s)
                            </th>
                            <th className="pb-2 text-center text-xs font-medium">
                                Quantity
                            </th>
                            <th className="pb-2 text-end text-xs font-medium">
                                Item price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderInfo.items?.map((item) => {
                            return (
                                <tr className="">
                                    <td className="pt-3">
                                        <div className="flex flex-row gap-3">
                                            <img
                                                src={item.product?.images[0]}
                                                className="!h-10 !w-full max-w-10 rounded object-cover"
                                            />
                                            <div className="flex flex-col gap-1">
                                                <a
                                                    target="_blank"
                                                    href={`/product/${item.product?._id}`}
                                                    className="text-xs underline underline-offset-1 mb-2"
                                                >
                                                    {item.product?.title}
                                                </a>
                                                {[1, 2].map((variationNum) => {
                                                    const variationObj =
                                                        item?.[
                                                            `variation${variationNum}`
                                                        ] || {};
                                                    return (
                                                        <Fragment
                                                            key={`variation${variationNum}`}
                                                        >
                                                            {variationObj?.variation && (
                                                                <p className="text-xs">
                                                                    {
                                                                        variationObj?.title || `Variation ${variationNum}`
                                                                    }
                                                                    :{' '}
                                                                    <span>
                                                                        {
                                                                            variationObj?.variation
                                                                        }
                                                                    </span>
                                                                </p>
                                                            )}
                                                        </Fragment>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="pt-3 text-center align-top">
                                        <p className="text-xs ">
                                            {item?.quantity}
                                        </p>
                                    </td>

                                    <td className="pt-3 text-right align-top">
                                        <p className="text-xs">
                                            £
                                            {parseFloat(item?.price).toFixed(2)}
                                        </p>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                    <tfoot>
                        {/* <tr>
                            <td colSpan={3} className="pt-4">
                                <p className="flex justify-between text-xs">
                                    Item total{' '}
                                    <span className="!text-right">
                                        £{itemTotal}
                                    </span>
                                </p>
                            </td>
                        </tr> */}
                        {/* 
                        <tr>
                            <td colSpan={3} className="pt-1">
                                <p className="flex justify-between text-xs">
                                    Coupon{' '}
                                    <span className="!text-right">£0.00</span>
                                </p>
                            </td>
                        </tr>
                        */}
                        <tr>
                            <td colSpan={3} className=" pt-4">
                                <p className="flex justify-between text-xs font-medium">
                                    Subtotal
                                    <span className="!text-right">
                                        £
                                        {parseFloat(
                                            _.get(
                                                orderInfo,
                                                'transaction_cost.subtotal'
                                            )
                                        )?.toFixed(2)}
                                    </span>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan={3}
                                className="border-b-[1px] pb-4 pt-1"
                            >
                                <p className="flex justify-between text-xs">
                                    Discount{' '}
                                    <span className="!text-right">
                                        £
                                        {parseFloat(
                                            _.get(
                                                orderInfo,
                                                'transaction_cost.promo.discount'
                                            )
                                        ).toFixed(2)}
                                    </span>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} className=" border-b-[1px] py-4">
                                <p className="flex justify-between text-xs">
                                    Postage price
                                    <span className="!text-right">
                                        £
                                        {parseFloat(
                                            _.get(
                                                orderInfo,
                                                'transaction_cost.delivery_cost'
                                            )
                                        )?.toFixed(2)}
                                    </span>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} className=" pt-4">
                                <p className="flex justify-between text-xs font-medium">
                                    Order total
                                    <span className="!text-right">
                                        £
                                        {parseFloat(
                                            _.get(
                                                orderInfo,
                                                'transaction_cost.total'
                                            )
                                        )?.toFixed(2)}
                                    </span>
                                </p>
                            </td>
                        </tr>
                        {orderInfo?.refund?.amount > 0 && (
                            <>
                                {' '}
                                <tr>
                                    <td colSpan={3} className=" pt-0.5">
                                        <p className="flex justify-between text-xs font-light text-red-700">
                                            Refunded
                                            <span className="!text-right text-red-700">
                                                -£
                                                {parseFloat(
                                                    _.get(
                                                        orderInfo,
                                                        'refund.amount'
                                                    )
                                                )?.toFixed(2)}
                                            </span>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className=" pt-0.5">
                                        <p className="flex justify-between text-xs font-medium">
                                            Adjusted total
                                            <span className="!text-right">
                                                £
                                                {parseFloat(
                                                    _.get(
                                                        orderInfo,
                                                        'transaction_cost.total'
                                                    ) -
                                                        _.get(
                                                            orderInfo,
                                                            'refund.amount'
                                                        )
                                                )?.toFixed(2)}
                                            </span>
                                        </p>
                                    </td>
                                </tr>
                            </>
                        )}
                        {orderInfo?.payment_type && (
                            <tr>
                                <td colSpan={3} className="pt-6">
                                    <p className="text-right text-xs">
                                        Paid via{' '}
                                        {`${orderInfo?.payment_type[0]?.toUpperCase()}${orderInfo?.payment_type?.substring(
                                            1
                                        )}`}{' '}
                                        on{' '}
                                        {dayjs(orderInfo?.createdAt).format(
                                            'DD MMM, YYYY'
                                        )}
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tfoot>
                </table>
            </section>
        </section>
    );
}

export default Receipt;
