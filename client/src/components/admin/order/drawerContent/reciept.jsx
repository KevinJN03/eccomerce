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
            <h3 className="text-sm font-semibold">
                Receipt <span className=" align-top font-gotham">#</span>
                {orderInfo?._id}
            </h3>
            <section className=" border-[1px] p-4 rounded-sm">
                <table className="w-full ">
                    <colgroup>
                         <col span="1" width={'40%'} />
                        <col span="1" width={'20%'} />
                        <col span="1" width={'30%'} />
                    </colgroup>
                    <thead>
                        <tr className="border-b-2">
                            <th className="pb-2 text-start text-xxs font-medium">
                                {orderInfo?.items?.length} Item(s)
                            </th>
                            <th className="pb-2 text-center text-xxs font-medium">
                                Quantity
                            </th>
                            <th className="pb-2 text-end text-xxs font-medium">
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
                                                className="!h-10 !w-full max-w-10 rounded-sm object-cover"
                                            />
                                            <div className="flex flex-col gap-1">
                                                <a
                                                target='_blank'
                                                    href={`/product/${item.product?._id}`}
                                                    className="text-xxs underline underline-offset-1"
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
                                                                <p className='text-xxs'>
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
                                    <td className="text-center align-top pt-3">
                                        <p className='text-xxs '>{item?.quantity}</p>
                                    </td>

                                    <td className="text-right align-top pt-3">
                                        <p className='text-xxs'>
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
                                <p className="flex justify-between text-xxs">
                                    Item total{' '}
                                    <span className="!text-right">
                                        £{itemTotal}
                                    </span>
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={3} className="pt-1">
                                <p className="flex justify-between text-xxs">
                                    Coupon{' '}
                                    <span className="!text-right">£0.00</span>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="border-b-[1px]  pb-4 pt-1">
                                <p className="flex justify-between font-medium text-xxs">
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
                                <p className="flex justify-between text-xxs">
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
                                <p className="flex justify-between font-medium text-xxs">
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
                                    <p className="text-right text-xxs">
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
