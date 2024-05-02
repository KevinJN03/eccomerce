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
    const [totalDocuments, setTotalDocuments] = useState(null);
    const [status, setStatus] = useState('new');
    const { logoutUser } = UserLogout();
    const [totalOrders, setTotalOrders] = useState(0);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [orderInfo, setOrderInfo] = useState({});
    const [selectionSet, setSelectionSet] = useState(() => new Set());
    const [checkAllSelection, setCheckAllSelection] = useState(false);
    const [orderPerPage, setOrderPerPage] = useState(20);
    const [allOrderPerPage, setAllOrderPerPage] = useState([]);
    const [numberOfPage, setNumberOfPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageOrders, setCurrentPageOrders] = useState([]);
    const [modalCheck, setModalCheck] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const [modalContent, adminOrderModalContentDispatch] = useReducer(
        adminOrderModalReducer,
        { type: 'printOrder' }
    );
    const [isSearchingOrder, setSearchingOrder] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [resultMap, setResultMap] = useState(() => new Map());
    const [filterList, setFilterList] = useState(defaultFilterList);
    const abortControllerRef = useRef(new AbortController());
    const getCurrentPageResult = (totalNumberOfPage) => {
        let remainingAmount = orderPerPage;
        let startingPoint = null;
        if (totalNumberOfPage >= currentPage) {
            startingPoint = orderPerPage * (currentPage - 1);
        } else {
            startingPoint = 0;
            setCurrentPage(1);
        }

        const resultArray = [];

        for (let i = 0; i < ordersData.ordersByDate.length; i++) {
            if (remainingAmount <= 0) {
                break;
            }
            if (ordersData.ordersByDate[i].totalDocuments <= startingPoint) {
                startingPoint -= ordersData.ordersByDate[i].totalDocuments;
                continue;
            } else {
                const newOrders = ordersData.ordersByDate[i].orders.slice(
                    startingPoint,
                    remainingAmount
                );

                resultArray.push({
                    ...ordersData.ordersByDate[i],
                    orders: newOrders,
                });
                startingPoint = 0;
                remainingAmount -= newOrders.length;
            }
        }

        return resultArray;
    };

    const getResultMap = () => {
        let counter = 1;

        let remainingAmount = orderPerPage;
        const map = new Map();
        const orderArray = [...ordersData.ordersByDate];

        for (let i = 0; i < orderArray.length; i++) {
            if (remainingAmount <= 0) {
                // counter++;
                remainingAmount = orderPerPage;
                console.log('hit 0');
            }

            if (orderArray[i].totalDocuments <= remainingAmount) {
                if (!map.has(counter)) {
                    map.set(counter, [orderArray[i]]);
                } else {
                    const counterArray = map.get(counter);
                    map.set(counter, [...counterArray, orderArray[i]]);
                }

                remainingAmount -= orderArray[i].totalDocuments;
            } else {
                let slicePoint = 0;

                const iterateCount = Math.ceil(
                    orderArray[i].totalDocuments / orderPerPage
                );

                // iterate count need to be checked
                // 1
                for (let j = 0; j <= iterateCount; j++) {
                    if (remainingAmount <= 0) {
                        remainingAmount = orderPerPage;
                        counter++;
                    }
                    if (!map.has(counter)) {
                        map.set(counter, []);
                    }
                    const counterArray = map.get(counter);
                    const newOrders = orderArray[i].orders.slice(
                        slicePoint,
                        remainingAmount
                    );

                    map.set(counter, [
                        ...counterArray,
                        { ...orderArray[i], orders: newOrders },
                    ]);
                    slicePoint += newOrders.length;
                    remainingAmount -= newOrders.length;
                }

                slicePoint = 0;
            }
        }

        return map;
    };

    const fetchData = async () => {
        try {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            console.log({ filter: filterList[status] });
            const { data } = await adminAxios.post(
                '/orders/all',
                {
                    status,
                    filter: filterList[status],
                },
                { signal: abortControllerRef.current.signal }
            );
            setOrderData(() => data);

            if (status == 'new') {
                setTotalOrders(() => data?.totalCount);
            }
            setTotalDocuments(() => data?.totalCount);
            setCurrentPage(1);
        } catch (error) {
            console.error('error while getting orders', error);
            logoutUser({ error });
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1200);
        }
    };

    useEffect(() => {
        setLoading(true);

        fetchData();

        return () => {
            abortControllerRef.current?.abort();
        };
    }, [status, filterList]);

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1200);

        return () => {
            clearTimeout(timeout);
        };
    }, [currentPage]);

    useEffect(() => {
        if (ordersData.ordersByDate?.length > 0) {
            const totalNumberOfPage = Math.ceil(
                ordersData?.totalCount / orderPerPage
            );
            const resultForPage = getCurrentPageResult(totalNumberOfPage);

            setNumberOfPage(Math.ceil(totalDocuments / orderPerPage));

            const newResultMap = getResultMap();
            console.log(newResultMap);

            setResultMap(() => newResultMap);
            // setAllOrderPerPage(()=> newResultMap.get(currentPage));
        } else {
            setResultMap(() => new Map());
        }
    }, [ordersData]);

    useEffect(() => {
        setLoading(true);

        if (ordersData.ordersByDate?.length > 0) {
            if (
                Math.ceil(ordersData?.totalCount / orderPerPage) < currentPage
            ) {
                setCurrentPage(() => 1);
            }

            const newResultMap = getResultMap();
            console.log(newResultMap);

            setResultMap(() => newResultMap);
        }

        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1200);

        return () => {
            clearTimeout(timeout);
        };
    }, [orderPerPage]);

    const value = {
        loading,
        setLoading,
        status,
        setStatus,
        totalOrders,
        setTotalOrders,
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
        numberOfPage,
        setNumberOfPage,
        currentPage,
        setCurrentPage,
        currentPageOrders,
        setCurrentPageOrders,
        allOrderPerPage,
        modalContent,
        adminOrderModalContentDispatch,
        modalCheck,
        setModalCheck,
        isSearchingOrder,
        setSearchingOrder,

        searchResult,
        setSearchResult,
        ordersData,
        setOrderData,
        resultMap,
        searchedTerm,
        setSearchTerm,
        searchText,
        setSearchText,
        modalOpen,
        filterList,
        setFilterList,
        setModalOpen,
        defaultFilterList,
    };

    return (
        <AdminOrderContext.Provider value={value}>
            {children}
        </AdminOrderContext.Provider>
    );
}
