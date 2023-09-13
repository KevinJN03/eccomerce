import Item from './item';

function Collection({products}) {
    const example = {
        title: 'The Forest Drive Short Sleeve Crew Tee - Cream',
        price: '12.00',
        text: '30% Off! Prices As Marked, No Code Needed',
        image: 'https://www.fashionnova.com/cdn/shop/files/06-30-23Studio7_CB_DJ_11-13-47_41_ZDF01K330031_Cream_7912_MP.jpg?v=1688408862',
    };
    return (
        <section id="collection-section">

        {products && products.map(product=> {
            return (
                <Item
            key={product.id}
                image={product.images[0]}
                price={product.price}
                text={example.text}
                title={product.title}
                url={product.id}
            /> 
            )
           
        }) }
            
            
        </section>
    );
}

export default Collection;
