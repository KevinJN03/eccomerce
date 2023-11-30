import { Link } from 'react-router-dom';

function Checkout_Item({ product }) {

    return (
        <div className="product-cart">
            <Link
                to={`/product/${product.id}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src={product.images[0]}
                    className="h-28 w-28 object-contain object-center"
                />
            </Link>

            <span className="product-info-container">
                <h3 className="font-bold tracking-wide">
                    £{product.price.current}
                </h3>
                <p id="product-title" className="text-xs">
                    {product.title}
                </p>
                <span className="flex flex-row gap-x-3 font-bold ">
                    {product?.isVariation1Present && (
                        <p>{product?.variationSelect?.variation1?.variation || ''}</p>
                    )}
                    {product?.isVariation2Present && (
                        <p>{product?.variationSelect?.variation2?.variation || ''}</p>
                    )}
                </span>
                <p>
                    Qty: <span className="font-bold">{product.quantity}</span>
                </p>
            </span>
        </div>
    );
}

export default Checkout_Item;
