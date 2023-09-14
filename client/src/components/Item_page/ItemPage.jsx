import '../../CSS/item_page.css';
import Main_Image from './Main_image';
import Item_List from './image_list';
import Product_info from './product_info';
import Recommended from './reccommended';
import Reviews from './reviews';
import exampleData from './exampleData';
import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import Navigation_Links from '../product/navigationLinks';
import { useParams, useLocation } from 'react-router-dom';
import { useGenderCategory } from '../../hooks/genderCategory';
import Shipping from '../cart/shipping';

import axios from '../../api/axios';
console.log(import.meta.env.VITE_BASE_URL);
function ItemPage() {
    const [product, setProduct] = useState();
    const [state, dispatch] = useGenderCategory();

    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            axios.get('/product/65031efeded2fbe790611cb4').then((res) => {
                console.log(res.data);
                setProduct(res.data);
                setLoading(false);
            });
        }, 1500);
        return () => {
            clearTimeout(timeout);
            setLoading(true)
        };
    }, []);

    function getRoute() {
        const { id } = useParams();
        const route = location.pathname.split('/')[1];
        console.log('path', route);
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
            {loading ? (
                Loader()
            ) : (
                <section className="item-page-wrapper">
                    <section id="item-page">
                        <Navigation_Links className="mt-3 pl-3" />
                        <section className="item-section">
                            <Item_List
                                images={product.images}
                                handleImgChange={handleImgChange}
                            />
                            <Main_Image
                                ref={imageRef}
                                images={product.images}
                            />
                            <Product_info
                                price={product.price.current}
                                text={example.text}
                                title={product.title}
                                size={product.size}
                                details={product.detail}
                                images={example.similar_styles_images}
                                style_it_with_image={
                                    example.style_it_with_image
                                }
                                product={product}
                            />
                        </section>
                        <Reviews product={product} />
                        <div className=" item-page-divider border-5 w-full sm+md:mb-10 lg:!hidden"></div>
                        <Recommended />
                    </section>
                </section>
            )}
        </>
    );
}

export default ItemPage;
