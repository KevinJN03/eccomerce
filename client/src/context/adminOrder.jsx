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
    const [loading, setLoading] = useState(true);
    const [ordersData, setOrderData] = useState({});
    const [status, setStatus] = useState('new');
    const { logoutUser } = UserLogout();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [orderInfo, setOrderInfo] = useState({});
    const [selectionSet, setSelectionSet] = useState(() => new Set());
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

    const [pageCount, setPageCount] = useState();
    const abortControllerRef = useRef(new AbortController());

    const fetchData = async () => {
        let count = null;
        try {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            setSelectionSet(() => new Set());
            const { data } = await adminAxios.post(
                '/orders/all',
                {
                    status,
                    filter: filterList[status],
                    limit: orderPerPage,
                    page: currentPage,
                },
                { signal: abortControllerRef.current.signal }
            );

            setOrderData(() => data);
            count = data?.pageCount;

            setAllOrdersId(() =>
                _.flatMapDeep(_.get(data, 'ordersByDate'), (element) => {
                    return _.map(_.get(element, 'orders'), '_id');
                })
            );

            // setCurrentPage(1);
        } catch (error) {
            console.error('error while getting orders', error);
            logoutUser({ error });
        } finally {
            setTimeout(() => {
                setLoading(false);

                if (status == 'new') {
                    setPageCount(() => count);
                }
            }, 1200);
        }
    };
    const fetchSearchData = async () => {
        try {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            setSearchingOrder(() => true);
            const { data } = await adminAxios.post(
                `searchOrder`,
                {
                    searchText,
                },

                { signal: abortControllerRef.current.signal }
            );

            setSearchData(() => data);
        } catch (error) {
            console.error('error while getting search result', error);
            logoutUser({ error });
        } finally {
            setTimeout(() => {
                setSearchDataLoading(() => false);
            }, 1200);
        }
    };
    useEffect(() => {
        setLoading(true);
        fetchData();

        return () => {
            abortControllerRef.current?.abort();
        };
    }, [status, filterList, currentPage, orderPerPage]);

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
        pageCount,
        setPageCount,
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
    };

    return (
        <AdminOrderContext.Provider value={value}>
            {children}
        </AdminOrderContext.Provider>
    );
}
