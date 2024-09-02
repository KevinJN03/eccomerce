import { useEffect, useRef, useState } from 'react';
import { useContent } from '../../../../context/ContentContext';
import Template from './template';
import UserLogout from '../../../../hooks/userLogout';
import { adminAxios } from '../../../../api/axios.js';
import { useAdminContext } from '../../../../context/adminContext';
import updateProduct from './updateProduct';
import preventProductFromSelection from './preventProductFromSelection';
import { handleUpdateProduct, handleTimeout } from './handleTimeout';

function Publish({}) {
    const { modalContent, setModalCheck, setShowAlert } = useContent();
    const abortControllerRef = useRef(new AbortController());
    const [loading, setLoading] = useState(false);
    const { allProducts, setAllProducts } = useAdminContext();
    const { logoutUser } = UserLogout();
    const { productIds, setProductIds } = modalContent;

    const [btnLoading, setBtnLoading] = useState();

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const handlePublish = async () => {
        let success = false;
        let count = 0;
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
            console.error(error);

            logoutUser({ error });
        } finally {
            //   const   handleFunc = ({
            //         note: 'Moved to active listings',
            //         allProducts,
            //         productIds: modalContent?.productIds,
            //         setProductIds,
            //         listing_status: modalContent.checks?.listing_status,
            //         clearSelection: modalContent?.clearSelection(),
            //         setAllProducts
            //     });

            const handleFunc = () =>
                handleUpdateProduct({
                    note: 'Moved to active listings',
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
                msg: `We're unable to publish ${modalContent?.productIds?.length} of your listing. Try again or update each listing individually.`,
            });
        }
    };
    return (
        <Template
            loading={loading}
            small={true}
            submit={{
                text: 'Publish',
                handleClick: handlePublish,
                loading: btnLoading,
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
