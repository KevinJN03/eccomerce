import { useEffect, useState } from 'react';
import { useCart } from '../../../context/cartContext';
import axios from '../../../api/axios';

import dayjs from 'dayjs';
import fetchDeliveryOptions from '../../../hooks/fetchDeliveryOption';

function Shipping_Option({ disable }) {
    const { cart, setDeliveryOption, deliveryOption } = useCart();
    const today = dayjs();

    const [profiles, setProfiles] = useState([]);

    fetchDeliveryOptions(setProfiles);

    const handleDelivery = (e) => {
        setDeliveryOption(() => JSON.parse(e.target.value));
    };

    return (
        <>
            {profiles.map(({ name, cost, processingTime, _id }, idx) => {
                const addUnit = processingTime.type == 'weeks' ? 'week' : 'day';
                const newDeliveryDate = today.add(processingTime.end, addUnit);
                return (
                    <div className="shipping_option" key={_id}>
                        <p className="font-semibold">
                            {cost ? `£ ${cost}` : 'FREE'}
                        </p>
                        <div className="shipping-option-detail">
                            <p className="text-sm font-semibold">{name}</p>
                            <p>
                                Delivered on or before{' '}
                                {newDeliveryDate.format('dddd, D MMMM, YYYY')}
                            </p>
                        </div>
                        <input
                            disabled={disable}
                            type="radio"
                            name="delivery"
                            defaultChecked={
                                deliveryOption.id == _id || idx == 0
                            }
                            value={JSON.stringify({ cost, name })}
                            onChange={handleDelivery}
                        ></input>
                    </div>
                );
            })}
        </>
    );
}

export default Shipping_Option;
