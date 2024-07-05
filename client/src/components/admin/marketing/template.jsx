import saleIcon from '../../../assets/icons/shopping.png';
import saleIcon2 from '../../../assets/icons/promo-code.png';
import saleIcon3 from '../../../assets/icons/icons8-sale-price-tag-100.png';
import emailIcon from '../../../assets/icons/email.png';
import BubbleButton from '../../buttons/bubbleButton.jsx';
import ThemeBtn from '../../buttons/themeBtn.jsx';
import _, { property } from 'lodash';
import { DatePicker } from '@mui/x-date-pickers';
import { validate } from 'email-validator';
import { useState } from 'react';
import { useSalesDiscountContext } from '../../../context/SalesDiscountContext.jsx';
import dayjs from 'dayjs';
function Template({}) {
    const { title, description } = {
        title: 'Create a promo code',
        description: `A promo code is an easy way to share a discount with anyone you choose. It can also be a great way to encourage purchases and build loyalty.`,
    };

    const [discountAmount, setDiscountAmount] = useState('fixed_amount');

    const [orderMinimum, setOrderMinimum] = useState('none');

    const [details, setDetails] = useState({
        type: 'fixed_amount',
        minimum: 'none',
        no_end_date: false,
        custom: false,
    });

    const { modalOpen, setModalOpen } = useSalesDiscountContext();
    return (
        <section className=" h-full min-h-screen rounded-inherit bg-white">
            <header className="flex flex-nowrap items-center gap-8 rounded-t-inherit bg-blue-200 p-6">
                <img src={saleIcon2} className="h-12 w-12 object-cover" />

                <h2 className="font-EBGaramond text-4xl">{title}</h2>
            </header>
            <body className="mt-10 flex  h-full flex-col gap-6 bg-white px-28 ">
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
                                className="daisy-select daisy-select-bordered input !w-full"
                                onChange={(e) =>
                                    setDetails((prevState) => ({
                                        ...prevState,
                                        type: e.target.value,
                                        custom: false,
                                    }))
                                }
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
                        {details.type == 'fixed_amount' ? (
                            <div className="relative w-full">
                                <span className="absolute left-3 top-1/2 translate-y-[-50%] text-sm">
                                    £
                                </span>
                                <input
                                    type="number"
                                    onWheel={(e) => e.target.blur()}
                                    className="daisy-input input w-full flex-1 !pl-6"
                                    min={'1'}
                                    onChange={(e) =>
                                        setDetails((prevState) => ({
                                            ...prevState,
                                            amount: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        ) : (
                            <select
                                name="percentage"
                                id="percentage"
                                className="daisy-select input !w-full"
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
                        )}
                    </div>
                </section>

                <section className="flex w-full flex-nowrap gap-5">
                    <div className="left flex-1">
                        <p className="text-lg font-semibold">Order minimum</p>

                        <p>
                            You can require a minimum spend or number of items
                            for buyers to qualify for your offer.
                        </p>
                    </div>
                    <div className="right flex w-full flex-[2_2_0%] justify-between gap-10">
                        {['none', 'number_of_items', 'order_total'].map(
                            (text) => {
                                return (
                                    <div
                                        className="flex h-fit flex-col gap-3"
                                        key={text}
                                        onClick={() => {
                                            setDetails((prevState) => ({
                                                ...prevState,
                                                minimum: text,
                                                minimum_value: '',
                                            }));
                                        }}
                                    >
                                        <div className="flex h-fit flex-nowrap items-center gap-2">
                                            <input
                                                type="radio"
                                                className="daisy-radio"
                                                name="order_minimum"
                                                checked={
                                                    details.minimum == text
                                                }
                                            />
                                            <p className="cursor-pointer text-sm">
                                                {_.upperFirst(text).replace(
                                                    /_/g,
                                                    ' '
                                                )}
                                            </p>
                                        </div>

                                        {details.minimum != 'none' &&
                                            details.minimum == text && (
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
                                                    type="number"
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
                </section>

                <section className="flex w-full flex-nowrap gap-5">
                    <div className="left flex-1">
                        <p className="text-lg font-semibold">Duration</p>

                        <p>
                            You can set a date for your code to expire, or leave
                            it open-ended.
                        </p>
                    </div>
                    <div className="right flex w-full flex-[2_2_0%] justify-between gap-10">
                        {[
                            { property: 'start_date' },
                            { property: 'end_date' },
                        ].map(({ property }) => {
                            return (
                                <div key={property}>
                                    <DatePicker
                                        className=""
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
                                            setDetails((prevState) => ({
                                                ...prevState,
                                                [property]: e.utc(true).unix(),
                                            }));
                                        }}
                                    />
                                    {property == 'end_date' && (
                                        <div
                                            className="mt-3 flex flex-nowrap gap-2"
                                            onClick={() =>
                                                setDetails((prevState) => ({
                                                    ...prevState,
                                                    no_end_date:
                                                        !prevState.no_end_date,
                                                    end_date: '',
                                                }))
                                            }
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
                                </div>
                            );
                        })}
                    </div>
                </section>
                <section className="flex w-full flex-nowrap gap-5">
                    <div className="left flex-1">
                        <p className="text-lg font-semibold">
                            Custom promo code
                        </p>

                        <p>
                            This is what shoppers will enter at checkout to get
                            a discount. Each code should be unique, and only use
                            letters and numbers.
                        </p>
                    </div>
                    <div className="right flex w-full flex-[2_2_0%] justify-between gap-10">
                        <input
                            type="input"
                            className="daisy-input input !w-full"
                            placeholder="EX. SAVE50"
                            value={details.code}
                            onChange={(e) =>
                                setDetails((prevState) => ({
                                    ...prevState,
                                    code: e.target.value,
                                }))
                            }
                        />{' '}
                    </div>
                </section>
            </body>
            <footer className="sticky bottom-0 flex flex-nowrap justify-between bg-white px-6 py-5 shadow-normal">
                <BubbleButton handleClick={() => setModalOpen(() => false)} />
                <ThemeBtn text={'Continue'} />
            </footer>
        </section>
    );
}

export default Template;
