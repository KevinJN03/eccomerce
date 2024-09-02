import Info from '../../common/info';
import Similar_Styles from './similar_style';

function Style_It_With({ products }) {
    return (
        <section className="style-it-with w-full">
            <h3 className="mb-3 text-xl font-extrabold">STYLE IT WITH</h3>
            <section className="style-with-card">
                {products.map((product, index) => {
                    return (
                        <div key={index}>
                            <img
                                loading="lazy"
                                src={product.src}
                                className="w-full object-cover"
                            ></img>
                            <Info title={product.title} price={product.price} />
                        </div>
                    );
                })}
            </section>
        </section>
    );
}

export default Style_It_With;
