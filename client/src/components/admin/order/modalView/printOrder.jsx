import { useAdminOrderContext } from '../../../../context/adminOrder';
import { useEffect, useState } from 'react';
import PackingSlipOption from './packingSlipOptions';
import OrderReceiptOption from './orderReceiptOption';

import Option from './option';
import { adminAxios } from '../../../../api/axios';
import { useNavigate } from 'react-router-dom';
import MessageFooter from '../../../dashboard/messageFooter';
import { AnimatePresence, motion } from 'framer-motion';
import defaultChecks from './defaultChecks';

function PrintOrder({}) {
    const { selectionSet, setModalCheck } = useAdminOrderContext();

    const [showOptions, setShowOptions] = useState({
        packing_slip: false,
        order_receipt: false,
    });
    const [printChecks, setPrintChecks] = useState({
        ...defaultChecks,
    });

    const handleClick = async () => {
        try {
            const { data } = await adminAxios.post('pdf/export', {
                ids: Array.from(selectionSet),

                printChecks,
            });

            window.open(
                `./orders/download/${data.file}`,
                '_blank',
                'noreferrer'
            );
        } catch (error) {
            console.error('error when trying to generatePdf');
        } finally {
            setModalCheck(() => false);
        }
    };

    const cancel = () => {
        setModalCheck(false);
    };
    return (
        <section className="relative w-full">
            <p className="min-w-full border-b-[1px] border-dark-gray/30 bg-light-grey/30 px-4 py-3 font-medium">
                You're about to print {selectionSet?.size} order(s)
            </p>

            <section className="px-4 py-3">
                <p className="my-3">What would you like to print?</p>

                <section className="flex w-full flex-col gap-5">
                    <div className="packing-slips">
                        <Option
                            printChecks={printChecks}
                            setPrintChecks={setPrintChecks}
                            property={'packing_slip'}
                            description={
                                'Designed for buyers, add a coupon code and more.'
                            }
                            title={'Packing Slips'}
                            showOptions={showOptions}
                            handleClick={() => {
                                setShowOptions(() => ({
                                    packing_slip: true,
                                }));
                            }}
                        />

                        {showOptions?.packing_slip &&
                            printChecks?.['packing_slip']?.on && (
                                <PackingSlipOption
                                    setPrintChecks={setPrintChecks}
                                    checks={
                                        printChecks?.['packing_slip']?.checks
                                    }
                                    property="packing_slip"
                                    handleClick={() =>
                                        setShowOptions(() => ({
                                            packing_slip: false,
                                        }))
                                    }
                                />
                            )}
                    </div>

                    <div className="order-receipts">
                        <Option
                            printChecks={printChecks}
                            setPrintChecks={setPrintChecks}
                            property={'order_receipt'}
                            showOptions={showOptions}
                            handleClick={() => {
                                setShowOptions(() => ({
                                    order_receipt: true,
                                }));
                            }}
                            title={'Order receipts'}
                            description={
                                'Designed for you, to help with order fulfillment and record-keeping.'
                            }
                        />

                        {showOptions?.order_receipt &&
                            printChecks?.['order_receipt']?.on && (
                                <OrderReceiptOption
                                    checks={
                                        printChecks?.['order_receipt']?.checks
                                    }
                                    setPrintChecks={setPrintChecks}
                                    property="order_receipt"
                                    handleClick={() =>
                                        setShowOptions(() => ({
                                            order_receipt: false,
                                        }))
                                    }
                                />
                            )}
                    </div>
                </section>
            </section>

            <section className=" flex justify-end gap-3 px-4 py-3">
                <button
                    type="button"
                    className="rounded border-[1px] border-light-grey px-3 py-2 text-sm font-medium"
                    onClick={cancel}
                >
                    Cancel
                </button>
                <button
                    onClick={handleClick}
                    disabled={Object.values(printChecks).every(
                        (item) => item?.on != true
                    )}
                    type="button"
                    className=" rounded bg-black px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                    Print Order(s)
                </button>
            </section>
        </section>
    );
}

export default PrintOrder;
