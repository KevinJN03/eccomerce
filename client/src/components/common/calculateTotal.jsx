import { useEffect, useState } from 'react';
import { useCart } from '../../context/cartContext';
import _ from 'lodash';
import calculatePromo from '../utils/calculatePromo';
function calculateTotal() {
    const {
        cart,
        deliveryOption,
        promo,
        deliveryCost,
        stateProps,
        total,
        setTotal,
    } = useCart();

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

            if (promo?.length >= 1) {
                // const { amount, type } = promo[0];

                const result = calculatePromo(promo[0], withOutShipping);

                savePercent = result.savePercent;
                amountOff = result.amountOff;
            }
            const newTotal = parseFloat(
                total + (delivery_cost || 0) - amountOff
            ).toFixed(2);
            const withShipping = newTotal;
            const valueObj = {
                withOutShipping,
                withShipping,
                savePercent,
                amountOff,
                delivery_cost: parseFloat(delivery_cost).toFixed(2),
            };
            setValues(() => valueObj);

            setTotal(() => valueObj); // return {

            // };
        } catch (error) {
            console.error('at calculateTotal: ', error);
        }
    }, [cart, promo]);

    return { ...values };
}

export default calculateTotal;
