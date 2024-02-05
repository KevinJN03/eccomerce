function updateProduct({ allProducts, listing_status, productIds, note }) {
    const productArray = allProducts?.[listing_status];
    let updateProducts = null;
    if (productArray) {
        const idSet = new Set(productIds);
        updateProducts = Array.from(productArray).map((product) => {
            if (idSet.has(product?._id)) {
                product.note = note;

                return product;
            }
            return product;
        });
    }

    return updateProducts;
}

export default updateProduct;
