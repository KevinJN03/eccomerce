
function preventProductFromSelection({setProductIds, productIds}){
    setProductIds((prevState) => {
        const newSet = new Set([...prevState]);

        productIds.forEach((id) => {
            newSet.delete(id);
        });

        return newSet;
    });
};
export default preventProductFromSelection
