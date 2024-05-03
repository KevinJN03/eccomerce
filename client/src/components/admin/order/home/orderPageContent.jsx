import { useEffect, useReducer, useState, useRef, useMemo } from 'react';

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
import views from '../modalView/modalView';
import '../../home/admin.scss';
import SearchOrder from './searchOrder';
import OptionSelection from './optionSelection';
import AddToPackage from '../modalView/addToPackage/addToPackage';


function OrderPageContent({}) {
    const {
        loading,
        isSearchingOrder,
        openDrawer,
        setOpenDrawer,
        pageCount,
        status,
        setStatus,
        modalOpen,
        setModalOpen,
        ordersData,
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
                                        select: 'new',
                                        amount: pageCount,
                                    },
                                    {
                                        text: 'Complete',
                                        select: 'complete',
                                    },
                                ]}
                            />
                            {loading ? (
                                <section className="mt-14 flex w-full flex-1 justify-center">
                                    <GLoader />
                                </section>
                            ) : (
                                <>
                                    <PageOptions />

                                    <Containers
                                        ordersByDate={
                                            ordersData?.ordersByDate
                                         
                                        }
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
                        // minHeight: '100vh',
                        // height: '100vh',
                        // overflow: 'visible',
                    },
                }}
            >
                <DrawerContainer />
            </Drawer>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(() => false)}
                sx={{
                    overflowY: 'auto',
                }}
            >
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
