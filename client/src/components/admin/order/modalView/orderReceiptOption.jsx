import { KeyboardArrowDownRounded } from '@mui/icons-material';

function OrderReceiptOption({ handleClick }) {
    return (
        <section className="flex flex-col">
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
            <div className="flex  w-7/12 flex-col gap-2 self-end  bg-light-grey/40 p-2">
                <p className="text-xs font-medium">Shop info</p>

                <div className="flex flex-row flex-nowrap gap-2">
                    <input
                        type="checkbox"
                        name="order-receipt-banner"
                        id="order-receipt-banner"
                        className="daisy-checkbox daisy-checkbox-xs rounded"
                    />
                    <p className="w-20">Order receipt banner</p>
                </div>

                <p className="text-xs font-medium">Order info</p>
                <section className="grid  grid-flow-col grid-rows-2 gap-2">
                    {[
                        'Buyer notes',
                        'Listing photos',
                        'Private notes',
                        'Cost breakdown',
                    ].map((option) => {
                        return (
                            <div
                                key={option}
                                className="flex flex-row flex-nowrap gap-2"
                            >
                                <input
                                    type="checkbox"
                                    id={option?.replaceAll(' ', '-')}
                                    className="daisy-checkbox daisy-checkbox-xs rounded"
                                />
                                <p>{option}</p>
                            </div>
                        );
                    })}
                </section>

                <div className="border-t-[1px] border-dark-gray/50 pt-3 mt-2 flex gap-2 flex-nowrap">
                    <input type="checkbox" id='save-settings' className="daisy-checkbox daisy-checkbox-xs rounded" />
                    <p className='text-xxs'>
                    Save these settings for next time
                    </p>
                </div>
            </div>
        </section>
    );
}

export default OrderReceiptOption;
