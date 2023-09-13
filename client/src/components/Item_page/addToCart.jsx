import { useCart } from '../../context/cartContext';

function AddToCart({ product }) {
    const  [state, dispatch ]= useCart();

    const handleClick = () => {
        dispatch({ type: 'add', product: product });
    };
    console.log('state:', state);
    return (
        <button id="add-to-cart" onClick={handleClick}>
            Add to bag
        </button>
    );
}

export default AddToCart;
