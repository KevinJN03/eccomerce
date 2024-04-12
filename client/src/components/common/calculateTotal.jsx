import { useEffect, useState } from 'react';
import { useCart } from '../../context/cartContext';
import calculatePromo from './calculatePromo';
import _ from 'lodash';
function calculateTotal() {
    const { cart, deliveryOption, promo, deliveryCost, stateProps } = useCart();
    const { amount, type } = promo[0];

    const [values, setValues] = useState({
        withOutShipping: 0,
        withShipping: 0,
        savePercent: 0,
        amountOff: 0,
        delivery_cost: 0,
    });

    useEffect(() => {
        console.log('totalCalculated');

        try {
            let total = 0;
            let savePercent;
            let amountOff = 0;
            let totalAfterPromo = 0;
            let delivery_cost = 0;

            for (const [key, { shipping_costs }] of Object.entries(
                stateProps?.deliveryInfoObj
            )) {
                delivery_cost +=
                    _.get(shipping_costs, [
                        stateProps?.delivery_option?.[key],
                        'cost',
                    ]) || 0;
                    debugger;

            }
            for (let item of cart) {
                if (_.get(item, 'price.current')) {
                    total +=
                        _.get(item, 'price.current') * _.get(item, 'quantity');
                }

                // const itemDeliveryCost = parseFloat(
                //     _.get(item, 'shipping_data.cost')
                // );
                // console.log({isNumber: _.isNumber(itemDeliveryCost), itemDeliveryCost})
                // if (_.isNumber(itemDeliveryCost) && itemDeliveryCost) {
                //     delivery_cost += itemDeliveryCost;
                // }
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

            setValues(() => ({
                withOutShipping,
                withShipping,
                savePercent,
                amountOff,
                delivery_cost: parseFloat(delivery_cost).toFixed(2),
            }));
            // return {

            // };
        } catch (error) {
            console.error('at calculateTotal: ', error);
        }
    }, [cart]);

    return { ...values };
}

export default calculateTotal;
