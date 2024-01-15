import { useEffect, useState, } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { adminAxios } from '../../../api/axios';
import UserLogout from '../../../hooks/userLogout';

function CancelOrder({}) {
    const [order, setOrder] = useState({});
    const [message, setMessage] = useState('');

    const [loading, setLoading] = useState(true);
    const { logoutUser } = UserLogout();
    const { id } = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        // window.scroll(0, 0);
        adminAxios
            .get(`order/${id}`)
            .then(({ data }) => {
                console.log(data);
                setOrder(() => data?.order);
                setLoading(false);
            })
            .catch((error) => {
                logoutUser({ error });
            });
    }, []);
    return (
        <section className="flex w-full">
            {loading && (
                <div className="mt-5 flex w-full justify-center">
                    <div class="spinner-circle [--spinner-color:var(--slate-12)]"></div>
                </div>
            )}
            {!loading && (
                <section className="flex flex-col gap-5 p-5 pr-10">
                    <section className='flex flex-col gap-5 lg:w-10/12 '>
                        <h1 className="mb-3 text-4xl font-EBGaramond">Cancel an order</h1>

                        <p className='text-sm'>
                            When you cancel, your buyer will get a full refund.
                            Buyers will be able to leave a review up to 48 hours
                            after you cancel. The order will be moved to
                            Completed on your Orders page and marked
                            as “cancelled”.
                        </p>

                        <div className="mt-1">
                            <p className="text-sm font-semibold">
                                Reason for cancelling{' '}
                                <span className="text-red-700">*</span>
                            </p>

                            <select className="daisy-select daisy-select-bordered input mt-2 w-full max-w-xs !rounded-md focus:!shadow-none">
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
                                    return <option key={item}>{item}</option>;
                                })}
                            </select>
                        </div>

                        <div>
                            <p className="text-sm font-semibold">
                                Is the buyer returning any items to you?{' '}
                                <span className="text-red-700">*</span>
                            </p>

                            <div className="mt-2 flex flex-row gap-3">
                                {['Yes', 'No'].map((text) => {
                                    return (
                                        <div
                                            key={text}
                                            className="flex flex-row flex-nowrap items-center gap-2"
                                        >
                                            <input
                                                type="radio"
                                                name="returning-item"
                                                className="daisy-radio daisy-radio-md border-2 border-dark-gray"
                                            />
                                            <p className='text-sm'>{text}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    <div className="flex w-full flex-col gap-2 border-y-2 py-5">
                        <p className="text-base font-semibold">
                            Order Number: {order?._id}
                        </p>
                        <p className='text-sm'>Buyer: {order.customer?.fullName}</p>

                        <p className='text-sm'>
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
                            <thead className="text-xs ">
                                <tr className="">
                                    <th className="text-left font-medium">
                                        Item
                                    </th>
                                    <th className="text-center font-medium">
                                        Quantity
                                    </th>
                                    <th className="text-right font-medium">
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
                                                className=" mt-3 flex flex-row flex-nowrap gap-3 "
                                            >
                                                <img
                                                    className="min-h-16 h-16 w-16 min-w-16 rounded object-cover"
                                                    src={
                                                        item.product?.images[0]
                                                    }
                                                    alt=""
                                                />
                                                <p className="text-s font-medium">
                                                    {item.product?.title}
                                                </p>
                                            </td>
                                            <td align="center">
                                                <p>{item?.quantity}</p>
                                            </td>
                                            <td align="right">
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

                    <div className="flex w-full max-w-xs flex-col gap-3 self-end">
                        <p className="flex justify-between">
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
                        <p className="flex justify-between border-b pb-3 font-medium">
                            <span>Subtotal</span>
                            <span>
                                £
                                {parseFloat(
                                    order.transaction_cost?.subtotal
                                ).toFixed(2)}
                            </span>
                        </p>

                        <p className="flex justify-between  border-b pb-3">
                            <span>Delivery</span>
                            <span>
                                £
                                {parseFloat(
                                    order.shipping_option?.cost
                                ).toFixed(2)}
                            </span>
                        </p>

                        <h2 className="mb-3 flex justify-between font-semibold">
                            <span>Refund due to buyer</span>
                            <span>
                                £
                                {parseFloat(
                                    order.transaction_cost?.total
                                ).toFixed(2)}
                            </span>
                        </h2>
                        <div className="flex flex-col gap-3">
                            <p className="text-sm font-semibold">
                                Write an optional message to your buyer?
                            </p>
                            <textarea
                                onChange={(e) =>
                                    setMessage(() => e.target.value)
                                }
                                value={message}
                                name="
                message"
                                id="message"
                                className=" shadow-[0px 0px 2.4px 1px rgba(165, 165, 165, 1)] daisy-textarea daisy-textarea-bordered daisy-textarea-md w-full"
                            ></textarea>
                        </div>

                        <div className="mt-3 flex gap-3 self-end">
                            <button onClick={() => navigate('/admin/orders')} className="theme-btn rounded-full border-2 border-black px-8 py-3 text-sm font-medium">
                                Back
                            </button>
                            <button className="theme-btn rounded-full border-2 border-black bg-black px-8 py-3 text-sm font-medium text-white">
                                Cancel order
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </section>
    );
}

export default CancelOrder;
