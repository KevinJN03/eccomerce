import '../../CSS/item_page.scss';
import Main_Image from './Main_image';
import Item_List from './image_list';
import Product_info from './product_info';
import Recommended from './recommended';
import Reviews from './reviews';
import exampleData from './exampleData';
import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import Navigation_Links from '../product/NavigationLinks';
import { useParams } from 'react-router-dom';
import { useGenderCategory } from '../../hooks/genderCategory';
import Shipping from '../cart/shipping';

import axios from '../../api/axios.js';
import ProductContextProvider from '../../context/productContext';
import _ from 'lodash';

function ItemPage() {
    const [product, setProduct] = useState({});

    const [state, dispatch] = useGenderCategory();

    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    const abortControllerRef = useRef(new AbortController());
    const timeoutRef = useRef(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                abortControllerRef.current?.abort();
                abortControllerRef.current = new AbortController();
                const [{ data }] = await Promise.all([
                    axios.get(`/product/many/${id}`, {
                        signal: abortControllerRef.current?.signal,
                    }),
                    axios.get(`/product/${id}/visit`, {
                        signal: abortControllerRef.current?.signal,
                    }),
                ]);

                timeoutRef.current = setTimeout(() => {
                    setProduct(() => data.products[0]);
                    setLoading(() => false);
                }, 1500);
            } catch (error) {
                console.error(error);
            } finally {
            }
        };

        fetchData();

        return () => {
            clearTimeout(timeoutRef.current);
            abortControllerRef.current?.abort();
        };
    }, []);

    const example = exampleData;
    const imageRef = useRef(null);
    const handleImgChange = (e) => {
        imageRef.current.src = e.target.src
            ? e.target.src
            : imageRef.current.src;
    };

    const value = { product, setProduct, loading, handleImgChange };
    return (
        <ProductContextProvider value={value}>
            {!_.isEmpty(product) && (
                <section className="item-page-wrapper">
                    <section id="item-page">
                        <Navigation_Links
                            shouldUpdateGender={true}
                            product={{
                                title: product?.title,
                                gender: product?.gender,
                                category: product?.category,
                            }}
                            loading={loading}
                            className="mt-3 pl-3"
                        />
                        <section className="item-section">
                            <Item_List />
                            <Main_Image ref={imageRef} />
                            {!loading && (
                                <Product_info
                                    text={example?.text}
                                    // images={example?.similar_styles_images}
                                    // style_it_with_image={example?.style_it_with_image}
                                />
                            )}
                        </section>
                        {!loading ? (
                            <Reviews product={product} />
                        ) : (
                            <div className="skeleton-pulse mb-4 h-full min-h-[100px] w-full"></div>
                        )}
                        <div className=" item-page-divider border-5 w-full sm+md:mb-10 lg:!hidden"></div>
                        <Recommended
                            products={product?.alsoLike || []}
                            loading={loading}
                        />
                    </section>
                </section>
            )}
        </ProductContextProvider>
    );
}

export default ItemPage;
