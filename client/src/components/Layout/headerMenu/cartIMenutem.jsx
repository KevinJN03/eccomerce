import { useState } from 'react';
import DeleteIcon from '../../../assets/icons/deleteIcon';
import { useCart } from '../../../context/cartContext';
import Overlay from '../../cart/overlay';
import { AnimatePresence, motion } from 'framer-motion';
import getCartItemVariants from '../../cart/cartItemVariants';
function CartMenuItem({ cartItem, idx, lastIndex }) {
    const { title, cartId, images, price, quantity, variationSelect } =
        cartItem;

    const { dispatch, cart } = useCart();
    const [isRemoving, setIsRemoving] = useState(false);
    const handleRemove = (cartId) => {
        // setIsRemoving(() => true);
        dispatch({ type: 'remove', cartId: cartId });
    };

    const [cartItemVariants, setCartItemVariants] = useState(() =>
        getCartItemVariants({
            idx: 0,
            disableTranslateY: true,
        })
    );

    console.log('rerender cart item');

    const sectionVariants = {
        initial: {
            opacity: 1,
        },
        animate: {
            // backgroundColor: '#00FF00',
            opacity: 1,
            transition: {
                delay: 0,
                duration: 1,
            },
        },
        exit: {
            backgroundColor: '#00FF00',
            opacity: 0,
            transition: {
                delay: 1,
                duration: 1,
            },
        },
    };
    return (
        
        <motion.section
        
            variants={sectionVariants}
            animate={'animate'}
            exit={'exit'}
            initial={'initial'}
            className={`relative flex max-h-fit flex-row flex-nowrap gap-3 ${
                lastIndex ? '' : 'border-b border-b-light-grey'
            } py-3`}
        >
            {/* <AnimatePresence > */}
            {/* {true && <Overlay product={cartItem} />} */}
            {/* {!isRemoving && ( */}
            {/* <motion.section
                        key={'cartIdx-' + cartId}
                        variants={cartItemVariants.product}
                        animate={'animate'}
                        exit={'exit'}
                        initial={'initial'}
                        className="flex flex-row gap-3"
                    > */}
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
                    {variationSelect.variation1?.variation && (
                        <p>{variationSelect.variation1.variation}</p>
                    )}
                    {variationSelect.variation2?.variation && (
                        <p>{variationSelect.variation2.variation}</p>
                    )}
                    <p>Qty: {quantity}</p>
                </div>

                <div
                    className="h-6 w-fit self-end"
                    onClick={() => handleRemove(cartId)}
                >
                    <DeleteIcon />
                </div>
            </div>
            {/* </motion.section> */}
            {/* )} */}
            {/* </AnimatePresence> */}
        </motion.section>
    );
}

export default CartMenuItem;
