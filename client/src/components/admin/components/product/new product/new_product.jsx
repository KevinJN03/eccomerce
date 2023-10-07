import './new_product.scss';
import SideBar from '../../sidebar/sidebar';
import Navbar from '../../navbar/navbar';
import About from './about.jsx';
import Price_Inventory from './price-inventory';
import Details from './details';
import Delivery from './delivery/delivery';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Variation from './variation/variation';
import { NewProductProvider } from '../../../../../context/newProductContext';
import Footer from './variation/footer';
function New_Product() {
    let navigate = useNavigate();
    return (
        <NewProductProvider>
            <section className="new-product">
                <SideBar />
                <div className="new-product-container">
                    <Navbar />
                    <section className="flex justify-center">
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

                            <section className="new-product-wrapper mx-[-24px] flex flex-col gap-y-3 !rounded-none bg-[var(--light-grey)] py-4 pl-6">
                                <About />
                                <Price_Inventory
                                  
                                />
                                <Variation />
                                <Details />

                                <Delivery />
                            </section>

                            <Footer />
                        </div>
                    </section>
                </div>
            </section>
        </NewProductProvider>
    );
}

export default New_Product;
