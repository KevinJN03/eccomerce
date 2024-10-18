import {
    ArrowDropDownSharp,
    SettingsRounded,
    StarRateRounded,
} from '@mui/icons-material';
import { useState } from 'react';
import Actions from '../../components/product/actions.jsx';
import { Link } from 'react-router-dom';
import { useListingPageContext } from '../../../../context/listingPageContext.jsx';
import qs from 'qs';
import UserLogout from '../../../../hooks/userLogout.jsx';
import { adminAxios } from '../../../../api/axios.js';
import Stats from './stats.jsx';
import Stock_Price from './stock-price.jsx';

function VerticalItem({ product, index }) {
    const [featured, setFeatured] = useState(product?.featured || false);

    const [showAction, setShowAction] = useState(false);

    const { selectionSet, setSelectionSet, checks, handleFeatured } =
        useListingPageContext();

    return (
        <section
            className={`${
                selectionSet?.has(product?._id)
                    ? 'border-green-400/50 bg-green-50'
                    : 'border-dark-gray/50 bg-transparent'
            }  flex-no-wrap  relative flex h-full w-full flex-row gap-6 border  border-dark-gray/50 px-4 py-5`}
        >
            {product?.deleted && (
                <div className="absolute left-0 top-0 z-[1] h-full w-full bg-orange-200/10"></div>
            )}
            <input
                checked={selectionSet?.has(product?._id)}
                onChange={() => {
                    setSelectionSet((prevSet) => {
                        const newSet = new Set(prevSet);
                        if (newSet.has(product?._id)) {
                            newSet.delete(product._id);
                        } else {
                            newSet.add(product?._id);
                        }

                        return newSet;
                    });
                }}
                className=" daisy-checkbox daisy-checkbox-xs mt-6  !rounded-sm"
                type="checkbox"
                name={`select-${product?._id}`}
                id={`select-${product?._id}`}
            />

            <Link
                to={`edit/${product?._id}`}
                className="h-16 max-h-16 w-16 max-w-16 rounded"
            >
                <img
                    src={product?.images[0]}
                    className="h-full w-full rounded-inherit object-cover"
                />
            </Link>
            <section className="flex w-full flex-col">
                <section className="top flex w-full flex-row gap-16">
                    <div className="flex-[5] flex-col">
                        <Link to={`edit/${product?._id}`}>
                            <p title={product?.title} className="text-sm ">
                                <span className="font-medium underline">
                                    {product?.title} {product?.title}
                                </span>
                                {product?.note && (
                                    <span
                                        className={`ml-3 rounded-full ${
                                            product?.deleted
                                                ? 'bg-red-600'
                                                : 'bg-green-600'
                                        }  px-1.5 !text-xxs font-medium text-white !no-underline`}
                                    >
                                        {product?.note}
                                    </span>
                                )}
                            </p>
                        </Link>
                    </div>

                    <section className="flex h-fit flex-1 flex-row flex-nowrap items-center gap-3">
                        <div
                            className="group flex h-fit w-fit items-center justify-center rounded border border-transparent px-4 py-2  outline-2 outline-offset-2 outline-green-500  focus:border-dark-gray focus:outline  active:border-dark-gray active:outline "
                            onClick={() =>
                                handleFeatured({
                                    product,
                                    setFeatured,
                                    featured,
                                    index,
                                })
                            }
                        >
                            <StarRateRounded
                                className={`${
                                    featured
                                        ? '!fill-orange-400'
                                        : '!fill-black/70'
                                } group-hover:!opacity-70 `}
                            />
                        </div>

                        <section className="relative flex  justify-center">
                            <div
                                onClick={() =>
                                    setShowAction((prevState) => !prevState)
                                }
                                className={`relative flex w-full  flex-row flex-nowrap items-center justify-center rounded border border-transparent py-2  pl-3 pr-1 outline-2 outline-offset-2  outline-green-500 focus:border-dark-gray focus:outline active:border-dark-gray active:outline  ${
                                    showAction
                                        ? '!border-dark-gray !outline'
                                        : ''
                                }`}
                            >
                                <SettingsRounded className="!fill-black/70 !text-[1.25rem]" />
                                <ArrowDropDownSharp className="relative  left-[-0.2rem] !fill-black/70 !text-[1.25rem]" />
                            </div>

                            <Actions
                                {...{
                                    product,
                                    showAction,
                                    setShowAction,
                                    className: 'translate-y-2',
                                }}
                            />
                        </section>
                    </section>
                </section>

                <Stock_Price product={product} />
                {checks?.stats && <Stats product={product} />}
            </section>

            {/* {product?.note && <p>{product?.note}</p>} */}
            {/* <p className="text-right text-xs text-black/70">Deleted</p> */}
        </section>
    );
}

export default VerticalItem;
