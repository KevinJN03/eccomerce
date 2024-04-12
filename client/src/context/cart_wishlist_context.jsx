import {
    useReducer,
    createContext,
    useContext,
    useEffect,
    useState,
    useRef,
} from 'react';
import _, { cloneDeep, isEqual } from 'lodash';
import cartReducer, { getCartFromLocalStorage } from '../hooks/cartReducer';
import axios from '../api/axios';
import { useLayoutContext } from './layoutContext';
import objectId from 'bson-objectid';

export function Cart_Wishlist_Context({ children, property, Context }) {
    const [state, dispatch] = useReducer(cartReducer, {
        items: [],
        // _.get(JSON.parse(localStorage.getItem('cart')), 'items') || [],
        shouldFetch: false,
    });

    const [stateMap, setStateMap] = useState(new Map());
    const [promo, setPromo] = useState([{ bool: false }]);
    const [deliveryOption, setDeliveryOption] = useState({});
    const [loading, setLoading] = useState(false);
    const [stateRefresh, setStateRefresh] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const { isHover, setIsHover } = useLayoutContext();

    const [deliveryCost, setDeliveryCost] = useState(0);

    const abortControllerRef = useRef(new AbortController());

    useEffect(() => {
        setStateMap(
            () => new Map(state.items?.map((item) => [item?.product_id, item]))
        );
    }, [state?.items]);

    const fetchItems = async ({ setLoadState, disableRefresh }) => {
        try {
            if (!disableRefresh) {
                setStateRefresh(() => true);
                setLoading(() => true);
            }

            const _id = localStorage.getItem(`${property}_id`);

            const { data } = await axios.get(`/${property}/${_id}`);
            localStorage.setItem(`${property}_id`, data._id);
            console.log(`------ Fetching ${property} ------`);
            console.log(data);
            dispatch({ newData: data, type: 'UPDATE' });
            setIsUpdated(() => true);

            return data;
        } catch (error) {
            console.error(`error fetching ${property}`, error);
        } finally {
            setStateRefresh(() => false);
            if (setLoadState) {
                setLoadState(() => false);
            }

            setTimeout(() => {
                setLoading(() => false);
            }, 1500);
        }
    };

    useEffect(() => {
        fetchItems({});
    }, []);

    const addItem = async ({ itemData }) => {
        try {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            const _id = localStorage.getItem(`${property}_id`);
            const { data } = await axios.post(
                `/${property}/add`,
                { id: _id, itemData },
                { signal: abortControllerRef.current?.signal }
            );  
                      localStorage.setItem(`${property}_id`, data._id);

            dispatch({ newData: data, type: 'UPDATE' });

            setIsUpdated(() => true);
        } catch (error) {
            console.error('error while adding item', error);
        } finally {
            // if (property == 'cart') {
            const timeout = setTimeout(() => {
                setIsHover(() => ({ on: false, menu: null }));

                // debugger;
            }, 3000);
            setIsHover(() => ({
                on: true,
                menu: 'cart',
                timeout,
                addToCart: true,
            }));
            // }
        }
    };

    const removeItem = async ({ itemId }) => {
        try {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            const _id = localStorage.getItem(`${property}_id`);
            const { data } = await axios.get(
                `/${property}/remove?id=${_id}&itemId=${itemId}`,
                { signal: abortControllerRef.current?.signal }
            );
            localStorage.setItem(`${property}_id`, data._id);

            dispatch({ newData: data, type: 'UPDATE' });
        } catch (error) {
            console.error('error while adding item', error);
        }
    };

    const updateItemProperty = async (props) => {
        try {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            const _id = localStorage.getItem(`${property}_id`);
            const { data } = await axios.post(
                `/${property}/updateProperty`,
                {
                    id: _id,
                    ...props,
                },
                { signal: abortControllerRef.current?.signal }
            );
            localStorage.setItem(`${property}_id`, data._id);
            dispatch({ newData: data, type: 'UPDATE' });
        } catch (error) {
            console.error('error while updating item property', error);
        }
    };

    const formatData = ({ product, priceState, variationSelect }) => {
        const newProduct = cloneDeep(product);
        const pickedData = _.pick(newProduct, [
            'variation_data',
            'images',
            'title',
            'delivery',
            'quantity',
            'price',
            'additional_data',
            'shipping_data',
            'stock',
            'status',
        ]);

        if (priceState) {
            _.set(pickedData, 'price.current', priceState);

            if (variationSelect) {
                _.set(
                    pickedData,
                    ['variation_data', 'select'],
                    variationSelect
                );
            }
        }
        _.set(pickedData, 'product_id', product._id);
        _.set(pickedData, '_id', objectId().toString());
        _.set(pickedData, 'quantity', 1);

        return pickedData;
    };

    const value = {
        [property]: state.items,
        stateProps: state,
        dispatch,
        deliveryOption,
        setDeliveryOption,
        promo,
        setPromo,
        loading,
        setLoading,
        stateRefresh,
        setStateRefresh,
        fetchItems,
        addItem,
        removeItem,
        isUpdated,
        setIsUpdated,
        updateItemProperty,
        stateMap,
        formatData,
        deliveryCost,
        setDeliveryCost,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Cart_Wishlist_Context;
