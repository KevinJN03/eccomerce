import { useSalesDiscountContext } from '../../../../context/SalesDiscountContext';
import _ from 'lodash';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useOfferContext } from '../../../../context/offerContext';
import { useEffect, useRef, useState } from 'react';
import { HelpOutlineRounded } from '@mui/icons-material';
import Durations from './durations';
import BubbleButton from '../../../buttons/bubbleButton';
import { useContent } from '../../../../context/ContentContext';
import { useAdminContext } from '../../../../context/adminContext';
import { adminAxios } from '../../../../api/axios.js';
function Step1({}) {
    //
    const { errors, setErrors, details, setDetails, clearError, errorStyle } =
        useOfferContext();

    const { logoutUser } = useAdminContext();

    const [descriptions, setDescriptions] = useState({
        promo_code: `A promo code is an easy way to share a discount with anyone you choose. It can also be a great way to encourage purchases and build loyalty.`,
        gift_card: `A gift card is a convenient way to share a personalized shopping experience with anyone you choose. It serves as a perfect gift for any occasion, offering recipients the freedom to select what they truly desire. Gift cards can also be a powerful tool to encourage repeat visits and build customer loyalty.`,
    });
    const [discount_options, setDiscount_options] = useState(() => {
        const optionsArray = [
            {
                text: 'Fixed Amount',
                value: 'fixed',
            },
        ];

        if (details?.offer_type == 'promo_code') {
            optionsArray.push({
                text: 'Percentage off',
                value: 'percentage',
            });
        }

        return optionsArray;
    });

    const [orderMinimum, setOderMininum] = useState(() => {
        const optionsArray = ['none'];

        if (details.offer_type == 'promo_code') {
            optionsArray.push('number_of_items', 'order_total');
        }

        return optionsArray;
    });

    const [durations, setDurations] = useState(() => {
        const optionsArray = [
            { property: 'start_date' },
            { property: 'end_date' },
        ];

        if (details?.offer_type == 'gift_card') {
            optionsArray.shift();
        }

        return optionsArray;
    });

    const abortControllerRef = useRef(new AbortController());

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const generateGiftCardCode = async () => {
        try {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            const { data } = await adminAxios.get('/giftcards/newcode', {
                signal: abortControllerRef.current.signal,
            });

            setDetails((prevState) => ({ ...prevState, code: data.code }));
        } catch (error) {
            console.error(error?.message, error);
        }
    };

    const handleInputChange = (e) => {
        const rawValue = e.target.value.replace(/[^A-Za-z0-9]/g, ''); // Remove non-alphanumeric characters
        let formattedValue = rawValue.match(/.{1,4}/g)?.join('-') || '';

        // Limit to 19 characters (16 alphanumeric + 3 hyphens)
        formattedValue = formattedValue.substring(0, 19);

        setDetails((prevState) => ({
            ...prevState,
            code: _.toUpper(formattedValue),
        }));

        setErrors(({ code, ...prevState }) => prevState);
    };
    return (
        <>
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">
                    Customise your offer details
                </h3>
                <p className="text-base">
                    {_.get(descriptions, details?.offer_type)}
                </p>
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
                            {discount_options.map(({ text, value }) => {
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
                        {orderMinimum.map((text) => {
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
                                                details?.order_minimum == text
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
                                                    setDetails((prevState) => ({
                                                        ...prevState,
                                                        ['minimum_value']:
                                                            e.target.value,
                                                    }));
                                                }}
                                                type={'number'}
                                                onWheel={(e) => e.target.blur()}
                                                min={1}
                                            />
                                        )}
                                </div>
                            );
                        })}
                    </div>

                    {errors?.order_minimum && (
                        <p className="text-red-700">{errors?.order_minimum}</p>
                    )}
                </section>
            </section>

            <Durations />

            {details?.offer_type == 'gift_card' && (
                <section className="flex w-full flex-nowrap gap-5">
                    <div className="left flex-1">
                        <p className="text-lg font-semibold">Email</p>

                        <p>
                            To successfully deliver the gift card, please enter
                            the recipient's email address. This allows the gift
                            card to be sent straight to their email for easy
                            access
                        </p>
                    </div>
                    <div className="right flex w-full flex-[2_2_0%] flex-col gap-2">
                        <div className="flex flex-wrap gap-4">
                            <input
                                type="input"
                                className={`daisy-input input !w-full ${errors?.email ? errorStyle : ''} `}
                                placeholder="johndoe@gmail.com"
                                value={details?.email || ''}
                                onChange={(e) => {
                                    setDetails((prevState) => ({
                                        ...prevState,
                                        email: e.target.value,
                                    }));
                                    setErrors(
                                        ({ email, ...prevErrors }) => prevErrors
                                    );
                                }}
                            />
                        </div>

                        {errors?.email && (
                            <p className="text-red-700">{errors.email}</p>
                        )}
                    </div>
                </section>
            )}
            {details?.offer_type == 'promo_code' && (
                <section className="flex w-full flex-nowrap gap-5">
                    <div className="left flex-1">
                        <p className="text-lg font-semibold">
                            Custom {_.replace(details?.offer_type, /_/g, ' ')}
                        </p>

                        <p>
                            This is what shoppers will enter at checkout to get
                            a discount. Each code should be unique, and only use
                            letters and numbers.
                        </p>
                    </div>
                    <div className="right flex w-full flex-[2_2_0%] flex-col gap-2">
                        <div className="flex flex-wrap gap-4">
                            <input
                                type="input"
                                className={`daisy-input input !w-full ${errors.code ? errorStyle : ''} `}
                                placeholder="EX. SAVE50"
                                value={details.code}
                                maxLength={16}
                                onChange={(e) =>
                                    setDetails((prevState) => ({
                                        ...prevState,
                                        code: e.target.value,
                                    }))
                                }
                            />
                            {/* {details?.offer_type == 'gift_card' && (
                            <BubbleButton
                                text={'Generate'}
                                handleClick={generateGiftCardCode}
                            ></BubbleButton>
                        )} */}
                        </div>

                        {errors?.code && (
                            <p className="text-red-700">{errors.code}</p>
                        )}
                    </div>
                </section>
            )}
        </>
    );
}

export default Step1;
