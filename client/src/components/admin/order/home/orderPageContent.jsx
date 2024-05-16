import { useEffect, useReducer, useState, useRef, useMemo } from 'react';

import Header from './header';
import SubHeader from './subheader';

import PageOptions from './pageOption';
import Containers from './containers';

import AdminOrderContextProvider, {
    useAdminOrderContext,
} from '../../../../context/adminOrderContext';
import { Box, Drawer, Modal, Pagination } from '@mui/material';
import DrawerContainer from '../drawerContent/drawerContainer';
import GLoader from '../../../Login-SignUp/socialRegister/gloader';
import { adminOrderModalReducer } from '../../../../hooks/adminOrderModalReducer';
import views from '../modalView/modalView';
import '../../home/admin.scss';
import SearchOrder from './searchOrder';
import OptionSelection from './optionSelection';
import AddToPackage from '../modalView/addToPackage/addToPackage';
import _ from 'lodash';
import { CloseSharp } from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SideContainer from './sideContainer/sideContainer';

function OrderPageContent({ children }) {
    const {
        loading,
        isSearchingOrder,
        openDrawer,
        totalCount,
        status,
        setStatus,
        modalOpen,
        setModalOpen,
        currentPage,
        ordersData,

        setOrderInfo,
        orderInfo,

        handleOnClose,
        handleChangePageNumber,
    } = useAdminOrderContext();
    const maxPage = _.get(ordersData, 'maxPage');
    const navigate = useNavigate();
    useEffect(() => {
        const element = document.getElementById('order-page');

        if (orderInfo?.position) {
            window.scrollTo(0, orderInfo.position);
        }
    }, [loading]);

    return (
        <section id="order-page" className="order-page h-full min-h-screen ">
            <section className="w-full pb-8 ">
                <Header />
                {isSearchingOrder ? (
                    <SearchOrder />
                ) : (
                    <section className="flex h-full min-h-screen flex-row gap-7">
                        <section className="left flex-[4] pl-5">
                            <SubHeader />
                            <OptionSelection
                                status={status}
                                setStatus={setStatus}
                                options={[
                                    {
                                        text: 'New',
                                        select: 'new',
                                        amount: totalCount,
                                        showAmount: true,
                                        handleClick: () => {
                                            navigate('./new');
                                        },
                                    },
                                    {
                                        text: 'Complete',
                                        select: 'complete',
                                        handleClick: () => {
                                            navigate('./complete');
                                        },
                                    },
                                ]}
                            />
                            {loading ? (
                                <section className="mt-14 flex w-full justify-center">
                                    <GLoader />
                                </section>
                            ) : (
                                <AnimatePresence>
                                    <motion.section
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: 1,
                                            transition: { duration: 0.5 },
                                        }}
                                    >
                                        <PageOptions />
                                        <Outlet />
                                        {maxPage > 1 && (
                                            <Pagination
                                                page={currentPage}
                                                onChange={(e, value) => {
                                                    // setCurrentPage(() => value);
                                                    handleChangePageNumber(
                                                        value
                                                    );
                                                }}
                                                count={maxPage}
                                                variant="outlined"
                                                shape="rounded"
                                            />
                                        )}
                                    </motion.section>
                                </AnimatePresence>
                            )}
                        </section>
                        <SideContainer />
                    </section>
                )}
            </section>
            <Drawer
                style={{ zIndex: 50 }}
                anchor="right"
                open={openDrawer}
                onClose={handleOnClose}
                ModalProps={{
                    onTransitionExited: () => {
                        setOrderInfo(() => ({}));
                    },
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        width: '50%',
                        // minHeight: '100vh',
                        // height: '100vh',
                        // overflow: 'visible',
                    },
                }}
            >
                <section className="relative">
                    <div className="absolute left-[-4rem] top-0 z-50 h-20 w-12 border-4 border-red-500 bg-transparent">
                        <div
                            onClick={handleOnClose}
                            className="fixed top-2 flex cursor-pointer  items-center justify-center rounded-md border-2 border-white p-2"
                        >
                            <CloseSharp className="!fill-primary/80" />
                        </div>
                    </div>
                    <DrawerContainer />
                </section>
            </Drawer>
            <Modal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(() => false);
                }}
                sx={{
                    overflowY: 'auto',
                }}
            >
                {/* <div className=''>
                    X
                </div> */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '10%',
                        // top: '0%',

                        left: '50%',

                        transform: 'translate(-50%, -0%)',
                        boxSizing: 'border-box',
                        maxWidth: '1200px',
                        width: '75vw',

                        borderRadius: '4px',
                        // display: 'flex',
                        // justifyContent: 'center',
                        border: 'none',
                    }}
                >
                    <AddToPackage />
                </Box>
            </Modal>
        </section>
    );
}

export default OrderPageContent;
