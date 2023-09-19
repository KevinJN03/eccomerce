import { usePromo } from '../../hooks/promoContext';
import calculateTotal from './calculateTotal';
import { useState } from 'react';
const calculatePromo = () => {
    const totalBeforePromo = calculateTotal();
    // const [totalAfterPromo, setPromoAfterTotal] = useState(0);

    let totalAfterPromo = 0;
    const { promo } = usePromo();

    const { amount, type } = promo;

    let savePercent;
    let amountOff;
    if (type == 'fixed') {
        const newAmount = parseFloat(amount).toFixed(2);
        savePercent = Math.ceil((newAmount * 100) / totalBeforePromo);

        amountOff = parseFloat(amount).toFixed(2);
        const newTotal = totalBeforePromo - amountOff;
        // setPromoAfterTotal(newTotal)
        totalAfterPromo = newTotal.toFixed(2);
    }
    console.log({ savePercent, amountOff, totalBeforePromo, totalAfterPromo });
    return { savePercent, amountOff,totalAfterPromo };
};

export default calculatePromo;
