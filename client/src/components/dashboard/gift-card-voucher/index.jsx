import { Outlet } from 'react-router-dom';

function Index({}) {
    return (
        <section className="gift-card-index">
            <Outlet />
        </section>
    );
}

export default Index;
