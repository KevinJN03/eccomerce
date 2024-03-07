import { useEffect, useRef, useState } from 'react';
import { useContent } from '../../../../context/ContentContext';
import Template from './template';
import UserLogout from '../../../../hooks/userLogout';
import { adminAxios } from '../../../../api/axios';
import { useAdminContext } from '../../../../context/adminContext';
import updateProduct from './updateProduct';

function Publish({}) {
    const { modalContent, setModalCheck } = useContent();
    const abortControllerRef = useRef(new AbortController());
    const [loading, setLoading] = useState(false);
    const { allProducts, setAllProducts } = useAdminContext();
    const { logoutUser } = UserLogout();

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const handlePublish = async () => {
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
            console.error(error);

            logoutUser({ error });
        }finally{
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
            }, 1000);
        }
    };
    return (
        <Template
            small={true}
            submit={{
                text: 'Publish',
                handleClick: handlePublish,
                loading,
            }}
            title={`You are about to publish  ${modalContent.productIds?.length} listing`}
        >
            <p>
                Ready to showcase your product to potential buyers? Publishing
                your listing means your product will be live on our platform,
                visible to shoppers browsing for what you offer. This is your
                chance to make a compelling impression, so ensure your listing
                is complete with high-quality images, detailed descriptions, and
                accurate pricing. Once published, users can explore, purchase,
                and interact with your product. Take the time to ensure your
                listing is optimized for visibility and conversions. When you're
                confident it's ready, hit publish and let the sales begin!
            </p>
        </Template>
    );
}

export default Publish;
