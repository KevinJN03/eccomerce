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
