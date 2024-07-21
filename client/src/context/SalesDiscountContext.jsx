import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAdminContext } from './adminContext';
import { adminAxios } from '../api/axios';
import { useSearchParams } from 'react-router-dom';

const SalesDiscountContext = createContext();

export const useSalesDiscountContext = () => {
    return useContext(SalesDiscountContext);
};
function SalesDiscountProvider({ children, initialDetails }) {
    const [anchorEl, setAnchorEl] = useState(null);
    // const [selectedId, setSelectedId] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [modalView, setModalView] = useState(1);

    const [categories, setCategories] = useState([]);
    const [categoriesMap, setCategoriesMap] = useState(new Map());
    const [chosenMap, setChosenMap] = useState(new Map());
    const [openDrawer, setOpenDrawer] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [allOffers, setAllOffers] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [dateFormat, setDateFormat] = useState(() => 'D MMM YYYY');

    const { logoutUser } = useAdminContext();
    const abortControllerRef = useRef(new AbortController());
    const onMountAbortControllerRef = useRef(new AbortController());

    useEffect(() => {
        const fetchCategoryAndOffers = async () => {
            try {
                //

                const [{ data }, { data: couponData }] = await Promise.all([
                    adminAxios.get(
                        'category/all',

                        {
                            signal: onMountAbortControllerRef.current.signal,
                        }
                    ),
                    adminAxios.get(
                        'coupon/all',

                        {
                            signal: onMountAbortControllerRef.current.signal,
                        }
                    ),
                ]);

                const newCategory = [];
                const newCategoryMap = new Map();

                data.forEach(({ men, women, count, ...element }) => {
                    newCategoryMap.set(element?._id, {
                        ...element,
                        listings: [],
                    });

                    newCategory.push({
                        ...element,
                        listings: [...men, ...women],
                    });
                });

                setCategoriesMap(() => newCategoryMap);
                setCategories(() => newCategory);
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
        categoriesMap,

        anchorEl,
        setAnchorEl,
        // selectedId,
        // setSelectedId,
        modalOpen,
        setModalOpen,
        btnLoading,
        setBtnLoading,

        categories,
        setCategories,
        allOffers,
        setAllOffers,
        openDrawer,
        setOpenDrawer,
        searchParams,
        setSearchParams,
        dateFormat,
    };
    return (
        <SalesDiscountContext.Provider value={value}>
            {children}
        </SalesDiscountContext.Provider>
    );
}

export default SalesDiscountProvider;
