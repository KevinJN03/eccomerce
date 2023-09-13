import { Link } from "react-router-dom";

function Checkout_Item({ product }) {
    return (
        
            <div className="product-cart">
                <Link to=''>
                <img
                    src={product.images[0]}
                    className="h-28 w-28 object-contain object-center"
                />
                </Link>
                
                <span className="product-info-container">
                    <h3 className="font-bold tracking-wide">
                        £{product.price}
                    </h3>
                    <p id="product-title" className="text-xs">
                        {product.title}
                    </p>
                    <span className="flex flex-row gap-4 font-bold ">
                        <p>{product.color}</p>
                        <p>{product.selectedSize}</p>
                    </span>
                    <p>
                        Qty:{' '}
                        <span className="font-bold">{product.quantity}</span>
                    </p>
                </span>
            </div>
      
    );
}

export default Checkout_Item;
