import {
    ArrowDropDownSharp,
    SettingsRounded,
    StarRateRounded,
} from '@mui/icons-material';
import { ClickAwayListener } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import variant from '../../order/home/variant';
import { useContent } from '../../../../context/ContentContext';
import Actions from './actions';
import { useListingPageContext } from '../../../../context/listingPageContext';

function GridItem({ product }) {
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);
    const [favorite, setFavorite] = useState(product?.favorite || false);

    const [showAction, setShowAction] = useState(false);
    const { setSelectionSet, selectionSet } = useListingPageContext();
    const { setModalCheck, setModalContent } = useContent();

    const [format, setFormat] = useState('grid');

    return (
        <section className="relative h-fit w-full max-w-48">
            <div
                className={`${
                    selectionSet?.has(product?._id)
                        ? 'border-green-400/50 bg-green-50'
                        : 'border-dark-gray/50 bg-transparent'
                } relative flex h-fit w-full flex-col rounded border`}
            >
                <Link
                    to={`edit/${product?._id}${
                        product?.status == 'draft' ? '?draft=true' : ''
                    }`}
                    className="group"
                >
                    <div className="top w-full p-0.5 ">
                        <img
                            src={product?.images[0]}
                            className="h-40 w-full object-cover"
                        />
                    </div>
                    <div className="middle flex w-full flex-col  gap-0.5 p-2 pb-14">
                        <p
                            title={product.title}
                            className={`mb-1 truncate font-medium text-black decoration-1 underline-offset-1 group-hover:underline`}
                        >
                            {product.title}
                        </p>
                        <p className=" text-xs text-black/70">
                            {product.additional_data.stock?.total} in stock
                        </p>

                        {product.additional_data.price?.min ==
                        product.additional_data.price?.max ? (
                            <p className="text-xs text-black/70">
                                £{product.additional_data.price?.min}
                            </p>
                        ) : (
                            <p className=" text-xs text-black/70">
                                £{product.additional_data.price?.min}-£
                                {product.additional_data.price?.max}
                            </p>
                        )}
                    </div>
                </Link>

                <div
                    className={`${
                        selectionSet?.has(product?._id)
                            ? 'border-green-400/50'
                            : 'border-dark-gray/50'
                    } bottom flex w-full flex-row items-center justify-between border-t`}
                >
                    <div className="flex w-full items-center justify-center py-2">
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
                            type="checkbox"
                            className="daisy-checkbox daisy-checkbox-xs rounded border hover:border-dark-gray hover:!bg-light-grey/50"
                            name={`${product?._id}-checkbox`}
                            id={`${product?._id}-checkbox`}
                        />
                    </div>

                    <div
                        className="group flex w-full items-center justify-center py-2"
                        onClick={() => setFavorite((prevState) => !prevState)}
                    >
                        <StarRateRounded
                            className={`${
                                favorite ? '!fill-orange-400' : ''
                            } group-hover:!opacity-70`}
                        />
                    </div>

                    <div
                        onClick={() => setShowAction((prevState) => !prevState)}
                        className="flex w-full  flex-row flex-nowrap items-center justify-center hover:!opacity-70"
                    >
                        <SettingsRounded className="!text-[20px]" />
                        <ArrowDropDownSharp className="relative left-[-0.3rem] !text-[20px]" />
                    </div>
                </div>
            </div>
            <Actions
                {...{
                    product,
                    showAction,
                    setShowAction,
                    className: '-translate-y-[-101%]',
                }}
            />
        </section>
    );
}

export default GridItem;
