import { useCart } from '../../context/cartContext';
import calculatePromo from './calculatePromo';
import _ from 'lodash';
const calculateTotal = () => {
    const { cart, deliveryOption, promo } = useCart();
    const { amount, type } = promo[0];
    let total = 0;
    let savePercent;
    let amountOff = 0;
    let totalAfterPromo = 0;
    let delivery_cost = 0;
    try {
        for (let item of cart) {
            if (_.get(item, 'price.current')) {
                total += _.get(item, 'price.current') * _.get(item, 'quantity');
            }

            const itemDeliveryCost = parseFloat(
                _.get(item, 'shipping_data.cost')
            );
           // console.log({isNumber: _.isNumber(itemDeliveryCost), itemDeliveryCost})
            if (_.isNumber(itemDeliveryCost) && itemDeliveryCost) {
                delivery_cost += itemDeliveryCost;
            }
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
            total + (delivery_cost || 0) - amountOff
        ).toFixed(2);
        const withShipping = newTotal;

        return {
            withOutShipping,
            withShipping,
            savePercent,
            amountOff,
            delivery_cost: parseFloat(delivery_cost).toFixed(2)
        };
    } catch (error) {
        console.error('at calculateTotal: ', error);
    }
};

export default calculateTotal;
