import '../../CSS/item_page.css';
import Main_Image from './Main_image';
import Item_List from './image_list';
import Product_info from './product_info';
import Recommended from './reccommended';
import Reviews from './reviews';
import exampleData from './exampleData';
import { useRef } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import Navigation_Links from '../product/navigationLinks';
function ItemPage() {
    const screenSize = useWindowSize();
    const example = exampleData;
    const imageRef = useRef(null);
    const handleImgChange = (e) => {
        imageRef.current.src = e.target.src
            ? e.target.src
            : imageRef.current.src;
    };
    return (
        <section className="item-page-wrapper">
            <section id="item-page">
                <Navigation_Links className="mt-3 pl-3" />
                <section className="item-section">
                    <Item_List
                        images={example.image}
                        handleImgChange={handleImgChange}
                    />
                    <Main_Image ref={imageRef} images={example.image} />
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
                <Reviews product={example} />
                <div className=" item-page-divider border-5 w-full sm+md:mb-10 lg:!hidden"></div>
                <Recommended />
            </section>
        </section>
    );
}

export default ItemPage;
