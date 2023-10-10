import { useEffect } from 'react';
import { useNewProduct } from './context/newProductContext';

export default function useNewProductError(category, setState) {
    const { publishError } = useNewProduct();

    useEffect(() => {
        const newError = publishError.find(
            (item) => item.path == category
        )?.msg;
        if (newError) {
            setState(newError);
            return;
        }
    }, [publishError]);
}
