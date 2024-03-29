function updateProduct({
    allProducts,
    listing_status,
    productIds,
    note,
    newProperty,
}) {
    const productArray = allProducts?.[listing_status];
    let updateProducts = null;
    if (productArray) {
        const idSet = new Set(productIds);
        updateProducts = Array.from(productArray).map((product) => {
            if (idSet.has(product?._id)) {
                product.note = note;
                if (newProperty) {
                    Object.assign(product, newProperty);
                }
                return product;
            }
            return product;
        });
    }

    return updateProducts;
}

export default updateProduct;
