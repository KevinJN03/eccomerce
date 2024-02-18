import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import { useWishlistContext } from '../../context/wishlistContext';
import { Fragment, useEffect, useRef, useState } from 'react';
import axios from '../../api/axios';
import GLoader from '../Login-SignUp/socialRegister/gloader.jsx';
import WishListItem from './wishListItem';
import { AnimatePresence, motion } from 'framer-motion';
import EmptyWishList from './empty.jsx';

function WishList({}) {
    const {
        wishlist,
        wishListDispatch,
        wishlistLoading,
        setWishListLoading,

        wishlistRefresh,
        getWishlistFromLS,
    } = useWishlistContext();
    const [wishlistProducts, setWishlistProduct] = useState([]);
    const abortControllerRef = useRef(new AbortController());

    const fetchData = async () => {
        try {
            setWishListLoading(() => true);
            const productIdArray = [];
            const wishlistMap = new Map(getWishlistFromLS());
            for (const id of wishlistMap.keys()) {
                productIdArray.push(id);
            }
            if (productIdArray.length < 1) {
               setTimeout(() => {
                    setWishListLoading(() => false);
                }, 1000);

                return
            }
            const { data } = await axios.get(`product/many/${productIdArray}`, {
                signal: abortControllerRef.current?.signal,
            });

            // setProducts(() => data?.products || []);
            wishListDispatch({
                type: 'refresh',
                products: data?.products || [],
            });
        } catch (error) {
            console.error(error);
        } finally {
         
        }
    };

    useEffect(() => {
        abortControllerRef.current?.abort();

        abortControllerRef.current = new AbortController();

        fetchData();

        return () => {
            abortControllerRef.current?.abort();
        };
    }, [wishlistRefresh]);

    useEffect(() => {
        const productsArray = [];

        wishlist.forEach(function (value, key) {
            productsArray.push(value);
        });
        console.log({ productsArray });
        setWishlistProduct(() => productsArray);

        const timeout = setTimeout(() => {
            setWishListLoading(() => false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, [wishlist]);
    return (
        <div className="flex w-full flex-col bg-white">
            <AnimatePresence mode="wait">
                {wishlistLoading ? (
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: 'easeInOut',
                        }}
                        key={'wishlist-loader'}
                        className=" flex h-full  w-full items-center justify-center"
                    >
                        <GLoader />
                    </motion.section>
                ) : wishlistProducts.length > 0 ? (
                    <motion.section
                        key={'wishlist-container'}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: 'easeInOut',
                            },
                        }}
                        exit={{
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: 'easeOut',
                            },
                        }}
                        className=" relative mb-32 flex h-full w-full flex-col"
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
                                    {`${wishlistProducts.length} ${
                                        wishlistProducts.length > 1
                                            ? 'items'
                                            : 'item'
                                    }`}
                                </p>
                            </div>

                            <section className="flex h-full flex-row flex-wrap gap-y-10">
                                <AnimatePresence>
                                    {wishlistProducts.map((product) => {
                                        return (
                                            <WishListItem
                                                product={product}
                                                key={`wishlistId-${product.wishlistId}`}
                                            />
                                        );
                                    })}
                                </AnimatePresence>
                            </section>
                        </div>
                    </motion.section>
                ) : (
                    <EmptyWishList />
                )}
            </AnimatePresence>
        </div>
    );
}

export default WishList;
