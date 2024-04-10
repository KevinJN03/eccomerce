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

    const abortControllerRef = useRef(new AbortController());

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
            dispatch({ new_items: data.items, type: 'UPDATE' });
            setIsUpdated(() => true);
            setStateMap(
                () =>
                    new Map(data.items?.map((item) => [item?.product_id, item]))
            );
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
            dispatch({ new_items: data.items, type: 'UPDATE' });
            setIsUpdated(() => true);
        } catch (error) {
            console.error('error while adding item', error);
        } finally {
            const timeout = setTimeout(() => {
                setIsHover(() => ({ on: false, menu: null }));

                debugger;
            }, 3000);
            setIsHover(() => ({
                on: true,
                menu: 'cart',
                timeout,
                addToCart: true,
            }));
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
            dispatch({ new_items: data.items, type: 'UPDATE' });

            // fetchItems({ disableRefresh: true });
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
            // fetchItems({ disableRefresh: true });

            dispatch({ new_items: data.items, type: 'UPDATE' });
        } catch (error) {
            console.error('error while updating item property', error);
        }
    };

    const value = {
        [property]: state.items,
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
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Cart_Wishlist_Context;
