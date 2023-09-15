import Info from '../../common/info';
import { Link } from 'react-router-dom';
import { useGenderCategory } from '../../../hooks/genderCategory';
function Item({ image, title, price, text, url, }) {
    const [state] = useGenderCategory();
    return (
        <a href={`/${state.gender}/product/${url}`} className="card ">
            <div id="image-wrapper" className="h-full w-full">
                <img src={image} className="h-full w-full object-cover" />
            </div>
            <Info title={title} price={price} text={text} />
        </a>
    );
}

export default Item;
