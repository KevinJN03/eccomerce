import axios from '../api/axios';
import { useCart } from '../context/cartContext';
import { useState, useEffect } from 'react';
const fetchDeliveryOptions = (setState) => {
    const { cart } = useCart();
    
    useEffect(() => {
        console.log('fetch render');
        const deliveryMap = new Map();
        const deliveryArray = [];
        cart.map((item) => {
            item?.delivery.map((delivery) => {
                if (!deliveryMap.has(delivery)) {
                    deliveryMap.set(delivery);
                    deliveryArray.push(delivery);
                }
            });
        });
        deliveryArray;

        const controller = new AbortController();

        axios
            .get(`delivery/many/${JSON.stringify(deliveryArray)}`, {
                signal: controller.signal,
            })
            .then(({ data }) => {
                setState(() => data);
            })
            .catch((error) => {
                'error at fetching delivery: ', error;
            });

        return () => {
            controller.abort();
        };
    }, []);
};
export default fetchDeliveryOptions;
