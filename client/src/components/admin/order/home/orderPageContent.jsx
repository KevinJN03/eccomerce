import { useEffect, useReducer, useState, useRef } from 'react';

import Header from './header';
import SubHeader from './subheader';

import PageOptions from './pageOption';
import Containers from './containers';
import SideContainer from './sideContainer';
import NewComplete from './new-complete';
import userLogout from '../../../../hooks/userLogout';

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
                            <NewComplete />
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

            <Modal open={modalCheck} onClose={() => setModalCheck(() => false)}>
                <Box
                    sx={{
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        maxWidth: '600px',
                        borderRadius: '4px',
                    }}
                >
                    {views[modalContent?.type]}
                </Box>
            </Modal>
        </section>
    );
}

export default OrderPageContent;
