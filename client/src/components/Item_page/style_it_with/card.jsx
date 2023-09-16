function Card({ product }) {
    return (
        <section id="Card">
            <div className="style-with-img-wrapper">
                <img loading="lazy" src={product.src}></img>
            </div>
            <div className="style-with-info">
                <p>{product.title}</p>
                <p>{product.price.toFixed(2)}</p>
            </div>
        </section>
    );
}

export default Card;
