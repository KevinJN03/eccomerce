import heart from '../../assets/heart.png';

function WishList({ handleClick }) {
    return (
        <div className="wishlist">
            <button
                type="button"
                id="wishlist-btn"
                className="h-full w-full rounded-full border p-3"
            >
                <img src={heart} className="h-full w-full object-cover" />
            </button>
        </div>
    );
}

export default WishList;
