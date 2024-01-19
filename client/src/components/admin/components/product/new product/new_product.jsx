import './new_product.scss';
import About from './about.jsx';
import Price_Inventory from './price-inventory';
import Details from './details';
import Delivery from './delivery/delivery';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import Variation from './variation/variation';
import {
    NewProductProvider,
    useNewProduct,
} from '../../../../../context/newProductContext';
import Footer from './variation/footer';
import { VariationProvider } from '../../../../../context/variationContext';
// import Modal from '../../modal/modal';
import Manage from './variation/manage/manage';
import SelectVariation from './variation/selectVariation';
import Main from './variation/main';
import Update from './variation/update';
import { Box, Modal } from '@mui/material';
import Delivery_Main from './delivery/Main.jsx';
import Delivery_New from './delivery/New.jsx';
import {
    CallMadeRounded,
    ContentCopySharp,
    KeyboardBackspaceRounded,
    MoreVertSharp,
    SettingsRounded,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

import { inView } from 'framer-motion';
import dayjs from 'dayjs';
import useScrollpsy from '../../../../../hooks/useScrollpsy.jsx';
const views = {
    manage: <Manage />,
    select: <SelectVariation />,
    main: <Main />,
    update: <Update />,
    delivery_main: <Delivery_Main />,
    delivery_new: <Delivery_New edit={false} />,
    delivery_edit: <Delivery_New edit={true} />,
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
        product,
        currentSection,
        setCurrentSection,
    } = useNewProduct();

    const [mountTitle, setMountTitle] = useState(title);
    const activeId = useScrollpsy(
        ['about', 'price-inventory', 'variations', 'details', 'delivery'],
        200
    );

    console.log({ activeId });
    return (
        <VariationProvider>
            <div className="product-listing flex h-full min-h-screen flex-col justify-start ">
                <section className="mb-6 flex h-fit w-full flex-col gap-6 pl-16 pr-20 pt-6">
                    <div className="group flex w-fit cursor-pointer flex-row flex-nowrap items-center gap-1">
                        <div className="flex items-center justify-center transition-all group-hover:translate-x-[-0.4rem]">
                            <KeyboardBackspaceRounded fontSize="small" />
                        </div>

                        <Link
                            to={'/admin/products'}
                            className="text-sm font-semibold"
                        >
                            Back to listings
                        </Link>
                    </div>
                    <div className="flex w-full flex-col">
                        <div className="flex-no-wrap flex w-full flex-row justify-between">
                            <div>
                                <h3 className=" text-lg font-semibold tracking-wider">
                                    {!type ? 'New Listing' : mountTitle}
                                </h3>
                                <div className="flex flex-nowrap items-center gap-3">
                                    <p className={`w-fit rounded-full font-light ${product?.status == 'active' ? 'bg-green-200' : product?.status == 'draft' ? 'bg-black/80 text-white' : 'bg-dark-gray/50'}  px-3 py-1`}>
                                        {product?.status}
                                    </p>

                                    <p>
                                        Listed on{' '}
                                        {dayjs(product?.timestamp).format(
                                            'DD MMM, YYYY'
                                        )}
                                        .
                                    </p>
                                </div>
                            </div>

                            <div className=" flex flex-row flex-nowrap items-center gap-2">
                                {type && (
                                    <Link
                                        to={`/product/${product?._id}`}
                                        target="_blank"
                                        className="theme-btn flex h-fit w-fit flex-row items-center gap-2 rounded-full !border-none bg-light-grey px-4 py-2"
                                    >
                                        <CallMadeRounded fontSize="small" />
                                        <p className="text-s font-semibold whitespace-nowrap">
                                            {type == 'copy'
                                                ? 'View original on glamo'
                                                : 'View on glamo'}
                                        </p>
                                    </Link>
                                )}
                                {type != 'copy' && (
                                    <Link
                                        to={`/admin/products/copy/${product?._id}`}
                                        target="_blank"
                                        className="theme-btn flex h-fit w-fit flex-row items-center gap-2 rounded-full !border-none bg-light-grey px-4 py-2"
                                    >
                                        <ContentCopySharp fontSize="small" />
                                        <p className="text-s font-semibold">
                                            Copy
                                        </p>
                                    </Link>
                                )}

                                <button
                                    type="button"
                                    className="rounded-full p-2 transition-all ease-in-out hover:bg-light-grey/50"
                                >
                                    <MoreVertSharp />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <div
                    id={'stickyElement'}
                    className=" subheader !sticky !top-0 z-50 flex h-12 w-full flex-row flex-nowrap  items-center gap-x-10 bg-white pl-16 "
                >
                    {[
                        { text: 'About', id: 'about' },
                        {
                            text: 'Price & Inventory',
                            id: 'price-inventory',
                        },
                        { text: 'Variations', id: 'variations' },
                        { text: 'Details', id: 'details' },
                        { text: 'Delivery', id: 'delivery' },
                    ].map((section) => {
                        return (
                            <a
                                key={section.text}
                                href={`#${section.id}`}
                                className={`${
                                    activeId == section.id
                                        ? 'text-admin-accent !border-b-admin-accent bg-green-50'
                                        : '!border-white'
                                }hover:text-admin-accent hover:border-admin-accent flex h-full items-center justify-center border-b-2  text-sm`}
                            >
                                {section.text}
                            </a>
                        );
                    })}
                    <a
                        href="#settings"
                        className="hover:text-admin-accent hover:border-admin-accent flex h-full flex-nowrap items-center justify-center gap-2 border-b-2 border-transparent text-sm "
                    >
                        <SettingsRounded fontSize="small" />
                        Settings
                    </a>
                </div>

                <section className="flex w-full max-w-[1366px] flex-col gap-y-3 rounded-none bg-[var(--light-grey)] py-4 pl-16 pr-20">
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
                            <span>{publishError.get('default')}</span>
                        </div>
                    )}
                    <About />
                    <Price_Inventory />

                    <Variation />

                    <Details />

                    <Delivery />

                    {/* <div className='h-[1000px]'>

                    </div> */}
                </section>

                <Footer type={type} />
            </div>

            <Modal open={modalCheck} onClose={() => setModalCheck(() => false)}>
                <Box
                    className="modal-content"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    {views?.[modalContent?.type]}
                </Box>
            </Modal>
        </VariationProvider>
    );
}

export default New_Product;
