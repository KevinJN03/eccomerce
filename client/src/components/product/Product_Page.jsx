import Filter from './Filter';
import '../../CSS/product_page.css';
import Collection from './Collection/collection';
function Product_Page() {
    return (
        <>
            <section id="product_page">
                <Filter />
                <Collection />
            </section>
        </>
    );
}

export default Product_Page;
