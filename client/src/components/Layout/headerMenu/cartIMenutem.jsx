import { Fragment, useRef, useState } from 'react';
import DeleteIcon from '../../../assets/icons/deleteIcon';
import { useCart } from '../../../context/cartContext';
import Overlay from '../../cart/overlay';
import { AnimatePresence, motion } from 'framer-motion';
import getCartItemVariants from '../../cart/cartItemVariants';
import { TrendingUpTwoTone } from '@mui/icons-material';
import { useLayoutContext } from '../../../context/layoutContext';
import _ from 'lodash';
function CartMenuItem({ cartItem, idx, lastIndex }) {
    const { isHover, setIsHover } = useLayoutContext();
    const { title, _id, images, price, quantity, variation_data } = cartItem;

    const { dispatch, cart, removeItem } = useCart();
    const [isRemoving, setIsRemoving] = useState({});
    const handleRemove = () => {
        removeItem({ itemId: cartItem._id });
        // dispatch({ type: 'REMOVE', _id: _id });
    };

    const [cartItemVariants, setCartItemVariants] = useState(() =>
        getCartItemVariants({
            idx: 0,
            disableTranslateY: true,
            scaleYExit: true,
        })
    );
    const handleAnimationComplete = (e) => {
        if (e == 'exit') {
            if (cart.length == 0) {
                setIsHover(() => ({ on: false, menu: null }));
            }
        }
    };

    return (
        <motion.section
            onAnimationComplete={handleAnimationComplete}
            variants={cartItemVariants.section}
            animate={'animate'}
            exit={'exit'}
            initial={'initial'}
            className={`relative flex max-h-fit origin-top flex-row flex-nowrap ${
                lastIndex ? '' : 'border-b border-b-light-grey'
            }`}
        >
            <Overlay
                isRemoving={isRemoving}
                setIsRemoving={setIsRemoving}
                product={cartItem}
                handleRemove={handleRemove}
                disableImg
            />

            <section
                className={`flex ${
                    isRemoving?.complete ? 'opacity-0' : 'opacity-100'
                } h-full flex-row gap-x-3 px-3 py-4`}
            >
                <div className="left max-h-32 flex-[1.5]">
                    <img
                        src={images[0]}
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="right relative flex flex-[3] flex-col">
                    <p className="mb-3 text-sm  font-bold text-black/70">
                        £{parseFloat(price?.current).toFixed(2)}
                    </p>

                    <p className="mb-1">{title}</p>
                    <div className="variationSelect flex flex-row flex-wrap gap-x-2">
                        {/* {_.get(
                            variation_data,
                            'select.variation1.variation'
                        ) && (
                            <p>{variation_data.select.variation1.variation}</p>
                        )} */}

                        {[1, 2].map((variationNum, idx) => {
                            const getVariation = _.get(
                                variation_data,
                                `select.variation${variationNum}.variation`
                            );
                            return (
                                <Fragment
                                    key={`${cartItem?._id}-variationSelect-${idx}`}
                                >
                                    {' '}
                                    {getVariation && <p>{getVariation}</p>}
                                </Fragment>
                            );
                        })}

                        {/* {variationSelect.variation2?.variation && (
                            <p>{variationSelect.variation2.variation}</p>
                        )} */}
                        <p>Qty: {quantity}</p>
                    </div>

                    <button
                        type="button"
                        className="h-6 w-fit self-end"
                        disabled={isRemoving?.complete == true}
                        onClick={() =>
                            setIsRemoving(() => ({
                                body: true,
                                text: true,
                            }))
                        }
                    >
                        <DeleteIcon />
                    </button>
                </div>
            </section>
        </motion.section>
    );
}

export default CartMenuItem;
