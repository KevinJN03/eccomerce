import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminAxios } from '../../../../api/axios';
import _ from 'lodash';
import { ClickAwayListener } from '@mui/base';
import dayjs from 'dayjs';

function RefundOrder({}) {
    const [refundData, setRefundData] = useState({
        message_to_buyer: '',
        reason: '',
        returning_items: null,
        issue_a_refund: false,
        cancel_order: false,
        refund_item: null,
        refund_delivery: null,
    });

    const [order, setOrder] = useState({});
    const [refunds, setRefunds] = useState({});
    const abortControllerRef = useRef(new AbortController());
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [isEditing, setEditing] = useState(false);
    const fetchData = async () => {
        try {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            const { data } = await adminAxios.get(`order/${id}`, {
                signal: abortControllerRef.current.signal,
            });
            console.log(data);
            setOrder(() => data?.order);
            setLoading(false);
        } catch (error) {
            logoutUser({ error });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdate = ({ property, value }) => {
        setRefundData((prevState) => ({ ...prevState, [property]: value }));
    };

    const issueRefundRef = useRef(null);
    const cancelOrderRef = useRef(null);

    const cachedValue = useMemo(() => {
        const itemSubTotal = Object.values(refunds).reduce(
            (accum, currentValue) => accum + parseFloat(currentValue),
            0
        );
        const delivery = parseFloat(refundData?.refund_delivery) || 0;
        return { total: delivery + itemSubTotal, delivery, itemSubTotal };
    }, [isEditing]);

    const itemsLength = _.get(order, 'items.length');
    return (
        <section className="mt-5 flex w-full flex-col items-center px-5">
            {loading ? (
                <div>
                    <div className="spinner-simple ![--spinner-color:var(--slate-10)]"></div>
                </div>
            ) : (
                <section className="flex w-full max-w-3xl flex-col gap-4">
                    <div className="top flex w-full flex-col ">
                        <p className="mb-5 text-2xl font-semibold">
                            Issue a refund{' '}
                            <span className="text-base font-medium text-black/60">
                                to{' '}
                                {_.get(order, 'customer.firstName') || 'Buyer'}
                            </span>
                        </p>
                        <div className="rounded border border-dark-gray ">
                            <div className="top rounded-t-inherit bg-light-grey px-3 py-2">
                                <p className="font-semibold">
                                    Refund Information
                                </p>
                            </div>
                            <div className="bottom flex flex-col gap-3 p-3">
                                <p className="font-medium">
                                    Reason for issuing a refund
                                </p>
                                <select
                                    onChange={(e) => {
                                        handleUpdate({
                                            property: 'reason',
                                            value: e.target.value,
                                        });
                                    }}
                                    className="max-w-xs border border-black text-s font-normal"
                                    name="refund-reason"
                                    id="refund-reason"
                                >
                                    <option selected value={''}>
                                        - Please choose a reason -
                                    </option>

                                    {[
                                        'Buyer agreed to cancel',
                                        "Shop owner can't complete transaction",
                                        'Item was not as described',
                                        'Item has arrived damaged',
                                        'Item was substantially delayed',
                                        'Item was lost in the mail',
                                        'Shop owner declines sale',
                                        'Shop owner refunding postage overages',
                                        'Account adjustment',
                                    ].map((text) => {
                                        return (
                                            <option
                                                value={text}
                                                selected={
                                                    refundData?.reason == text
                                                }
                                                key={text}
                                            >
                                                {text}
                                            </option>
                                        );
                                    })}
                                </select>
                                <p>Is the buyer returning any items to you?</p>

                                <div className="flex flex-nowrap items-center gap-2">
                                    {[
                                        { value: true, text: 'Yes' },
                                        { value: false, text: 'No' },
                                    ].map(({ value, text }) => {
                                        const updateField = () =>
                                            handleUpdate({
                                                property: 'returning_items',
                                                value,
                                            });
                                        return (
                                            <div className="flex flex-nowrap items-center gap-2">
                                                <input
                                                    onChange={updateField}
                                                    type="radio"
                                                    name="refund-reason"
                                                    id="refund-reason"
                                                    className="daisy-radio daisy-radio-sm"
                                                    value={value}
                                                    checked={
                                                        refundData?.returning_items ==
                                                        value
                                                    }
                                                />
                                                <p
                                                    className="cursor-pointer"
                                                    onClick={updateField}
                                                >
                                                    {text}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div>
                                    <p>
                                        Message to buyer{' '}
                                        <span className="text-xs text-black/60">
                                            optional
                                        </span>
                                    </p>
                                    <textarea
                                        value={refundData?.message_to_buyer}
                                        onChange={(e) =>
                                            handleUpdate({
                                                property: 'message_to_buyer',
                                                value: e.target.value,
                                            })
                                        }
                                        name="message_to_buyer"
                                        id="message_to_buyer"
                                        rows={5}
                                        className="w-full rounded border border-dark-gray p-3 text-s focus:!outline-[0.5px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom w-full rounded border border-dark-gray">
                        <table className="w-full ">
                            <colgroup>
                                <col width={'60%'} className="bg-red-200/0 " />
                                <col
                                    width={'20%'}
                                    className="bg-blue-200/0 !text-right"
                                />
                                <col
                                    width={'20%'}
                                    className="bg-yellow-200/0 text-left"
                                />
                            </colgroup>

                            <tr className="!border-none bg-light-grey">
                                <th className="px-3 py-2 text-left text-sm font-semibold">
                                    Order #{_.get(order, '_id')}{' '}
                                    <span className="font-medium text-black/70">
                                        —
                                    </span>{' '}
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
                                                setRefundData((prevState) => ({
                                                    ...prevState,
                                                    ['issue_a_refund']:
                                                        !prevState?.issue_a_refund,
                                                }));
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
                                            }}
                                            checked={refundData?.cancel_order}
                                        />
                                        <p
                                            className="cursor-pointer text-xs font-normal"
                                            onClick={() =>
                                                cancelOrderRef.current?.click()
                                            }
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
                                    <p className="text-xs font-semibold">
                                        Amount paid
                                    </p>
                                </td>
                                <td className=" border-l px-4">
                                    <p className="text-xs font-semibold">
                                        Amount to refund
                                    </p>
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
                                                <p className="my-2 text-sm font-semibold underline">
                                                    {title}
                                                </p>
                                                <p>
                                                    {variation1?.variation && (
                                                        <>
                                                            <span className="font-semibold">
                                                                {variation1?.title ||
                                                                    'Variation'}
                                                                :
                                                            </span>{' '}
                                                            <span>
                                                                {
                                                                    variation1?.variation
                                                                }
                                                            </span>
                                                        </>
                                                    )}{' '}
                                                    {variation2?.variation && (
                                                        <>
                                                            <span className="font-semibold">
                                                                {variation2?.title ||
                                                                    'Variation'}
                                                                :
                                                            </span>{' '}
                                                            <span>
                                                                {
                                                                    variation2?.variation
                                                                }
                                                            </span>
                                                        </>
                                                    )}
                                                </p>

                                                <div className="mb-1 mt-4 flex flex-nowrap gap-10">
                                                    <div>
                                                        <p>Price</p>

                                                        <p>
                                                            £
                                                            {parseFloat(
                                                                price
                                                            ).toFixed(2)}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p>Quantity</p>

                                                        <p>{quantity}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td align="right" className="px-4">
                                                <p>
                                                    £
                                                    {parseFloat(price).toFixed(
                                                        2
                                                    )}
                                                </p>
                                            </td>
                                            <td
                                                align="right"
                                                className="border-l border-dark-gray px-4"
                                            >
                                                <ClickAwayListener
                                                    onClickAway={() => {
                                                        if (!refunds?.[_id]) {
                                                            return;
                                                        }
                                                        let parseValue =
                                                            parseFloat(
                                                                refunds?.[_id]
                                                            );
                                                        if (
                                                            parseValue > price
                                                        ) {
                                                            parseValue = price;
                                                        }

                                                        // setRefunds(
                                                        //     ({...prevState}) => ({
                                                        //         ...prevState,
                                                        //         [_id]: parseFloat(
                                                        //             parseValue
                                                        //         ).toFixed(2),
                                                        //     })
                                                        // );
                                                    }}
                                                >
                                                    <input
                                                        value={_.get(
                                                            refunds,
                                                            _id
                                                        )}
                                                        onChange={(e) => {
                                                            setRefunds(
                                                                (
                                                                    prevState
                                                                ) => ({
                                                                    ...prevState,
                                                                    [_id]: e
                                                                        .target
                                                                        .value,
                                                                })
                                                            );
                                                        }}
                                                        type="text"
                                                        name="refund-amount"
                                                        id="refund-amount"
                                                        className="w-full max-w-16 border border-dark-gray p-1 text-right text-xs"
                                                    />
                                                </ClickAwayListener>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}

                            <tr className="w-full bg-light-grey">
                                <td className="px-3 py-2">
                                    <p className="text-xs font-semibold ">
                                        Item subtotal
                                    </p>
                                </td>
                                <td align="right" className="px-4">
                                    <p>
                                        £
                                        {parseFloat(
                                            _.get(
                                                order,
                                                'transaction_cost.subtotal'
                                            )
                                        ).toFixed(2)}
                                    </p>
                                </td>
                                <td
                                    align="right"
                                    className="border-l border-dark-gray px-4"
                                >
                                    <p>
                                        £
                                        {parseFloat(
                                            cachedValue?.itemSubTotal
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
                                            _.get(
                                                order,
                                                'transaction_cost.delivery_cost'
                                            )
                                        )?.toFixed(2)}
                                    </p>
                                </td>

                                <td
                                    align="right"
                                    className="border-l border-dark-gray px-4"
                                >
                                    <ClickAwayListener
                                        onClickAway={() => {
                                            if (
                                                _.isEmpty(
                                                    refundData?.refund_delivery
                                                )
                                            ) {
                                                return;
                                            }
                                            const value = _.get(
                                                refundData,
                                                'refund_delivery'
                                            );
                                            const maxValue = _.get(order, [
                                                'transaction_cost',
                                                'delivery_cost',
                                            ]);

                                            let parseValue =
                                                parseFloat(value) || 0;

                                            if (parseValue > maxValue) {
                                                parseValue = maxValue;
                                            }

                                            setRefundData((prevState) => ({
                                                ...prevState,
                                                refund_delivery:
                                                    parseValue.toFixed(2),
                                            }));

                                            setEditing(() =>
                                                dayjs().toISOString()
                                            );
                                        }}
                                    >
                                        <input
                                            onChange={(e) => {
                                                handleUpdate({
                                                    property: 'refund_delivery',
                                                    value: e.target.value,
                                                });
                                            }}
                                            value={refundData?.refund_delivery}
                                            type="text"
                                            name="refund-amount"
                                            id="refund-amount"
                                            className="w-full max-w-16 border border-dark-gray p-1 text-right text-xs"
                                        />
                                    </ClickAwayListener>
                                </td>
                            </tr>
                            <tr className="rounded-br-inherit bg-light-grey">
                                <td className="px-3 py-2 ">
                                    <p className="font-semibold">Total</p>
                                </td>
                                <td align="right" className="px-4">
                                    <p>
                                        £
                                        {parseFloat(
                                            _.get(
                                                order,
                                                'transaction_cost.total'
                                            )
                                        ).toFixed(2)}
                                    </p>
                                </td>
                                <td
                                    align="right"
                                    className="border-l border-dark-gray px-4"
                                >
                                    <p>
                                        £
                                        {parseFloat(cachedValue?.total).toFixed(
                                            2
                                        )}
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <button
                        type="button"
                        className="mb-20 self-start rounded bg-black px-3 py-2 text-sm font-medium text-white"
                    >
                        Review refund
                    </button>
                </section>
            )}
        </section>
    );
}

export default RefundOrder;
