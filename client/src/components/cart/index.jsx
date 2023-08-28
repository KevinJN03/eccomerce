import { useEffect } from 'react';
import '../../CSS/cart.css';
import heart from '../../assets/heart.png';
import QTY_SIZE_OPTION from './qty-size-options';
import Cart_Item from './cart-item';
import Total from './total';
function Cart({}) {

    const product = {
        img: 'https://images.asos-media.com/products/dr-martens-garin-sandals-in-back-brando-leather/203997482-1-black',
        title: 'Dr Martens Garin sandals in back brando leather',
        color: 'BLACK',
        size: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        price: 90.99,
    };
    return (
        <>
            <section id="cart-page">
                <div className="cart">
                    <div className="cart-header">
                        <h1 className='font-black text-xl font-gotham tracking-wide'>MY BAG</h1>
                        <p className='text-sm'>Items are reserved for 60 minutes</p>
                    </div>
                    <div className='product-cart-wrapper'>
                       <Cart_Item product={product}/>
                    <Cart_Item product={product}/>
                    <Cart_Item product={product}/> 
                    </div>
                   
                    
                </div> 
                <Total/>
            </section>
        </>
    );
}

export default Cart;
