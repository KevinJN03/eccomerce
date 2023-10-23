import { useEffect } from 'react';
import { useNewProduct } from '../../../../../context/newProductContext';

function InputLabel({ label, id }) {
    return (
        <label
            className="mb-1 mt-6 flex flex-nowrap text-lg font-medium"
            htmlFor={`#${id}`}
        >
            {label}
            <span className="asterisk">*</span>
        </label>
    );
}

export default InputLabel;
