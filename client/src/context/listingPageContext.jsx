import { createContext, useContext, useState } from 'react';
import { adminAxios } from '../api/axios.js';
import UserLogout from '../hooks/userLogout';
import { useAdminContext } from './adminContext';
import { useContent } from './ContentContext';

const ListingPageContext = createContext();

export const useListingPageContext = () => {
    return useContext(ListingPageContext);
};
function ListingPageProvider({ children, newValue }) {
    // const [selectionSet, setSelectionSet] = useState(() => new Set());
    const value = { ...newValue };

    const { logoutUser } = UserLogout();
    const { setAllProducts } = useAdminContext();
    const { selectionSet, setSelectionSet, checks, productIds, setProductIds } =
        newValue;
    const { setModalCheck, setModalContent } = useContent();

    const text = {
        inactive: 'Activate',
        active: 'Deactivate',
        draft: 'Publish',
    };

    const handleFeatured = async ({
        product,
        setFeatured,
        featured,
        index,
    }) => {
        try {
            console.log({ index });
            setFeatured(() => !featured);
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

    const handleClick = ({ productIds, type }) => {
        setModalContent({
            type,
            productIds,
            setProductIds,
            setSelectionSet,
            checks,
            clearSelection: () => {
                setSelectionSet(() => new Set());
            },
        });
        setModalCheck(() => true);
    };
    return (
        <ListingPageContext.Provider
            value={{
                ...value,
                handleFeatured,
                text,
                handleClick,
            }}
        >
            {children}
        </ListingPageContext.Provider>
    );
}

export default ListingPageProvider;
