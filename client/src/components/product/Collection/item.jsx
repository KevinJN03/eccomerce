import Info from '../../common/info';
import { Link } from 'react-router-dom';
import { useGenderCategory } from '../../../hooks/genderCategory';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
function Item({ image, title, price, text, url }) {
    const [state] = useGenderCategory();
    return (
        <a href={`/${state.gender}/product/${url}`} className="card ">
            <div id="image-wrapper" className="relative w-full lg:h-[320px]">
                <div className="absolute bottom-2 right-0 flex flex-col gap-y-2">
                    <span className=" rounded-l-full bg-[var(--primary-2)] px-2 py-1 text-s font-semibold text-white sm:text-xs   sm:font-medium">
                        SELLING FAST
                    </span>
                    <span className="mr-3 flex items-center justify-center self-end rounded-full bg-white p-1">
                        <FavoriteBorderRoundedIcon />
                    </span>
                </div>

                <img
                    loading="lazy"
                    src={image}
                    className="h-full w-full object-cover object-cover"
                />
            </div>
            <Info title={title} price={price} text={text} />
        </a>
    );
}

export default Item;
