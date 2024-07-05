import { Outlet } from 'react-router-dom';
import SalesDiscountProvider from '../../../context/SalesDiscountContext';

function Marketing({}) {
    return (
        <SalesDiscountProvider>
            <section className="">
                <Outlet />
            </section>
        </SalesDiscountProvider>
    );
}

export default Marketing;
