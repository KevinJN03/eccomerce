import { useEffect } from 'react';
import { useNewProduct } from '../../../../../context/newProductContext';

function InputLabel({ label, id }) {
    // const { setPriceValue, setStockValue } = useNewProduct();
    // useEffect(() => {
    //     return () => {
    //         console.log('cleanup');

    //         setPriceValue((prevState) => '');
    //         setStockValue((prevState) => '');
    //     };
    // }, []);

    return (
        <label
            className="mt-6 mb-1 flex flex-nowrap text-lg font-medium"
            htmlFor={`#${id}`}
        >
            {label}
            <span className="asterisk">*</span>
        </label>
    );
}

export default InputLabel;
