import { KeyboardArrowDownRounded } from '@mui/icons-material';
import { useState } from 'react';

function PackingSlipOption({ handleClick }) {
    const [checks, setChecks] = useState({ 'personalise-note': false });
    return (
        <section className="flex flex-col text-xs">
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
            <div className="flex w-7/12 flex-col gap-2 self-end  bg-light-grey/40 p-2">
                <p className="text-xs">
                    Add anything below to your packing slips.
                </p>
                <p className="text-xs">
                    For gift receipts, only a coupon code can be added.
                </p>

                <p className="text-xs font-medium">Shop info</p>
                <section className="grid grid-cols-2">
                    <section className="shop-info-option flex flex-col gap-2">
                        {['Shop icon', 'Order receipt banner', 'None'].map(
                            (text) => {
                                return (
                                    <div
                                        key={text}
                                        className="flex flex-nowrap gap-2"
                                    >
                                        <input
                                            id={text?.replaceAll(' ', '-')}
                                            type="radio"
                                            className="daisy-radio daisy-radio-xs"
                                            name="shop-info-option"
                                        />
                                        <p className="max-w-28">{text}</p>
                                    </div>
                                );
                            }
                        )}
                    </section>

                    <div className="flex flex-nowrap gap-2">
                        <input
                            type="checkbox"
                            name="dispatch-from"
                            id="dispatch-from"
                            className="daisy-checkbox daisy-checkbox-xs rounded"
                        />
                        <p>Dispatches from</p>
                    </div>
                </section>

                <p className="text-xs font-medium">Order Info</p>
                <section className="grid  grid-flow-col grid-rows-3 gap-2">
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

                <p className="text-xs font-medium">Promotion</p>
                <section className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-2 ">
                        <div className="flex flex-row flex-nowrap gap-2">
                            <input
                            checked={checks?.coupon}
                                onClick={() => {
                                    setChecks((prevState) => ({
                                        ...prevState,
                                        coupon: !prevState?.coupon,
                                    }));
                                }}
                                type="checkbox"
                                id={'add-coupon-code'}
                                className="daisy-checkbox daisy-checkbox-xs rounded"
                            />
                            <p>Add coupon code</p>
                        </div>
                        <select
                            disabled={checks?.['coupon'] != true}
                            className="daisy-select daisy-select-bordered daisy-select-sm h-fit rounded text-xs"
                            name="promotion-code-option"
                            id="promotion-code-option"
                        >
                            <option disabled selected>
                                Select a coupon...
                            </option>
                            {[1, 2, 3, 4].map((coupon) => {
                                return (
                                    <option key={coupon} option value={coupon}>
                                        {coupon}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row flex-nowrap gap-2">
                            <input
                                checked={checks?.['personalise-note']}
                                onChange={() =>
                                    setChecks((prevState) => ({
                                        ...prevState,
                                        'personalise-note':
                                            !prevState?.['personalise-note'],
                                    }))
                                }
                                type="checkbox"
                                id={'add-coupon-code'}
                                className="daisy-checkbox daisy-checkbox-xs rounded"
                            />
                            <p>Add a personalised note</p>
                        </div>

                        {checks?.['personalise-note'] && (
                            <textarea
                                name="personalize-note"
                                id="personalize-note"
                                rows="3"
                                className="w-full rounded border-[1px] border-dark-gray/50 focus:outline-4"
                            ></textarea>
                        )}
                    </div>
                </section>
            </div>
        </section>
    );
}

export default PackingSlipOption;
