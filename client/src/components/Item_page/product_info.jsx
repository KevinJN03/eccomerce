import Info from '../common/info';
import Select from './Select';
import Size from './Size';
import WishList from './Wishlist';
import AddToCart from './addToCart';
import Product_Detail from './product_detail';
import Return from './return';
import Shipping from './shipping';
import Similar_Styles from './style_it_with/similar_style';
import Style_It_With from './style_it_with/style_it_with';

import { useEffect, useState } from 'react';

function Product_info({
    title,
    price,
    text,
    size,
    details,
    images,
    style_it_with_image,
    product,
    color,
}) {
    const [sizeSelect, setSizeSelect] = useState(
        product.size.length == 1 ? product.size[0].size : null
    );

    const [colorSelect, setColorSelect] = useState(
        product.color.length == 1 ? product.color[0] : null
    );
    const [error, setError] = useState(false);

    useEffect(() => {
        if (error) {
            setError(() => false);
        }
    }, [sizeSelect, colorSelect]);
    return (
        <section id="product-info">
            <Info title={title} price={price} text={text} />
            {/* <Size size={size} select={select} handleClick={handleClick} /> */}


            <Select
                array={color}
                text={'COLOUR'}
                single={color[0]}
                setSelect={setColorSelect}
            />
            <Select
                array={product.size}
                property={'size'}
                text={'SIZE'}
                single={product.size[0].size}
                setSelect={setSizeSelect}
            />

            {error && (
                <div className="error-box mb-4 bg-red-100 px-3 py-2 text-sm">
                    Please select from the available colour and size options.
                </div>
            )}
            <div className="adddtocart-wishlist">
                <AddToCart
                    product={product}
                    sizeSelect={sizeSelect}
                    colorSelect={colorSelect}
                    setError={setError}
                />
                <WishList />
            </div>

            <Shipping />
            <div className=" flex flex-col border-t-[thin] sm:mx-4 sm+md:mb-10 sm+md:gap-0 lg:mt-6">
                {/* flex flex-col sm+md:gap-4 sm+md:border-t-2 sm:pt-3 sm+md:mb-4 */}
                <Product_Detail details={details} />
                <Return />
            </div>
            <section className="similar-style-with-container flex sm:mx-4 sm+md:flex-col-reverse sm+md:gap-8 lg:mt-5 lg:flex-col">
                <Similar_Styles images={images} />
                {/* <Style_It_With products={style_it_with_image} /> */}
            </section>
        </section>
    );
}

export default Product_info;
