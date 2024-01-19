import SideBar from '../components/sidebar/sidebar.jsx';
import Navbar from '../components/navbar/navbar.jsx';

import { useEffect, useState } from 'react';

import actionColumn from '../components/users/datatable/actionColumn.jsx';
import { useAdminContext } from '../../../context/adminContext.jsx';
import SearchInput from '../order/home/searchInput.jsx';
import { AddRounded, ArrowDropDownSharp } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import ProductItem from '../components/product/gridItem.jsx';
import SelectionInput from '../order/home/selectionIput.jsx';
import SideContainer from '../components/product/sideContainer.jsx';
import { Box, Modal } from '@mui/material';
import GridProduct from '../components/product/gridProducts.jsx';
import VerticalProducts from '../components/product/verticalProducts.jsx';
import SubHeader from './subheader.jsx';
import Header from './header.jsx';
import ListingPageProvider from '../../../context/listingPageContext.jsx';
import { adminAxios } from '../../../api/axios.js';
import UserLogout from '../../../hooks/userLogout.jsx';
function ListingPage() {
    const [loading, setLoading] = useState(false);
    const [drafts, setDrafts] = useState([]);
    const [selection, setSelection] = useState([]);
    const { allProducts } = useAdminContext();
    const [searchText, setSearchText] = useState('');
    const [checks, setChecks] = useState({
        format: 'vertical',
        listing_status: 'active',
    });

    const navigate = useNavigate();
    const { logoutUser } = UserLogout();
    useEffect(() => {
        adminAxios
            .get('draftProducts/all')
            .then(({ data }) => {
                setDrafts(() => data?.draftProducts || []);
            })
            .catch((error) => {
                console.error(error);

                logoutUser({ error });
            });
    }, []);
    const deleteButtonClick = () => {};

    const handleClick = () => {};

    const value = {
        drafts,
        checks,
        setChecks,
        setDrafts,
    };
    return (
        <ListingPageProvider newValue={value}>
            <section>
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
