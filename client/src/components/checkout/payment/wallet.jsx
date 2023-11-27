import { Fragment, useEffect, useState } from 'react';
import logos from '../../dashboard/payment-methods/logos';
import { usePaymentMethods } from '../../../context/paymentMethodContext';
import Card_Item from './card_item';
import { usePaymentTypeContext } from '../../../context/paymentTypeContext';

function Wallet({}) {
    const { paymentMethods } = usePaymentMethods();

    const { setView, setSelectedMethod } = usePaymentTypeContext();
    const handleClick = (method) => {
        setSelectedMethod(() => method);
        setView(() => 'selectedMethod');
    };
    return (
        <section className="flex flex-col">
            <h2 className="mb-3 font-gotham ">MY WALLET</h2>
            <div className="flex flex-col flex-nowrap gap-y-3">
                {paymentMethods.map((method, idx) => {
                    return (
                        method.type == 'card' && (
                            <Fragment key={method.id}>
                                <Card_Item
                                    {...method}
                                    handleClick={() => handleClick(method)}
                                />
                                <div className="border-b-[1px]"></div>
                            </Fragment>
                        )
                    );
                })}
            </div>

            <div className="m-0 my-6 flex flex-row justify-between p-0 items-center">
                <button
                    // disabled={loading || disableRef.current}
                    onClick={() => setView('options')}
                    className="!bg-primary px-4 py-3 font-bold tracking-wider text-white transition-all hover:!bg-black disabled:cursor-not-allowed"
                >
                    ADD NEW PAYMENT METHOD
                </button>
                <button
                    // disabled={loading || disableRef.current}
                    className='h-fit !py-2'
                    id="checkout-change-btn"
                    onClick={() => setView('selectedMethod')}
                >
                    CANCEL
                </button>
            </div>
        </section>
    );
}

export default Wallet;
