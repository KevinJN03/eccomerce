import { useRef } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import { ClickAwayListener } from '@mui/base';
function RefundTable({
    order,
    itemsLength,
    refunds,
    refundData,
    setRefunds,
    setRefundData,
    setModalOpen,
    handleUpdate,
    setEditing,
}) {
    const issueRefundRef = useRef(null);
    const cancelOrderRef = useRef(null);
    return (
        <table className="w-full ">
            <colgroup>
                <col width={'60%'} className="bg-red-200/0 " />
                <col width={'20%'} className="bg-blue-200/0 !text-right" />
                <col width={'20%'} className="bg-yellow-200/0 text-left" />
            </colgroup>

            <tr className="!border-none bg-light-grey">
                <th className="px-3 py-2 text-left text-sm font-semibold">
                    Order #{_.get(order, '_id')}{' '}
                    <span className="font-medium text-black/70">—</span>{' '}
                    <span className="text-black/70">
                        {`${itemsLength} ${itemsLength > 1 ? 'items' : 'item'}`}
                    </span>
                </th>
                <th align="right">
                    <div className="flex flex-nowrap items-center justify-center gap-1">
                        <input
                            type="checkbox"
                            ref={issueRefundRef}
                            onClick={() => {
                                if (!refundData?.issue_a_refund == true) {
                                    setRefundData((prevState) => ({
                                        ...prevState,
                                        ['issue_a_refund']:
                                            !prevState?.issue_a_refund,
                                        subCharge: _.get(
                                            order,
                                            'transaction_cost.subtotal'
                                        ),
                                        charge: _.get(
                                            order,
                                            'transaction_cost.total'
                                        ) - _.get(order, 'refund.amount'),
                                        delivery: _.get(
                                            order,
                                            'transaction_cost.delivery_cost'
                                        ),
                                    }));
                                } else {
                                    setRefunds(() => ({}));
                                    setRefundData((prevState) => ({
                                        ...prevState,
                                        ['issue_a_refund']:
                                            !prevState?.issue_a_refund,
                                        subCharge: 0,
                                        charge: 0,
                                        delivery: '',
                                    }));
                                }
                            }}
                            checked={refundData?.issue_a_refund}
                        />
                        <p
                            className="cursor-pointer text-xs font-normal"
                            onClick={() => {
                                issueRefundRef.current?.click();
                            }}
                        >
                            Issue a full refund
                        </p>
                    </div>
                </th>
                <th>
                    <div className="flex flex-nowrap items-center justify-center gap-2">
                        <input
                            type="checkbox"
                            ref={cancelOrderRef}
                            onClick={() => {
                                handleUpdate({
                                    property: 'cancel_order',
                                    value: !refundData?.cancel_order,
                                });
                                if (!refundData?.cancel_order) {
                                    setModalOpen(() => true);
                                }
                            }}
                            checked={refundData?.cancel_order}
                        />
                        <p
                            className="cursor-pointer text-xs font-normal"
                            onClick={() => cancelOrderRef.current?.click()}
                        >
                            Cancel order
                        </p>
                    </div>
                </th>
            </tr>
            <tr className=" border border-white bg-light-grey">
                <td className="px-3 py-2">
                    <p className="font-semibold">Item</p>
                </td>
                <td className="px-4 text-right">
                    <p className="text-xs font-semibold">Amount paid</p>
                </td>
                <td className=" border-l px-4">
                    <p className="text-xs font-semibold">Amount to refund</p>
                </td>
            </tr>
            {order?.items?.map(
                ({
                    title,
                    price,
                    quantity,

                    variation1,
                    variation2,
                    _id,
                }) => {
                    return (
                        <tr>
                            <td className="px-3">
                                <a
                                    href={`/product/${_id}`}
                                    target="_blank"
                                    className="mt-2 cursor-pointer text-sm font-semibold underline hover:text-black/70"
                                >
                                    {title}
                                </a>
                                <p className="mt-2">
                                    {variation1?.variation && (
                                        <>
                                            <span className="font-semibold">
                                                {variation1?.title ||
                                                    'Variation'}
                                                :
                                            </span>{' '}
                                            <span>{variation1?.variation}</span>
                                        </>
                                    )}{' '}
                                    {variation2?.variation && (
                                        <>
                                            <span className="font-semibold">
                                                {variation2?.title ||
                                                    'Variation'}
                                                :
                                            </span>{' '}
                                            <span>{variation2?.variation}</span>
                                        </>
                                    )}
                                </p>

                                <div className="mb-1 mt-4 flex flex-nowrap gap-10">
                                    <div>
                                        <p>Price</p>

                                        <p>£{parseFloat(price).toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p>Quantity</p>

                                        <p>{quantity}</p>
                                    </div>
                                </div>
                            </td>
                            <td align="right" className="px-4">
                                <p>£{parseFloat(price).toFixed(2)}</p>
                            </td>
                            <td
                                align="right"
                                className="border-l border-dark-gray px-4"
                            >
                                {refundData?.issue_a_refund ? (
                                    <p className="border border-transparent p-1 text-right text-xs">
                                        £{parseFloat(price).toFixed(2)}
                                    </p>
                                ) : (
                                    <ClickAwayListener
                                        onClickAway={() => {
                                            if (
                                                // !_.get(refunds, [
                                                //     _id,
                                                //     'value',
                                                // ]) ||
                                                !_.get(refunds, [
                                                    _id,
                                                    'triggerClickAway',
                                                ])
                                            ) {
                                                return;
                                            }

                                            let parseValue = parseFloat(
                                                _.get(refunds, [_id, 'value'])
                                            );
                                            if (parseValue > price) {
                                                parseValue = price;
                                            }

                                            setRefunds(({ ...prevState }) => ({
                                                ...prevState,
                                                [_id]: {
                                                    value: parseFloat(
                                                        parseValue || 0
                                                    ).toFixed(2),
                                                    triggerClickAway: false,
                                                },
                                            }));

                                            setEditing(() =>
                                                dayjs().toISOString()
                                            );
                                        }}
                                    >
                                        <input
                                            value={_.get(refunds, [
                                                _id,
                                                'value',
                                            ])}
                                            onChange={(e) => {
                                                setRefunds((prevState) => ({
                                                    ...prevState,
                                                    [_id]: {
                                                        value: e.target.value,
                                                        triggerClickAway: true,
                                                    },
                                                }));
                                            }}
                                            type="text"
                                            name="refund-amount"
                                            id="refund-amount"
                                            className="w-full max-w-16 border border-dark-gray p-1 text-right text-xs"
                                        />
                                    </ClickAwayListener>
                                )}
                            </td>
                        </tr>
                    );
                }
            )}

            <tr className="w-full bg-light-grey">
                <td className="px-3 py-2">
                    <p className="text-xs font-semibold ">Item subtotal</p>
                </td>
                <td align="right" className="px-4">
                    <p>
                        £
                        {parseFloat(
                            _.get(order, 'transaction_cost.subtotal')
                        ).toFixed(2)}
                    </p>
                </td>
                <td align="right" className="border-l border-dark-gray px-4">
                    <p>
                        £
                        {parseFloat(
                            refundData?.issue_a_refund
                                ? _.get(order, 'transaction_cost.subtotal')
                                : refundData?.subCharge
                        ).toFixed(2)}
                    </p>{' '}
                </td>
            </tr>

            <tr>
                <td className="px-3 py-2">
                    <p>Delivery</p>
                </td>

                <td align="right" className="px-4">
                    <p>
                        £
                        {parseFloat(
                            _.get(order, 'transaction_cost.delivery_cost')
                        )?.toFixed(2)}
                    </p>
                </td>

                <td align="right" className="border-l border-dark-gray px-4">
                    {refundData?.issue_a_refund ? (
                        <p className="border  border-transparent p-1 text-right text-xs">
                            £{parseFloat(refundData?.delivery).toFixed(2)}
                        </p>
                    ) : (
                        <ClickAwayListener
                            onClickAway={() => {
                                if (
                                    !_.get(refundData, 'delivery.value') ||
                                    !_.get(
                                        refundData,
                                        'delivery.triggerClickAway'
                                    )
                                ) {
                                    return;
                                }
                                const value = _.get(
                                    refundData,
                                    'delivery.value'
                                );
                                const maxValue = _.get(order, [
                                    'transaction_cost',
                                    'delivery_cost',
                                ]);

                                let parseValue = parseFloat(value) || 0;

                                if (parseValue > maxValue) {
                                    parseValue = maxValue;
                                }

                                setRefundData((prevState) => ({
                                    ...prevState,
                                    delivery: {
                                        value: parseValue.toFixed(2),
                                        triggerClickAway: false,
                                    },
                                }));

                                setEditing(() => dayjs().toISOString());
                            }}
                        >
                            <input
                                onChange={(e) => {
                                    handleUpdate({
                                        property: 'delivery',
                                        value: {
                                            value: e.target.value,
                                            triggerClickAway: true,
                                        },
                                    });
                                }}
                                value={_.get(refundData, 'delivery.value')}
                                type="text"
                                name="refund-amount"
                                id="refund-amount"
                                className="w-full max-w-16 border border-dark-gray p-1 text-right text-xs"
                            />
                        </ClickAwayListener>
                    )}
                </td>
            </tr>
            {_.get(order, 'refund.amount') > 0 && (
                <tr>
                    <td className="px-3 py-2">
                        <p className="text-red-700">Refunded</p>
                    </td>

                    <td align="right" className="px-4">
                        <p className="text-red-700">
                            -£
                            {parseFloat(_.get(order, 'refund.amount'))?.toFixed(
                                2
                            )}
                        </p>
                    </td>
                    <td
                        align="right"
                        className="border-l border-dark-gray px-4"
                    >
                        {/* <p className="border  border-transparent p-1 text-right text-xs">
                            £{parseFloat(refundData?.delivery).toFixed(2)}
                        </p> */}
                        <p className="text-red-700">
                            -£
                            {parseFloat(_.get(order, 'refund.amount'))?.toFixed(
                                2
                            )}
                        </p>
                    </td>
                </tr>
            )}
            <tr className="rounded-br-inherit bg-light-grey">
                <td className="px-3 py-2 ">
                    <p className="font-semibold">Total</p>
                </td>
                <td align="right" className="px-4">
                    <p>
                        £
                        {parseFloat(
                            _.get(order, 'transaction_cost.total') - _.get(order, 'refund.amount')
                        ).toFixed(2)}
                    </p>
                </td>
                <td align="right" className="border-l border-dark-gray px-4">
                    <p>£{parseFloat(refundData?.charge).toFixed(2)}</p>
                </td>
            </tr>
        </table>
    );
}

export default RefundTable;
