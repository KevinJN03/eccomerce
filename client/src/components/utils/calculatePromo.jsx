import { useCart } from '../../context/cartContext';

const calculatePromo = (promo, withOutShipping) => {
    try {
        let savePercent = 0;
        let amountOff = 0;
        const { type, amount } = promo;
        if (type === 'fixed') {
            const newAmount = parseFloat(amount).toFixed(2);
            savePercent = Math.round((newAmount * 100) / withOutShipping);

            if (amount > withOutShipping) {
                amountOff = withOutShipping;
            } else {
                amountOff = parseFloat(amount).toFixed(2);
            }
        }

        if (type === 'percentage') {
            // deduct promo amount based on percentage of item cost

            const discountedAmount = (amount * withOutShipping) / 100;
            if (discountedAmount > withOutShipping) {
                amountOff = withOutShipping;
            } else {
                amountOff = discountedAmount;
                savePercent = Math.ceil(
                    (discountedAmount * 100) / withOutShipping
                );
            }
        }

        return { savePercent, amountOff: parseFloat(amountOff).toFixed(2) };
    } catch (error) {
        console.error('error while calculating promo', error);
    }
};

export default calculatePromo;
