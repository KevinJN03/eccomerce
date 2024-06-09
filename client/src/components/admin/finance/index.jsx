import { Outlet } from 'react-router-dom';

function PaymentIndex({}) {
    return (
        <section className="w-full h-full payment p-10">
            <Outlet />
        </section>
    );
}

export default PaymentIndex;
