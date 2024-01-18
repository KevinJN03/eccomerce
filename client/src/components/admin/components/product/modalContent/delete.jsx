import { useState } from 'react';
import { adminAxios } from '../../../../../api/axios';
import { useContent } from '../../../../../context/ContentContext';
import { useAdminContext } from '../../../../../context/adminContext';
import UserLogout from '../../../../../hooks/userLogout';

function Delete({}) {
    const { setModalCheck, modalContent } = useContent();

    const { setAllProducts } = useAdminContext();
    const { logoutUser } = UserLogout();

    const [loading, setLoading] = useState(false);
    const handleDelete = async () => {
        try {
            setLoading(() => true);

            console.log({ modalContent });
            const { data } = await adminAxios.delete(
                `delete/product/${modalContent?.ids}`
            );

            setAllProducts(() => data);
            setModalCheck(() => false);
        } catch (error) {
            console.error(error);

            logoutUser({ error });
        } finally {
            setLoading(() => false);
        }
    };
    return (
        <section className="w-full max-w-xs bg-white ">
            <div className="w-full bg-light-grey/50 px-4 py-3 font-medium">
                <p>
                    You are about to delete {modalContent.ids?.length} listing
                </p>
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
                    className="rounded border px-3 py-2 text-xs font-medium disabled:bg-light-grey disabled:opacity-50"
                >
                    Cancel
                </button>
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    type="button"
                    className=" flex items-center justify-center rounded border border-black bg-black px-3 py-2 text-xs font-medium  text-white disabled:opacity-50"
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
