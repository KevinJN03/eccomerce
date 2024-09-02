import { useEffect, useState } from 'react';
import { adminAxios } from '../../../../api/axios.js';
import { useContent } from '../../../../context/ContentContext';
import { useAdminContext } from '../../../../context/adminContext';
import UserLogout from '../../../../hooks/userLogout';
import updateProduct from './updateProduct';
import Template from './template';
import preventProductFromSelection from './preventProductFromSelection';

function Delete({}) {
    const { setModalCheck, modalContent, setModalContent, setShowAlert } =
        useContent();
    const { setAllProducts, allProducts } = useAdminContext();
    const { logoutUser } = UserLogout();
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);

    const { setProductIds, productIds, checks, setSelectionSet } = modalContent;

    const handleDelete = async () => {
        let success = false;
        let count = null;
        try {
            setBtnLoading(() => true);
            const { data } = await adminAxios.delete(
                `delete/product/${productIds}`
            );

            count = data.count;
            success = true;
        } catch (error) {
            console.error(error);

            logoutUser({ error });
        } finally {
            setTimeout(() => {
                setLoading(() => true);

                setTimeout(() => {
                    if (success) {
                        const generateUpdateProduct = updateProduct({
                            listing_status: checks?.listing_status,
                            allProducts,
                            productIds: modalContent?.productIds,
                            note: 'Deleted',
                            newProperty: { deleted: true },
                        });
                        setAllProducts((prevState) => ({
                            ...prevState,
                            [checks?.listing_status]:
                                generateUpdateProduct ||
                                prevState[checks?.listing_status],
                        }));
                        preventProductFromSelection({
                            setProductIds,
                            productIds,
                        });

                        setShowAlert(() => ({
                            on: true,
                            bg: 'bg-[#343434]',
                            icon: 'bell',
                            size: 'large',
                            msg: `You have deleted ${count} listings.`,
                            closeIcon: '!fill-white',
                        }));

                        setSelectionSet(() => new Set());
                    } else {
                        setShowAlert(() => ({
                            on: true,
                            bg: 'bg-red-800',
                            icon: 'sadFace',
                            size: 'medium',
                            text: 'text-sm text-white',
                            timeout: 10000,
                            msg: `We're unable to delete ${productIds?.length} of your listing. Try again or update each listing individually.`,
                        }));
                    }
                    setModalCheck(() => false);
                    setLoading(() => false);
                }, 1000);
            }, 1000);
        }
    };
    return (
        // <section className="w-full max-w-xs bg-white ">
        <Template
            loading={loading}
            submit={{
                handleClick: handleDelete,
                text: 'Delete',
                loading: btnLoading,
            }}
            small
            title={`You are about to delete ${productIds?.length} listing`}
        >
            <p className="">
                Keep in mind that deleted listings can’t be retrieved. If you’d
                like to keep a listing from being viewed publicly without
                deleting it permanently, please deactivate the listing instead.
                This will allow you to edit or reactivate it at any time.
            </p>
        </Template>
    );
}

export default Delete;
