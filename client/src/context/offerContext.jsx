import { createContext, useContext, useRef, useState } from 'react';
import { useSalesDiscountContext } from './SalesDiscountContext';
import { adminAxios } from '../api/axios';
import { useAdminContext } from './adminContext';

const OfferContext = createContext();

export const useOfferContext = () => {
    return useContext(OfferContext);
};
const defaultDetails = {
    type: 'fixed',
    order_minimum: 'none',
    no_end_date: false,
    custom: false,
    listings_type: 'all',
};
function OfferContextProvider({ initialDetails, newValue, children }) {
    const [showAction, setShowAction] = useState(!false);
    const [listingIdsSet, setListingIdsSet] = useState(new Set());
    const [chosenListings, setChosenListings] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [chosenMap, setChosenMap] = useState(new Map());
    const [details, setDetails] = useState(initialDetails || defaultDetails);
    const [isSearching, setIsSearching] = useState(false);
    const [errors, setErrors] = useState({});
    const [btnLoading, setBtnLoading] = useState(false);
    const [modalView, setModalView] = useState(1);

    const { logoutUser } = useAdminContext();

    const {
        categoriesMap,
        setCategoriesMap,
        categories,
        setCategories,
        modalOpen,
        setModalOpen,
    } = useSalesDiscountContext();

    const clearError = (field) => {
        setErrors(({ [field]: prop, ...prevState }) => prevState);
    };
    const errorStyle = '!border-red-700 !bg-red-100';

    const abortControllerRef = useRef(null);

    const handleContinue = async () => {
        try {
            setBtnLoading(() => true);
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            const { data } = await adminAxios.post(
                '/coupon/create',
                {
                    ...details,
                    listings: Array.from(listingIdsSet),
                    create: modalView == 3 ? true : false,
                },
                {
                    signal: abortControllerRef.current?.signal,
                }
            );

            if (data?.created) {
                setDetails(() => data);
            }
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

    const reset = () => {
        setModalOpen(() => false);
        setModalView(() => 1);
        setChosenListings(() => []);
        setDetails(() => defaultDetails);
        setErrors(() => ({}));
        setSearchResult(() => []);
        setShowSearchResult(() => false);
        setSearchText(() => '');
    };
    const generateDiscountText = () => {
        return `${
            details?.type == 'fixed'
                ? `${parseFloat(details?.amount).toLocaleString('en-GB', {
                      style: 'currency',
                      currency: 'GBP',
                  })} GBP`
                : `${details.amount}% off`
        }`;
    };

    const value = {
        reset,
        btnLoading,
        setBtnLoading,
        handleContinue,
        showAction,
        setShowAction,
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
        chosenMap,
        setChosenMap,
        details,
        setDetails,
        isSearching,
        setIsSearching,
        chosenMap,
        setChosenMap,
        errors,
        setErrors,
        clearError,
        modalView,
        setModalView,
        errorStyle,
        ...newValue,
        generateDiscountText
    };
    return (
        <OfferContext.Provider value={value}>{children}</OfferContext.Provider>
    );
}

export default OfferContextProvider;
