import Item from './item';

function Collection({ products }) {
    return (
        <section id="collection-section">
            {products &&
                products.map((product) => {
                    return (
                        <Item
                            key={product._id}
                            image={product.images[0]}
                            price={
                                product?.price?.current ||
                                product?.minVariationPrice
                            }
                            title={product.title}
                            url={product._id}
                        />
                    );
                })}
        </section>
    );
}

export default Collection;
