import { useCart } from '../../context/cartContext';
import {v4 as uuidv4 }from 'uuid'
function AddToCart({ product, selectSize }) {
    const  [state, dispatch ]= useCart();

    const handleClick = () => {
        const newProduct = {...product}
        newProduct.selectSize = selectSize
        newProduct.cartId = uuidv4()
        newProduct.quantity = 1
    dispatch({ type: 'add', product: newProduct })

        
    };
    console.log('state:', state);
    return (
        <button id="add-to-cart" onClick={handleClick}>
            Add to bag
        </button>
    );
}

export default AddToCart;
