import { useAdminOrderContext } from '../../../../context/adminOrder';
import { useEffect, useState } from 'react';
import PackingSlipOption from './packingSlipOptions';
import OrderReceiptOption from './orderReceiptOption';

import Option from './option';
import { adminAxios } from '../../../../api/axios';
import { useNavigate } from 'react-router-dom';
import MessageFooter from '../../../dashboard/messageFooter';
import { AnimatePresence, motion } from 'framer-motion';
import UserLogout from '../../../../hooks/userLogout.jsx';
import defaultChecks from './defaultChecks';

function PrintOrder({}) {
    const { setModalCheck, modalContent } = useAdminOrderContext();
    const [loading, setLoading] = useState(false);
    const [coupons, setCoupons] = useState({});
    const [showOptions, setShowOptions] = useState({
        packing_slip: false,
        order_receipt: false,
    });
    const [printChecks, setPrintChecks] = useState({
        ...defaultChecks,
    });

    const { logoutUser } = UserLogout();

    useEffect(() => {
        
        adminAxios
            .get('coupon/all')
            .then(({ data }) => {
                setCoupons(() => data?.coupons);
            })
            .catch((error) => {
                console.error('fetching coupons', error);
                logoutUser({ error });
            });
    }, []);
    const handleClick = async () => {
        try {
            console.log('loaded')
            setLoading(() => true)
            const { data } = await adminAxios.post('pdf/export', {
                ids: modalContent?.orders,

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
            setLoading(() => false);
            setModalCheck(() => false);
        }
    };

    const cancel = () => {
        setModalCheck(false);
    };
    return (
        <section className="relative w-full rounded-inherit">
            <p className="min-w-full border-b-[1px] border-dark-gray/30 bg-light-grey/30 px-4 py-3 font-medium">
                You're about to print {modalContent.orders?.length} order(s)
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
                                    coupons={coupons}
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
                    className="rounded border-[1px] border-light-grey px-3 py-2 text-s font-medium hover:bg-light-grey/30"
                    onClick={cancel}
                >
                    Cancel
                </button>
                <button
                    onClick={handleClick}
                    disabled={Object.values(printChecks).every(
                        (item) => item?.on != true
                    ) || loading}
                    type="button"
                    className=" rounded flex justify-center items-center bg-black w-[90px]  box-content px-3 py-2 hover:opacity-70   text-center text-s font-medium text-white disabled:opacity-50"
                >
             
                    {loading ? (
                        <span className="daisy-loading daisy-loading-xs daisy-loading-spinner  !text-white"></span>
                    ) : (
                        <p className='whitespace-nowrap !text-white'> Print Order(s)</p>
                    )}
                
                </button>
            </section>
        </section>
    );
}

export default PrintOrder;
