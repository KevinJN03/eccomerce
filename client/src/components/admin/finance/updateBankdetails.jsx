import { useEffect, useRef, useState } from 'react';
import { useFinanceContext } from '../../../context/financeContext';
import Template from './template';
import { useAdminContext } from '../../../context/adminContext';
import { getName } from 'country-list';
import { adminAxios } from '../../../api/axios.js';
import OptionError from '../components/product/new product/variation/error/optionError';
import { GppGoodRounded } from '@mui/icons-material';
import _ from 'lodash';
function UpdateBankDetails({}) {
    const { modalState, setModalState, bankAccount, setBankAccount } =
        useFinanceContext();

    const [changeName, setChangeName] = useState(false);
    const [currencyOption, setCurrencyOption] = useState('bank_account');
    const [btnLoading, setBtnLoading] = useState(false);
    const { logoutUser } = useAdminContext();

    const abortControllerRef = useRef(new AbortController());
    const [errors, setErrors] = useState({});
    const { account_holder_name, country, currency } = bankAccount;
    const [accountDetails, setAccountDetails] = useState({
        routing_number: '',
        account_number: '',
        account_holder_name,
        country,
        currency,
    });

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const handleClick = async () => {
        try {
            setBtnLoading(() => true);
            abortControllerRef.current?.abort();

            abortControllerRef.current = new AbortController();

            const { data } = await adminAxios.post(
                '/stripe/add-account',
                { ...accountDetails },
                { signal: abortControllerRef.current?.signal }
            );
            setBankAccount(() => data);
            setModalState(() => ({ on: false }));
        } catch (error) {
            logoutUser({ error });

            console.error(error.message, error);

            if (error.response.status != 401) {
                setErrors(() => error.response.data);
            }
        } finally {
            setBtnLoading(() => false);
        }
    };
    return (
        <Template
            headerText={`Update bank details`}
            footer={{
                text: 'Save and verify account',
                handleClick,
                loading: btnLoading,
            }}
        >
            <section className="">
                <p className="text-base">
                    If you make changes to your bank account, funds from your
                    sales will be unavailable for deposit for five business
                    days.{' '}
                    <span className="font-medium underline">Learn more</span>
                </p>

                <label className="daisy-form-control w-full max-w-full">
                    <div className="daisy-label">
                        <div className="mt-4 flex flex-col gap-0.5">
                            <p className="text-base font-medium">
                                Full name on bank account
                            </p>

                            {!changeName && (
                                <>
                                    {' '}
                                    <p className="text-sm text-black/70">
                                        This is the name entered when you set up
                                        your shop.{' '}
                                        <span className="font-semibold text-black/80">
                                            Not right?
                                        </span>
                                    </p>
                                    <button
                                        type="button"
                                        className="text-start underline underline-offset-2"
                                        onClick={() =>
                                            setChangeName(() => true)
                                        }
                                    >
                                        <p className=" text-base text-black">
                                            Change it here
                                        </p>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <input
                        type="text"
                        className={`daisy-input daisy-input-bordered input !w-full !max-w-full  disabled:!text-black ${errors?.['account_holder_name'] ? '!border-red-700 !bg-red-100' : ''}`}
                        disabled={!changeName}
                        value={accountDetails?.account_holder_name}
                        onChange={(e) =>
                            setAccountDetails((prevState) => ({
                                ...prevState,
                                account_holder_name: e.target.value,
                            }))
                        }
                    />
                    <div className="daisy-label">
                        <span className="daisy-label-text-alt">
                            {/* Bottom Left label */}

                            {errors?.['account_holder_name'] && (
                                <OptionError
                                    className={'!items-start !gap-2 !p-0'}
                                    msg={errors?.['account_holder_name']}
                                />
                            )}
                        </span>
                    </div>
                </label>

                <label className="daisy-form-control w-full max-w-full">
                    <div className="daisy-label">
                        <span className="daisy-label-text !text-base font-semibold tracking-wide">
                            Bank country & currency
                            {/* <span className="text-lg text-red-800">*</span> */}
                        </span>
                    </div>
                    <input
                        type="text"
                        placeholder={getName(accountDetails.country)}
                        className="daisy-input daisy-input-bordered input !w-full !max-w-full placeholder:!text-black"
                        disabled
                    />
                    <div className="daisy-label"></div>
                </label>

                <div className="flex flex-col gap-1">
                    {[
                        {
                            text: 'My bank account is in',
                            currency,
                            option: 'bank_account',
                        },
                        // {
                        //     text: 'My bank account is a different currency',
                        //     currency: '',
                        //     option: 'different_bank_account',
                        // },
                    ].map(({ text, currency, option }) => {
                        const currencySign = currency
                            ? (0)
                                  .toLocaleString('en', {
                                      style: 'currency',
                                      currency,
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                  })
                                  .replace(/\d/g, '')
                                  .trim()
                            : currency;
                        return (
                            <div
                                className="flex w-fit flex-nowrap items-center gap-2"
                                onClick={(e) => {
                                    setCurrencyOption(() => option);
                                    const cloneAccountDetails = {
                                        ...accountDetails,
                                    };
                                    if (currency) {
                                        cloneAccountDetails.currency = currency;
                                    } else {
                                        _.unset(
                                            cloneAccountDetails,
                                            'currency'
                                        );
                                    }

                                    setAccountDetails(
                                        () => cloneAccountDetails
                                    );
                                }}
                            >
                                <input
                                    type="radio"
                                    name="curreny"
                                    className="daisy-radio daisy-radio-lg "
                                    checked={currencyOption == option}
                                    readOnly
                                />
                                <p className="cursor-pointer text-base">{`${text} ${currencySign ? `${currencySign}${currency?.toUpperCase()}` : ''}`}</p>
                            </div>
                        );
                    })}

                    {[
                        // { text: 'Bank name' },
                        {
                            text: 'Account number',
                            field: 'account_number',
                            autocomplete: 'account-number',
                        },
                        {
                            text: 'Sort code',
                            field: 'routing_number',
                            autocomplete: 'sort-code',
                        },
                    ].map(({ text, field, autocomplete }) => {
                        return (
                            <label className="daisy-form-control w-full max-w-full">
                                <div className="daisy-label">
                                    <span className="daisy-label-text !text-base font-semibold tracking-wide">
                                        {text}
                                        <span className="text-lg text-red-800">
                                            *
                                        </span>
                                    </span>
                                </div>
                                <input
                                    onChange={(e) => {
                                        setAccountDetails((prevState) => ({
                                            ...prevState,
                                            [field]: e.target.value,
                                        }));
                                    }}
                                    value={accountDetails[field]}
                                    type="text"
                                    autoComplete={autocomplete}
                                    className={`daisy-input daisy-input-bordered input !w-full !max-w-full placeholder:!text-black ${errors?.[field] ? '!border-red-700 !bg-red-100' : ''}`}
                                />
                                <div className="daisy-label">
                                    <span className="daisy-label-text-alt">
                                        {/* Bottom Left label */}

                                        {errors?.[field] && (
                                            <OptionError
                                                className={
                                                    '!items-start !gap-2 !p-0'
                                                }
                                                msg={errors?.[field]}
                                            />
                                        )}
                                    </span>
                                </div>
                            </label>
                        );
                    })}
                </div>
                <div className="my-6 flex h-full w-full flex-row flex-nowrap items-center gap-5 rounded bg-yellow-400/70 p-5">
                    <div className="left h-fit w-fit rounded-full bg-white p-2">
                        <GppGoodRounded />
                    </div>
                    <div className="right">
                        <p className="text-sm font-semibold">
                            {currencyOption == 'bank_account'
                                ? `How we'll verify your bank account details`
                                : `Funds can only be deposited to your account in £GBP
`}
                        </p>

                        {currencyOption == 'bank_account' ? (
                            <ul className=" pl-6">
                                <li className="list-disc">
                                    <p>
                                        Look out for a very small deposit from
                                        Glamo, Stripe in 2-3 business days
                                    </p>
                                </li>

                                <li className="list-disc">
                                    <p>
                                        Once you see it, come back and{' '}
                                        <span className="font-medium">
                                            enter the exact amount here.
                                        </span>
                                    </p>
                                </li>
                            </ul>
                        ) : (
                            <p>
                                Since your bank account is in another currency,
                                we'll need to verify your info with a bank
                                statement.
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </Template>
    );
}

export default UpdateBankDetails;
