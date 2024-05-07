import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import dayjs from 'dayjs';
import SingleItem from './singleItem';
import { useAdminOrderContext } from '../../../../context/adminOrder';
import OrderItem from './orderItem';
import { useState } from 'react';
import _ from 'lodash';
import { getName } from 'country-list';
function OrderList({ orderObj }) {
    const formatString = 'DD MMM, YYYY';
    const { status, setSelectionSet, selectionSet } = useAdminOrderContext();

    const [text, setText] = useState(() => {
        if (orderObj?.byDestination) {
            return `${_.upperFirst(orderObj.city)}, ${getName(orderObj.country) || orderObj.country}`;
        } else {
            return `${status == 'New' ? 'Ordered' : 'Completed'} ${dayjs(orderObj?._id).format(formatString)}`;
        }
    });

    const [orderIDArray, setOrderIDArray] = useState(() =>
        orderObj.orders?.map((order) => order?._id)
    );
    const toggleSelection = () => {
        setSelectionSet((prevSet) => {
            const newSet = new Set(prevSet);

            let counter = 0;
            orderIDArray.map((id) => {
                if (prevSet.has(id)) {
                    counter++;
                }
            });

            if (counter == orderIDArray.length) {
                orderIDArray.forEach((id) => {
                    newSet.delete(id);
                });
            } else {
                orderIDArray.forEach((id) => newSet.add(id));
            }

            return newSet;
        });
    };
    const isAllItemInSelection = orderIDArray.every((id) =>
        selectionSet.has(id)
    );
    return (
        <section className="w-full rounded-md  border-[1px] border-gray-400">
            <div className="flex items-center gap-4 border-b-[1px] border-gray-400 bg-light-grey/30 px-5 py-2">
                <p className="font-medium">{text}</p>
                <p className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-center text-s font-semibold">
                    {orderObj.orders?.length}
                </p>
                <p
                    className="cursor-pointer text-gray-500 underline underline-offset-1"
                    onClick={toggleSelection}
                >
                    {isAllItemInSelection ? 'Deselect all' : 'Select all'}
                </p>
            </div>

            {orderObj?.orders?.map((order, idx) => {
                return (
                    <OrderItem
                        disableCheckBox={false}
                        order={order}
                        lastOrderInArray={idx + 1 == orderObj?.totalDocuments}
                    />
                );
            })}
        </section>
    );
}

export default OrderList;
