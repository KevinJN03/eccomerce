import { useEffect, useRef, useState } from 'react';
import New_Product from '../new product/new_product';
import axios, { adminAxios } from '../../../../../api/axios';
import { useParams } from 'react-router-dom';
import {
    NewProductProvider,
    useNewProduct,
} from '../../../../../context/newProductContext';

function EditProduct({ type }) {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [singleValue, setSingleValue] = useState({});
    useEffect(() => {
        adminAxios
            .get(`/product/${id}`)
            .then((res) => {
                console.log(res.data);
                setSingleValue(() => res.data);

                setTimeout(() => {
                    setLoading(() => false);
                }, 1000);
            })
            .catch((error) => {
                'error while fetching single product: ', error;
            });
    }, []);

    return (
        <NewProductProvider singleValue={singleValue}>
            {loading ? (
                // <section className='w-full h-full flex justify-center items-center'>
                <div className="spinner-circle  spinner-xl mx-auto mt-44 [--spinner-color:var(--gray-8)]"></div>
            ) : (
                // </section>

                <New_Product type={type} />
            )}
        </NewProductProvider>
    );
}

export default EditProduct;
