import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { adminAxios } from '../../../../api/axios';
import { NewProductProvider } from '../../../../context/newProductContext';
import New_Product from './new product/new_product';
import Product_Single from './product single page/product_single';

function CopyProduct({}) {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [singleValue, setSingleValue] = useState({});
    useEffect(() => {
        adminAxios
            .get(`/product/${id}`)
            .then((res) => {
                setSingleValue(() => res.data);

                setTimeout(() => {
                    setLoading(() => false);
                }, 1000);
            })
            .catch((error) => {
                'error while fetching single product: ', error;
            });
    }, []);

    return <Product_Single />;
}

export default CopyProduct;
