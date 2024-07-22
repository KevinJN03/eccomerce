import { useSalesDiscountContext } from '../../../context/SalesDiscountContext';
import _ from 'lodash';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useOfferContext } from '../../../context/offerContext';
function Step1({}) {
    const { title, description } = {
        title: 'Create a promo code',
        description: `A promo code is an easy way to share a discount with anyone you choose. It can also be a great way to encourage purchases and build loyalty.`,
    };
    const { errors, setErrors, details, setDetails, clearError, errorStyle } =
        useOfferContext();
    return (
        <>
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">
                    Customise your offer details
                </h3>
                <p className="text-base">{description}</p>
            </div>

            <section className="flex w-full flex-nowrap gap-5">
                <div className="left flex-1">
                    <p className="text-lg font-semibold">Discount amount</p>
                </div>
                <div className="right flex flex-[2_2_0%] gap-10">
                    <div className="flex w-full flex-col gap-4">
                        <select
                            name=""
                            id=""
                            className={`daisy-select daisy-select-bordered input !w-full ${errors.type ? errorStyle : ''}`}
                            onChange={(e) => {
                                clearError('type');

                                setDetails((prevState) => ({
                                    ...prevState,
                                    type: e.target.value,
                                    custom: false,
                                }));
                            }}
                        >
                            {[
                                {
                                    text: 'Fixed Amount',
                                    value: 'fixed',
                                },
                                {
                                    text: 'Percentage off',
                                    value: 'percentage',
                                },
                            ].map(({ text, value }) => {
                                return (
                                    <option
                                        key={value}
                                        value={value}
                                        selected={details.type == value}
                                    >
                                        {text}
                                    </option>
                                );
                            })}
                        </select>
                        {details?.custom && (
                            <div className="relative">
                                <span className="absolute right-2 top-1/2 translate-y-[-50%] p-3 ">
                                    %
                                </span>
                                <input
                                    type="number"
                                    className="daisy-input input flex-1 !pr-10"
                                    value={details?.amount}
                                    onWheel={(e) => e.target.blur()}
                                    onChange={(e) =>
                                        setDetails((prevState) => ({
                                            ...prevState,
                                            amount: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        )}
                    </div>
                    {details.type == 'fixed' ? (
                        <section className="flex w-full flex-col gap-1">
                            <div className="relative w-full">
                                <span className="absolute left-3 top-1/2 translate-y-[-50%] text-base">
                                    £
                                </span>
                                <input
                                    type="number"
                                    onWheel={(e) => e.target.blur()}
                                    className={`daisy-input input w-full flex-1 !pl-8 ${errors?.amount ? errorStyle : ''}`}
                                    min={'1'}
                                    value={details.amount}
                                    onChange={(e) => {
                                        clearError('amount');
                                        setDetails((prevState) => ({
                                            ...prevState,
                                            amount: e.target.value,
                                        }));
                                    }}
                                />
                            </div>

                            {errors?.amount && (
                                <p className="text-red-700">{errors?.amount}</p>
                            )}
                        </section>
                    ) : (
                        <div className="flex w-full flex-col gap-1">
                            <select
                                name="percentage"
                                id="percentage"
                                className={`daisy-select input !w-full ${errors?.amount ? errorStyle : ''}`}
                                onClick={(e) => {
                                    if (e.target.value == 'custom') {
                                        setDetails((prevState) => ({
                                            ...prevState,
                                            amount: '',
                                            custom: true,
                                        }));
                                        return;
                                    }
                                    setDetails((prevState) => ({
                                        ...prevState,
                                        amount: e.target.value,
                                        custom: false,
                                    }));
                                }}
                            >
                                {[25, 30, 35, 40, 50].map((amount) => {
                                    return (
                                        <option
                                            selected={details?.amount == amount}
                                            value={amount}
                                            key={`percentage_off_${amount}`}
                                        >
                                            {amount}
                                        </option>
                                    );
                                })}
                                <option
                                    selected={details?.amount == 'custom'}
                                    value={'custom'}
                                    key={`percentage_off_custom`}
                                >
                                    {'Custom'}
                                </option>
                            </select>

                            {errors?.amount && (
                                <p className="text-red-700">{errors?.amount}</p>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <section className="flex w-full flex-nowrap gap-5">
                <div className="left flex-1">
                    <p className="text-lg font-semibold">Order minimum</p>

                    <p>
                        You can require a minimum spend or number of items for
                        buyers to qualify for your offer.
                    </p>
                </div>

                <section className="order-minimum flex flex-[2_2_0%] flex-col gap-4">
                    <div className="right flex w-full  justify-between gap-10">
                        {['none', 'number_of_items', 'order_total'].map(
                            (text) => {
                                return (
                                    <div
                                        className="flex h-fit flex-col gap-3"
                                        key={text}
                                        onClick={() => {
                                            clearError('order_minimum');
                                            setDetails((prevState) => ({
                                                ...prevState,
                                                order_minimum: text,
                                                minimum_value: '',
                                            }));
                                        }}
                                    >
                                        <div className="flex h-fit flex-nowrap items-center gap-2">
                                            <input
                                                type="radio"
                                                className={`daisy-radio ${errors?.order_minimum ? '!border-red-700 checked:!bg-red-700' : ''}`}
                                                name="order_minimum"
                                                checked={
                                                    details?.order_minimum ==
                                                    text
                                                }
                                                readOnly
                                            />
                                            <p className="cursor-pointer text-sm">
                                                {_.upperFirst(text).replace(
                                                    /_/g,
                                                    ' '
                                                )}
                                            </p>
                                        </div>

                                        {details.order_minimum != 'none' &&
                                            details.order_minimum == text && (
                                                <input
                                                    type="text"
                                                    className="daisy-input input !w-32  !max-w-32"
                                                    value={
                                                        details?.[
                                                            'minimum_value'
                                                        ] || ''
                                                    }
                                                    onChange={(e) => {
                                                        setDetails(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                ['minimum_value']:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        );
                                                    }}
                                                    type={'number'}
                                                    onWheel={(e) =>
                                                        e.target.blur()
                                                    }
                                                    min={1}
                                                />
                                            )}
                                    </div>
                                );
                            }
                        )}
                    </div>

                    {errors?.order_minimum && (
                        <p className="text-red-700">{errors?.order_minimum}</p>
                    )}
                </section>
            </section>

            <section className="flex w-full flex-nowrap gap-5">
                <div className="left flex-1">
                    <p className="text-lg font-semibold">Duration</p>

                    <p>
                        You can set a date for your code to expire, or leave it
                        open-ended.
                    </p>
                </div>
                <div className="right flex w-full flex-[2_2_0%] justify-between gap-10">
                    {[{ property: 'start_date' }, { property: 'end_date' }].map(
                        ({ property }) => {
                            return (
                                <div key={property}>
                                    <DatePicker
                                        className=""
                                        // value={
                                        //     details[property]
                                        //         ? dayjs(details[property])
                                        //         : dayjs().year(2024)
                                        // }
                                        sx={{
                                            '.MuiDatePickerToolbar-root': {
                                                color: '#1565c0',
                                                borderRadius: '2px',
                                                borderWidth: '1px',
                                                borderColor: '#2196f3',
                                                border: '1px solid',
                                                backgroundColor: '#90caf9',
                                            },
                                        }}
                                        // minDate={
                                        //     property == 'end_date'
                                        //         ? dayjs
                                        //               .unix(details?.start_date)
                                        //               .add(1, 'day')
                                        //         : dayjs()
                                        // }
                                        // maxDate={
                                        //     property == 'start_date' &&
                                        //     details?.end_date
                                        //         ? dayjs
                                        //               .unix(details?.end_date)
                                        //               .subtract(1, 'day')
                                        //         : null
                                        // }
                                        {...(() => {
                                            const props = {
                                                minDate:
                                                    property == 'end_date'
                                                        ? dayjs
                                                              .unix(
                                                                  details?.start_date
                                                              )
                                                              .add(1, 'day')
                                                        : dayjs(),
                                            };

                                            if (
                                                property == 'start_date' &&
                                                details?.end_date
                                            ) {
                                                props.maxDate = dayjs
                                                    .unix(details?.end_date)
                                                    .subtract(1, 'day');
                                            }

                                            if (details?.[property]) {
                                                props.value = dayjs.unix(
                                                    details?.[property]
                                                );
                                            } else {
                                                props.value = null;
                                            }
                                            return props;
                                        })()}
                                        // value={
                                        //     dayjs.unix(details?.[property]) ||
                                        //     dayjs()
                                        // }
                                        // defaultValue={`DD/MM/YYYY`}
                                        disabled={
                                            property == 'end_date' &&
                                            details?.no_end_date
                                        }
                                        onChange={(e) => {
                                            clearError(property);
                                            setDetails((prevState) => ({
                                                ...prevState,
                                                [property]: e[
                                                    property == 'start_date'
                                                        ? 'startOf'
                                                        : 'endOf'
                                                ]('day')
                                                    .utc(true)
                                                    .unix(),
                                            }));
                                        }}
                                    />
                                    {property == 'end_date' && (
                                        <div
                                            className="mt-3 flex flex-nowrap gap-2"
                                            onClick={() => {
                                                clearError(property);
                                                clearError('start_date');

                                                setDetails((prevState) => ({
                                                    ...prevState,
                                                    no_end_date:
                                                        !prevState.no_end_date,
                                                    end_date: '',
                                                }));
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                className="daisy-checkbox !daisy-checkbox-xs !rounded-sm "
                                                readOnly
                                                checked={details.no_end_date}
                                            />
                                            <p className="cursor-pointer">
                                                No end date
                                            </p>
                                        </div>
                                    )}

                                    {errors?.[property] && (
                                        <p className="mt-2 text-red-700">
                                            {errors?.[property]}
                                        </p>
                                    )}
                                </div>
                            );
                        }
                    )}
                </div>
            </section>
            <section className="flex w-full flex-nowrap gap-5">
                <div className="left flex-1">
                    <p className="text-lg font-semibold">Custom promo code</p>

                    <p>
                        This is what shoppers will enter at checkout to get a
                        discount. Each code should be unique, and only use
                        letters and numbers.
                    </p>
                </div>
                <div className="right flex w-full flex-[2_2_0%] flex-col gap-2">
                    <input
                        type="input"
                        className={`daisy-input input !w-full ${errors.code ? errorStyle : ''} `}
                        placeholder="EX. SAVE50"
                        value={details.code}
                        maxLength={16}
                        onChange={(e) => {
                            setDetails((prevState) => ({
                                ...prevState,
                                code: _.toUpper(e.target.value),
                            }));

                            setErrors(({ code, ...prevState }) => prevState);
                        }}
                    />

                    {errors?.code && (
                        <p className="text-red-700">{errors.code}</p>
                    )}
                </div>
            </section>
        </>
    );
}

export default Step1;
