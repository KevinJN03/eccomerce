function Card({ product }) {
    return (
        <section id="Card">
            <div className="stye-with-img-wrapper">
                <img src={product.src}></img>
            </div>
            <div className="style-with-info">
                <p>{product.title}</p>
                <p>{product.price.toFixed(2)}</p>
            </div>
        </section>
    );
}

export default Card;
