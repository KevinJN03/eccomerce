import {
    ArrowDropDownSharp,
    SettingsRounded,
    StarRateRounded,
} from '@mui/icons-material';
import { useState } from 'react';
import Actions from '../components/product/actions';
import { Link } from 'react-router-dom';
import { useListingPageContext } from '../../../context/listingPageContext';
import qs from 'qs';
import UserLogout from '../../../hooks/userLogout';
import { adminAxios } from '../../../api/axios';
function VerticalItem({ product, index }) {
    const [featured, setFeatured] = useState(product?.featured || false);

    const [showAction, setShowAction] = useState(false);

    const { selectionSet, setSelectionSet, checks, handleFeatured, showStats } =
        useListingPageContext();

    return (
        <section
            className={`${
                selectionSet?.has(product?._id)
                    ? 'border-green-400/50 bg-green-50'
                    : 'border-dark-gray/50 bg-transparent'
            }  flex-no-wrap  relative flex h-full w-full flex-row gap-3 border  border-dark-gray/50 px-4 py-4`}
        >
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
                className=" daisy-checkbox daisy-checkbox-xs rounded-sm"
                type="checkbox"
                name={`select-${product?._id}`}
                id={`select-${product?._id}`}
            />

            <Link
                to={`edit/${product?._id}${
                    product?.status == 'draft' ? '?draft=true' : ''
                }`}
                className="h-16 max-h-16 w-16 max-w-16"
            >
                <img
                    src={product?.images[0]}
                    className="h-full w-full object-cover"
                />
            </Link>
            <div className="flex h-full flex-[5] flex-col">
                <Link
                    to={`edit/${product?._id}${
                        product?.status == 'draft' ? '?draft=true' : ''
                    }`}
                >
                    <p title={product?.title} className="font-medium underline">
                        {product?.title}
                    </p>
                </Link>
                <section className="flex w-full flex-col">
                    <div className="mt-4 flex w-full max-w-xs flex-row justify-between">
                        <p className="text-xs text-black/70 underline">
                            {product.additional_data.stock?.total} in stock
                        </p>
                        {/* <p>{`${product.additional_data.price?.min == product.additional_data.price?.min ? `${product.additional_data.price?.min}`  }</p> */}

                        {product.additional_data.price?.min ==
                        product.additional_data.price?.max ? (
                            <p className="text-xs text-black/70 underline">
                                £{product.additional_data.price?.min}
                            </p>
                        ) : (
                            <p className="text-xs text-black/70 underline">
                                £{product.additional_data.price?.min}-£
                                {product.additional_data.price?.max}
                            </p>
                        )}
                    </div>

                    {showStats && (
                        <div className="mt-8 flex w-full flex-row">
                            <div className="left flex w-full flex-1 flex-col gap-3">
                                <h6 className="text-sm font-semibold">
                                    LAST 30 DAYS
                                </h6>
                                <section className="flex w-full flex-row">
                                    <div className="flex-1 ">
                                        <p className="text-xs text-black/70">
                                            0
                                        </p>
                                        <p className="text-xs text-black/70">
                                            visits
                                        </p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-black/70">
                                            0
                                        </p>
                                        <p className="text-xs text-black/70">
                                            favorites
                                        </p>
                                    </div>
                                </section>
                            </div>
                            <div className="right flex w-full flex-1 flex-col gap-3">
                                <h6 className="text-sm font-semibold">
                                    ALL TIME
                                </h6>
                                <section className="flex w-full flex-row">
                                    <div className="flex-1">
                                        <p className="text-xs text-black/70">
                                            {product.stats?.sales}
                                        </p>
                                        <p className="text-xs text-black/70">
                                            sales
                                        </p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-black/70">
                                            £
                                            {parseFloat(
                                                product.stats?.revenue
                                            ).toFixed(2)}
                                        </p>
                                        <p className="text-xs text-black/70">
                                            revenue
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    )}
                </section>
            </div>

            <section className="flex h-fit flex-1 flex-row flex-nowrap items-center gap-3">
                <div
                    className="group flex h-fit items-center justify-center rounded border border-transparent px-4 w-fit py-2  outline-2 outline-offset-2 outline-green-500  focus:border-dark-gray focus:outline  active:border-dark-gray active:outline "
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
                            featured ? '!fill-orange-400' : '!fill-black/70'
                        } group-hover:!opacity-70 `}
                    />
                </div>
                <section className="relative flex  justify-center">
                    <div
                        onClick={() => setShowAction((prevState) => !prevState)}
                        className={`relative flex w-full  flex-row flex-nowrap items-center justify-center rounded border py-2 pl-3  pr-1 outline-2 outline-offset-2 outline-green-500  focus:border-dark-gray focus:outline border-transparent active:border-dark-gray active:outline  ${
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
    );
}

export default VerticalItem;
