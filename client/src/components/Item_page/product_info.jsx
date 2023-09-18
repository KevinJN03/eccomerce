import Info from '../common/info';
import Size from './Size';
import WishList from './Wishlist';
import AddToCart from './addToCart';
import Product_Detail from './product_detail';
import Return from './return';
import Shipping from './shipping';
import Similar_Styles from './style_it_with/similar_style';
import Style_It_With from './style_it_with/style_it_with';

import { useState } from 'react';

function Product_info({
    title,
    price,
    text,
    size,
    details,
    images,
    style_it_with_image,
    product,
}) {
    const [select, setSelect] = useState(null);

    const handleClick = (e) => {
        console.log(e.target.value);
        setSelect(e.target.value);
    };

    return (
        <section id="Product_info">
            <Info title={title} price={price} text={text} />
            <Size size={size} select={select} handleClick={handleClick} />
            <div className="adddtocart-wishlist">
                <AddToCart product={product} selectSize={select} />
                <WishList />
            </div>

            <Shipping />
            <div className=" flex flex-col border-t-[thin] sm:mx-4 sm+md:mb-10 sm+md:gap-0 lg:mt-6">
                {/* flex flex-col sm+md:gap-4 sm+md:border-t-2 sm:pt-3 sm+md:mb-4 */}
                <Product_Detail details={details} />
                <Return />
            </div>
            <section className="similar-style-with-container flex sm:mx-4 sm+md:flex-col-reverse sm+md:gap-8 lg:mt-12 lg:flex-col">
                <Similar_Styles images={images} />
                <Style_It_With products={style_it_with_image} />
            </section>
        </section>
    );
}

export default Product_info;
