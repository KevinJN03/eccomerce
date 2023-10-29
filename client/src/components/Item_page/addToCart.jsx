import { useCart } from '../../context/cartContext';
import { v4 as uuidv4 } from 'uuid';
function AddToCart({ product, sizeSelect, colorSelect }) {
    const [state, dispatch] = useCart();

    const handleClick = () => {
        const newProduct = { ...product };
        newProduct.selectSize = sizeSelect;
        newProduct.cartId = uuidv4();
        newProduct.quantity = 1;
        newProduct.price.current = parseFloat(newProduct.price.current);
        newProduct.color = colorSelect;
        dispatch({ type: 'add', product: newProduct });

        console.log({ newProduct });
    };
    console.log('state:', state);
    return (
        <button id="add-to-cart" onClick={handleClick}>
            Add to bag
        </button>
    );
}

export default AddToCart;
