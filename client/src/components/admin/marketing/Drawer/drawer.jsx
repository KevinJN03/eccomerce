import { Drawer as MuiDrawer, Paper } from '@mui/material';
import SalesDiscountProvider, {
    useSalesDiscountContext,
} from '../../../../context/SalesDiscountContext';
import { CloseRounded } from '@mui/icons-material';
import Container from './Container';
import { useEffect, useRef, useState } from 'react';
import { adminAxios } from '../../../../api/axios.js';
import OfferContextProvider from '../../../../context/offerContext';
function Drawer({}) {
    const { openDrawer, setOpenDrawer, searchParams, setSearchParams } =
        useSalesDiscountContext();

    const handleClose = () => {
        searchParams.delete('offer');
        setSearchParams(() => searchParams);
        setOpenDrawer(() => false);
    };

    return (
        <MuiDrawer
            open={openDrawer}
            onClose={handleClose}
            anchor="right"
            PaperProps={{
                sx: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    width: '50%',
                    height: '100%',
                    backgroundColor: 'white',
                },
            }}
        >
            <section className="relative h-full">
                <div className="absolute left-[-3.5rem] top-0 z-50 h-20 w-12 bg-transparent">
                    <div
                        onClick={handleClose}
                        className="fixed top-2 flex cursor-pointer  items-center justify-center rounded-md border-2 border-white p-2"
                    >
                        <CloseRounded className="!fill-primary/80" />
                    </div>
                </div>
                <OfferContextProvider>
                    <Container />
                </OfferContextProvider>
            </section>
        </MuiDrawer>
    );
}

export default Drawer;
