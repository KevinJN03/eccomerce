import { useEffect, useState } from 'react';
import { adminAxios } from '../../../../api/axios';
import { useContent } from '../../../../context/ContentContext';
import { useAdminContext } from '../../../../context/adminContext';
import UserLogout from '../../../../hooks/userLogout';
import updateProduct from './updateProduct';
import Template from './template';
import preventProductFromSelection from './preventProductFromSelection';

function Delete({}) {
    const { setModalCheck, modalContent, setModalContent } = useContent();
    const { setAllProducts, allProducts } = useAdminContext();
    const { logoutUser } = UserLogout();
    const [loading, setLoading] = useState(false);

    const { setProductIds, productIds, checks, setSelectionSet } = modalContent;

    const handleDelete = async () => {
        try {
            setLoading(() => true);
            await adminAxios.delete(`delete/product/${productIds}`);
        } catch (error) {
            console.error(error);

            logoutUser({ error });
        } finally {
            const generateUpdateProduct = updateProduct({
                listing_status: checks?.listing_status,
                allProducts,
                productIds: modalContent?.productIds,
                note: 'Deleted',
                newProperty: { deleted: true },
            });
            setTimeout(() => {
                setLoading(() => false);
                setModalCheck(() => false);
                setModalContent({ type: null });
                setAllProducts((prevState) => ({
                    ...prevState,
                    [checks?.listing_status]:
                        generateUpdateProduct ||
                        prevState[checks?.listing_status],
                }));
                setSelectionSet(() => new Set());

                preventProductFromSelection({setProductIds, productIds})

            }, 1000);
        }
    };
    return (
        // <section className="w-full max-w-xs bg-white ">
            <Template
                submit={{
                    handleClick: handleDelete,
                    text: 'Delete',
                    loading,
                }}
                small
                title={`You are about to delete ${productIds?.length} listing`}
            >
                <p className="">
                    Keep in mind that deleted listings can’t be retrieved. If
                    you’d like to keep a listing from being viewed publicly
                    without deleting it permanently, please deactivate the
                    listing instead. This will allow you to edit or reactivate
                    it at any time.
                </p>
            </Template>

           
       
    );
}

export default Delete;
