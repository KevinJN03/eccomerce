import { useEffect, useState } from 'react';
import { useCart } from '../../../context/cartContext';
import axios from '../../../api/axios';

import dayjs from 'dayjs';
import fetchDeliveryOptions from '../../../hooks/fetchDeliveryOption';
import { useCheckoutContext } from '../../../context/checkOutContext';

function Shipping_Option({ disable }) {
    const { cart, setDeliveryOption, deliveryOption } = useCart();
    const { setDeliveryDate } = useCheckoutContext();
    const today = dayjs();

    const [profiles, setProfiles] = useState([]);
    
    fetchDeliveryOptions(setProfiles);

    const handleDelivery = (e) => {
        const { id, cost, name, delivery_date } = e.target.dataset;
        setDeliveryOption(() => ({ id, cost: parseFloat(cost), name }));
        setDeliveryDate(() => delivery_date);
    };

    const generateDeliveryDate = ({ processingTime }) => {
        const addUnit = processingTime.type == 'weeks' ? 'week' : 'day';
        const newDeliveryDate = today.add(processingTime.end, addUnit);

        const newFormatDate = newDeliveryDate.format('dddd, D MMMM, YYYY');

        return newFormatDate;
    };

    useEffect(() => {
        if (!deliveryOption?.id && profiles.length >= 1) {
            console.log({ deliveryOption });
            const { _id, cost, name, processingTime } = profiles[0];

            const delivery_date = generateDeliveryDate({
                processingTime,
            });
            setDeliveryDate(() => delivery_date);

            setDeliveryOption({ id: _id, cost, name });
            return;
        }

        if (deliveryOption?.id && profiles.length >= 1) {
            const findOption = profiles.find(
                (item) => item?._id == deliveryOption?.id
            );

            const delivery_date = generateDeliveryDate({
                processingTime: findOption?.processingTime,
            });
            setDeliveryDate(() => delivery_date);
        }
    }, [profiles]);

    return (
        <>
            {profiles.map(({ name, cost, processingTime, _id }, idx) => {
                const addUnit = processingTime.type == 'weeks' ? 'week' : 'day';
                const newDeliveryDate = today.add(processingTime.end, addUnit);

                const newFormatDate =
                    newDeliveryDate.format('dddd, D MMMM, YYYY');
                return (
                    <div className="shipping_option" key={_id}>
                        <p className="font-semibold">
                            {cost ? `£ ${cost}` : 'FREE'}
                        </p>
                        <div className="shipping-option-detail">
                            <p className="text-sm font-semibold">{name}</p>
                            <p>Delivered on or before {newFormatDate}</p>
                        </div>
                        <input
                            disabled={disable}
                            type="radio"
                            name="delivery"
                            data-delivery_date={newFormatDate}
                            defaultChecked={
                                deliveryOption.id == _id || cost == 0
                            }
                            data-id={_id}
                            data-cost={cost}
                            data-name={name}
                            onChange={handleDelivery}
                        ></input>
                    </div>
                );
            })}
        </>
    );
}

export default Shipping_Option;
