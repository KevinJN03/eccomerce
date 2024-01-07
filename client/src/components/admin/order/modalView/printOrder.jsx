import { KeyboardArrowDownRounded } from '@mui/icons-material';
import { useAdminOrderContext } from '../../../../context/adminOrder';
import { useState } from 'react';

function Option({ title, description, handleClick, showOption }) {
    return (
        <div className="flex w-full flex-row">
            <input
                type="checkbox"
                className="daisy-checkbox daisy-checkbox-xs rounded"
            />
            <div className="ml-2 flex w-full flex-col">
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-black/80">{description}</p>
            </div>

            {!showOption && (
                <button
                    onClick={handleClick}
                    type="button"
                    className="flew-row flex h-fit flex-nowrap items-start !justify-end gap-1"
                >
                    <p className="whitespace-nowrap underline-offset-1 hover:underline ">
                        Customize options
                    </p>
                    <KeyboardArrowDownRounded className="relative top-[-2px]" />
                </button>
            )}
        </div>
    );
}

function PrintOrder({}) {
    const { selectionSet, setModalCheck } = useAdminOrderContext();
    const [showPackingOption, setShowPackingOption] = useState(false);
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
                            description={
                                'Designed for buyers, add a coupon code and more.'
                            }
                            title={'Packing Slips'}
                            showOption={showPackingOption}
                            setShowOption={setShowPackingOption}
                            handleClick={() => setShowPackingOption(true)}
                        />

                        {showPackingOption && (
                            <section className='flex flex-col'>
                                <button
                                    onClick={()=> setShowPackingOption(false)}
                                    type="button"
                                    className="flew-row flex h-fit flex-nowrap items-start !justify-end gap-1"
                                >
                                    <p className="whitespace-nowrap underline-offset-1 hover:underline ">
                                        Customize options
                                    </p>
                                    <KeyboardArrowDownRounded className="relative top-[-2px]" />
                                </button>
                                <div className="bg-light-grey/40 p-2 flex flex-col self-end  w-4/6 gap-2">
                                    <p>
                                        Add anything below to your packing
                                        slips.
                                    </p>
                                    <p>
                                    For gift receipts, only a coupon code can be added.


                                    </p>

                                    <p className='text-xs font-medium'>
                                    Shop info


                                    </p>
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="order-reciepts">
                        <Option
                            title={'Order receipts'}
                            description={
                                'Designed for you, to help with order fulfillment and record-keeping.'
                            }
                        />
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
                    type="button"
                    className="rounded bg-black px-3 py-2 text-sm font-medium text-white"
                >
                    Print Order(s)
                </button>
            </section>
        </section>
    );
}

export default PrintOrder;
