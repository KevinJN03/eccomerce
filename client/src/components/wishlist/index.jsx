import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import { useWishlistContext } from '../../context/wishlistContext';
import { Fragment, useEffect, useRef, useState } from 'react';
import axios from '../../api/axios';
import { DeleteOutlineRounded } from '@mui/icons-material';

import delete_icon from '../../assets/icons/delete-icon.png';
import { Link } from 'react-router-dom';
import GLoader from '../Login-SignUp/socialRegister/gloader.jsx';
import WishListItem from './wishListItem';
import { AnimatePresence, motion } from 'framer-motion';
function WishList({}) {
    const { wishlist, wishListDispatch } = useWishlistContext();

    const [products, setProducts] = useState([]);
    const abortControllerRef = useRef(new AbortController());

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        abortControllerRef.current?.abort();

        abortControllerRef.current = new AbortController();
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    `product/many/${Array.from(wishlist)}`,
                    {
                        signal: abortControllerRef.current.signal,
                    }
                );

                setProducts(() => data?.products || []);
            } catch (error) {
                console.error(error);
            } finally {
                setTimeout(() => {
                    setLoading(() => false);
                }, 800);
            }
        };

        fetchData();

        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-white pb-24">
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: 'easeInOut',
                        }}
                        key={'wishlist-loader'}
                        className="flex h-full w-full  items-center justify-center"
                    >
                        <GLoader />
                    </motion.section>
                ) : (
                    <motion.section
                        key={'wishlist-container'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: 'easeInOut',
                        }}
                        className=" relative flex h-full w-full flex-col"
                    >
                        <header className="bg-dark-gray/10 py-6 text-center font-gotham text-2xl font-bold tracking-wider text-black/80">
                            Saved Items
                        </header>
                        <div className="flex h-full w-10/12 flex-col gap-3 self-center bg-white pt-3 ">
                            <div className="flex flex-row justify-between">
                                <select
                                    name="sort-by"
                                    id="sort-by"
                                    className="daisy-select daisy-select-bordered daisy-select-sm w-fit rounded-none text-base font-semibold"
                                >
                                    <option value="">Recently added</option>
                                </select>

                                <p>
                                    {`${products.length} ${
                                        products.length > 1 ? 'items' : 'item'
                                    }`}
                                </p>
                            </div>

                            <section className="flex flex-row flex-wrap gap-3">
                                {products.map((product) => {
                                    return (
                                        <Fragment key={product?._id}>
                                            <WishListItem product={product} />
                                        </Fragment>
                                    );
                                })}
                            </section>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

export default WishList;
