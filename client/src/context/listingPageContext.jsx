import { createContext, useContext, useState } from 'react';
import { adminAxios } from '../api/axios';
import UserLogout from '../hooks/userLogout';
import { useAdminContext } from './adminContext';

const ListingPageContext = createContext();

export const useListingPageContext = () => {
    return useContext(ListingPageContext);
};
function ListingPageProvider({ children, newValue }) {
    // const [selectionSet, setSelectionSet] = useState(() => new Set());
    const value = { ...newValue };
    const { logoutUser } = UserLogout();
    const { setAllProducts } = useAdminContext();
    const handleFeatured = async ({
        product,
        setFeatured,
        featured,
        index,
    }) => {
        // console.log({ query: qs.stringify(checks) });

        try {
            console.log({ index });
            const { data } = await adminAxios.get(
                `product/featured/${product?._id}?featured=${!featured}${
                    product?.status == 'draft' ? '&draft=true' : '&draft=false'
                }`
            );

            setAllProducts((prevState) => {
                const newProductsObject = { ...prevState };

                newProductsObject[product.status][index].featured =
                    data?.featured;

                return newProductsObject;
            });

            setFeatured(() => data?.featured);
        } catch (error) {
            console.error(error);

            logoutUser({ error });
        }
    };
    return (
        <ListingPageContext.Provider value={{ ...value, handleFeatured }}>
            {children}
        </ListingPageContext.Provider>
    );
}

export default ListingPageProvider;
