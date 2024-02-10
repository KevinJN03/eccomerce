import '../../CSS/item_page.scss';
import Main_Image from './Main_image';
import Item_List from './image_list';
import Product_info from './product_info';
import Recommended from './recommended';
import Reviews from './reviews';
import exampleData from './exampleData';
import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import Navigation_Links from '../product/navigationLinks';
import { useParams } from 'react-router-dom';
import { useGenderCategory } from '../../hooks/genderCategory';
import Shipping from '../cart/shipping';

import axios from '../../api/axios';

function ItemPage() {
    const [product, setProduct] = useState({ images: [], gender: null });

    const [state, dispatch] = useGenderCategory();

    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            axios
                .get(`/product/many/${id}`)
                .then(({ data }) => {
                    setProduct(() => data?.products[0]);

                    setLoading(() => false);
                })
                .catch((error) => {
                    'Error fetching data, not found', error;
                });
        }, 1500);
        return () => {
            clearTimeout(timeout);
            setLoading(true);
        };
    }, []);

    function getRoute() {
        const { id } = useParams();
        const route = location.pathname.split('/')[1];
        'path', route;
    }
    function Loader() {
        return <span className="loading loading-infinity loading-lg"></span>;
    }

    const example = exampleData;
    const imageRef = useRef(null);
    const handleImgChange = (e) => {
        imageRef.current.src = e.target.src
            ? e.target.src
            : imageRef.current.src;
    };
    return (
        <>
            {/* {loading ? (
                Loader()
            ) : ( */}
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
                        <Item_List
                            loading={loading}
                            images={product?.images}
                            handleImgChange={handleImgChange}
                        />
                        <Main_Image
                            ref={imageRef}
                            images={product?.images}
                            loading={loading}
                        />
                        <Product_info
                            loading={loading}
                            text={example?.text}
                            title={product?.title}
                            details={product?.detail}
                            images={example?.similar_styles_images}
                            style_it_with_image={example?.style_it_with_image}
                            product={product}
                        />
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
            {/* )} */}
        </>
    );
}

export default ItemPage;
