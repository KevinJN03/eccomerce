import { useEffect, useState } from 'react';
import { adminAxios } from '../../../../api/axios';
import { useContent } from '../../../../context/ContentContext';
import { useAdminContext } from '../../../../context/adminContext';
import UserLogout from '../../../../hooks/userLogout';
import updateProduct from './updateProduct';

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

                setProductIds((prevState) => {
                    const newSet = new Set([...prevState]);

                    productIds.forEach((id) => {
                        newSet.delete(id);
                    });
                    debugger;
                    return newSet;
                });
            }, 1000);
        }
    };
    return (
        <section className="w-full max-w-xs bg-white ">
            <div className="w-full bg-light-grey/50 px-4 py-3 font-medium">
                <p>You are about to delete {productIds?.length} listing</p>
            </div>

            <p className="px-4 py-4">
                Keep in mind that deleted listings can’t be retrieved. If you’d
                like to keep a listing from being viewed publicly without
                deleting it permanently, please deactivate the listing instead.
                This will allow you to edit or reactivate it at any time.
            </p>

            <div className="flex flex-row justify-end gap-2 border-t border-dark-gray/50 px-4  py-2">
                <button
                    disabled={loading}
                    onClick={() => setModalCheck(() => false)}
                    type="button"
                    className="rounded border px-3 py-2 text-xs font-medium hover:bg-light-grey/50 disabled:bg-light-grey disabled:opacity-50"
                >
                    Cancel
                </button>
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    type="button"
                    className=" flex items-center justify-center rounded border border-black bg-black px-3 py-2 text-xs font-medium  text-white hover:opacity-80 disabled:opacity-50"
                >
                    {loading ? (
                        <span className="daisy-loading daisy-loading-spinner daisy-loading-xs !text-white"></span>
                    ) : (
                        <p className="!text-white">Delete</p>
                    )}
                </button>{' '}
            </div>
        </section>
    );
}

export default Delete;
