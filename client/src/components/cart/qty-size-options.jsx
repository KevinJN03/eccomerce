import { Link } from 'react-router-dom';
import { useCart } from '../../context/cartContext';

function QTY_SIZE_OPTION({ options, label, type, selectSize }) {
    return (
        <span id="qty-size-option">
            <label htmlFor="qty-size-select">{label}</label>
            <select name="quantity-select" id="qty-size-select">
                {options.map((num, index) => {
                    return (
                        <option
                            key={index}
                            value={type == 'size' ? num.size : num}
                            selected={num.size == selectSize}
                        >
                            {type == 'size' ? num.size : num}
                        </option>
                    );
                })}
            </select>
        </span>
    );
}

export default QTY_SIZE_OPTION;
export function Checkout_Total({}) {
    const [products] = useCart();

    const product = {
        img: 'https://images.asos-media.com/products/dr-martens-garin-sandals-in-back-brando-leather/203997482-1-black',
        title: 'Dr Martens Garin sandals in back brando leather',
        color: 'BLACK',
        size: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        price: 90.99,
        qty: 1,
        delivery: 'Free',
    };

    return (
        <section id="checkout-total">
            <div className="flex flex-row items-center justify-between border-b-2 pb-4">
                <h1 className="font-gotham font-bold tracking-wider">
                    {products.length} ITEM
                </h1>
                <Link to="/cart">Edit</Link>
            </div>
            <div className="product-container">
                <img
                    src={product.img}
                    className="h-32 w-28 object-contain object-center"
                />
                <span className="product-info-container">
                    <h3 className="font-bold tracking-wide">
                        £{product.price}
                    </h3>
                    <p id="product-title" className="text-xs">
                        {product.title}
                    </p>
                    <span className="flex flex-row gap-4 font-bold ">
                        <p>{product.color}</p>
                        <p>{product.size[0]}</p>
                    </span>
                    <p>
                        Qty: <span className="font-bold">{product.qty}</span>
                    </p>
                </span>
            </div>
            <div className="flex flex-col gap-3">
                <p className="flex justify-between">
                    Subtotal <span>£{product.price}</span>
                </p>
                <p className="flex justify-between">
                    Delivery <span>{product.delivery}</span>
                </p>
                <p className="flex justify-between font-gotham font-bold">
                    TOTAL TO PAY <span>£{product.price}</span>
                </p>
            </div>
        </section>
    );
}
