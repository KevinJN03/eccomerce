import '../../CSS/item_page.css';
import Main_Image from './Main_image';
import Item_List from './image_list';
import Product_info from './product_info';
import Recommended from './reccommended';
import Reviews from './reviews';
import exampleData from './exampleData';

import {useWindowSize} from "@uidotdev/usehooks"
import Navigation_Links from '../product/navigationLinks';
function ItemPage() {
 const screenSize = useWindowSize()
    const example = exampleData
const product = {
    img : "https://www.fashionnova.com/cdn/shop/files/07-06-23Studio7_ID_DJ_09-23-39_13_ZDF01K330031_DarkBrown_11321_CM.jpg?v=1689116450",
    title : ""
}
    return (
        <section id="item-page">
            <Navigation_Links className="pl-3 mt-3"/>
            <section className="item-section">
                <Item_List images={example.image}/>
                <Main_Image images={screenSize.width > 980 ?[ example.image[0]]: example.image}/>
                <Product_info
                    price={example.price}
                    text={example.text}
                    title={example.title}
                    size={example.size}
                    details={example.details}
                    images={example.similar_styles_images}
                    style_it_with_image={example.style_it_with_image}
                />
            </section>
            <Reviews product={example}/>
            <div className='item-page-divider w-full border-5 sm+md:mb-10'></div>
            <Recommended />
        </section>
    );
}

export default ItemPage;
