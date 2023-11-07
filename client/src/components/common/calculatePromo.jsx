import { useCart } from '../../context/cartContext';
import { usePromo } from '../../hooks/promoContext';
import calculateTotal from './calculateTotal';
import { useState } from 'react';
const calculatePromo = (index = 0, totalBeforePromo) => {
    let totalAfterPromo = index;
    const { promo } = useCart();

    const { amount, type } = promo[index];

    let savePercent;
    let amountOff = 0;
    if (type == 'fixed') {
        const newAmount = parseFloat(amount).toFixed(2);
        savePercent = Math.ceil((newAmount * 100) / totalBeforePromo);

        amountOff = parseFloat(amount).toFixed(2);
        const newTotal = totalBeforePromo - amountOff;
        // setPromoAfterTotal(newTotal)
        totalAfterPromo = newTotal.toFixed(2);
    }
 
    return { savePercent, amountOff };
};

export default calculatePromo;
