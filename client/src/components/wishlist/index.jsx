import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import { useWishlistContext } from '../../context/wishlistContext';
import { Fragment, useEffect, useRef, useState } from 'react';
import axios from '../../api/axios';
import GLoader from '../Login-SignUp/socialRegister/gloader.jsx';
import WishListItem from './wishListItem';
import { AnimatePresence, motion } from 'framer-motion';
import EmptyWishList from './empty.jsx';
import { Diversity2Outlined } from '@mui/icons-material';

function WishList({}) {
    const { wishlist, wishListDispatch, loading } = useWishlistContext();
    const abortControllerRef = useRef(new AbortController());

    return (
        <div className="flex w-full flex-col bg-white">
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
                        className=" flex h-full  w-full items-center justify-center"
                    >
                        <GLoader />
                    </motion.section>
                ) : wishlist.length > 0 ? (
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
                        className=" relative  flex h-full w-full flex-col"
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
                                    {`${wishlist.length} ${
                                        wishlist.length > 1 ? 'items' : 'item'
                                    }`}
                                </p>
                            </div>

                            <section className="mb-28 flex h-full flex-row flex-wrap gap-y-10">
                                <AnimatePresence>
                                    {wishlist.map((product) => {
                                        return (
                                            <WishListItem
                                                {...product}
                                                key={`wishlistId-${product._id}`}
                                            />
                                        );
                                    })}
                                </AnimatePresence>
                            </section>
                        </div>

                        <div className="mb-8 flex h-full w-full flex-col items-center justify-center gap-5 bg-light-grey/40 py-10">
                            <Diversity2Outlined className="!text-4xl" />
                            <p className="max-w-52 text-center">
                                Sign in to sync your Saved Items across all your
                                devices.
                            </p>

                            <a
                                href="/portal/login"
                                className="border-2 border-dark-gray bg-white px-28 py-3 font-gotham transition-all hover:bg-light-grey "
                            >
                                {' '}
                                SIGN IN
                            </a>
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
