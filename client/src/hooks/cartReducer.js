import _ from 'lodash';
export const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
};

const cartReducer = (state, action) => {
    // JSON.parse(cart)
    let isProductInCart = false;
    const { product, type } = action;
    const cart = [];
    const cartFromLS = getCartFromLocalStorage();
    if (_.isEqual(state, cartFromLS)) {
        cart.push(...state);
    } else {
        cart.push(...cartFromLS);
    }

    if (type == 'refresh') {
        return cart;
    }

    if (type == 'add') {
        const foundItemInCart = cart.map((item) => {
            if (
                item.id == product.id &&
                item?.variationSelect?.variation1?.variation ==
                    product?.variationSelect?.variation1?.variation &&
                item?.variationSelect?.variation2?.variation ==
                    product?.variationSelect?.variation2?.variation
            ) {
                isProductInCart = true;
                return { ...item, quantity: parseInt(item.quantity) + 1 };
            }

            return item;
        });

        if (isProductInCart) {
            return foundItemInCart;
        } else {
            return [action.product, ...cart];
        }
    }

    if (type == 'remove') {
        return cart.filter((product) => product.cartId !== action.cartId);
    }

    if (type == 'edit quantity') {
        const newCart = cart.map((item) => {
            if (item.cartId === action.cartId) {
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

        return newCart;
    }

    if (type == 'edit variation') {
        const newCart = cart.map((item) => {
            if (item.cartId === action.cartId) {
                const newItem = {
                    ...item,
                    variationSelect: {
                        ...action.variationSelect,
                    },
                };

                return newItem;
            }
            return item;
        });

        return newCart;
    }

    if (type == 'remove items') {
        const cartIds = action?.cartIds;
        const newCart = cart.filter((item) => !cartIds.includes(item.cartId));

        return newCart;
    }

    if (type == 'updateDelivery') {
        const { shipping_data, cartId } = action;

        const newCart = cart.map((item) => {
            if (item?.cartId == cartId) {
                return { ...item, shipping_data };
            }
            return item;
        });

        return newCart;
    }

    throw new Error(`${type} is not valid, please use either add or remove`);
};

export default cartReducer;
