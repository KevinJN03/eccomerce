import { useEffect, useRef, useState } from 'react';
import { useContent } from '../../../../context/ContentContext';
import Template from './template';
import UserLogout from '../../../../hooks/userLogout';
import { adminAxios } from '../../../../api/axios';
import updateProduct from './updateProduct';
import { useAdminContext } from '../../../../context/adminContext';
import preventProductFromSelection from './preventProductFromSelection';

function Activate({}) {
    const { modalContent, setModalCheck } = useContent();
    const abortControllerRef = useRef(new AbortController());
    const { allProducts, setAllProducts } = useAdminContext();
    const [loading, setLoading] = useState(false);
    const { logoutUser } = UserLogout();
    const { productIds, setProductIds } = modalContent;
debugger
    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const handleActivate = async () => {
        try {
            setLoading(() => true);
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
        } catch (error) {
            console.error('error at Deactivate: ', error?.message);
            logoutUser({ error });
        } finally {
            const generateUpdateProduct = updateProduct({
                listing_status: modalContent.checks?.listing_status,
                allProducts,
                productIds: modalContent?.productIds,
                note: 'Moved to active listings',
            });
            setTimeout(() => {
                setLoading(() => false);
                setModalCheck(() => false);
                setAllProducts((prevState) => ({
                    ...prevState,
                    [modalContent.checks?.listing_status]:
                        generateUpdateProduct ||
                        prevState[modalContent.checks?.listing_status],
                }));
                modalContent?.clearSelection();
              preventProductFromSelection({setProductIds, productIds})
            }, 1000);
        }
    };
    return (
        <Template
            submit={{
                text: 'Activate',
                handleClick: handleActivate,
                loading,
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
