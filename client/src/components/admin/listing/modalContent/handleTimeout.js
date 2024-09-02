import preventProductFromSelection from './preventProductFromSelection';
import updateProduct from './updateProduct';

export const handleTimeout = ({
    setBtnLoading,
    setLoading,
    success,
    handleFunc,
    count,

    setModalCheck,
    setShowAlert,
    msg,
}) => {
    setTimeout(() => {
        setBtnLoading(() => false);
        setLoading(() => true);

        setTimeout(() => {
            if (success) {
                handleFunc && handleFunc();

                setShowAlert(() => ({
                    on: true,
                    bg: 'bg-green-100',
                    icon: 'check',
                    size: 'large',
                    msg:
                        count > 1
                            ? `You've updated ${count} listings.`
                            : 'Listing updated.',
                    text: 'text-black text-base',
                }));
            } else {
                setShowAlert(() => ({
                    on: true,
                    bg: 'bg-red-800',
                    icon: 'sadFace',
                    size: 'medium',
                    text: 'text-sm text-white',
                    timeout: 10000,
                    msg,
                }));
            }

            setLoading(() => false);
            setModalCheck(() => false);
        }, 1300);
    }, 1000);
};

export const handleUpdateProduct = ({
    note,
    allProducts,
    productIds,
    setProductIds,
    listing_status,
    clearSelection,
    setAllProducts,
}) => {
    const generateUpdateProduct = updateProduct({
        listing_status,
        allProducts,
        productIds,
        note,
    });
    preventProductFromSelection({ setProductIds, productIds });

    setAllProducts((prevState) => ({
        ...prevState,
        [listing_status]: generateUpdateProduct || prevState[listing_status],
    }));
    clearSelection && clearSelection();
};
