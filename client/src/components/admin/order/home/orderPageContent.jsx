import { useEffect, useReducer, useState, useRef } from 'react';

import Header from './header';
import SubHeader from './subheader';

import PageOptions from './pageOption';
import Containers from './containers';
import SideContainer from './sideContainer';

import AdminOrderContextProvider, {
    useAdminOrderContext,
} from '../../../../context/adminOrder';
import { Box, Drawer, Modal } from '@mui/material';
import DrawerContainer from '../drawerContent/drawerContainer';
import GLoader from '../../../Login-SignUp/socialRegister/gloader';
import { adminOrderModalReducer } from '../../../../hooks/adminOrderModalReducer';
// import Modal from '../components/modal/modal';
import views from '../modalView/modalView';
import '../../home/admin.scss';
import SearchOrder from './searchOrder';
import { adminAxios } from '../../../../api/axios';
import OptionSelection from './optionSelection';

function OrderPageContent({}) {
    const {
        loading,
        isSearchingOrder,
        resultMap,
        openDrawer,
        setOpenDrawer,
        modalCheck,
        setModalCheck,
        modalContent,
        currentPage,
        totalOrders,
        status,
        setStatus,
    } = useAdminOrderContext();

    return (
        <section className="order-page ">
            <section className="w-full">
                <Header />
                {isSearchingOrder ? (
                    <SearchOrder />
                ) : (
                    <section className="flex flex-row gap-7">
                        <section className="left flex-[4] px-5">
                            <SubHeader />
                            <OptionSelection
                                status={status}
                                setStatus={setStatus}
                                options={[
                                    {
                                        text: 'New',
                                        amount: totalOrders,
                                    },
                                    {
                                        text: 'Complete',
                                    },
                                ]}
                            />
                            {loading ? (
                                <section className="mt-14 flex min-w-full justify-center">
                                    <GLoader />
                                </section>
                            ) : (
                                <>
                                    <PageOptions />

                                    <Containers
                                        ordersByDate={resultMap.get(
                                            currentPage
                                        )}
                                    />
                                </>
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
        </section>
    );
}

export default OrderPageContent;
