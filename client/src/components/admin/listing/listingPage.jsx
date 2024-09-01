import SideBar from '../components/sidebar/sidebar.jsx';
import Navbar from '../components/navbar/navbar.jsx';

import { useEffect, useRef, useState } from 'react';

import actionColumn from '../components/users/datatable/actionColumn.jsx';
import { useAdminContext } from '../../../context/adminContext.jsx';
import SearchInput from '../order/home/searchInput.jsx';
import { AddRounded, ArrowDropDownSharp } from '@mui/icons-material';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
import boxIcon from '../../../assets/icons/magic-box.png';

function ListingPage() {
    const defaultChecks = {
        format: 'grid',
        listing_status: 'active',
        stats: false,
        featured: false,
        sort: {
            title: 1,
        },
    };
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
    const abortControllerRef = useRef(new AbortController());

    const [searchParams, setSearchParams] = useSearchParams();
    const [checks, setChecks] = useState(() => {
        try {
            const newChecks = _.cloneDeep(defaultChecks);
            const allSearchParams = Object.fromEntries([...searchParams]);
            _.merge(newChecks, allSearchParams);
            if (newChecks?.sort_by) {
                newChecks.sort = {
                    [newChecks?.sort_by]: parseInt(newChecks?.order || 1),
                };
                _.unset(newChecks, 'sort_by');
                _.unset(newChecks, 'order');
            }
            if (!_.isEmpty(allSearchParams)) {
                return newChecks;
            }
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
        setChecks((prevState) => ({
            ...prevState,
            searchText: searchParams.get('searchText') || '',
        }));
        setTriggerSearch((prevState) => !prevState);
    }, [searchParams.get('searchText')]);

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

                setTimeout(() => {
                    setLoading(() => false);
                }, 400);
            }
        };

        fetchData();

        return () => {
            console.log({ id });
            clearInterval(id);

            abortControllerRef.current?.abort();
        };
    }, [
        // checks?.listing_status,
        // checks?.sort,
        // checks?.featured,
        // checks?.category,
        // triggerSearch,
        // ,
        // checks?.deliveryProfile,
        searchParams.get('listing_status'),
        searchParams.get('sort_by'),
        searchParams.get('category'),
        searchParams.get('searchText'),
        searchParams.get('deliveryProfile'),
        searchParams.get('featured'),
        triggerSearch,
    ]);

    const handleSearchText = () => {
        setLoading(() => true);
        if (checks?.searchText) {
            searchParams.set('searchText', checks?.searchText);
        } else {
            searchParams.delete('searchText');
        }
        setSearchParams(searchParams);
        setTriggerSearch((prevState) => !prevState);
    };
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
        setLoading,
        triggerSearch,
        setTriggerSearch,
        setProductIds,
        deliveryProfile,
        searchParams,
        setSearchParams,
        defaultChecks,
        handleSearchText,
    };

    return (
        <ListingPageProvider newValue={value}>
            <section className="progress-bar z-50 flex min-h-screen w-full flex-col">
                <div className="sticky top-0 flex h-1 w-full items-start self-start">
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
                                className="!!rounded-none  daisy-progress !m-0  !h-1 w-full !p-0 "
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
                            {checks.format === 'grid' ? (
                                <GridProduct />
                            ) : (
                                <VerticalProducts />
                            )}
                        </section>
                    </section>

                    <SideContainer />
                </section>
            </section>
        </ListingPageProvider>
    );
}

export default ListingPage;
