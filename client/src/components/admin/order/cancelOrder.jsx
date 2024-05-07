import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminAxios } from '../../../api/axios';
import UserLogout from '../../../hooks/userLogout';
import _ from 'lodash';
import BubbleButton from '../../buttons/bubbleButton';
import ThemeBtn from '../../buttons/themeBtn';
import OptionError from '../components/product/new product/variation/error/optionError';
import confettiIcon from '../../../assets/icons/confetti.png';
import { useContent } from '../../../context/ContentContext';
function CancelOrder({}) {
    const [order, setOrder] = useState({});
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    const [btnLoading, setBtnLoading] = useState(false);
    const { logoutUser } = UserLogout();
    const { id } = useParams();
    const { setShowAlert } = useContent();

    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState({
        reason: null,
        returning_items: null,
        message_to_buyer: '',
        id,
    });

    const abortControllerRef = useRef(new AbortController());
    const navigate = useNavigate();
    useEffect(() => {
        // window.scroll(0, 0);

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
        fetchData();
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const handleCancel = async () => {
        let isSuccessful = false;
        try {
            setBtnLoading(() => true);

            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            const { data } = await adminAxios.post(
                `/order/${id}/cancelled`,
                { ...info },
                { signal: abortControllerRef.current.signal }
            );
            isSuccessful = true;
        } catch (error) {
            logoutUser({ error });
            isSuccessful = false;
            setErrors(() => error?.response?.data);
            if (error?.response?.status != 401) {
                setShowAlert(() => ({
                    on: true,
                    size: 'medium',
                    bg: 'bg-red-900',
                    icon: 'sadFace',
                    msg: (
                        <p className='text-white text-base'>
                            Failed to cancel order. Please try again later.
                            <br/>
                            {error?.response?.status == 500
                                ? `\r\n Error msg: ${_.get(error, 'response.data.msg.0')}`
                                : ''}
                            
                        </p>
                    ),
                }));
            }
            setBtnLoading(() => false);
        } finally {
            if (isSuccessful) {
                setTimeout(() => {
                    setSuccess(() => true);
                    setBtnLoading(() => false);
                }, 600);
            }
        }
    };
    return (
        <section className="flex h-screen w-full">
         
            {loading ? (
                <div className="mt-5 flex w-full justify-center">
                    <div class="spinner-circle ![--spinner-color:var(--slate-12)]"></div>
                </div>
            ) : success ? (
                <section className="flex w-full flex-col items-center justify-center gap-4">
                    <div className="rounded-full bg-light-grey p-10 ">
                        <img
                            src={confettiIcon}
                            alt="confetti"
                            className="h-20 w-20"
                        />
                    </div>
                    <div className="flex max-w-lg flex-col items-center justify-center gap-5">
                        <h3 className="text-2xl font-semibold">
                            All set! Your order is cancelled
                        </h3>
                        <p className="text-center text-sm">
                            We sent your buyer a email to confirm. If you
                            issued a refund, it should appear in their account
                            within 2 to 5 business days.
                        </p>
                        <ThemeBtn
                            text={'Return to Orders'}
                            handleClick={() => {
                                navigate('/admin/orders');
                            }}
                        ></ThemeBtn>
                    </div>
                </section>
            ) : (
                <section className="flex flex-col gap-5 p-5 pr-10">
                    <section className="flex flex-col gap-5 lg:w-10/12 ">
                        <h1 className="mb-3 font-EBGaramond text-4xl font-normal">
                            Cancel an order
                        </h1>

                        <p className="text-sm">
                            When you cancel, your buyer will get a full refund.
                            Buyers will be able to leave a review up to 48 hours
                            after you cancel. The order will be moved to
                            Completed on your Orders page and marked as
                            “cancelled”.
                        </p>

                        <div className="mt-1">
                            <p className="text-base font-semibold">
                                Reason for cancelling{' '}
                                <span className="text-red-700">*</span>
                            </p>

                            <select
                                onChange={(e) => {
                                    setInfo((prevState) => ({
                                        ...prevState,
                                        reason: e.target.value,
                                    }));
                                    setErrors(
                                        ({ reason, ...prevState }) => prevState
                                    );
                                }}
                                className={`daisy-select daisy-select-bordered ${_.get(errors, 'reason') ? '!border-red-700 !bg-red-100' : ''} input mt-2 w-full max-w-xs !rounded-md focus:!shadow-none`}
                            >
                                <option disabled selected>
                                    Choose a reason
                                </option>
                                {[
                                    'Decline sale',
                                    'Buyer agree to cancel transaction',
                                    "Can't complete transaction",
                                    'Item lost in the mail',
                                    'Item returned, refund given to buyer',
                                ].map((item, idx) => {
                                    return (
                                        <option
                                            key={item}
                                            selected={item == info?.reason}
                                        >
                                            {item}
                                        </option>
                                    );
                                })}
                            </select>
                            {_.get(errors, 'reason') && (
                                <OptionError
                                    msg={_.get(errors, 'reason')}
                                    className={'!px-0 !py-2'}
                                    disableIcon={true}
                                />
                            )}
                        </div>

                        <div>
                            <p className="text-base font-semibold">
                                Is the buyer returning any items to you?{' '}
                                <span className="text-red-700">*</span>
                            </p>

                            <div className="mt-2 flex flex-row gap-3">
                                {[
                                    { text: 'Yes', value: true },
                                    { text: 'No', value: false },
                                ].map(({ text, value }) => {
                                    const handleClick = () => {
                                        setInfo((prevState) => ({
                                            ...prevState,
                                            returning_items: value,
                                        }));

                                        setErrors(
                                            ({
                                                returning_items,
                                                ...prevState
                                            }) => prevState
                                        );
                                    };
                                    return (
                                        <div
                                            key={text}
                                            className="flex flex-row flex-nowrap items-center gap-2"
                                        >
                                            <input
                                                onChange={handleClick}
                                                value={value}
                                                checked={
                                                    value ==
                                                    info.returning_items
                                                }
                                                type="radio"
                                                name="returning-item"
                                                className={`${_.get(errors, 'returning_items') ? '!border-red-700 bg-red-100' : '!border-black/70'} daisy-radio daisy-radio-lg !border-2 `}
                                            />
                                            <p
                                                className="cursor-pointer text-base"
                                                onClick={handleClick}
                                            >
                                                {text}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                            {_.get(errors, 'returning_items') && (
                                <OptionError
                                    msg={_.get(errors, 'returning_items')}
                                    className={'!px-0 !py-2 !text-base'}
                                    disableIcon={true}
                                />
                            )}
                        </div>
                    </section>

                    <div className="flex w-full flex-col gap-2 border-y-2 py-5">
                        <p className="text-base font-semibold">
                            Order Number: {order?._id}
                        </p>
                        <p className="text-base">
                            Buyer: {order.customer?.fullName}
                        </p>

                        <p className="text-base">
                            {`${order.items?.length} ${
                                order.items?.length > 1 ? 'items' : 'item'
                            }`}
                        </p>

                        <table>
                            <colgroup>
                                <col span="1" width={'50%'} />
                                <col span="1" width={'25%'} />
                                <col span="1" width={'25%'} />
                            </colgroup>
                            <thead className="!mb-5 text-sm">
                                <tr className="!mb-5 pb-4">
                                    <th className="pb-4 text-left font-medium">
                                        Item
                                    </th>
                                    <th className="pb-4 text-center font-medium">
                                        Quantity
                                    </th>
                                    <th className="pb-4 text-right font-medium">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items?.map((item) => {
                                    return (
                                        <tr>
                                            <td
                                                align="left"
                                                className=" flex flex-row flex-nowrap gap-3 "
                                            >
                                                <img
                                                    className="min-h-16 h-16 w-16 min-w-16 rounded object-cover"
                                                    src={
                                                        item.product?.images[0]
                                                    }
                                                    alt=""
                                                />
                                                <p className="text-sm font-medium">
                                                    {item.product?.title}
                                                </p>
                                            </td>
                                            <td className=" text-center align-top">
                                                <p className="">
                                                    {item?.quantity}
                                                </p>
                                            </td>
                                            <td className=" text-right align-top">
                                                <p>
                                                    £
                                                    {parseFloat(
                                                        item?.price
                                                    ).toFixed(2)}
                                                </p>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex w-full max-w-xl flex-col gap-3 self-end">
                        <p className="flex justify-between text-sm">
                            <span>Order total</span>
                            <span>
                                £
                                {parseFloat(
                                    order.items?.reduce(
                                        (total, currentItem) =>
                                            (total += currentItem?.price),
                                        0
                                    )
                                ).toFixed(2)}
                            </span>
                        </p>
                        <p className="flex justify-between border-b pb-3 text-sm font-medium">
                            <span className="font-semibold">Subtotal</span>
                            <span>
                                £
                                {parseFloat(
                                    order.transaction_cost?.subtotal
                                ).toFixed(2)}
                            </span>
                        </p>

                        <p className="flex justify-between  border-b pb-3 text-sm">
                            <span>Delivery</span>
                            <span>
                                £
                                {parseFloat(
                                    _.get(
                                        order,
                                        'transaction_cost.delivery_cost'
                                    )
                                ).toFixed(2)}
                            </span>
                        </p>

                        {_.get(order, 'refund.amount') && (
                            <div className="border-b">
                                <p className="flex justify-between   pb-3 text-sm">
                                    <span className="font-semibold">
                                        Original order total
                                    </span>
                                    <span>
                                        £
                                        {parseFloat(
                                            _.get(
                                                order,
                                                'transaction_cost.total'
                                            )
                                        ).toFixed(2)}
                                    </span>
                                </p>

                                <p className="flex justify-between   pb-3 text-sm">
                                    <span>Already refunded</span>
                                    <span>
                                        -£
                                        {parseFloat(
                                            _.get(order, 'refund.amount')
                                        ).toFixed(2)}
                                    </span>
                                </p>
                            </div>
                        )}

                        <h2 className="mb-3 flex justify-between text-lg font-semibold">
                            <span>Refund due to buyer</span>
                            <span>
                                £
                                {parseFloat(
                                    order.transaction_cost?.total -
                                        (_.get(order, 'refund.amount') || 0)
                                ).toFixed(2)}
                            </span>
                        </h2>
                        <div className="flex flex-col gap-3">
                            <p className="text-base font-semibold">
                                Write an optional message to your buyer?
                            </p>
                            <textarea
                                onChange={(e) =>
                                    setInfo((prevState) => ({
                                        ...prevState,
                                        message_to_buyer: e.target.value,
                                    }))
                                }
                                value={info.message_to_buyer}
                                name="
                message"
                                id="message"
                                className=" shadow-[0px 0px 2.4px 1px rgba(165, 165, 165, 1)] daisy-textarea daisy-textarea-bordered daisy-textarea-md w-full"
                            ></textarea>
                        </div>

                        <div className="mb-20 mt-3 flex gap-3 self-end">
                            {/* <button
                                onClick={() => navigate('/admin/orders')}
                                className="theme-btn rounded-full border-2 border-black px-8 py-3 text-sm font-medium"
                            >
                                Back

                            </button> */}
                            <ThemeBtn
                                handleClick={() => navigate('/admin/orders')}
                                bg={'bg-white border border-black border-2'}
                            >
                                <p className="text-base font-medium">Cancel</p>
                            </ThemeBtn>
                            <ThemeBtn
                                text={'Cancel order'}
                                handleClick={handleCancel}
                            >
                                <div>
                                    {btnLoading ? (
                                        <div class="spinner-circle spinner-sm ![--spinner-color:255,_255,_255]"></div>
                                    ) : (
                                        <p className="text-base font-medium text-white">
                                            Cancel order
                                        </p>
                                    )}
                                </div>
                            </ThemeBtn>

                            {/* <button className="theme-btn rounded-full border-2 border-black bg-black px-8 py-3 text-sm font-medium text-white">
                                Cancel order
                            </button> */}
                        </div>
                    </div>
                </section>
            )}
        </section>
    );
}

export default CancelOrder;
