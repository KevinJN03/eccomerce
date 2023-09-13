import { useCart } from '../../context/cartContext';
import {v4 as uuidv4 }from 'uuid'
function AddToCart({ product }) {
    const  [state, dispatch ]= useCart();

    const handleClick = () => {
        let id = uuidv4()
    product.id = id
    
    product.quantity = 1
    dispatch({ type: 'add', product: product })
    console.log(product)
        
    };
    console.log('state:', state);
    return (
        <button id="add-to-cart" onClick={handleClick}>
            Add to bag
        </button>
    );
}

export default AddToCart;
