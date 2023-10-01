import './new_product.scss';

import SideBar from '../../sidebar/sidebar';
import Navbar from '../../navbar/navbar';
import About from './about.jsx';
import Price_Inventory from './price-inventory';
import Details from './details';
import Delivery from './delivery/delivery';
import DragDropFile from './dragDropFile';
import { ContentProvider } from '../../../../../context/ContentContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Variation from './variation/variation';
import { Modal } from '@mui/material';
function New_Product() {
    let navigate = useNavigate();

    return (
        <section className="new-product">
            <SideBar />
            <div className="new-product-container">
                <Navbar />

                <div className="product-listing">
                    <div className=" mb-6 ml-4 font-gotham text-3xl font-bold tracking-wider">
                        New Listing
                    </div>
                    <div className="subheader mb-3">
                        <a href="#about">About</a>
                        <a href="#price-inventory">Price & Inventory</a>
                        <a href="#variations">Variations</a>
                        <a href="#details">Details</a>
                        <a href="#delivery">Delivery</a>
                        <a href="#settings">Settings</a>
                    </div>

                    <section className="new-product-wrapper !rounded-none mx-[-24px] flex flex-col gap-y-3 bg-[var(--light-grey)] py-4 pl-6">
                        <About />
                        <Price_Inventory />
                        <Variation />
                        <Details />

                        <Delivery />
                    </section>

                    <div className="new-product-footer flex gap-2 p-6 font-medium">
                        <button
                            className="border-none hover:bg-[var(--light-grey)]"
                            onClick={() => navigate('/admin/products')}
                        >
                            Cancel
                        </button>
                        <button className="ml-auto theme-btn">Preview</button>
                        <button className='theme-btn'>Save as draft</button>
                        <button className="bg-black text-white theme-btn">Publish</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default New_Product;
