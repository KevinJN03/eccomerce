import { Link } from 'react-router-dom';
import DeleteIcon from '../../../assets/icons/deleteIcon';
import calculateTotal from '../../common/calculateTotal';
import { useCart } from '../../../context/cartContext';
import { useState } from 'react';

function CartMenu({ setIsHover }) {
    const { withOutShipping: subTotal } = calculateTotal();
    const { dispatch, cart } = useCart();

    const handleRemove = (cartId) => {
        dispatch({ type: 'remove', cartId: cartId });
    };

    return (
        <section className="cartMenu">
            <div className="flex flex-col py-3">
                <header>
                    <h3 className="px-3 pb-3 font-gotham text-base">
                        My Bag,{' '}
                        <span className="text-sm font-light">
                            {cart.length}{' '}
                        </span>
                        <span className="text-xs">
                            {cart.length > 0 ? 'items' : 'item'}
                        </span>
                    </h3>
                </header>
                <section className="cartItem flex h-full max-h-[15rem] w-full flex-col gap-3 overflow-y-auto bg-white p-3 px-3">
                    {cart.map(
                        (
                            {
                                title,
                                cartId,
                                images,
                                price,
                                quantity,
                                variationSelect,
                            },
                            idx
                        ) => {
                            return (
                                <div
                                    key={cartId}
                                    className={`flex max-h-fit flex-row flex-nowrap gap-3 ${
                                        idx + 1 == cart.length
                                            ? ''
                                            : 'border-b border-b-light-grey'
                                    } py-3`}
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
                                            £
                                            {parseFloat(price?.current).toFixed(
                                                2
                                            )}
                                        </p>

                                        <p className="mb-1">{title}</p>
                                        <div className="variationSelect flex flex-row flex-wrap gap-x-2">
                                            {variationSelect.variation1
                                                ?.variation && (
                                                <p>
                                                    {
                                                        variationSelect
                                                            .variation1
                                                            .variation
                                                    }
                                                </p>
                                            )}
                                            {variationSelect.variation2
                                                ?.variation && (
                                                <p>
                                                    {
                                                        variationSelect
                                                            .variation2
                                                            .variation
                                                    }
                                                </p>
                                            )}
                                            <p>Qty: {quantity}</p>
                                        </div>

                                        <div
                                            className="h-6 w-fit self-end"
                                            onClick={() => handleRemove(cartId)}
                                        >
                                            <DeleteIcon />
                                            {/* <img
                                                            className="h-full !fill-red-600"
                                                            src={delete_icon}
                                                            alt="bin outline icon"
                                                        /> */}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </section>

                <div className="subtotal subtotal-shadow flex flex-row flex-nowrap justify-between border-t bg-[#F5F5F5] px-3 py-4 ">
                    <p
                        className="text-sm text-black
                                 "
                    >
                        Sub-total
                    </p>
                    <p
                        className="text-sm text-black
                                 "
                    >
                        £{subTotal}
                    </p>
                </div>
            </div>
            <div className="flex flex-row flex-nowrap gap-3 border-b border-dark-gray/50 bg-light-grey p-3 px-3">
                <Link
                    onClick={() => setIsHover(() => false)}
                    to={'/cart'}
                    className="flex flex-1 items-center justify-center border-2 bg-white font-semibold hover:bg-light-grey"
                >
                    VIEW BAG
                </Link>

                <a
                    href="/checkout"
                    className=" checkout-btn flex-1"
                    onClick={() => setIsHover(() => false)}
                >
                    CHECKOUT
                </a>
            </div>

            <div className="flex flex-col items-center justify-center px-3 py-3">
                <p className="text-sm">Free Delivery Worldwide*</p>

                <p className="text-xxs">
                    More info{' '}
                    <a className="underline underline-offset-1">here</a>
                </p>
            </div>
        </section>
    );
}

export default CartMenu;
