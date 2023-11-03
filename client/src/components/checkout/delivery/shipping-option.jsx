import { useEffect, useState } from 'react';
import { useCart } from '../../../context/cartContext';
import axios from '../../../api/axios';

import dayjs from 'dayjs';

function Shipping_Option({}) {
    const [cart] = useCart();

    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const deliveryMap = new Map();
        const deliveryArray = [];
        debugger;
        cart.map((item) => {
            item?.delivery.map((delivery) => {
                if (!deliveryMap.has(delivery)) {
                    deliveryMap.set(delivery);
                    deliveryArray.push(delivery);
                }
            });
        });
        console.log(deliveryArray);

        const controller = new AbortController();

        axios
            .get(`delivery/many/${JSON.stringify(deliveryArray)}`, {
                signal: controller.signal,
            })
            .then(({ data }) => {
                setProfiles(() => data);
            })
            .catch((error) => {
                console.log('error at delivery: ', error);
            });

        return () => {
            controller.abort();
        };
    }, []);

    const today = dayjs();

    console.log({ today });
    return (
        <>
            {profiles.map(({ name, cost, processingTime }) => {
                const addUnit = processingTime.type == 'weeks' ? 'week' : 'day';
                const newDeliveryDate = today.add(processingTime.end, addUnit);
                return (
                    <div className="shipping_option">
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
                        <input type="radio" name="delivery"></input>
                    </div>
                );
            })}
        </>
    );
}

export default Shipping_Option;
