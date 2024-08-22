import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAdminContext } from './adminContext';
import { adminAxios } from '../api/axios';
import { useSearchParams } from 'react-router-dom';

const SalesDiscountContext = createContext();

export const useSalesDiscountContext = () => {
    return useContext(SalesDiscountContext);
};
function SalesDiscountProvider({ children }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [allOffers, setAllOffers] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [dateFormat, setDateFormat] = useState(() => 'D MMM YYYY');
    const [offerType, setOfferType] = useState('promo_code');

    const [selectedId, setSelectedId] = useState(null);
    const { logoutUser } = useAdminContext();
    const abortControllerRef = useRef(new AbortController());
    const onMountAbortControllerRef = useRef(new AbortController());

    useEffect(() => {
        const fetchCategoryAndOffers = async () => {
            try {
                //

                const { data: couponData } = await adminAxios.get(
                    'coupon/all',

                    {
                        signal: onMountAbortControllerRef.current.signal,
                    }
                );

                setAllOffers(() => couponData);
            } catch (error) {
                logoutUser({ error });
            }
        };

        fetchCategoryAndOffers();
        return () => {
            abortControllerRef.current?.abort();
            onMountAbortControllerRef.current?.abort();
        };
    }, []);

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
        offerType, setOfferType
    };
    return (
        <SalesDiscountContext.Provider value={value}>
            {children}
        </SalesDiscountContext.Provider>
    );
}

export default SalesDiscountProvider;
