import SideBar from '../components/sidebar/sidebar.jsx';
import Navbar from '../components/navbar/navbar.jsx';

import { useEffect, useRef, useState } from 'react';

import actionColumn from '../components/users/datatable/actionColumn.jsx';
import { useAdminContext } from '../../../context/adminContext.jsx';
import SearchInput from '../order/home/searchInput.jsx';
import { AddRounded, ArrowDropDownSharp } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import ProductItem from './gridItem.jsx';
import SelectionInput from '../order/home/selectionIput.jsx';
import SideContainer from './sideContainer.jsx';
import { Box, Modal } from '@mui/material';
import GridProduct from './gridProducts.jsx';
import VerticalProducts from './verticalProducts.jsx';
import SubHeader from './subheader.jsx';
import Header from './header.jsx';
import ListingPageProvider from '../../../context/listingPageContext.jsx';
import { adminAxios } from '../../../api/axios.js';
import UserLogout from '../../../hooks/userLogout.jsx';

import { AnimatePresence, motion, progress } from 'framer-motion';

function ListingPage() {
    const [loading, setLoading] = useState(false);
    const [categoryQuantity, setCategoryQuantity] = useState({});
    const [selectionSet, setSelectionSet] = useState([]);
    const { allProducts, setAllProducts } = useAdminContext();
    const [searchText, setSearchText] = useState('');
    const [products, setProducts] = useState([]);
    const [productIds, setProductIds] = useState([]);
    const [progressValue, setProgressValue] = useState(0);

    const [showStats, setShowStats] = useState(false);
    const [checks, setChecks] = useState({
        format: 'vertical',
        listing_status: 'active',

        featured: false,
        sort: {
            title: 1,
        },
    });

    const { logoutUser } = UserLogout();

    useEffect(() => {
        let id = null;
        const fetchData = async () => {
            try {
                let complete = false;
                let speed = 1;
                const data = {};

                setSelectionSet(() => new Set());
                var intervalId = setInterval(handleInterval, 1);
                id = intervalId;
                function handleInterval() {
                    console.log('interval', intervalId);

                    setProgressValue((prevValue) => {
                        if (prevValue >= 100) {
                            setAllProducts(() => data.products);
                            const newProducts =
                                data.products?.[checks?.listing_status] || [];
                            setProducts(() => newProducts);
                            const countObj = {};

                            newProducts?.forEach(({ category }) => {
                                if (countObj?.[category]) {
                                    countObj[category] += 1;
                                } else {
                                    countObj[category] = 1;
                                }
                            });
                            console.log({ countObj });
                            setCategoryQuantity(() => countObj);
                            setProductIds(() =>
                                newProducts?.map((item) => item._id)
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

                const { data: productResult } = await adminAxios.post(
                    'products/all',
                    {
                        checks,
                    }
                );
                complete = productResult.success;

                Object.assign(data, productResult);
            } catch (error) {
                console.error(error);
                clearInterval(id);
                logoutUser({ error });
            } finally {
            }
        };

        fetchData();

        return () => {
            console.log({ id });
            clearInterval(id);
        };
    }, [
        checks?.listing_status,
        checks?.sort,
        checks?.featured,
        checks?.section,
    ]);

    const deleteButtonClick = () => {};
    const handleClick = () => {};
    const value = {
        checks,
        setChecks,
        products,
        setProducts,
        productIds,
        selectionSet,
        setSelectionSet,
        categoryQuantity,
        showStats,
        setShowStats,
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
