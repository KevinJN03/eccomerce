import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import dayjs from 'dayjs';
import SingleItem from './singleItem';
import { useAdminOrderContext } from '../../../context/adminOrder';
import OrderItem from './orderItem';
function OrderList({ orderObj }) {
    const formatString = 'DD MMM, YYYY';
    const date = dayjs(orderObj?._id).format(formatString);

    const { status } = useAdminOrderContext();
    return (
        <section className="w-full rounded-md  border-[1px] border-gray-400">
            <div className="flex items-center gap-4 border-b-[1px] border-gray-400 bg-light-grey/30 px-5 py-2">
                <p className="font-medium">
                    {status == 'New' ? 'Ordered' : 'Completed'} {date}
                </p>
                <p className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-center text-s font-semibold">
                    {orderObj.orders?.length}
                </p>
                <p className="text-gray-500 underline underline-offset-1">
                    Select all
                </p>
            </div>

            {orderObj?.orders?.map((order) => {
                return <OrderItem order={order} date={date} />;
            })}
        </section>
    );
}

export default OrderList;
