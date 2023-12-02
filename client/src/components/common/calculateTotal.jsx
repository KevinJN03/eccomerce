import { useCart } from '../../context/cartContext';
import calculatePromo from './calculatePromo';

const calculateTotal = () => {
    const { cart, deliveryOption, promo } = useCart();
    const { amount, type } = promo[0];
    let total = 0;
    let savePercent;
    let amountOff = 0;
    let totalAfterPromo = 0;
    for (let item of cart) {
        total += item.price.current * item.quantity;
    }

    const withOutShipping = parseFloat(total).toFixed(2);

    if (type === 'fixed') {
        const newAmount = parseFloat(amount).toFixed(2);
        savePercent = Math.ceil((newAmount * 100) / withOutShipping);

        if (amount > withOutShipping) {
            amountOff = withOutShipping;
        } else {
            amountOff = parseFloat(amount).toFixed(2);
        }
    }
    const newTotal = parseFloat(
        total + (deliveryOption?.cost || 0) - amountOff
    ).toFixed(2);
    const withShipping = newTotal;
  
    return {
        withOutShipping,
        withShipping,
        savePercent,
        amountOff,
    };
};

export default calculateTotal;
