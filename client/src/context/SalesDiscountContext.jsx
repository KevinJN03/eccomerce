import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAdminContext } from './adminContext';
import { adminAxios } from '../api/axios';

const SalesDiscountContext = createContext();

export const useSalesDiscountContext = () => {
    return useContext(SalesDiscountContext);
};
function SalesDiscountProvider({ children }) {
    const [showAction, setShowAction] = useState(!false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedId, setSelectedId] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [modalView, setModalView] = useState(1);
    const [listingIdsSet, setListingIdsSet] = useState(new Set());
    const [chosenListings, setChosenListings] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [categories, setCategories] = useState([]);

    const [details, setDetails] = useState({
        type: 'fixed',
        order_minimum: 'none',
        no_end_date: false,
        custom: false,
        listings_type: 'all',
    });
    const [btnLoading, setBtnLoading] = useState(false);

    const clearError = (field) => {
        setErrors(({ [field]: prop, ...prevState }) => prevState);
    };

    const errorStyle = '!border-red-700 !bg-red-100';
    const { logoutUser } = useAdminContext();
    const abortCOntrollerRef = useRef(new AbortController());

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                //
                const { data } = await adminAxios.get(
                    'category/all'

                    //   {
                    //     signal: abortControllerRef.current.signal,
                    // }
                );

                setCategories(() =>
                    data.map(({ men, women, ...items }) => ({
                        ...items,
                        listings: [...men, ...women],
                    }))
                );
            } catch (error) {
                logoutUser({ error });
            }
        };

        fetchCategory();
        return () => {
            abortCOntrollerRef.current?.abort();
        };
    }, []);

    const handleContinue = async () => {
        try {
            setBtnLoading(() => true);
            abortCOntrollerRef.current?.abort();
            abortCOntrollerRef.current = new AbortController();

            const { data } = await adminAxios.post('/coupon/create', details, {
                signal: abortCOntrollerRef.current?.signal,
            });

            setModalView((prevState) => prevState + 1);
        } catch (error) {
            logoutUser({ error });

            if (error.response.status == 400) {
                setErrors(() => error.response.data);
                setModalView(() => 1);
            }
        } finally {
            setBtnLoading(() => false);
        }
    };

    const value = {
        showAction,
        setShowAction,
        anchorEl,
        setAnchorEl,
        selectedId,
        setSelectedId,
        modalOpen,
        setModalOpen,
        errors,
        setErrors,
        details,
        setDetails,
        clearError,
        errorStyle,
        handleContinue,
        btnLoading,
        setBtnLoading,
        modalView,
        setModalView,
        listingIdsSet,
        setListingIdsSet,
        chosenListings,
        setChosenListings,
        searchResult,
        setSearchResult,
        showSearchResult,
        setShowSearchResult,
        searchText,
        setSearchText,
        isSearching,
        setIsSearching,
        categories,
        setCategories,
    };
    return (
        <SalesDiscountContext.Provider value={value}>
            {children}
        </SalesDiscountContext.Provider>
    );
}

export default SalesDiscountProvider;
