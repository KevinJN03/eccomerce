import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import dayjs from 'dayjs';
import SingleItem from './singleItem';
import { useAdminOrderContext } from '../../../context/adminOrder';

function OrderItem({ orderObj }) {
    const formatString = 'DD MMM, YYYY';
    const date = dayjs(orderObj?._id).format(formatString);

    const { status } = useAdminOrderContext();
    return (
        <section className="w-full rounded-md  border-[1px] border-gray-400">
            <div className="flex items-center gap-4 border-b-[1px] border-gray-400 bg-light-grey/30 px-5 py-2">
                <p className="font-medium">{status == 'New' ? 'Shipped by' : 'Completed'} {date}</p>
                <p className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-center text-s font-semibold">
                    {orderObj.orders?.length}
                </p>
                <p className="text-gray-500 underline underline-offset-1">
                    Select all
                </p>
            </div>
            {orderObj?.orders?.map((order) => {
                return (
                    <label
                        key={order?._id}
                        htmlFor="my-drawer-4"
                        className="flex w-full cursor-pointer flex-row p-5 hover:bg-light-grey/30"
                    >
                        <div className="left flex flex-[2] flex-row gap-3">
                            <input
                                type="checkbox"
                                id=""
                                className="daisy-checkbox  daisy-checkbox-sm mt-2 rounded-sm"
                            />
                            <div className="flex-col">
                                <p className="flex flex-row items-center gap-1">
                                    <span className="underline underline-offset-1">
                                        {order.shipping_address?.name}
                                    </span>{' '}
                                    <ArrowDropDownSharpIcon />
                                </p>
                                <p>
                                    <span className="underline underline-offset-1">
                                        #{order?._id}
                                    </span>
                                    <span className="ml-3">
                                        £
                                        {parseFloat(
                                            order.transaction_cost?.total
                                        ).toFixed(2)}
                                    </span>
                                </p>

                                <div className="flex flex-col">
                                    {order.items?.map((itemObj, idx) => {
                                        return (
                                            <SingleItem
                                                itemObj={itemObj}
                                                key={idx}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="right flex flex-1 flex-row">
                            <div className="left flex-[5]">
                                <p className="text-sm font-medium">
                                    Tracked on royal mail
                                </p>
                                <p>Ordered 08 Nov, 2023</p>
                                <div className="my-3 rounded-sm border-[1px] border-gray-400 bg-light-grey p-3">
                                    <p className="text-xxs underline underline-offset-1">
                                        4206245192748903396184000008292471
                                    </p>
                                    <p className="text-xxs font-semibold">
                                        Dispatched on 22 Dec
                                    </p>
                                </div>

                                <div>
                                    <p>
                                        Deliver To{' '}
                                        <ExpandMoreRoundedIcon className="!text-lg" />
                                    </p>
                                    <p className="text-xs font-semibold">
                                        Tamara Venatta
                                    </p>
                                    <p>PALESTINE, IL</p>
                                </div>
                            </div>
                            <div className="right flex-1 p-2"></div>
                        </div>
                    </label>
                );
            })}
        </section>
    );
}

export default OrderItem;
