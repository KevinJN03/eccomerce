import { Link } from 'react-router-dom';

function Checkout_Item({
    id,
    image,
    price,
    title,
    quantity,
    variation1,
    className,
    variation2,
}) {
    return (
        <div className={`${className || ''} flex flex-row gap-5`}>
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

            <span className="product-info-container text-inherit">
                <h3 className="font-bold tracking-wide text-inherit">£{price}</h3>
                <p id="product-title" className="text-xs text-inherit">
                    {title}
                </p>
                <span className="flex flex-row gap-x-3 font-bold text-inherit">
                    {variation1 && <p className='text-inherit'>{variation1}</p>}
                    {variation2 && <p className='text-inherit'>{variation2}</p>}
                </span>
                <p className='text-inherit'>
                    Qty: <span className="font-bold text-inherit">{quantity}</span>
                </p>
            </span>
        </div>
    );
}

export default Checkout_Item;
