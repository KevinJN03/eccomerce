import _, { forEach } from 'lodash';
import axios from '../api/axios';
import { useCart } from '../context/cartContext';
import { useState, useEffect, useRef } from 'react';
const useFetchDeliveryOptions = (setState) => {
    const { cart } = useCart();
    const [deliveryMap, setDeliveryMap] = useState(new Map());
    const [loadState, setLoadState] = useState(true);
    const abortControllerRef = useRef(new AbortController());

    useEffect(() => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        const fetchData = async () => {
            const deliveryIdSet = new Set();
            for (const { delivery } of cart) {
                console.log({ delivery });

                deliveryIdSet.add(delivery);
            }
            try {
                const { data } = await axios.post(
                    `delivery/many`,
                    {
                        ids: Array.from(deliveryIdSet),
                    },
                    {
                        signal: abortControllerRef.current?.signal,
                    }
                );
                const tempDeliveryMap = new Map();
                for (const element of data) {
                    tempDeliveryMap.set(element._id, element);
                }

                setDeliveryMap(() => tempDeliveryMap);
            } catch (error) {
                console.error('at fetchDeliveryOptions: ', error);
            } finally {
                setLoadState(() => false);
            }
        };

        fetchData();

        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    return { deliveryMap, loadState };
};
export default useFetchDeliveryOptions;
