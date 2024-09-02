import { useEffect, useRef, useState } from 'react';
import { useContent } from '../../../../context/ContentContext';
import Template from './template';
import UserLogout from '../../../../hooks/userLogout';
import { adminAxios } from '../../../../api/axios.js';
import updateProduct from './updateProduct';
import { useAdminContext } from '../../../../context/adminContext';
import preventProductFromSelection from './preventProductFromSelection';
import { handleTimeout, handleUpdateProduct } from './handleTimeout';

function Activate({}) {
    const { modalContent, setModalCheck, setShowAlert } = useContent();
    const abortControllerRef = useRef(new AbortController());
    const { allProducts, setAllProducts } = useAdminContext();
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const { logoutUser } = UserLogout();
    const { productIds, setProductIds } = modalContent;
    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const handleActivate = async () => {
        let success = false;
        let count = null;
        try {
            setBtnLoading(() => true);
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            const { data } = await adminAxios.post(
                `/product/status/update`,

                {
                    productIds: modalContent.productIds,
                    status: 'active',
                },
                { signal: abortControllerRef.current?.signal }
            );

            success = true;
            count = data.count;
        } catch (error) {
            console.error('error at Deactivate: ', error?.message);
            logoutUser({ error });
        } finally {
            const handleFunc = () =>
                handleUpdateProduct({
                    note: 'Moved to inactive listings',
                    allProducts,
                    productIds,
                    setProductIds,
                    listing_status: modalContent.checks?.listing_status,
                    clearSelection: modalContent?.clearSelection(),
                    setAllProducts,
                });

            handleTimeout({
                setBtnLoading,
                setLoading,
                success,
                handleFunc,
                count,
                setModalCheck,
                setShowAlert,
                setAllProducts,
                msg: `We're unable to activate ${productIds?.length} of your listing. Try again or update each listing individually.`,
            });
        }
    };
    return (
        <Template
            loading={loading}
            submit={{
                text: 'Activate',
                handleClick: handleActivate,
                loading: btnLoading,
            }}
            small
            title={`You are about to activate ${modalContent.productIds?.length} listing`}
        >
            <div className="flex w-fit flex-col gap-4">
                <p>
                    Activating this product will seamlessly showcase it in your
                    public shop, providing heightened visibility to potential
                    customers.
                </p>
                <p>
                    Consider utilizing this feature strategically to feature
                    seasonal items, limited-time promotions, or newly introduced
                    products. Activate and highlight your offerings to maximize
                    their exposure and enhance the shopping experience for your
                    customers, ensuring that your public shop reflects the
                    latest and most enticing products in your inventory.
                </p>
            </div>
        </Template>
    );
}

export default Activate;
