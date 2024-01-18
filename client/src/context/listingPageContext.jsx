import { createContext, useContext, useState } from 'react';


const ListingPageContext = createContext();

export const useListingPageContext = () => {
    return useContext(ListingPageContext);
};
function ListingPageProvider({ children }) {
    const [selectionSet, setSelectionSet] = useState(() => new Set());
    const value = { selectionSet, setSelectionSet };
    return (
        <ListingPageContext.Provider value={value}>
            {children}
        </ListingPageContext.Provider>
    );
}

export default ListingPageProvider;
