import Filter from './Filter';
import '../../CSS/product_page.css';
import Collection from './Collection/collection';

import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import Mobile_Filter from './Filter/mobile-filter';
import { useEffect, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import Navigation_Links from './NavigationLinks.jsx';
import axios from '../../api/axios.js';
import { Outlet, useLocation } from 'react-router-dom';
import { useGenderCategory } from '../../hooks/genderCategory';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const tagButtons = [
    '  ActiveWear',
    'Active Tops',
    ' Sports Bras',
    'Active Jackets',
    ' ActiveWear',
    ' Active Tops',
    'Sports Bras',
    ' Active Jackets',
];
function Product_Page() {
    const [loading, setLoading] = useState(true);
    const [filterCount, setFilterCount] = useState(0);
    const [state, dispatch] = useGenderCategory();
    const [products, setProducts] = useState([]);

    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, [location.pathname]);
    useEffect(() => {
        axios
            .get(`/category/${state.productCategory}/${state.gender}`)
            .then((res) => {
                setTimeout(() => {
                    setProducts(res.data);
                    setLoading(() => false);
                }, 1000);
            })
            .catch((err) => {
                console.error('err at product fetch: ', err);
            });
    }, [state]);

    const screenSize = useWindowSize();

    return (
        <section id="product_page">
            <section className="product-page-section flex w-full max-w-[1366px] flex-col sm:px-5 md+lg:!px-10">
                <div className="product-header mb-4 flex flex-col sm:gap-2 md+lg:gap-4">
                    <Navigation_Links
                        loading={loading}
                        shouldUpdateGender={false}
                    />
                    <div className="middle flex flex-row items-center sm+md:justify-between">
                        {!loading ? (
                            <h2 className="font-black tracking-tight sm:w-28 sm:text-2xl md+lg:text-4xl">
                                {/* WOMEN'S ACTIVEWEAR TOPS */}
                                {state.gender.toUpperCase() +
                                    "'S" +
                                    ' ' +
                                    state.productCategory.toUpperCase()}
                            </h2>
                        ) : (
                            <div className="skeleton-pulse h-12 w-3/12 sm:w-28"></div>
                        )}
                        {screenSize.width < 800 && (
                            <>
                                <label
                                    htmlFor="modal-2"
                                    className="flex flex-nowrap items-center gap-2 rounded-full border-[1px] border-[var(--primary)] px-3 py-2 hover:border-2 lg:hidden"
                                >
                                    <TuneRoundedIcon className="sm:!text-xl md:!text-3xl" />
                                    <p className="md:text-xl">Filter</p>
                                </label>
                                <Mobile_Filter
                                    filterCount={filterCount}
                                    setFilterCount={setFilterCount}
                                />
                            </>
                        )}
                    </div>

                    <div className="bottom">
                        {!loading ? (
                            <>
                                {' '}
                                {tagButtons.map((text) => {
                                    return (
                                        <button className="category-filter-btn">
                                            {text}
                                        </button>
                                    );
                                })}
                            </>
                        ) : (
                            <div className="skeleton-pulse h-12 w-7/12 sm:w-28"></div>
                        )}
                    </div>
                </div>
                <section className="product-page-wrapper">
                    <Filter
                        filterCount={filterCount}
                        setFilterCount={setFilterCount}
                        loading={loading}
                    />
                    <Collection products={products} loading={loading} />
                </section>
            </section>
        </section>
    );
}

export default Product_Page;
