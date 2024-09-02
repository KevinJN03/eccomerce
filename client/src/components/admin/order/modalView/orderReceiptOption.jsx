import { KeyboardArrowUpRounded } from '@mui/icons-material';

function OrderReceiptOption({ handleClick, setPrintChecks, checks, property }) {
    const toggleCheck = (e) => {
        setPrintChecks((prevState) => ({
            ...prevState,
            [property]: {
                ...prevState?.[property],
                checks: {
                    ...prevState?.[property]?.checks,
                    [e.target.value]:
                        !prevState?.[property]?.checks?.[e.target.value],
                },
            },
        }));
    };

    const toggleShopInfo = (e) => {
        setPrintChecks((prevState) => ({
            ...prevState,
            [property]: {
                ...prevState?.[property],
                checks: {
                    ...prevState?.[property]?.checks,
                    ['shop_info']:
                        prevState?.[property]?.checks?.['shop_info'] ==
                        e.target?.value
                            ? 'none'
                            : e.target?.value,
                },
            },
        }));
    };
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
                <KeyboardArrowUpRounded className="relative top-[-2px]" />
            </button>
            <div className="flex  w-7/12 flex-col gap-2 self-end  bg-light-grey/40 p-2">
                <p className="text-xs font-medium">Shop info</p>

                <div className="flex flex-row flex-nowrap gap-2">
                    <input
                        onChange={toggleShopInfo}
                        type="checkbox"
                        checked={checks?.shop_info == 'order_receipt_banner'}
                        name="order-receipt-banner"
                        id="order-receipt-banner"
                        value={'order_receipt_banner'}
                        className="daisy-checkbox daisy-checkbox-xs !rounded-sm"
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
                        const convertOption = option
                            .replaceAll(' ', '_')
                            .toLowerCase();
                        return (
                            <div
                                key={option}
                                className="flex flex-row flex-nowrap gap-2"
                            >
                                <input
                                    onChange={toggleCheck}
                                    value={convertOption}
                                    checked={checks?.[convertOption]}
                                    type="checkbox"
                                    id={option?.replaceAll(' ', '-')}
                                    className="daisy-checkbox daisy-checkbox-xs !rounded-sm"
                                />
                                <p>{option}</p>
                            </div>
                        );
                    })}
                </section>

                <div className="mt-2 flex flex-nowrap gap-2 border-t-[1px] border-dark-gray/50 pt-3">
                    <input
                        onChange={toggleCheck}
                        checked={checks?.save_setting}
                        type="checkbox"
                        id="save-settings"
                        value={'save_setting'}
                        className="daisy-checkbox daisy-checkbox-xs !rounded-sm"
                    />
                    <p className="text-xxs">
                        Save these settings for next time
                    </p>
                </div>
            </div>
        </section>
    );
}

export default OrderReceiptOption;
