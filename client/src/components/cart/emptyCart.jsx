import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { Link } from 'react-router-dom';
import { useGenderCategory } from '../../hooks/genderCategory';
function Empty_Cart({}) {
    const [state] = useGenderCategory();
    const gender = state.category;
    return (
        <section className="emptyCart flex w-[90vw] flex-col items-center gap-3 self-center">
            <LocalMallOutlinedIcon className="!text-4xl" />
            <p className="text-lg font-bold">Your bag is empty</p>
            <p className="max-w-sm text-center">
                Items remain in your bag for 60 minutes, and then they’re moved
                to your Saved Items.
            </p>
            <Link
                to="wishlist"
                className="w-full max-w-[300px] bg-[var(--green)] py-3 text-center text-s font-bold tracking-wider text-white"
            >
                VIEW SAVED ITEMS
            </Link>
            <Link to={`/${gender}/product`} className="text-s underline">
                Continue Shopping
            </Link>
        </section>
    );
}

export default Empty_Cart;
