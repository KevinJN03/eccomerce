import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import { useWishlistContext } from '../../context/wishlistContext';
import { useEffect, useRef, useState } from 'react';
import axios from '../../api/axios';
import { DeleteOutlineRounded } from '@mui/icons-material';

import delete_icon from '../../assets/icons/delete-icon.png';
import { Link } from 'react-router-dom';
function WishList({ handleClick }) {
    const { wishlist, wishListDispatch } = useWishlistContext();

    const [products, setProducts] = useState([]);
    const abortControllerRef = useRef(new AbortController());
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
            }
        };

        fetchData();

        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const handleDelete = (id) => {
        wishListDispatch({ type: 'delete', productId: id });
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-white pb-24">
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
                            <>
                                {wishlist?.has(product?._id) && (
                                    <div
                                        key={product?._id}
                                        className=" relative flex  max-w-64 flex-col gap-3"
                                    >
                                        <div
                                            className="absolute right-2 top-2 rounded-full bg-white p-1.5 transition-all hover:bg-light-grey"
                                            onClick={() =>
                                                handleDelete(product._id)
                                            }
                                        >
                                    

                                            <img
                                                src={delete_icon}
                                                className="h-6 w-6"
                                            />
                                        </div>
                                        <Link 
                                        to={`/product/${product?._id}?wishlistID=this`}
                                        className="img-wrap h-[80%]">
                                            <img
                                                className={
                                                    'h-[22rem] w-full object-cover'
                                                }
                                                src={product.images[0]}
                                                alt=""
                                            />
                                        </Link>

                                        <div className="flex h-fit flex-col gap-3">
                                            <p className="h-12 overflow-hidden text-ellipsis   text-sm ">
                                                {product.title}
                                            </p>

                                            <p className="text-sm font-semibold">
                                                £
                                                {parseFloat(
                                                    product.additional_data
                                                        .price?.min
                                                )}
                                            </p>
                                            <div className="variation-selection border-b-2 ">
                                                <p className="border-t-2 py-3">
                                                    FOREST
                                                </p>

                                                {/* <p className="border-t-2 py-3">
                                                    FOREST
                                                </p> */}

                                                <select name="variation1" id="variation1-select" className='py-3 border-t-2 w-full text-sm'>
                                                <option selected disabled>Select size</option>

                                              {  [1,2,3].map((item)=> {
                                                return(
                                                    <option>item</option>
                                                )
                                              })}
                                                </select>
                                            </div>

                                            <button
                                            disabled
                                                type="button"
                                                className="w-full border-2 disabled:bg-black disabled:border-black disabled:opacity-50 disabled:text-white border-primary-green py-1 font-semibold tracking-wider transition-all hover:border-black"
                                            >
                                                MOVE TO BAG
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        );
                    })}
                </section>
            </div>
        </div>
    );
}

export default WishList;
