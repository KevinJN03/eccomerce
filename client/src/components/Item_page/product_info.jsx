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
    color,
}) {
    const [sizeSelect, setSizeSelect] = useState(
        product.size.length == 1 ? product.size[0].size : null
    );

    const [colorSelect, setColorSelect] = useState( product.color.length == 1 ? product.color[0] : null);

    const handleClick = (e) => {
        console.log(e.target.value);
        setSelect(e.target.value);
    };
    return (
        <section id="product-info">
            <Info title={title} price={price} text={text} />
            {/* <Size size={size} select={select} handleClick={handleClick} /> */}

            {color?.length == 1 && (
                <p className="mb-2 text-sm">
                    {' '}
                    <span className="text-s font-bold  tracking-wide">
                        COLOUR:{' '}
                    </span>
                    {color.join(', ')}
                </p>
            )}

            {color?.length > 1 && (
                <section>
                    <p className="mb-2 text-s font-bold tracking-wide">
                        COLOUR:
                    </p>
                    <select
                        onChange={(e) => setColorSelect(e.target.value)}
                        className="item-select select mb-3 min-h-0  min-w-full rounded-none border-[1px] border-black !outline-none focus:!drop-shadow-2xl"
                    >
                        <option value={null}>Please Select</option>
                        {color.map((item, index) => {
                            return (
                                <option value={item} key={index}>
                                    {item}
                                </option>
                            );
                        })}
                    </select>
                </section>
            )}
            <section>
                <p className="mb-2 text-s font-bold tracking-wider"> SIZE: </p>
                <select
                    onChange={(e) => setSizeSelect(e.target.value)}
                    className="item-select select mb-4 min-h-0  min-w-full rounded-none border-[1px] border-black !outline-none focus:!drop-shadow-2xl"
                >
                    <option value={null}>Please Select</option>
                    {size.map((item, index) => {
                        return (
                            <option value={item.size} key={index}>
                                {item.size}
                            </option>
                        );
                    })}
                </select>
            </section>
            <div className="adddtocart-wishlist">
                <AddToCart
                    product={product}
                    sizeSelect={sizeSelect}
                    colorSelect={colorSelect}
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
