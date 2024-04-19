import { useEffect } from 'react';
import { useNewProduct } from './context/newProductContext';
import _ from 'lodash';

export default function useNewProductError(path, setState, options) {
    const { publishError } = useNewProduct();

    useEffect(() => {
        if (_.has(publishError, path)) {
            options?.obj
                ? setState((obj) => {
                      return {
                          ...obj,
                          [options.property]: _.get(publishError, path),
                      };
                  })
                : setState(() => _.get( publishError, path));
        }
    }, [publishError]);
}
