import SideBar from '../components/sidebar/sidebar.jsx';
import Navbar from '../components/navbar/navbar.jsx';

import { useEffect, useRef, useState } from 'react';

import actionColumn from '../components/users/datatable/actionColumn.jsx';
import { useAdminContext } from '../../../context/adminContext.jsx';
import SearchInput from '../order/home/searchInput.jsx';
import { AddRounded, ArrowDropDownSharp } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import ProductItem from './gridItem.jsx';
import SelectionInput from '../order/home/selectionInput.jsx';
import SideContainer from './sideContainer.jsx';
import { Box, Modal } from '@mui/material';
import GridProduct from './gridProducts.jsx';
import VerticalProducts from './verticalProducts.jsx';
import SubHeader from './subheader.jsx';
import Header from './header.jsx';
import ListingPageProvider from '../../../context/listingPageContext.jsx';
import { adminAxios } from '../../../api/axios.js';
import UserLogout from '../../../hooks/userLogout.jsx';
import illustration from './illustration3.png';
import { AnimatePresence, motion, progress } from 'framer-motion';
import _ from 'lodash';
function ListingPage() {
    const [loading, setLoading] = useState(true);
    const [categoryQuantity, setCategoryQuantity] = useState({});
    const [deliveryQuantityMap, setDeliveryQuantityMap] = useState({});

    const [selectionSet, setSelectionSet] = useState([]);
    const { allProducts, setAllProducts } = useAdminContext();
    const [searchText, setSearchText] = useState('');
    const [triggerSearch, setTriggerSearch] = useState(false);
    const [products, setProducts] = useState([]);
    const [productIds, setProductIds] = useState([]);
    const [progressValue, setProgressValue] = useState(0);
    const [deliveryProfile, setDeliveryProfile] = useState([]);
    const [showStats, setShowStats] = useState(false);
    const abortControllerRef = useRef(new AbortController());
    const [checks, setChecks] = useState(() => {
        const defaultChecks = {
            format: 'grid',
            listing_status: 'active',

            featured: false,
            sort: {
                title: 1,
            },
        };

        try {
            if (!_.isEmpty(localStorage.getItem('checks'))) {
                console.log('in here', localStorage.getItem('checks'));
                return JSON.parse(localStorage.getItem('checks'));
            } else {
                return defaultChecks;
            }
        } catch (error) {
            console.error(error);
            return defaultChecks;
        }
    });

    const { logoutUser } = UserLogout();

    useEffect(() => {
        localStorage.setItem('checks', JSON.stringify(checks));
    }, [checks]);

    useEffect(() => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        let id = null;
        const fetchData = async () => {
            try {
                let complete = false;
                let speed = 1;
                const data = {};
                const deliveryProfileData = [];
                setSelectionSet(() => new Set());
                var intervalId = setInterval(handleInterval, 1);
                id = intervalId;
                function handleInterval() {
                    console.log('interval', intervalId);

                    setProgressValue((prevValue) => {
                        if (prevValue >= 100) {
                            setDeliveryProfile(() => deliveryProfileData);
                            setAllProducts(() => data.products);
                            const newProducts =
                                data.products?.[checks?.listing_status] || [];
                            setProducts(() => newProducts);
                            const categoryObj = {};
                            const deliveryObj = {};

                            newProducts?.forEach(({ category, delivery }) => {
                                if (_.has(categoryObj, category)) {
                                    categoryObj[category] += 1;
                                } else {
                                    categoryObj[category] = 1;
                                }

                                if (_.has(deliveryObj, delivery)) {
                                    deliveryObj[delivery] += 1;
                                } else {
                                    deliveryObj[delivery] = 1;
                                }
                            });

                            // setCategoryQuantity(() => categoryObj);

                            const updateQuantityMap = ({
                                setState,
                                property,
                                quantityObj,
                            }) => {
                                if (
                                    !checks?.[property] ||
                                    checks?.[property] == 'All'
                                ) {
                                    setState(() => quantityObj);
                                } else {
                                    console.log(quantityObj);
                                    setState((prevState) => ({
                                        ...quantityObj,
                                        ...prevState,
                                        [checks?.[property]]:
                                            quantityObj[checks?.[property]],
                                    }));
                                }
                            };

                            updateQuantityMap({
                                property: 'deliveryProfile',
                                quantityObj: deliveryObj,
                                setState: setDeliveryQuantityMap,
                            });
                            updateQuantityMap({
                                property: 'category',
                                quantityObj: categoryObj,
                                setState: setCategoryQuantity,
                            });

                            if (
                                !checks?.deliveryProfile ||
                                checks?.deliveryProfile == 'All'
                            ) {
                                setDeliveryQuantityMap(() => deliveryObj);
                            } else {
                                console.log(deliveryObj);
                                setDeliveryQuantityMap((prevState) => ({
                                    ...deliveryObj,
                                    ...prevState,
                                    [checks?.deliveryProfile]:
                                        deliveryObj[checks?.deliveryProfile],
                                }));
                            }
                            setProductIds(
                                () =>
                                    new Set(
                                        newProducts?.map((item) => item._id)
                                    )
                            );
                            clearInterval(intervalId);

                            return 0;
                        } else {
                            if (prevValue == 90 && !complete) {
                                return prevValue;
                            } else if (complete) {
                                speed += 0.5;

                                return (prevValue += 2);
                            } else {
                                return (prevValue += 2);
                            }
                        }
                    });
                }

                const [
                    { data: productResult },
                    { data: deliveryProfileResult },
                ] = await Promise.all([
                    adminAxios.post(
                        'products/all',
                        {
                            checks,
                        },
                        { signal: abortControllerRef.current?.signal }
                    ),

                    adminAxios.get('delivery/all', {
                        signal: abortControllerRef.current?.signal,
                    }),
                ]);

                complete = productResult.success;

                Object.assign(data, productResult);
                deliveryProfileData.push(...deliveryProfileResult);
            } catch (error) {
                console.error(error);
                clearInterval(id);
                logoutUser({ error });
            } finally {
                setSelectionSet(() => new Set());
                if (loading) {
                    setTimeout(() => {
                        setLoading(() => false);
                    },400);
                }
            }
        };

        fetchData();

        return () => {
            console.log({ id });
            clearInterval(id);

            abortControllerRef.current?.abort();
        };
    }, [
        checks?.listing_status,
        checks?.sort,
        checks?.featured,
        checks?.category,
        triggerSearch,
        ,
        checks?.deliveryProfile,
    ]);

    const value = {
        checks,
        setChecks,
        products,
        setProducts,
        productIds,
        selectionSet,
        setSelectionSet,
        categoryQuantity,
        deliveryQuantityMap,
        loading,
        showStats,
        setShowStats,
        triggerSearch,
        setTriggerSearch,
        setProductIds,
        deliveryProfile,
    };

    return (
        <ListingPageProvider newValue={value}>
            <section className="progress-bar z-50 flex min-h-screen w-full flex-col">
                <div className="sticky top-0 flex h-0.5 w-full items-start self-start">
                    <AnimatePresence>
                        {progressValue > 0 && (
                            <motion.progress
                                initial={{ opacity: 1 }}
                                animate={{
                                    opacity: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: {
                                        duration: 0.3,
                                    },
                                }}
                                className="daisy-progress  !m-0 h-full  w-full !rounded-none !p-0"
                                value={progressValue}
                                max="100"
                            ></motion.progress>
                        )}
                    </AnimatePresence>
                </div>

                <Header />

                <section className="wrapper flex w-full flex-row flex-nowrap gap-5 p-6">
                    <section className="left flex w-full flex-[5] flex-col">
                        <SubHeader />
                        <section className="w-full">
                            <>
                                {checks.format === 'grid' ? (
                                    <GridProduct />
                                ) : (
                                    <VerticalProducts />
                                )}
                            </>

                            {/* // <div className="mt-20 flex w-full flex-col items-center justify-center gap-4">
                                //     <img
                                //         className="w28 h-28"
                                //         src={illustration}
                                //     />
                                //     <p className="text-lg">
                                //         {checks?.searchText
                                //             ? 'No listings matched your search query.'
                                //             : 'No listings matched these filters.'}
                                //     </p>
                                //     <button
                                //         onClick={() => {
                                //             if (checks?.searchText) {
                                //                 setChecks((prevState) => {
                                //                     return {
                                //                         ...prevState,
                                //                         searchText: '',
                                //                     };
                                //                 });
                                //                 setTriggerSearch(
                                //                     (prevState) => !prevState
                                //                 );

                                //                 return;
                                //             }

                                //             setChecks((prevState) => {
                                //                 const {
                                //                     sort,
                                //                     listing_status,
                                //                     format,
                                //                 } = prevState;
                                //                 return {
                                //                     sort,
                                //                     listing_status,
                                //                     format,
                                //                 };
                                //             });
                                //         }}
                                //         className="rounded border  border-dark-gray px-3 py-2 font-medium transition-all hover:bg-light-grey/50"
                                //     >
                                //         {checks?.searchText
                                //             ? 'Clear Search'
                                //             : 'Reset Filters'}
                                //     </button>
                                // </div> */}
                        </section>
                    </section>

                    <SideContainer />
                </section>
            </section>
        </ListingPageProvider>
    );
}

export default ListingPage;
