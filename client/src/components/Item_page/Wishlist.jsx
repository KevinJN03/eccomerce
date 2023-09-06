// import heart from '../../assets/heart.png';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
function WishList({ handleClick }) {
    return (
        <div className="wishlist">
            <button
                type="button"
                id="wishlist-btn"
                className="h-full w-full flex justify-center items-center rounded-full border sm+md:p-0 sm+md:h-11 sm+md:w-11"
            >
                {/* <img src={heart} className="h-full w-full object-cover" /> */}
                {/* <Heart/> */}
                <FavoriteBorderSharpIcon className='lg:!text-4xl'/>
            </button>
        </div>
    );
}

export default WishList;
