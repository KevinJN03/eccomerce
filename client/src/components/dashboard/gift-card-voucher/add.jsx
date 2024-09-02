import { Link, Outlet, useLocation } from 'react-router-dom';
import Divider from '../divider.jsx';
import useCurrentLocation from '../../../hooks/useCurrentLocation.jsx';

const Button = ({ text, link }) => {
    return (
        <Link
            to={link}
            className=" w-4/6 border-2 py-[10px] text-center font-bold tracking-wider transition-all hover:bg-gray-200"
        >
            {text}
        </Link>
    );
};
function Add({}) {
    const { currentLocation } = useCurrentLocation();
    return (
        <>
            {' '}
            {currentLocation == 'add' ? (
                <section className="gift-card-add">
                    <div className="flex flex-col items-center justify-center bg-white p-4">
                        <h2 className="mb-6 self-start text-xl font-bold">
                            ADD GIFT CARD​/VOUCHER
                        </h2>
                        <Button text={'GIFT CARD'} link={'card'} />
                        <Divider />
                        <Button text={'GIFT VOUCHER'} link={'voucher'} />
                    </div>
                </section>
            ) : (
                <Outlet />
            )}
        </>
    );
}

export default Add;
