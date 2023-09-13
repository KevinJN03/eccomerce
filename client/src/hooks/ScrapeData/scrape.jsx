import temporaryMenData from '../../../../server/ProductScrape/temporyDataMen';

import temporaryWomenData from '../../../../server/ProductScrape/temporyDataWomen';
import { useContext, createContext, useState, useReducer } from 'react';
const categoryContext = createContext(null);

export function useProducts() {
    return useContext(categoryContext);
}
const scrapeProducts = { temporaryMenData, temporaryWomenData };

function reducer(state, action) {
    if ((action.type === 'men')) {
        return {
            
           category: 'men',
           products: state.products = temporaryMenData
        };
    } else if ((action.type === 'women')) {
        return {
            category: 'women',
            products: state.products = temporaryWomenData
        };
    } else {
        throw Error('Unknown action type, type must be men or women');
    }
}

export function ProductsProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, { category: 'men', products: temporaryMenData });

    return (
        <categoryContext.Provider value={[state, dispatch]}>
            {children}
        </categoryContext.Provider>
    );
}  

export default scrapeProducts; 
