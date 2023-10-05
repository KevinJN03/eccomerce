import { createContext, useContext, useState } from 'react';
import { generateVariation } from '../components/admin/components/product/new product/variation/variationData';
export const newProductContext = createContext(null);

export const useNewProduct = () => {
    return useContext(newProductContext);
};

export const NewProductProvider = ({ children }) => {
    const [variations, setVariations] = useState([
        {
            id: 1,
            name: 'Colour',
            options: generateVariation('Colour'),
            disabled: false,
            default: true,
            quantityHeader: { on: true },
            priceHeader: { on: true },
        },
        {
            id: 2,
            name: 'Size',
            options: generateVariation('Size'),
            disabled: false,
            default: true,
            quantityHeader: { on: false },
            priceHeader: { on: true },
        },
    ]);
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState('');
    const value = {
        variations,
        setVariations,
        title,
        setTitle,
        files,
        setFiles
    };
    return (
        <newProductContext.Provider value={value}>
            {children}
        </newProductContext.Provider>
    );
};
