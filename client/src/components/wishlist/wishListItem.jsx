import { useWishlistContext } from '../../context/wishlistContext';
import delete_icon from '../../assets/icons/delete-icon.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function WishListItem({ product }) {
    const { wishlist, wishListDispatch } = useWishlistContext();

    const handleDelete = (id) => {
        wishListDispatch({ type: 'delete', productId: id });
    };

    const [variation1, setVariation1] = useState(() => {
        if (
            product?.isVariation1Present &&
            product.variation1.array?.length == 1
        ) {
            return product.variation1.array[0]?.variation;
        }
        return null;
    });
    const [variation2, setVariation2] = useState(() => {
        if (
            product?.isVariation2Present &&
            product.variation2.array?.length == 2
        ) {
            return product.variation2.array[0]?.variation;
        }
        return null;
    });
    return (
        <>
            {wishlist?.has(product?._id) && (
                <div
                    key={product?._id}
                    className=" relative flex  max-w-64 flex-col gap-3"
                >
                    <div
                        className="absolute right-2 top-2 rounded-full bg-white p-1.5 transition-all hover:bg-light-grey"
                        onClick={() => handleDelete(product._id)}
                    >
                        <img src={delete_icon} className="h-6 w-6" />
                    </div>
                    <Link
                        to={`/product/${product?._id}?wishlistID=this`}
                        className="img-wrap h-[80%]"
                    >
                        <img
                            className={'h-[22rem] w-full object-cover'}
                            src={product.images[0]}
                            alt=""
                        />
                    </Link>

                    <div className="flex h-fit flex-col gap-3">
                        <p className="h-12 overflow-hidden text-ellipsis   text-sm ">
                            {product.title}
                        </p>

                        <p className="text-sm font-semibold">
                            £{parseFloat(product.additional_data.price?.min)}
                        </p>
                        <div className="variation-selection border-b-2 ">
                            {[
                                { index: 1, variation: variation1 },
                                { index: 2, variation: variation2 },
                            ].map(({ index, variation }) => {
                                return (
                                    <>
                                        {product?.[`variation${index}`]?.array
                                            .length == 1 ? (
                                            <p className="border-t-2 py-3">
                                                {variation}
                                            </p>
                                        ) : (
                                            product?.[`variation${index}`]
                                                ?.array.length > 1 && (
                                                <select
                                                    name={`variation${index}`}
                                                    id={`variation${index}-select`}
                                                    className="w-full border-t-2 py-3 text-sm"
                                                >
                                                    <option disabled selected>
                                                        Select{' '}
                                                        {product?.[
                                                            `variation${index}`
                                                        ]?.title || 'option'}
                                                    </option>
                                                    {product?.[
                                                        `variation${index}`
                                                    ]?.array?.map(
                                                        ({ variation }) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        variation
                                                                    }
                                                                >
                                                                    {variation}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </select>
                                            )
                                        )}
                                    </>
                                );
                            })}

                            {/* <p className="border-t-2 py-3">
                        FOREST
                    </p> */}

                            {/* <select
                                name="variation2"
                                id="variation2-select"
                                className="w-full border-t-2 py-3 text-sm"
                            >
                                <option selected disabled>
                                    Select size
                                </option>

                                {[1, 2, 3].map((item) => {
                                    return <option>item</option>;
                                })}
                            </select> */}
                        </div>

                        <button
                            disabled
                            type="button"
                            className=" w-full border-2 border-primary-green py-1 font-semibold tracking-wider transition-all hover:border-black disabled:border-black disabled:bg-black disabled:text-white disabled:opacity-50"
                        >
                            MOVE TO BAG
                        </button>
                        <p>{variation1 || 'nothing'}</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default WishListItem;
