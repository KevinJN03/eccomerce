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
import { adminAxios } from '../api/axios.js';
import _, { forEach } from 'lodash';
import { useContent } from './ContentContext';
import { useLocation, useSearchParams } from 'react-router-dom';
const AdminOrderContext = createContext(null);

export const useAdminOrderContext = () => {
    return useContext(AdminOrderContext);
};

export default function AdminOrderContextProvider({ children }) {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const [status, setStatus] = useState(() =>
        location.pathname.split('/').pop()
    );

    const statusRef = useRef(status);

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
    const [filterList, setFilterList] = useState(() => {
        const newFilterList = _.cloneDeep(defaultFilterList);

        const allSearchParams = Object.fromEntries([...searchParams]);

        _.merge(newFilterList[status], allSearchParams);

        ['has_note_from_buyer', 'mark_as_gift'].forEach((property) => {
            const propertyValue = _.get(newFilterList, [status, property]);
            if (_.isString(propertyValue)) {
                _.set(
                    newFilterList,
                    [status, property],
                    Boolean(propertyValue)
                );
                // newFilterList[status][property] = Boolean(
                //     newFilterList[status][property]
                // );
            }
        });

        _.unset(newFilterList[status], 'page');
        _.unset(newFilterList[status], 'order_per_page');
        return newFilterList;
    });

    const defaultMarkGiftSelection = { true: 0, false: 0 };
    const [loading, setLoading] = useState(true);
    const [ordersData, setOrderData] = useState({});

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
    const [orderPerPage, setOrderPerPage] = useState(
        searchParams.get('order_per_page') || 20
    );
    const [currentPage, setCurrentPage] = useState(
        () => searchParams.get('page') || 1
    );
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
    const [triggerFetchData, setTriggerFetchData] = useState(false);
    const { setShowAlert } = useContent();
    const [totalCount, setTotalCount] = useState();
    const [alertObj, setAlertObj] = useState({
        on: true,
        size: 'medium',
        icon: 'sadFace',
        bg: 'bg-red-900',
        msg: 'Failed to find orders. Please try again later.',
    });
    const [markAsComplete, setMarkAsComplete] = useState(false);
    const abortControllerRef = useRef(new AbortController());
    const refreshRef = useRef(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const path = location.pathname.split('/').pop();
        setStatus(() => path);
    }, [location.pathname]);

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
            setCurrentPage(() => data.page);
            searchParams.set('page', data.page);
            setSearchParams(searchParams);
        } catch (error) {
            console.error('error while getting orders', error);
            success = false;
            logoutUser({ error });
        } finally {
            timeoutRef.current = setTimeout(() => {
                setLoading(() => false);

                if (status == 'new') {
                    setTotalCount(() => count);
                }

                if (!success) {
                    setShowAlert(alertObj);
                }
            }, 600);
        }
    };
    const fetchSearchData = async (page = currentPage, text = searchText) => {
        let success = true;
        try {
            clearTimeout(timeoutRef?.current);

            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            setSearchingOrder(() => true);

            const { data } = await adminAxios.post(
                `searchOrder`,
                {
                    searchText: text,
                    limit: orderPerPage,
                    page,
                },

                { signal: abortControllerRef.current.signal }
            );

            setSearchData(() => data);

            setCurrentPage(() => data?.page || 1);
        } catch (error) {
            success = false;

            logoutUser({ error });
        } finally {
            timeoutRef.current = setTimeout(() => {
                setLoading(() => false);

                if (!success) {
                    setShowAlert(alertObj);
                }
            }, 1200);
        }
    };
    useEffect(() => {
        setLoading(true);

        const getParamValue = searchParams.get('searchText');
        if (getParamValue) {
            fetchSearchData(1, getParamValue);
            setSearchText(() => getParamValue);
        } else {
            fetchData();
        }
        return () => {
            abortControllerRef.current?.abort();
            clearTimeout(timeoutRef?.current);
        };
    }, [
        status,
        // filterList,
        orderPerPage,
        triggerFetchData,
        searchParams.get('sort_by'),
        searchParams.get('by_date'),
        searchParams.get('destination'),
        searchParams.get('mark_as_gift'),
        searchParams.get('has_note_from_buyer'),
        searchParams.get('completed_status'),
        searchParams.get('searchText'),
    ]);

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
                setOrderInfo(({ position }) => ({ ...data.order, position }));
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

    const searchForOrder = async (text = searchText) => {
        if (text) {
            setSearchParams({ searchText: text });
        } else {
            searchParams.delete('searchText');

            setSearchParams(searchParams);
        }

        document.activeElement.blur();
    };

    const handleOnClose = () => {
        searchParams.delete('orderId');
        setSearchParams(searchParams);
        setOpenDrawer(() => false);
    };

    const orderInfoAbortController = useRef(new AbortController());

    const handleFetchOrderInfo = async () => {
        let success = false;
        try {
            orderInfoAbortController.current?.abort();
            orderInfoAbortController.current = new AbortController();
            const { data } = await adminAxios.get(
                `order/${searchParams.get('orderId')}`,
                {
                    signal: orderInfoAbortController.current.signal,
                }
            );
            const position = window.pageYOffset;
            setOrderInfo(() => ({ ...data?.order, position }));
            success = true;
        } catch (error) {
            logoutUser({ error });
        } finally {
            if (success) {
                setOpenDrawer(() => true);
            }
        }
    };

    useEffect(() => {
        if (searchParams.get('orderId')) {
            handleFetchOrderInfo();
        } else {
            setOpenDrawer(() => false);
        }

        return () => {
            orderInfoAbortController.current?.abort();
        };
    }, [searchParams.get('orderId')]);

    const handleChangePageNumber = (num) => {
        setLoading(() => true);
        searchParams.set('page', num);
        setSearchParams(searchParams);

        if (searchParams.get('searchText')) {
            fetchSearchData(num);
        } else {
            fetchData(num);
        }
    };

    const handleOrderPerPage = (num) => {
        searchParams.set('order_per_page', num);

        setSearchParams(searchParams);
        setOrderPerPage(parseInt(num));
    };

    const addToPackage = async ({
        orderId,
        setShowActions,
        mark_as_completed,
    }) => {
        try {
            orderInfoAbortController.current?.abort();
            orderInfoAbortController.current = new AbortController();
            const { data } = await adminAxios.get(`order/${orderId}`, {
                signal: orderInfoAbortController.current.signal,
            });
            setOrderInfo(() => ({ ...data?.order }));

            setMarkAsComplete(() => mark_as_completed || false);
            setModalOpen(() => true);

            if (setShowActions) {
                setShowActions(() => false);
            }
        } catch (error) {
            logoutUser({ error });
            console.error(error);

            if (error.response.status != 401) {
                setShowAlert(() => ({
                    on: true,
                    size: 'small',
                    bg: 'bg-red-900',
                    icon: 'sadFace',
                    msg: 'Failed to get order information. Please try again later.',
                }));
            }
        }

        setModalOpen(() => true);
        setShowActions(() => false);
    };
    const value = {
        addToPackage,
        loading,
        setLoading,
        searchForOrder,
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

        fetchSearchData,
        fetchData,
        markGiftSelection,
        setMarkGiftSelection,
        allMarkGiftSelection,
        setAllMarkGiftSelection,
        defaultMarkGiftSelection,
        handleMarkGift,
        searchParams,
        setSearchParams,
        handleOnClose,
        handleFetchOrderInfo,
        handleChangePageNumber,
        handleOrderPerPage,
        statusRef,
        markAsComplete,
        setMarkAsComplete,
    };

    return (
        <AdminOrderContext.Provider value={value}>
            {children}
        </AdminOrderContext.Provider>
    );
}
