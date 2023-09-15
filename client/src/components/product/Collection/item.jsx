import Info from '../../common/info';
import { Link } from 'react-router-dom';
import { useGenderCategory } from '../../../hooks/genderCategory';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
function Item({ image, title, price, text, url, }) {
    const [state] = useGenderCategory();
    return (
        <a href={`/${state.gender}/product/${url}`} className="card ">
            <div id="image-wrapper" className="lg:h-[320px] w-full relative">
                <div className='absolute bottom-2 right-0 flex flex-col gap-y-2'>
                   <span className=' text-white text-s font-semibold bg-[var(--primary-2)] px-2 py-1 rounded-l-full'>SELLING FAST</span>  
                   <span className='self-end mr-3 bg-white p-1 rounded-full flex justify-center items-center'><FavoriteBorderRoundedIcon/></span>
                </div>
           

                <img src={image} className="h-full w-full object-cover object-cover" />

                
            </div>
            <Info title={title} price={price} text={text} />
        </a>
    );
}

export default Item;
