import Info from '../common/info';
import Size from './Size';
import WishList from './Wishlist';
import AddToCart from './addToCart';
import Product_Detail from './product_detail';
import Return from './return';
import Shipping from './shipping';
import Similar_Styles from './style_it_with/similar_style';
import Style_It_With from './style_it_with/style_it_with';

function Product_info({
    title,
    price,
    text,
    size,
    details,
    images,
    style_it_with_image,
}) {
    return (
        <section id="Product_info">
            <Info title={title} price={price} text={text} />
            <Size size={size} />
            <div className="adddtocart-wishlist">
                <AddToCart />
                <WishList />
            </div>

            <Shipping />
            <Product_Detail details={details} />
            <Return />
            <Similar_Styles images={images} />
            <Style_It_With products={style_it_with_image} />
        </section>
    );
}

export default Product_info;
