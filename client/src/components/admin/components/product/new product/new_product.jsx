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

function New_Product({ Content, type }) {
    let navigate = useNavigate();

    const {
        modalContent,
        modalCheck,
        setModalCheck,
        loading,
        setLoading,
        publishError,
        publishErrorDispatch,
        title,
    } = useNewProduct();
    return (
        <VariationProvider>
            <section className="new-product">
                <div className="new-product-container">
                    <section className="flex justify-center">
                        <div className="product-listing">
                            <div className=" mb-6 ml-4 font-gotham text-3xl font-bold tracking-wider">
                                {type == 'update' ? title : 'New Listing'}
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
                                {publishError.get('default') && (
                                    <div className="alert alert-error">
                                        <svg
                                            onClick={() =>
                                                publishErrorDispatch({
                                                    type: 'clear',
                                                    path: 'default',
                                                })
                                            }
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 shrink-0 cursor-pointer stroke-current transition-all hover:scale-110"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span>
                                            {publishError.get('default')}
                                        </span>
                                    </div>
                                )}
                                <About />
                                <Price_Inventory />

                                <Variation />

                                <Details />

                                <Delivery />
                            </section>

                            <Footer type={type ? type : ''} />
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
