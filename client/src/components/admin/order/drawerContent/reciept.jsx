import { Fragment, useState } from 'react';
import { useAdminOrderContext } from '../../../../context/adminOrder';
import dayjs from 'dayjs';

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
            <h3 className="text-base font-semibold">
                Receipt <span className=" align-top font-gotham">#</span>
                {orderInfo?._id}
            </h3>
            <section className=" border-[1px] p-4 rounded-sm">
                {/* <p className='font-medium'>{orderInfo?.items?.length} Item(s)</p> */}
                <table className="w-full ">
                    <colgroup>
                        <col span="1" width={'33.33%'} />
                        <col span="1" width={'33.33%'} />
                        <col span="1" width={'33.33%'} />
                    </colgroup>
                    <thead>
                        <tr className="border-b-2">
                            <th className="pb-2 text-start text-s font-medium">
                                {orderInfo?.items?.length} Item(s)
                            </th>
                            <th className="pb-2 text-center text-s font-medium">
                                Quantity
                            </th>
                            <th className="pb-2 text-end text-s font-medium">
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
                                                className="h-10 w-10 rounded-sm object-cover"
                                            />
                                            <div className="flex flex-col gap-1">
                                                <a
                                                target='_blank'
                                                    href={`/product/${item.product?._id}`}
                                                    className="text-sm underline underline-offset-1"
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
                                                            {variationObj?.title && (
                                                                <p>
                                                                    {
                                                                        variationObj?.title
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
                                    <td className="text-center">
                                        <p>{item?.quantity}</p>
                                    </td>

                                    <td className="text-right">
                                        <p>
                                            £
                                            {parseFloat(item?.price).toFixed(2)}
                                        </p>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan={3} className="pt-4">
                                <p className="flex justify-between">
                                    Item total{' '}
                                    <span className="!text-right">
                                        £{itemTotal}
                                    </span>
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={3} className="pt-1">
                                <p className="flex justify-between">
                                    Coupon{' '}
                                    <span className="!text-right">£0.00</span>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="border-b-[1px]  pb-4 pt-1">
                                <p className="flex justify-between font-medium">
                                    Subtotal
                                    <span className="!text-right">
                                        £
                                        {parseFloat(
                                            orderInfo?.transaction_cost
                                                ?.subtotal
                                        )?.toFixed(2)}
                                    </span>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} className=" border-b-[1px] py-4">
                                <p className="flex justify-between">
                                    Postage price
                                    <span className="!text-right">
                                        £
                                        {parseFloat(
                                            orderInfo?.shipping_option?.cost
                                        )?.toFixed(2)}
                                    </span>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} className=" pt-4">
                                <p className="flex justify-between font-medium">
                                    Order total
                                    <span className="!text-right">
                                        £
                                        {parseFloat(
                                            orderInfo?.transaction_cost?.total
                                        )?.toFixed(2)}
                                    </span>
                                </p>
                            </td>
                        </tr>
                        {orderInfo?.payment_type && (
                            <tr>
                                <td colSpan={3} className="pt-6">
                                    <p className="text-right">
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
