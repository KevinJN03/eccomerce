import { createContext, useContext, useState } from 'react';

const ListingPageContext = createContext();

export const useListingPageContext = () => {
    return useContext(ListingPageContext);
};
function ListingPageProvider({ children, newValue }) {
    const [selectionSet, setSelectionSet] = useState(() => new Set());
    const value = { selectionSet, setSelectionSet, ...newValue };
    return (
        <ListingPageContext.Provider value={value}>
            {children}
        </ListingPageContext.Provider>
    );
}

export default ListingPageProvider;
