import Info from '../../common/info';
import {Link} from 'react-router-dom';
import { useProducts } from '../../../hooks/ScrapeData/scrape';
function Item({ image, title, price, text, url }) {
    const [state] = useProducts()
    return (
        <a href={`/${state.category}/product/${url}`} className="card ">
            <div id="image-wrapper" className="h-full w-full">
                <img src={image} className="h-full w-full object-cover" />
            </div>
            <Info title={title} price={price} text={text} />
        </a>
    );
}

export default Item;
