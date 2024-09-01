import { useEffect, useRef, useState } from 'react';
import New_Product from '../new product/new_product';
import axios, { adminAxios } from '../../../../../api/axios';
import { useParams, useSearchParams } from 'react-router-dom';
import {
    NewProductProvider,
    useNewProduct,
} from '../../../../../context/newProductContext';
import UserLogout from '../../../../../hooks/userLogout';

function EditProduct({ type }) {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [singleValue, setSingleValue] = useState({});
    const { logoutUser } = UserLogout();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(
        () => searchParams.get('draft') || ''
    );
    console.log({ searchParams, searchQuery });
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (searchQuery == 'true') {
                    const { data } = await adminAxios.get(
                        `/draftProduct/${id}`
                    );
                    setSingleValue(() => data?.draftProduct);
                } else {
                    const [{ data }, { data: fileResult }] = await Promise.all([
                        adminAxios.get(`/product/${id}`),

                        adminAxios.get(`/productFiles/${id}`),
                    ]);
                    console.log({ data });
                    setSingleValue(() => ({
                        ...data[0],
                        fileResult: fileResult?.files,
                    }));
                }

                setTimeout(() => {
                    setLoading(() => false);
                }, 1000);
            } catch (error) {
                console.error('error while fetching single product: ', error);
                logoutUser({ error });
            }
        };

        fetchData();
    }, []);

    return (
        <NewProductProvider singleValue={singleValue}>
            {loading ? (
                <div className="spinner-circle  spinner-xl mx-auto mt-44 ![--spinner-color:var(--gray-8)]"></div>
            ) : (
                <New_Product type={searchQuery == 'true' ? 'draft' : type} />
            )}
        </NewProductProvider>
    );
}

export default EditProduct;
