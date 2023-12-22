import { Link } from 'react-router-dom';

function Checkout_Item({
 
    id,
    image,
    price,
    title,
    quantity,
    variation1,
    variation2,
}) {
    return (
        <div className="flex flex-row gap-5">
            <Link
                to={`/product/${id}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src={image}
                    className="h-28 w-28 object-contain object-center"
                />
            </Link>

            <span className="product-info-container">
                <h3 className="font-bold tracking-wide">£{price}</h3>
                <p id="product-title" className="text-xs">
                    {title}
                </p>
                <span className="flex flex-row gap-x-3 font-bold ">
                    {variation1 && <p>{variation1}</p>}
                    {variation2 && <p>{variation2}</p>}
                </span>
                <p>
                    Qty: <span className="font-bold">{quantity}</span>
                </p>
            </span>
        </div>
    );
}

export default Checkout_Item;
