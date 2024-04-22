import { KeyboardArrowDownRounded } from '@mui/icons-material';
import { useState } from 'react';

function PackingSlipOption({
    handleClick,
    setPrintChecks,
    printChecks,
    property,
    checks,
    coupons,
}) {
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
                                const convertText = text
                                    .replaceAll(' ', '_')
                                    .toLowerCase();
                                return (
                                    <div
                                        key={text}
                                        className="flex flex-nowrap gap-2"
                                    >
                                        <input
                                            onChange={(e) => {
                                                setPrintChecks((prevState) => ({
                                                    ...prevState,
                                                    [property]: {
                                                        ...prevState?.[
                                                            property
                                                        ],
                                                        checks: {
                                                            ...prevState?.[
                                                                property
                                                            ]?.checks,
                                                            ['shop_info']:
                                                                e.target.value,
                                                        },
                                                    },
                                                }));
                                            }}
                                            id={text?.replaceAll(' ', '-')}
                                            type="radio"
                                            className="daisy-radio daisy-radio-xs"
                                            name="shop-info-option"
                                            checked={
                                                checks?.shop_info == convertText
                                            }
                                            value={convertText}
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
                            className="daisy-checkbox daisy-checkbox-xs !rounded-sm"
                            value={'dispatch_from'}
                            onChange={toggleCheck}
                            checked={checks?.dispatch_from}
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
                        const convertOption = option
                            .replaceAll(' ', '_')
                            .toLowerCase();
                        return (
                            <div
                                key={option}
                                className="flex flex-row flex-nowrap gap-2"
                            >
                                <input
                                    type="checkbox"
                                    id={option?.replaceAll(' ', '-')}
                                    className="daisy-checkbox daisy-checkbox-xs !rounded-sm"
                                    checked={checks?.[convertOption]}
                                    onChange={toggleCheck}
                                    value={convertOption}
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
                                onChange={toggleCheck}
                                value={'coupon'}
                                type="checkbox"
                                id={'add-coupon-code'}
                                className="daisy-checkbox daisy-checkbox-xs !rounded-sm"
                            />
                            <p>Add coupon code</p>
                        </div>
                        <select
                            onChange={(e) => {
                                setPrintChecks((prevState) => ({
                                    ...prevState,
                                    [property]: {
                                        ...prevState?.[property],
                                        checks: {
                                            ...prevState?.[property]?.checks,
                                            ['coupon']: e.target.value,
                                        },
                                    },
                                }));
                            }}
                            disabled={!checks?.coupon}
                            className="daisy-select daisy-select-bordered daisy-select-sm h-fit !rounded-sm text-xs"
                            name="promotion-code-option"
                            id="promotion-code-option"
                        >
                            <option disabled selected>
                                Select a coupon...
                            </option>
                            {coupons?.map((coupon) => {
                                return (
                                    <option
                                    selected={checks?.coupon == coupon?._id}
                                        key={coupon?._id}
                                        value={coupon?._id}
                                    >
                                        {coupon?.code}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row flex-nowrap gap-2">
                            <input
                                onChange={() => {
                                    setPrintChecks((prevState) => ({
                                        ...prevState,
                                        [property]: {
                                            ...prevState?.[property],
                                            checks: {
                                                ...prevState?.[property]
                                                    ?.checks,
                                                ['note']: {
                                                    ...prevState?.[property]
                                                        .checks?.note,
                                                    on: !prevState?.[property]
                                                        .checks.note?.on,
                                                },
                                            },
                                        },
                                    }));
                                }}
                                checked={checks?.note?.on}
                                type="checkbox"
                                id={'add-coupon-code'}
                                className="daisy-checkbox daisy-checkbox-xs !rounded-sm"
                            />
                            <p>Add a personalised note</p>
                        </div>

                        {checks.note?.on && (
                            <textarea
                                onChange={(e) => {
                                    setPrintChecks((prevState) => ({
                                        ...prevState,
                                        [property]: {
                                            ...prevState?.[property],
                                            checks: {
                                                ...prevState?.[property]
                                                    ?.checks,
                                                ['note']: {
                                                    ...prevState?.[property]
                                                        .checks?.note,
                                                    text: e.target.value,
                                                },
                                            },
                                        },
                                    }));
                                }}
                                value={checks.note?.text}
                                name="personalize-note"
                                id="personalize-note"
                                rows="3"
                                className="w-full rounded border-[1px] border-dark-gray/50 p-2 focus:outline-4"
                            ></textarea>
                        )}
                    </div>
                </section>
            </div>
        </section>
    );
}

export default PackingSlipOption;
