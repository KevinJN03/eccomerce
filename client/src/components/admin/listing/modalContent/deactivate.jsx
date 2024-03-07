import { useEffect, useRef, useState } from 'react';
import { useContent } from '../../../../context/ContentContext';
import Template from './template';
import UserLogout from '../../../../hooks/userLogout';

import { adminAxios } from '../../../../api/axios';
import { useAdminContext } from '../../../../context/adminContext';
import { check } from 'prettier';
import updateProduct from './updateProduct';
import preventProductFromSelection from './preventProductFromSelection';

function Deactivate({}) {
    const { modalContent, setModalCheck } = useContent();
    const abortControllerRef = useRef(new AbortController());
    const { allProducts, setAllProducts } = useAdminContext();
    const [loading, setLoading] = useState(false);
    const { logoutUser } = UserLogout();
    const { productIds, setProductIds } = modalContent;

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const handleDeactivate = async () => {
        try {
            setLoading(() => true);
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            const { data } = await adminAxios.post(
                `/product/status/update`,
                {
                    productIds: modalContent.productIds,
                    status: 'inactive',
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
                note: 'Moved to inactive listings',
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
                text: 'Deactivate',
                handleClick: handleDeactivate,
                loading,
            }}
            small
            title={`You are about to deactivate  ${modalContent.productIds?.length} listing`}
        >
            <div className="flex w-fit flex-col gap-4">
                <p className="w-fit">
                    Deactivating this product will promptly remove it from your
                    public shop, ensuring a streamlined and curated shopping
                    experience for your customers.
                </p>
                <p>
                    Consider utilizing this feature strategically to align with
                    seasonal changes, limited-time promotions, or inventory
                    management. Activate and showcase your products when they
                    matter most, and seamlessly deactivate them when it's time
                    for a change or replenishment.
                </p>
            </div>
        </Template>
    );
}

export default Deactivate;
