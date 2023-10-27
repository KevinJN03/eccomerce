const priceInvalid = 'Price must be between £0.17 and £42,933.20.';
export const priceOptions = {
    property: 'price',
    text: 'price',
    errorMessage: {
        zero: priceInvalid,
        underZero: priceInvalid,
    },
    minValue: 0.17,
    maxValue: 42933.2,
};
export const quantityOptions = {
    property: 'stock',
    text: 'quantity',
    errorMessage: {
        zero: 'Total Inventory must be at least 1.',
        underZero: 'Quantity must be between 0 and 999.',
    },
    maxValue: 999,
};
