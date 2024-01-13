import { useEffect, useReducer, useState } from 'react';
import Datatable from '../components/users/datatable/datatable';
import axios, { adminAxios } from '../../../api/axios';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import column from './column';
import { useAdminContext } from '../../../context/adminContext';
import actionColumn from '../components/users/datatable/actionColumn';
import { SubjectSharp } from '@mui/icons-material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Header from './header';
import SubHeader from './subheader';

import PageOptions from './pageOption';
import OrderItem from './orderItem';
import Containers from './containers';
import SideContainer from './sideContainer';
import NewComplete from './new-complete';
import EmptyOrders from './empty-orders';
import userLogout from '../../../hooks/userLogout';

import AdminOrderContextProvider from '../../../context/adminOrder';
import { Box, Drawer, Modal } from '@mui/material';
import DrawerContainer from './drawerContent/drawerContainer';
import GLoader from '../../Login-SignUp/socialRegister/gloader';
import { adminOrderModalReducer } from '../../../hooks/adminOrderModalReducer';
// import Modal from '../components/modal/modal';
import views from './modalView/modalView';
import '../home/admin.scss';
import SearchOrder from './searchOrder';
function AdminOrder({}) {
    const [loading, setLoading] = useState(true);
    const [selection, setSelection] = useState([]);
    const [ordersByDate, setOrdersByDate] = useState([]);
    const [status, setStatus] = useState('New');
    const { logoutUser } = userLogout();
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
    const [modalContent, adminOrderModalContentDispatch] = useReducer(
        adminOrderModalReducer,
        { type: 'printOrder' }
    );
    const [modalLoad, setModalLoad] = useState(false);
    const [isSearchingOrder, setSearchingOrder] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    const [searchText, setSearchText] = useState('');
    const getCurrentPageResult = (totalNumberOfPage) => {
        // need a start and end point
        // 0 - 1
        // current -1 * order per page
        let remainingAmount = orderPerPage;
        let startingPoint = null;

        if (totalNumberOfPage >= currentPage) {
            startingPoint = orderPerPage * (currentPage - 1);
        } else {
            startingPoint = 0;
            setCurrentPage(1);
        }

        const resultArray = [];

        for (let i = 0; i < ordersByDate.length; i++) {
            if (remainingAmount <= 0) {
                break;
            }
            if (ordersByDate[i].totalDocuments <= startingPoint) {
                startingPoint -= ordersByDate[i].totalDocuments;
                continue;
            } else {
                const newOrders = ordersByDate[i].orders.slice(
                    startingPoint,
                    remainingAmount
                );

                resultArray.push({
                    ...ordersByDate[i],
                    orders: newOrders,
                });
                startingPoint = 0;
                remainingAmount -= newOrders.length;
            }
        }

        return resultArray;
    };
    const getResultForPage = (orderArray) => {
        const resultArray = [];
        let remainingAmount = orderPerPage;
        const newOrdersArray = orderArray;
        for (let i = 0; i < newOrdersArray.length; i++) {
            // get remain value of order
            if (remainingAmount <= 0) {
                break;
            }
            if (newOrdersArray[i].totalDocuments <= remainingAmount) {
                resultArray.push(newOrdersArray[i]);
                remainingAmount -= newOrdersArray[i].totalDocuments;
            } else {
                const newOrders = newOrdersArray[i].orders.slice(
                    0,
                    remainingAmount
                );

                resultArray.push({
                    ...newOrdersArray[i],
                    orders: newOrders,
                });

                remainingAmount -= newOrders.length;
            }
        }

        return resultArray;
    };

    const fetchData = async () => {
        try {
            const { data } = await adminAxios.post('/orders/all', { status });
            setOrdersByDate(() => data?.ordersByDate || []);

            if (status == 'New') {
                setTotalOrders(() => data?.totalCount);
            }

            const resultForPage = getResultForPage(data?.ordersByDate);
            setAllOrderPerPage(resultForPage);
            setNumberOfPage(Math.ceil(data?.totalCount / orderPerPage));
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
        if (ordersByDate.length > 0) {
            setLoading(() => true);
            // const resultForPage = getResultForPage(ordersByDate);
            // setAllOrderPerPage(resultForPage);
            const totalNumberOfPage = Math.ceil(totalOrders / orderPerPage);
            setAllOrderPerPage(() => getCurrentPageResult(totalNumberOfPage));

            console.log({ totalNumberOfPage });
            setNumberOfPage(totalNumberOfPage);
            setTimeout(() => {
                setLoading(() => false);
            }, 1200);
        }
    }, [orderPerPage]);

    useEffect(() => {
        setLoading(true);

        fetchData();
    }, [status]);
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setLoading(true);

        setAllOrderPerPage(() => getCurrentPageResult(numberOfPage));

        setTimeout(() => {
            setLoading(false);
        }, 1200);
    }, [currentPage]);

    const value = {
        loading,
        setLoading,
        ordersByDate,
        setOrdersByDate,
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
        setModalCheck,
        isSearchingOrder,
        setSearchingOrder,
        searchText,
        setSearchText,
        searchResult,
        setSearchResult,
    };
    return (
        <AdminOrderContextProvider value={value}>
            <section className="order-page ">
                <section className="w-full">
                    <Header />
                    {isSearchingOrder ? (
                        <SearchOrder />
                    ) : (
                        <section className="flex flex-row gap-7">
                            <section className="left flex-[4] px-5">
                                <SubHeader />
                                <NewComplete />
                                {loading ? (
                                    <section className="mt-14 flex min-w-full justify-center">
                                        <GLoader />
                                    </section>
                                ) : (
                                    <>
                                        <PageOptions />

                                        <Containers
                                            ordersByDate={allOrderPerPage}
                                        />
                                    </>
                                )}
                            </section>
                            <SideContainer />
                        </section>
                    )}
                </section>
                <Drawer
                    anchor="right"
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                    PaperProps={{
                        sx: {
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            width: '50%',
                            minHeight: '100vh',
                        },
                    }}
                >
                    <DrawerContainer />
                </Drawer>
                {/* {modalCheck && (
                    <Modal
                        check={modalCheck}
                        setCheck={setModalCheck}
                        ModalContent={views[modalContent]}
                        loading={modalLoad}
                        setLoading={setModalLoad}
                    />
                )} */}
                <Modal
                    open={modalCheck}
                    onClose={() => setModalCheck(() => false)}
                >
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                            maxWidth: '600px',
                        }}
                    >
                        {views[modalContent?.type]}
                    </Box>
                </Modal>
            </section>
        </AdminOrderContextProvider>
    );
}

export default AdminOrder;
