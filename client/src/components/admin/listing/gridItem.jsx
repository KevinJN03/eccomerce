import {
    ArrowDropDownSharp,
    SettingsRounded,
    StarRateRounded,
} from '@mui/icons-material';
import { ClickAwayListener } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import variant from '../order/home/variant';
import { useContent } from '../../../context/ContentContext';
import Actions from '../components/product/actions';
import { useListingPageContext } from '../../../context/listingPageContext';
import UserLogout from '../../../hooks/userLogout';
import { adminAxios } from '../../../api/axios.js';

function GridItem({ product, index }) {
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);
    const [featured, setFeatured] = useState(product?.featured || false);
    const { logoutUser } = UserLogout();
    const [showAction, setShowAction] = useState(false);
    const { setSelectionSet, selectionSet, handleFeatured, checks } =
        useListingPageContext();
    const { setModalCheck, setModalContent } = useContent();

    const [format, setFormat] = useState('grid');
    const [showOverlay, setShowOverlay] = useState(false);

    const overlayVariant = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: '10%',
            backgroundColor: '#000000',
            transition: {
                duration: 0.3,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
    };
    return (
        <section className="relative h-fit w-full max-w-48">
            {product?.deleted && (
                <div className="absolute left-0 top-0 z-[1] h-full w-full bg-orange-200/10"></div>
            )}
            <div
                className={`${
                    selectionSet?.has(product?._id)
                        ? 'border-green-400/50 bg-green-50'
                        : 'border-dark-gray/50 bg-transparent'
                } relative flex h-fit w-full flex-col rounded border ${
                    product?.deleted ? 'opacity-50' : 'opacity-100'
                }`}
            >
                <Link
                    to={`edit/${product?._id}`}
                    className="group"
                    onMouseEnter={() => setShowOverlay(() => true)}
                    onMouseLeave={() => setShowOverlay(() => false)}
                >
                    <div className="top w-full p-0.5">
                        <div className="relative h-40 rounded-t">
                            <AnimatePresence>
                                {showOverlay && (
                                    <motion.div
                                        variants={overlayVariant}
                                        initial={'initial'}
                                        animate={'animate'}
                                        exit={'exit'}
                                        className="absolute left-0 top-0 h-full w-full rounded-t-inherit"
                                    ></motion.div>
                                )}
                            </AnimatePresence>

                            <img
                                src={product?.images[0]}
                                className="h-full w-full rounded-t-inherit object-cover"
                            />
                        </div>
                    </div>
                    <div className="middle flex w-full flex-col  gap-0.5 p-2">
                        <div className="flex flex-col gap-0.5">
                            <p
                                title={product.title}
                                className={`mb-1 truncate font-medium text-black decoration-1 underline-offset-1 group-hover:underline`}
                            >
                                {product.title}
                            </p>

                            {product?.note ? (
                                <p className="pb-4 text-xs text-black/75">
                                    {product.note}
                                </p>
                            ) : (
                                <div className="pb-10">
                                    <p className=" text-xs text-black/70">
                                        {product.additional_data.stock?.total}{' '}
                                        in stock
                                    </p>
                                    {product.additional_data.price?.min ==
                                    product.additional_data.price?.max ? (
                                        <p className="text-xs text-black/70">
                                            £
                                            {product.additional_data.price?.min}
                                        </p>
                                    ) : (
                                        <p className=" text-xs text-black/70">
                                            £
                                            {product.additional_data.price?.min}
                                            -£
                                            {product.additional_data.price?.max}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {checks?.stats && (
                        <div className="stats border-t border-dark-gray/5 p-2">
                            <h6 className="text-sm font-semibold">
                                LAST 30 DAYS
                            </h6>
                            <div className="flex w-full flex-nowrap items-center gap-2">
                                <p className="left whitespace-nowrap text-black/70">
                                    {product?.visits || 0} visits
                                </p>
                                <div className="h-3 w-[1px] bg-dark-gray/50"></div>
                                <p className="right whitespace-nowrap text-black/70 ">
                                    0 favourites
                                </p>
                            </div>
                            <h6 className="text-sm font-semibold">ALL TIME</h6>
                            <div className="flex w-full flex-nowrap items-center  gap-2">
                                <p className="left whitespace-nowrap text-black/70">
                                    {product.stats?.sales} sales
                                </p>
                                <div className="h-3 w-[1px] bg-dark-gray/50"></div>
                                <p className="right overflow-hidden text-ellipsis whitespace-nowrap text-black/70">
                                    £
                                    {parseFloat(
                                        product.stats?.revenue
                                    )?.toFixed(2)}{' '}
                                    revenue
                                </p>
                            </div>
                        </div>
                    )}
                </Link>

                {!product?.note && (
                    <div
                        className={`${
                            selectionSet?.has(product?._id)
                                ? 'border-green-400/50'
                                : 'border-dark-gray/50'
                        } bottom flex w-full flex-row items-center justify-between gap-2 border-t py-0.5`}
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
                                className="daisy-checkbox daisy-checkbox-xs !rounded-sm border hover:border-dark-gray hover:!bg-light-grey/50"
                                name={`${product?._id}-checkbox`}
                                id={`${product?._id}-checkbox`}
                            />
                        </div>

                        <div
                            // className="group flex w-full items-center justify-center py-2"
                            className="group flex h-10 w-fit items-center justify-center rounded border border-transparent px-4 py-1  outline-2 outline-offset-2 outline-green-500  focus:border-dark-gray focus:outline  active:border-dark-gray active:outline "
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
                                    featured ? '!fill-orange-400' : ''
                                } group-hover:!opacity-70`}
                            />
                        </div>
                        <section className="relative flex  justify-center">
                            <div
                                onClick={() =>
                                    setShowAction((prevState) => !prevState)
                                }
                                className={`relative flex h-10 w-fit  flex-row flex-nowrap items-center justify-center rounded border border-transparent  pl-3 pr-1 outline-2 outline-offset-2  outline-green-500 focus:border-dark-gray focus:outline active:border-dark-gray active:outline  ${
                                    showAction
                                        ? '!border-dark-gray !outline'
                                        : ''
                                }`}
                            >
                                <SettingsRounded className="!text-[20px]" />
                                <ArrowDropDownSharp className="relative left-[-0.3rem] !text-[20px]" />
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
                    </div>
                )}
            </div>
        </section>
    );
}

export default GridItem;
