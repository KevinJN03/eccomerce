import {
    createContext,
    useContext,
    useReducer,
    useState,
    useEffect,
    useRef,
} from 'react';
import { adminOrderModalReducer } from '../hooks/adminOrderModalReducer';
import UserLogout from '../hooks/userLogout';
import { adminAxios } from '../api/axios';
import _ from 'lodash';
import { useContent } from './ContentContext';
const AdminOrderContext = createContext(null);

export const useAdminOrderContext = () => {
    return useContext(AdminOrderContext);
};

export default function AdminOrderContextProvider({ children }) {
    const defaultFilterList = {
        new: {
            sort_by: 'dispatch by date',
            by_date: 'all',
            destination: 'all',
            mark_as_gift: false,
            has_note_from_buyer: false,
            completed_status: 'received',
        },
        complete: {
            completed_status: 'all',
            sort_by: 'dispatch by date',
            destination: 'all',
            mark_as_gift: false,
            has_note_from_buyer: false,
        },
    };

    const defaultMarkGiftSelection = { true: 0, false: 0 };
    const [loading, setLoading] = useState(true);
    const [ordersData, setOrderData] = useState({});
    const [status, setStatus] = useState('new');
    const { logoutUser } = UserLogout();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [orderInfo, setOrderInfo] = useState({});
    const [selectionSet, setSelectionSet] = useState(() => new Set());

    const [markGiftSelection, setMarkGiftSelection] = useState(
        defaultMarkGiftSelection
    );
    const [allMarkGiftSelection, setAllMarkGiftSelection] = useState(
        defaultMarkGiftSelection
    );

    const [checkAllSelection, setCheckAllSelection] = useState(false);
    const [orderPerPage, setOrderPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageOrders, setCurrentPageOrders] = useState([]);
    const [modalCheck, setModalCheck] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchData, setSearchData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [allOrderIds, setAllOrdersId] = useState([]);
    const [modalContent, adminOrderModalContentDispatch] = useReducer(
        adminOrderModalReducer,
        { type: 'printOrder' }
    );
    const [isSearchingOrder, setSearchingOrder] = useState(false);
    const [filterList, setFilterList] = useState(defaultFilterList);
    const [triggerFetchData, setTriggerFetchData] = useState(false);
    const [searchDataLoading, setSearchDataLoading] = useState(false);
    const { setShowAlert } = useContent();
    const [totalCount, setTotalCount] = useState();

    const [alertObj, setAlertObj] = useState({
        on: true,
        size: 'medium',
        icon: 'sadFace',
        bg: 'bg-red-900',
        msg: 'Failed to find orders. Please try again later.',
    });
    const abortControllerRef = useRef(new AbortController());
    const refreshRef = useRef(false);
    const timeoutRef = useRef(null);
    const fetchData = async (page = currentPage) => {
        let count = null;
        let success = true;
        try {
            clearTimeout(timeoutRef?.current);
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            setSelectionSet(() => new Set());
            setMarkGiftSelection(() => defaultMarkGiftSelection);
            const { data } = await adminAxios.post(
                '/orders/all',
                {
                    status,
                    filter: filterList[status],
                    limit: orderPerPage,
                    page,
                },
                { signal: abortControllerRef.current.signal }
            );

            setOrderData(() => data);
            count = data?.totalCount;

            const markAsGiftObj = _.cloneDeep(defaultMarkGiftSelection);

            const getAllIds = _.flatMapDeep(
                _.get(data, 'ordersByDate'),
                (element) => {
                    return _.map(_.get(element, 'orders'), (value) => {
                        // markAsGiftObj.add(value?.mark_as_gift || false);
                        markAsGiftObj[value?.mark_as_gift || false] += 1;
                        return value._id;
                    });
                }
            );

            setAllMarkGiftSelection(() => markAsGiftObj);
            setAllOrdersId(() => getAllIds);
            refreshRef.current = false;
            setCurrentPage(() => data?.page || 1);
        } catch (error) {
            console.error('error while getting orders', error);
            success = false;
            logoutUser({ error });
        } finally {
            timeoutRef.current = setTimeout(() => {
                setLoading(false);

                if (status == 'new') {
                    setTotalCount(() => count);
                }

                if (!success) {
                    setShowAlert(alertObj);
                }
            }, 600);
        }
    };
    const fetchSearchData = async (page = currentPage) => {
        let success = true;
        try {
            clearTimeout(timeoutRef?.current);

            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            setSearchingOrder(() => true);

            const { data } = await adminAxios.post(
                `searchOrder`,
                {
                    searchText,
                    limit: orderPerPage,
                    page,
                },

                { signal: abortControllerRef.current.signal }
            );

            setSearchData(() => data);

            setCurrentPage(() => data?.page || 1);
        } catch (error) {
            console.error('error while getting search result', error);
            success = false;

            logoutUser({ error });
        } finally {
            timeoutRef.current = setTimeout(() => {
                setSearchDataLoading(() => false);

                if (!success) {
                    setShowAlert(alertObj);
                }
            }, 1200);
        }
    };
    useEffect(() => {
        setLoading(true);
        // fetchData();
        if (isSearchingOrder) {
            fetchSearchData();
        } else {
            fetchData();
        }
        return () => {
            abortControllerRef.current?.abort();
            clearTimeout(timeoutRef?.current);
        };
    }, [status, filterList, orderPerPage]);

    useEffect(() => {
        if (isSearchingOrder) {
            fetchSearchData();
        } else {
            fetchData();
        }

        return () => {
            abortControllerRef.current?.abort();
        };
    }, [triggerFetchData]);

    // useEffect(() => {
    //     setLoading(true);
    //     const timeout = setTimeout(() => {
    //         setLoading(false);
    //     }, 1200);

    //     return () => {
    //         clearTimeout(timeout);
    //     };
    // }, [currentPage]);

    const handleMarkGift = async ({
        orderId,
        setShowActions,
        mark_as_gift,
    }) => {
        try {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            const { data } = await adminAxios.post(
                `/order/mark_as_gift`,
                {
                    id: orderId,
                    mark_as_gift,
                },
                { signal: abortControllerRef.current.signal }
            );
            setLoading(() => true);

            setTriggerFetchData((prevState) => !prevState);
            if (data?.updateOrderInfo != false) {
                setOrderInfo(() => data.order);
            }

            setShowAlert(() => ({
                on: true,
                size: 'large',
                bg: 'bg-green-100',
                icon: 'check',
                msg: 'Gift status updated successfully',
                text: 'text-black',
            }));
        } catch (error) {
            logoutUser({ error });
            if (error.response.status != 401) {
                setShowAlert(() => ({
                    on: true,
                    size: 'small',
                    bg: 'bg-red-900',
                    icon: 'sadFace',
                    msg: 'Failed to update gift status. Please try again later.',
                }));
            }
        } finally {
            setShowActions(() => false);
        }
    };
    const value = {
        loading,
        setLoading,
        status,
        setStatus,
        openDrawer,
        setOpenDrawer,
        orderInfo,
        setOrderInfo,
        selectionSet,
        setSelectionSet,
        checkAllSelection,
        setCheckAllSelection,
        orderPerPage,
        setOrderPerPage,
        totalCount,
        setTotalCount,
        currentPage,
        setCurrentPage,
        currentPageOrders,
        setCurrentPageOrders,
        modalContent,
        adminOrderModalContentDispatch,
        modalCheck,
        setModalCheck,
        isSearchingOrder,
        setSearchingOrder,
        ordersData,
        setOrderData,
        searchText,
        setSearchText,
        modalOpen,
        filterList,
        setFilterList,
        setModalOpen,
        defaultFilterList,
        allOrderIds,
        setAllOrdersId,
        triggerFetchData,
        setTriggerFetchData,
        searchData,
        setSearchData,
        searchDataLoading,
        setSearchDataLoading,
        fetchSearchData,
        fetchData,
        markGiftSelection,
        setMarkGiftSelection,
        allMarkGiftSelection,
        setAllMarkGiftSelection,
        defaultMarkGiftSelection,
        handleMarkGift,
    };

    return (
        <AdminOrderContext.Provider value={value}>
            {children}
        </AdminOrderContext.Provider>
    );
}
