import { useAdminOrderContext } from '../../../../context/adminOrder';
import { useState } from 'react';
import PackingSlipOption from './packingSlipOptions';
import OrderReceiptOption from './orderReceiptOption';

import Option from './option';

function PrintOrder({}) {
    const { selectionSet, setModalCheck } = useAdminOrderContext();
    const [showPackingOption, setShowPackingOption] = useState(false);
    const [checks, setChecks] = useState({ 'personalise-note': false });
    const [showReceiptOption, setShowReceiptOption] = useState(false);

    const [printChecks, setPrintChecks] = useState({});
    return (
        <section className="w-full">
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
                            property={'packing slips'}
                            description={
                                'Designed for buyers, add a coupon code and more.'
                            }
                            title={'Packing Slips'}
                            showOption={showPackingOption}
                            setShowOption={setShowPackingOption}
                            handleClick={() => {
                                setShowReceiptOption(() => false);
                                setShowPackingOption(() => true);
                            }}
                        />

                        {showPackingOption &&
                            printChecks?.['packing slips'] && (
                                <PackingSlipOption
                                    handleClick={() =>
                                        setShowPackingOption(false)
                                    }
                                />
                            )}
                    </div>

                    <div className="order-receipts">
                        <Option
                            printChecks={printChecks}
                            setPrintChecks={setPrintChecks}
                            property={'order receipts'}
                            showOption={showReceiptOption}
                            handleClick={() => {
                                setShowPackingOption(() => false);
                                setShowReceiptOption(() => true);
                            }}
                            title={'Order receipts'}
                            description={
                                'Designed for you, to help with order fulfillment and record-keeping.'
                            }
                        />

                        {showReceiptOption &&
                            printChecks?.['order receipts'] && (
                                <OrderReceiptOption
                                    handleClick={() =>
                                        setShowReceiptOption(false)
                                    }
                                />
                            )}
                    </div>
                </section>
            </section>

            <section className="flex justify-end gap-3 px-4 py-3">
                <button
                    type="button"
                    className="rounded border-[1px] border-light-grey px-3 py-2 text-sm font-medium"
                    onClick={() => setModalCheck(false)}
                >
                    Cancel
                </button>
                <button
                    disabled={Object.values(printChecks).every(
                        (item) => item != true
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
