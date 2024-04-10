import _, { cloneDeep } from 'lodash';
export const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('cart') || '{}');
};

const cartReducer = (state, action) => {
    let isProductInCart = false;
    const { type } = action;
    const cart = { ...state, shouldFetch: true };

    if (type == 'UPDATE') {
        const { new_items } = action;

        const newState = { ...cart, items: new_items, shouldFetch: false };
        return newState;
    }

    if (type == 'REFRESH') {
        return cart;
    }

    if (type == 'ADD') {
        const { product } = action;

        const foundItemInCart = cart.items.map((item) => {
            // need to check with id instead

            // item?.variationSelect?.variation1?.variation ==
            //     product?.variationSelect?.variation1?.variation

            // item?.variationSelect?.variation2?.variation ==
            //     product?.variationSelect?.variation2?.variation
            if (
                _.isEqual(
                    _.get(item, 'variation_data.select'),
                    _.get(product, 'variation_data.select')
                )
                // item?.product_id == product.product_id &&
                // _.get(item, 'variation_data.select.variation1.id') ==
                //     _.get(product, 'variation_data.select.variation1.id') &&
                // _.get(item, 'variation_data.select.variation2.id') ==
                //     _.get(product, 'variation_data.select.variation2.id')
            ) {
                isProductInCart = true;
                return { ...item, quantity: parseInt(item.quantity) + 1 };
            }

            return item;
        });

        if (isProductInCart) {
            return { ...cart, items: foundItemInCart };
        } else {
            return { ...cart, items: [action.product, ...cart.items] };
        }
    }

    if (type == 'REMOVE') {
        return {
            ...cart,
            items: cart.items.filter((product) => product._id !== action._id),
        };
    }

    if (type == 'EDIT_QUANTITY') {
        const newCartItem = cart.items.map((item) => {
            if (item._id === action._id) {
                const newItem = _.cloneDeep(item);
                _.set(newItem, 'quantity', action.quantity);
                const cost = parseFloat(
                    action.quantity == 1
                        ? _.get(newItem, 'shipping_data.one_item')
                        : _.get(newItem, 'shipping_data.one_item') +
                              _.get(newItem, 'shipping_data.additional_item') *
                                  (action.quantity - 1)
                );

                if (_.isNumber(cost)) {
                    _.set(newItem, 'shipping_data.cost', cost.toFixed(2));
                }

                return newItem;
            }
            return item;
        });

        return { ...cart, items: newCartItem };
    }

    if (type == 'EDIT_VARIATION') {
        const newCartItem = cart.items.map((item) => {
            if (item._id === action._id) {
                const newItem = cloneDeep(item);
                _.set(newItem, 'variation_data.select', action.select);
                // const newItem = {
                //     ...item,
                //     variationSelect: {
                //         ...action.variationSelect,
                //     },
                // };

                return newItem;
            }
            return item;
        });

        return { ...cart, items: newCartItem };
    }

    if (type == 'DELETE') {
        const cartIds = action?.cartIds;
        const newCartItem = cart.items.filter(
            (item) => !cartIds.includes(item._id)
        );

        return { ...cart, items: newCartItem };
    }

    if (type == 'UPDATE_DELIVERY') {
        const { shipping_data, _id } = action;

        const newCartItem = cart.items.map((item) => {
            if (item?._id == _id) {
                return { ...item, shipping_data };
            }
            return item;
        });

        return { ...cart, items: newCartItem };
    }

    throw new Error(`${type} is not valid, please use either add or remove`);
};

export default cartReducer;
