import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminAxios } from '../../../../../api/axios';
import _ from 'lodash';
import { ClickAwayListener } from '@mui/base';
import dayjs from 'dayjs';
import { Box, Modal } from '@mui/material';
import BubbleButton from '../../../../buttons/bubbleButton';
import ThemeBtn from '../../../../buttons/themeBtn';
import { CloseRounded } from '@mui/icons-material';
import { useContent } from '../../../../../context/ContentContext';
import RefundModel from './refundModal';
import RefundTable from './refundTable';
import OptionError from '../../../components/product/new product/variation/error/optionError';
import RefundSuccess from './refundSuccess';

function RefundOrder({}) {
    const [refundData, setRefundData] = useState({
        message_to_buyer: '',
        reason: '',
        returning_items: null,
        issue_a_refund: false,
        cancel_order: false,
        subCharge: null,
        delivery: null,
        charge: 0,
    });
    const { handleCancel } = useContent();
    const [errors, setErrors] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [order, setOrder] = useState({});
    const [refunds, setRefunds] = useState({});
    const abortControllerRef = useRef(new AbortController());
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [isEditing, setEditing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);

    const fetchData = async () => {
        try {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            const { data } = await adminAxios.get(`order/${id}`, {
                signal: abortControllerRef.current.signal,
            });
            setOrder(() => data?.order);
            setLoading(false);
        } catch (error) {
            logoutUser({ error });
        }
    };

    useEffect(() => {
        fetchData();

        return () => {
            abortControllerRef?.current?.abort();
        };
    }, []);

    const handleUpdate = ({ property, value }) => {
        setRefundData((prevState) => ({ ...prevState, [property]: value }));
    };

    useEffect(() => {
        const subCharge = Object.values(refunds).reduce((accum, { value }) => {
            return accum + parseFloat(value || 0);
        }, 0);

        const delivery = parseFloat(refundData?.delivery) || 0;
        setRefundData((prevState) => ({
            ...prevState,
            subCharge,
            delivery: delivery.toFixed(2),
            total: subCharge + delivery,
            charge: Math.min(
                subCharge + delivery,
                _.get(order, 'transaction_cost.total') -
                    _.get(order, 'refund.amount')
            ),
        }));
    }, [isEditing, order]);

    const itemsLength = _.get(order, 'items.length');

    return (
        <section className="mt-5 flex w-full flex-col items-center px-5">
            {loading ? (
                <div>
                    <div className="spinner-simple ![--spinner-color:var(--slate-10)]"></div>
                </div>
            ) : success ? (
                <RefundSuccess
                    text={refundData?.cancel_order ? 'cancelled' : 'refunded'}
                />
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

                                <div className="flex flex-col gap-2">
                                    <select
                                        onChange={(e) => {
                                            handleUpdate({
                                                property: 'reason',
                                                value: e.target.value,
                                            });

                                            setErrors(
                                                ({ reason, ...prevState }) =>
                                                    prevState
                                            );
                                        }}
                                        className={`max-w-xs border border-black text-s font-normal ${errors?.reason ? 'border-red-700 bg-red-100' : ''}`}
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
                                                        refundData?.reason ==
                                                        text
                                                    }
                                                    key={text}
                                                >
                                                    {text}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {errors?.reason && (
                                        <OptionError
                                            msg={errors.reason}
                                            className={'my-0 !gap-2 !p-0'}
                                            small
                                        />
                                    )}{' '}
                                </div>
                                <p>Is the buyer returning any items to you?</p>
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-nowrap items-center gap-2">
                                        {[
                                            { value: true, text: 'Yes' },
                                            { value: false, text: 'No' },
                                        ].map(({ value, text }) => {
                                            const updateField = () => {
                                                handleUpdate({
                                                    property: 'returning_items',
                                                    value,
                                                });

                                                setErrors(
                                                    ({
                                                        returning_items,
                                                        ...prevState
                                                    }) => prevState
                                                );
                                            };
                                            return (
                                                <div className="flex flex-nowrap items-center gap-2">
                                                    <input
                                                        onChange={updateField}
                                                        type="radio"
                                                        name="refund-reason"
                                                        id="refund-reason"
                                                        className={`daisy-radio daisy-radio-sm ${errors?.returning_items ? '!border-red-900 bg-red-100 ' : ''}`}
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

                                    {errors?.returning_items && (
                                        <OptionError
                                            msg={errors.returning_items}
                                            className={'my-0 !gap-2 !p-0'}
                                            small
                                        />
                                    )}
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
                        <RefundTable
                            {...{
                                order,
                                itemsLength,
                                refundData,
                                setRefunds,
                                setRefundData,
                                setModalOpen,
                                refunds,
                                handleUpdate,
                                setEditing,
                            }}
                        />
                    </div>

                    <button
                        onClick={() => {
                            handleCancel({
                                info: refundData,
                                setBtnLoading,
                                abortControllerRef,
                                setErrors,
                                setSuccess,
                                id,
                            });
                        }}
                        type="button"
                        className="mb-20 self-start rounded bg-black px-3 py-2 text-sm font-medium text-white"
                    >
                        Review refund
                    </button>
                </section>
            )}

            <RefundModel
                setModalOpen={setModalOpen}
                modalOpen={modalOpen}
                id={id}
            />
        </section>
    );
}

export default RefundOrder;
