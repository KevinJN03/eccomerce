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
import {
    NewProductProvider,
    useNewProduct,
} from '../../../../../context/newProductContext';
import Footer from './variation/footer';
import { VariationProvider } from '../../../../../context/variationContext';
import Modal from '../../modal/modal';
import Manage from './variation/manage/manage';
import SelectVariation from './variation/selectVariation';
import Main from './variation/main';
import Update from './variation/update';


const views = {
    manage: <Manage />,
    select: <SelectVariation />,
    main: <Main />,
    update: <Update />,
};

function New_Product({ Content }) {
    let navigate = useNavigate();

    const { modalContent, modalCheck, setModalCheck, loading, setLoading } =
        useNewProduct();
    return (
        <VariationProvider>
            <section className="new-product">
                <div className="new-product-container">
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
                                <Price_Inventory />
                               
                                    <Variation />
                                

                                <Details />

                                <Delivery />
                            </section>

                            <Footer />
                        </div>
                    </section>
                </div>
                {modalCheck && (
                    <Modal
                        check={modalCheck}
                        setCheck={setModalCheck}
                        ModalContent={views[modalContent.type]}
                        loading={loading}
                        setLoading={setLoading}
                    />
                )}
            </section>
        </VariationProvider>
    );
}

export default New_Product;
