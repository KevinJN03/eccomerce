import { useEffect } from 'react';
import { useNewProduct } from '../../../../../context/newProductContext';

function Input({ label, id, children }) {
    const { setPriceValue, setStockValue } = useNewProduct();
    useEffect(() => {
        return () => {
            console.log('cleanup');

            setPriceValue((prevState) => prevState = '');
            setStockValue((prevState) => prevState = '');
        };
    }, []);

    return (
        <form className="mt-6 flex flex-col">
            <label htmlFor={`#${id}`} className="text-lg font-medium">
                {label}
                <span className="asterisk">*</span>
            </label>
            {children}
        </form>
    );
}

export default Input;
