import { useEffect } from 'react';
import { useNewProduct } from './context/newProductContext';

export default function useNewProductError(path, setState, options) {
    const { publishError } = useNewProduct();

    useEffect(() => {
        if (publishError.has(path)) {
            options?.obj
                ? setState((obj) => {
                      return {
                          ...obj,
                          [options.property]: publishError.get(path).msg,
                      };
                  })
                : setState(() => publishError.get(path).msg);
        }
    }, [publishError]);
}
