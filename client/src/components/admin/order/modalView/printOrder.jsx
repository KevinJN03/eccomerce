import { useEffect, useState } from 'react';
import PackingSlipOption from './packingSlipOptions';
import OrderReceiptOption from './orderReceiptOption';

import Option from './option';
import { adminAxios } from '../../../../api/axios.js';
import UserLogout from '../../../../hooks/userLogout.jsx';
import defaultChecks from './defaultChecks';
import { useContent } from '../../../../context/ContentContext.jsx';
import _ from 'lodash';
function PrintOrder({}) {
    const { setModalCheck, modalContent, setShowAlert } = useContent();
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
        let success = false;
        const dataValue = {};
        try {
            console.log('loaded');
            setLoading(() => true);

            const { data } = await adminAxios.post('pdf/export', {
                ids: modalContent?.orders,

                printChecks,
            });

            success = true;

            _.assign(dataValue, data);
        } catch (error) {
            console.error('error when trying to generatePdf', error);
        } finally {
            setTimeout(() => {
                if (success) {
                    window.open(
                        `./download/${dataValue.file}`,
                        '_blank',
                        'noreferrer'
                    );
                } else {
                    setShowAlert(() => ({
                        on: true,
                        bg: 'bg-red-800',
                        icon: 'sadFace',
                        size: 'medium',
                        text: 'text-sm text-white',
                        timeout: 10000,
                        msg: 'Oh dear! Something went wrong - please try again.',
                    }));
                }
                setLoading(() => false);
                setModalCheck(() => false);
            }, 1000);
        }
    };

    const cancel = () => {
        setModalCheck(false);
    };
    return (
        <section className="relative w-full max-w-xl rounded-inherit bg-white">
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
                    disabled={
                        Object.values(printChecks).every(
                            (item) => item?.on != true
                        ) || loading
                    }
                    type="button"
                    className=" box-content flex w-[90px] items-center justify-center rounded  bg-black px-3 py-2 text-center   text-s font-medium text-white hover:opacity-70 disabled:opacity-50"
                >
                    {loading ? (
                        <span className="daisy-loading daisy-loading-spinner daisy-loading-xs  !text-white"></span>
                    ) : (
                        <p className="whitespace-nowrap !text-white">
                            {' '}
                            Print Order(s)
                        </p>
                    )}
                </button>
            </section>
        </section>
    );
}

export default PrintOrder;
