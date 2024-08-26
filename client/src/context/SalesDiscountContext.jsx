import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAdminContext } from './adminContext';
import { adminAxios } from '../api/axios';
import { useSearchParams } from 'react-router-dom';
import PromoCode from '../components/admin/marketing/classes/promo_code';
import GiftCard from '../components/admin/marketing/classes/giftCard';
const SalesDiscountContext = createContext();

export const useSalesDiscountContext = () => {
    return useContext(SalesDiscountContext);
};

export const dateFormat = 'D MMM YYYY';

export const offerTypes = {
    promo_code: PromoCode,
    gift_card: GiftCard,
};

function SalesDiscountProvider({ children }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [allOffers, setAllOffers] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const [offerType, setOfferType] = useState('promo_code');
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const { logoutUser } = useAdminContext();
    const abortControllerRef = useRef(new AbortController());
    const [selectedOfferType, setSelectedOfferType] = useState('promo_code');
    const [showCustomPicker, setShowCustomPicker] = useState(!false);
    const [showAction, setShowAction] = useState(false);

    const [overallPerformance, setOverallPerformance] = useState({
        orders_with_discount: 0,
        average_order_value: 0,
        revenue_from_discounts: 0,
    });

    const [option, setOption] = useState({
        text: 'This month',
        value: 'this_month',
    });

    const timeoutRef = useRef();
    const performanceAbortController = useRef(new AbortController());
    useEffect(() => {
        const fetchCategoryAndOffers = async () => {
            try {
                //
                abortControllerRef.current?.abort();
                abortControllerRef.current = new AbortController();
                setLoading(() => true);

                const { data: couponData } = await adminAxios.get(
                    selectedOfferType == 'promo_code'
                        ? 'coupon/all'
                        : 'giftcard/all',

                    {
                        signal: abortControllerRef.current.signal,
                    }
                );

                setAllOffers(() => couponData);
            } catch (error) {
                logoutUser({ error });
                console.error(error.message, error);
            } finally {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => {
                    setLoading(() => false);
                }, 200);
            }
        };

        fetchCategoryAndOffers();
        return () => {
            clearTimeout(timeoutRef.current);
            abortControllerRef.current?.abort();
        };
    }, [selectedOfferType]);

    useEffect(() => {
        const fetchOverallPerformance = async () => {
            try {
                performanceAbortController.current?.abort();
                performanceAbortController.current = new AbortController();

                const { data } = await adminAxios.post(
                    '/offer/overall-performance',
                    option,
                    { signal: performanceAbortController.current.signal }
                );

                setOverallPerformance(() => data);
            } catch (error) {
                logoutUser({ error });
                console.error(error.message, error);
            }
        };
        fetchOverallPerformance();
    }, [option]);

    const value = {
        anchorEl,
        setAnchorEl,
        // selectedId,
        // setSelectedId,
        modalOpen,
        setModalOpen,
        btnLoading,
        setBtnLoading,
        allOffers,
        setAllOffers,
        openDrawer,
        setOpenDrawer,
        searchParams,
        setSearchParams,
        dateFormat,
        selectedId,
        setSelectedId,
        offerType,
        setOfferType,
        loading,
        setLoading,
        selectedOfferType,
        setSelectedOfferType,
        showCustomPicker,
        setShowCustomPicker,
        option,
        setOption,
        showAction,
        setShowAction,
        overallPerformance,
        // setOverallPerformance,
    };
    return (
        <SalesDiscountContext.Provider value={value}>
            {children}
        </SalesDiscountContext.Provider>
    );
}

export default SalesDiscountProvider;
