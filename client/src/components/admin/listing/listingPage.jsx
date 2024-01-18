import SideBar from '../components/sidebar/sidebar.jsx';
import Navbar from '../components/navbar/navbar.jsx';

import { useState } from 'react';

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
function ListingPage() {
    const [loading, setLoading] = useState(false);

    const [selection, setSelection] = useState([]);
    const { allProducts } = useAdminContext();
    const [searchText, setSearchText] = useState('');

    const [checks, setChecks] = useState({ format: 'vertical' });

    const [selectionSet, setSelectionSet] = useState(() => new Set());
    const navigate = useNavigate();
    const deleteButtonClick = () => {};

    const handleClick = () => {};
    return (
        <ListingPageProvider>
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

                    <SideContainer {...{ checks, setChecks }} />
                </section>
            </section>
        </ListingPageProvider>
    );
}

export default ListingPage;
