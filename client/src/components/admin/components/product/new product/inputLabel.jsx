import { useEffect } from 'react';
import { useNewProduct } from '../../../../../context/newProductContext';

function InputLabel({ label, id}) {
    // const { setPriceValue, setStockValue } = useNewProduct();
    // useEffect(() => {
    //     return () => {
    //         console.log('cleanup');

    //         setPriceValue((prevState) => '');
    //         setStockValue((prevState) => '');
    //     };
    // }, []);

    return (
        <section className="mt-6 flex flex-col">
            <label htmlFor={`#${id}`} className="text-lg font-medium">
                {label}
                <span className="asterisk">*</span>
            </label>
        </section>
    );
}

export default InputLabel;
