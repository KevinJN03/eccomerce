import { Outlet } from 'react-router-dom';

function Index({}) {
    return (
        <section className="gift-card-index w-full">
            <Outlet />
        </section>
    );
}

export default Index;
