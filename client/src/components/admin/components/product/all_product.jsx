import SideBar from '../sidebar/sidebar';
import Navbar from '../navbar/navbar.jsx';
import './all_product.scss';
import Datatable from '../users/datatable/datatable';
import { useEffect, useState } from 'react';
import axios, { adminAxios } from '../../../../api/axios';
import { productColumn } from '../users/datatable/datatable-source';
import actionColumn from '../users/datatable/actionColumn.jsx';
import { useAdminContext } from '../../../../context/adminContext.jsx';
import SearchInput from '../../order/home/searchInput.jsx';
import {
    AddRounded,
    ArrowDropDown,
    ArrowDropDownSharp,
    SettingsRounded,
    StarRateRounded,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import ProductItem from './productItem.jsx';
import SelectionInput from '../../order/home/selectionIput.jsx';
import SideContainer from './sideContainer.jsx';
import { Box, Modal } from '@mui/material';
function All_Products() {
    const [loading, setLoading] = useState(false);

    const [selection, setSelection] = useState([]);
    const { allProducts } = useAdminContext();
    const [searchText, setSearchText] = useState('');

    const [productIds, setProductIds] = useState(() =>
        allProducts?.map((product) => product?._id)
    );

    const [selectionSet, setSelectionSet] = useState(() => new Set());
    const navigate = useNavigate();
    const deleteButtonClick = () => {};
    const columnAction = actionColumn({
        selection,
        viewBtn: false,
        deleteButtonClick,
    });

    const handleClick = () => {};
    return (
        <section>
            <header className="flex w-full flex-row items-center justify-between border-b-2 py-4 pl-6 pr-12">
                <h2 className="flex-1 text-2xl font-semibold">Listings</h2>

                <section className="flex flex-[0.6] flex-row gap-x-6 self-end">
                    <SearchInput
                        searchText={searchText}
                        setSearchText={setSearchText}
                        handleClick={handleClick}
                        placeHolder="Enter a title, id"
                    />
                    <div
                        onClick={() => navigate('new')}
                        className="flex cursor-pointer flex-row items-center gap-1 rounded-sm bg-black px-3 hover:bg-opacity-80"
                    >
                        <AddRounded className="!fill-white" />
                        <p className="whitespace-nowrap font-medium text-white">
                            Add a listing
                        </p>
                    </div>
                </section>
            </header>

            <section className="wrapper flex w-full flex-row flex-nowrap gap-5 p-6">
                <section className="left flex w-full flex-[5] flex-col">
                    <div className="subheader mb-3 flex flex-row  flex-nowrap gap-3">
                        <SelectionInput
                            {...{
                                allIds: productIds,
                                setSelectionSet,
                                selectionSet,
                            }}
                        />

                        <div className="flex w-fit flex-row flex-nowrap rounded border border-dark-gray/50">
                            <button
                                disabled={!selectionSet?.size}
                                type="button"
                                className="rounded-l-inherit px-3 text-xs font-medium text-black/70 hover:bg-light-grey/60 disabled:cursor-default disabled:bg-orange-50/50"
                            >
                                Renew
                            </button>
                            <button
                                disabled={!selectionSet?.size}
                                type="button"
                                className="border-x border-dark-gray/50 px-3 text-xs font-medium text-black/70 hover:bg-light-grey/60 disabled:cursor-default disabled:bg-orange-50/50"
                            >
                                Deactivate
                            </button>
                            <button
                                disabled={!selectionSet?.size}
                                type="button"
                                className="rounded-r-inherit px-3 text-xs font-medium text-black/70 hover:bg-light-grey/60 disabled:cursor-default disabled:bg-orange-50/50"
                            >
                                Delete
                            </button>
                        </div>

                        <button
                        disabled={!selectionSet?.size}
                            type="button"
                            className="flex flex-row items-center rounded border border-dark-gray/50 px-3 text-xs font-medium  hover:bg-light-grey/60 disabled:cursor-default disabled:bg-orange-50/50"
                        >
                            <p className='text-black/70'>Editing options</p>
                            <ArrowDropDownSharp />
                        </button>
                    </div>
                    <section className="flex w-full flex-row flex-wrap gap-4 overflow-y-hidden">
                        {allProducts.map((product) => {
                            return (
                                <ProductItem
                                    {...{
                                        product,
                                        setSelectionSet,
                                        selectionSet,
                                    }}
                                />
                            );
                        })}
                    </section>
                </section>

               <SideContainer/>
            </section>

          
        </section>
    );
}

export default All_Products;
