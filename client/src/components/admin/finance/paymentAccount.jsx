import { useEffect, useRef, useState } from 'react';
import BubbleButton from '../../buttons/bubbleButton';
import RevenueContainer from './revenueContainer';
import { useContent } from '../../../context/ContentContext';
import { useAdminContext } from '../../../context/adminContext';
import { adminAxios } from '../../../api/axios';
import dayjs from 'dayjs';
import _, { upperFirst } from 'lodash';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    AccountBalanceRounded,
    ArrowDropDownSharp,
    AssignmentSharp,
    CloseFullscreenRounded,
    CreditCardRounded,
    CurrencyExchangeRounded,
    DoneRounded,
    KeyboardArrowUpSharp,
    OpenInFullRounded,
    SyncAltRounded,
} from '@mui/icons-material';
import '../../../CSS/payment.scss';
import FeeContainer from './feesContainer';
import { ThemeDropDown } from '../../common/dropdown/seamlessDropdown';
import ThemeBtn from '../../buttons/themeBtn';

function PaymentAccount({}) {
    const [transactions, setTransactions] = useState([]);

    const [balance, setBalance] = useState({});
    const abortControllerRef = useRef(new AbortController());
    const { logoutUser } = useAdminContext();
    const { setShowAlert } = useContent();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({});

    const [netProfit, setNetProfit] = useState({});
    const [salesTotal, setSalesTotal] = useState({});
    const [feesTotal, setFeesTotal] = useState({});
    const [openCategories, setOpenCategories] = useState(false);

    const [salesOpen, setSalesOpen] = useState(false);
    const [feesOpen, setFeesOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [dateSelection, setDateSelection] = useState({
        select: 'this_month',
        start_date: '',
        end_date: '',
    });
    const generateText = (num) => {
        return {
            numString: parseFloat(num / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'GBP',
            }),
            num,
        };
    };

    const fetchTransactions = async () => {
        try {
            setLoading(() => true);

            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            const { data } = await adminAxios.post(
                '/stripe/transactions/',
                { ...dateSelection },
                { signal: abortControllerRef.current.signal }
            );

            setTransactions(() => data.transactions);
            setBalance(() => data.balance);
            setStats(() => data.stats);

            setSalesTotal(() =>
                generateText(
                    _.get(data, 'stats.payments.amount') +
                        _.get(data, 'stats.refunds.amount')
                )
            );

            setFeesTotal(() =>
                generateText(
                    -_.get(data, 'stats.payments.fees') -
                        _.get(data, 'stats.refunds.fees')
                )
            );
        } catch (error) {
            console.error(error);
            logoutUser({ error });

            if (error.response.status != 401) {
                setShowAlert(() => ({
                    on: true,
                    bg: 'bg-red-900',
                    icon: 'sadFace',
                    msg: 'We could not retrieve the transactions. Please try again',
                    size: 'medium',
                }));
            }
        } finally {
            setLoading(() => false);
        }
    };
    useEffect(() => {
        fetchTransactions();
    }, [dateSelection]);

    const getVariants = (idx) => {
        return {
            initial: {
                marginLeft: idx == 0 ? '0rem' : '-2rem',
            },
            whileHover: {
                marginLeft: idx == 0 ? '0rem' : '-0.5rem',
                transition: {
                    duration: 0.5,
                },
            },
            transition: {
                duration: 0.5,
            },
        };
    };

    const icons = {
        payout: <SyncAltRounded fontSize="large" />,
        bank: <AccountBalanceRounded fontSize="large" />,
        card: <CreditCardRounded fontSize="large" />,
        payment_refund: <CurrencyExchangeRounded fontSize="large" />,
    };

    const generateValue = (amount) => {
        if (amount < 0) {
            return `-£${parseFloat(Math.abs(amount / 100)).toFixed(2)}`;
        }

        return `£${parseFloat(amount / 100).toFixed(2)}`;
    };

    const selectString = `${_.upperFirst(dateSelection.select?.replaceAll('_', ' '))}: ${dayjs.unix(dateSelection?.start_date).format('MMMM YYYY')} ${dateSelection?.end_date ? `- ${dayjs.unix(dateSelection?.end_date).format('MMMM YYYY')}` : ''}`;
    return (
        <section className=" flex flex-col gap-8">
            {loading ? (
                <div className="flex w-full justify-center">
                    <div className="spinner-circle spinner-lg ![--spinner-color:var(--gray-12)]"></div>
                </div>
            ) : (
                <>
                    <header>
                        <h2 className="font-EBGaramond text-5xl">
                            Payment account
                        </h2>
                    </header>
                    <section className=" flex w-full gap-5">
                        <RevenueContainer
                            title={'Amount due for June'}
                            includeQuestion={true}
                            amount={0}
                            text={'Your sales covered your fees'}
                        >
                            <div className="border-t border-dark-gray pt-4">
                                <p className="cursor-pointer font-medium underline-offset-2 hover:underline">
                                    Update billing settings
                                </p>
                            </div>
                        </RevenueContainer>
                        <RevenueContainer
                            title={'Available for deposit'}
                            amount={
                                generateText(
                                    _.get(balance, 'available.0.amount')
                                ).numString
                            }
                            underline
                        >
                            <div className="flex w-full justify-between border-t border-dark-gray pt-4">
                                <p className="font-medium">
                                    Update billing settings
                                    <span className="block cursor-pointer text-left font-normal underline">
                                        weekly
                                    </span>
                                </p>

                                <p className="font-medium">
                                    Bank account{' '}
                                    <span className="block cursor-pointer text-right font-normal underline">
                                        ...1234
                                    </span>
                                </p>
                            </div>
                        </RevenueContainer>
                    </section>
                    <section className="flex flex-col gap-5">
                        <h2 className=" text-2xl font-semibold">
                            Activity Summary
                        </h2>

                        <section className="relative flex items-center justify-between">
                            <div className="w-fit">
                                <ThemeDropDown
                                    defaultIcon={
                                        <ThemeBtn
                                            bg={`border-2 ${show ? 'border-transparent' : 'border-black'} `}
                                            className={'z-[3] px-4 py-3'}
                                            hoverClassName={'bg-white'}
                                            handleClick={() =>
                                                setShow(
                                                    (prevState) => !prevState
                                                )
                                            }
                                            isDisableHoverEffect={show}
                                        >
                                            <div className="flex flex-nowrap items-center">
                                                <span className=" relative w-full cursor-pointer font-semibold  text-black">
                                                    {selectString}
                                                </span>

                                                <ArrowDropDownSharp />
                                            </div>
                                        </ThemeBtn>
                                    }
                                    show={show}
                                    setShow={setShow}
                                >
                                    <section className="min-w-full ">
                                        <p className="whitespace-nowrap px-4 py-3 pb-3 text-base font-medium opacity-0">
                                            {selectString}

                                            <span className="inline">
                                                <ArrowDropDownSharp />
                                            </span>
                                        </p>

                                        {[
                                            {
                                                text: 'this_month',
                                                start_date: dayjs()
                                                    .startOf('M')
                                                    .unix(),
                                            },
                                            {
                                                text: 'last_3_months',
                                                start_date: dayjs()
                                                    .subtract(3, 'M')
                                                    .startOf('M')
                                                    .unix(),
                                                end_date: dayjs()
                                                    .subtract(1, 'M')
                                                    .endOf('M')
                                                    .unix(),
                                            },
                                            {
                                                text: 'last_6_months',
                                                start_date: dayjs()
                                                    .subtract(6, 'M')
                                                    .startOf('M')
                                                    .unix(),
                                                end_date: dayjs()
                                                    .subtract(1, 'M')
                                                    .endOf('M')
                                                    .unix(),
                                            },
                                            {
                                                text: 'last_12_months',
                                                start_date: dayjs()
                                                    .subtract(12, 'M')
                                                    .startOf('M')
                                                    .unix(),
                                                end_date: dayjs()
                                                    .subtract(1, 'M')
                                                    .endOf('M')
                                                    .unix(),
                                            },
                                            {
                                                text: 'all_this_year',
                                                start_date: dayjs()
                                                    .startOf('year')
                                                    .unix(),
                                                end_date: dayjs().unix(),
                                            },
                                            {
                                                text: 'all_last_year',
                                                start_date: dayjs()
                                                    .subtract(1, 'year')
                                                    .startOf('year')
                                                    .unix(),
                                                end_date: dayjs()
                                                    .subtract(1, 'year')
                                                    .endOf('year')
                                                    .unix(),
                                            },
                                        ].map(
                                            ({
                                                text,
                                                end_date,
                                                start_date,
                                            }) => {
                                                return (
                                                    <div
                                                        key={text}
                                                        className={` ${dateSelection.select == text ? 'bg-light-grey' : ''} flex w-full flex-nowrap justify-between px-4 py-3 hover:bg-dark-gray/30`}
                                                        onClick={() => {
                                                            setDateSelection(
                                                                () => ({
                                                                    select: text,
                                                                    end_date,
                                                                    start_date,
                                                                })
                                                            );
                                                            setShow(
                                                                () => false
                                                            );
                                                        }}
                                                    >
                                                        <p className="whitespace-nowrap text-base ">
                                                            {_.upperFirst(
                                                                text.replaceAll(
                                                                    '_',
                                                                    ' '
                                                                )
                                                            )}
                                                        </p>
                                                        {dateSelection.select ==
                                                            text && (
                                                            <DoneRounded />
                                                        )}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </section>
                                </ThemeDropDown>
                            </div>

                            <ThemeBtn
                                bg={'bg-light-grey'}
                                handleClick={() => {
                                    if (!salesOpen || !feesOpen) {
                                        setSalesOpen(() => true);
                                        setFeesOpen(() => true);
                                    } else {
                                        setSalesOpen(() => false);
                                        setFeesOpen(() => false);
                                    }
                                }}
                            >
                                <div className="flex flex-nowrap items-center gap-2 ">
                                    {!salesOpen || !feesOpen ? (
                                        <>
                                            <OpenInFullRounded />
                                            <p className="text-base font-medium">
                                                Expand categories
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <CloseFullscreenRounded />
                                            <p className="text-base font-medium">
                                                Collapse categories
                                            </p>
                                        </>
                                    )}
                                </div>
                            </ThemeBtn>
                        </section>

                        <h3 className="text-lg">
                            Your{' '}
                            <span className="font-semibold underline decoration-dashed decoration-2 underline-offset-4">
                                net profit
                            </span>{' '}
                            for the last 12 months was{' '}
                            <span className="font-semibold text-green-700">
                                {
                                    generateText(
                                        salesTotal?.num + feesTotal?.num
                                    ).numString
                                }
                            </span>
                        </h3>

                        <section className="flex flex-col gap-4">
                            <h2 className=" text-xl font-semibold">
                                Sales and fees
                            </h2>
                            <section className="flex w-full flex-nowrap gap-5">
                                <FeeContainer
                                    {...{
                                        icon: <AssignmentSharp />,
                                        bg: 'bg-yellow-200',
                                        text: 'Sales',
                                        result: stats?.payments || {},
                                        ...salesTotal,
                                        isOpen: salesOpen,
                                        setOpen: setSalesOpen,
                                    }}
                                >
                                    <div className="mt-3 flex w-full flex-col gap-2 pl-5">
                                        <p className="flex w-full flex-nowrap items-center text-sm">
                                            Total sales{' '}
                                            <span className="ml-1.5 flex items-center justify-center rounded-full bg-light-grey px-2 py-1">
                                                {_.get(stats, 'payments.total')}
                                            </span>{' '}
                                            <span className=" ml-auto text-right">
                                                {
                                                    generateText(
                                                        _.get(
                                                            stats,
                                                            'payments.amount'
                                                        )
                                                    ).numString
                                                }
                                            </span>
                                        </p>
                                        <p className="flex w-full flex-nowrap items-center text-sm">
                                            Refunds{' '}
                                            <span className="ml-1.5 flex items-center justify-center rounded-full bg-light-grey px-2 py-1">
                                                {_.get(stats, 'refunds.total')}
                                            </span>{' '}
                                            <span className=" ml-auto text-right">
                                                {
                                                    generateText(
                                                        _.get(
                                                            stats,
                                                            'refunds.amount'
                                                        )
                                                    ).numString
                                                }
                                            </span>
                                        </p>
                                    </div>
                                </FeeContainer>
                                <FeeContainer
                                    {...{
                                        icon: <CreditCardRounded />,
                                        bg: 'bg-pink-200',
                                        text: 'Fees',
                                        result: stats?.refunds || {},
                                        ...feesTotal,
                                        isOpen: feesOpen,
                                        setOpen: setFeesOpen,
                                    }}
                                >
                                    <div className="mt-3 flex w-full flex-col gap-2 pl-5">
                                        {_.entries(
                                            _.get(stats, 'payments.fee_details')
                                        ).map(
                                            ([
                                                feeType,
                                                { total, description },
                                            ]) => {
                                                const credit = _.get(
                                                    stats,
                                                    `refunds.fee_details.${feeType}.credit`
                                                );
                                                return (
                                                    <div className="flex flex-col gap-2">
                                                        <p
                                                            key={feeType}
                                                            className="flex w-full flex-nowrap items-center text-sm"
                                                        >
                                                            {description}
                                                            <span className=" ml-auto text-right">
                                                                {
                                                                    generateText(
                                                                        -total
                                                                    ).numString
                                                                }
                                                            </span>
                                                        </p>

                                                        {credit && (
                                                            <p className="flex w-full flex-nowrap items-center pl-4 text-sm">
                                                                Credits{' '}
                                                                <span className=" ml-auto text-right">
                                                                    {
                                                                        generateText(
                                                                            Math.abs(
                                                                                credit
                                                                            )
                                                                        )
                                                                            .numString
                                                                    }
                                                                </span>
                                                            </p>
                                                        )}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </FeeContainer>
                            </section>
                        </section>
                    </section>
                    <section className="mt-10 flex flex-col gap-10">
                        <h2 className=" text-2xl font-semibold">
                            Recent activities
                        </h2>

                        <h3 className="text-lg">
                            Your{' '}
                            <span className="font-semibold underline decoration-dashed decoration-2 underline-offset-4">
                                current balance
                            </span>{' '}
                            is{' '}
                            <span className="font-semibold">
                                £
                                {parseFloat(
                                    _.get(balance, 'available.0.amount') / 100
                                ).toFixed(2)}
                            </span>
                        </h3>

                        <section className="h-full w-full">
                            <div className="flex w-full overflow-x-auto">
                                <table className="table">
                                    <colgroup>
                                        <col style={{ width: '15%' }} />
                                        <col style={{ width: '10%' }} />
                                        <col style={{ width: '15%' }} />
                                        <col style={{ width: '30%' }} />
                                        <col style={{ width: '10%' }} />
                                        <col style={{ width: '10%' }} />
                                        <col style={{ width: '10%' }} />
                                        {/* <col style={{ width: '10%' }} /> */}
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th className=""></th>
                                            <th className="!font-semibold">
                                                Date
                                            </th>
                                            <th className="!font-semibold">
                                                Type
                                            </th>
                                            <th className="!font-semibold">
                                                Description
                                            </th>
                                            <th className="!font-semibold">
                                                Amount
                                            </th>
                                            <th className="!w-full   !font-semibold">
                                                Fee and tax{' '}
                                            </th>
                                            <th className="!font-semibold">
                                                Net
                                            </th>
                                            {/* <th className="!font-semibold">Balance</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map(
                                            ({
                                                id,
                                                created,
                                                description,
                                                amount,
                                                fee,
                                                type,
                                                reporting_category,
                                                order,
                                                net,
                                                sourceObject,
                                            }) => {
                                                return (
                                                    <tr key={id}>
                                                        <th className="">
                                                            <section className="!w-full">
                                                                {order ? (
                                                                    <div className=" flex !w-32 flex-row flex-nowrap overflow-hidden">
                                                                        {[
                                                                            ...order.items,
                                                                        ]?.map(
                                                                            (
                                                                                {
                                                                                    images,
                                                                                    ...item
                                                                                },
                                                                                idx
                                                                            ) => {
                                                                                return (
                                                                                    <motion.img
                                                                                        variants={getVariants(
                                                                                            idx
                                                                                        )}
                                                                                        initial={
                                                                                            'initial'
                                                                                        }
                                                                                        whileHover={
                                                                                            'whileHover'
                                                                                        }
                                                                                        transition={
                                                                                            'transition'
                                                                                        }
                                                                                        key={`tester-${idx}`}
                                                                                        className={`inset-0 h-14 w-14 min-w-14 cursor-pointer ${idx == 0 ? 'rounded-lg' : 'rounded-r-lg'} object-cover`}
                                                                                        src={
                                                                                            images[0]
                                                                                        }
                                                                                        style={{
                                                                                            zIndex:
                                                                                                order
                                                                                                    .items
                                                                                                    ?.length +
                                                                                                1 -
                                                                                                idx,
                                                                                        }}
                                                                                    />
                                                                                );
                                                                            }
                                                                        )}

                                                                        {order
                                                                            ?.items
                                                                            ?.length >
                                                                            2 && (
                                                                            <motion.div
                                                                                variants={getVariants(
                                                                                    1
                                                                                )}
                                                                                initial={
                                                                                    'initial'
                                                                                }
                                                                                whileHover={
                                                                                    'whileHover'
                                                                                }
                                                                                transition={
                                                                                    'transition'
                                                                                }
                                                                                style={{
                                                                                    zIndex: 1,
                                                                                }}
                                                                                className=" inset-0 flex h-14 w-14 cursor-pointer items-center justify-center rounded-r-lg bg-black/50 "
                                                                            >
                                                                                <p className="text-sm text-white">
                                                                                    {`+${
                                                                                        order
                                                                                            ?.items
                                                                                            ?.length -
                                                                                        2
                                                                                    }`}
                                                                                </p>
                                                                            </motion.div>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex h-14 w-14 items-center justify-center">
                                                                        {icons[
                                                                            type
                                                                        ] ||
                                                                            icons[
                                                                                'bank'
                                                                            ]}
                                                                    </div>
                                                                )}
                                                            </section>
                                                        </th>
                                                        <td className="">
                                                            {dayjs
                                                                .unix(created)
                                                                .format(
                                                                    'DD MMM, YYYY'
                                                                )}
                                                        </td>
                                                        <td className=" capitalize">
                                                            {type.replaceAll(
                                                                '_',
                                                                ' '
                                                            )}
                                                        </td>
                                                        <td className="h-full w-full max-w-32 whitespace-normal text-wrap break-all">
                                                            <p className="h-full w-full whitespace-normal text-wrap break-all  !text-base">
                                                                {type ==
                                                                    'payment' &&
                                                                order ? (
                                                                    <span>
                                                                        Payment
                                                                        for{' '}
                                                                        <Link
                                                                            to={`/admin/orders/complete?orderId=${order?._id}`}
                                                                            className="cursor-pointer underline decoration-[1.5px] underline-offset-2"
                                                                        >
                                                                            Order
                                                                            #
                                                                            {
                                                                                order._id
                                                                            }
                                                                        </Link>
                                                                    </span>
                                                                ) : type ==
                                                                      'payment_refund' &&
                                                                  order ? (
                                                                    <span>
                                                                        Refund
                                                                        to buyer
                                                                        for{' '}
                                                                        <Link
                                                                            to={`/admin/orders/complete?orderId=${order?._id}`}
                                                                            className="cursor-pointer underline decoration-[1.5px] underline-offset-2"
                                                                        >
                                                                            Order
                                                                            #
                                                                            {
                                                                                order._id
                                                                            }
                                                                        </Link>
                                                                    </span>
                                                                ) : type ==
                                                                  'payout' ? (
                                                                    `£${parseFloat(Math.abs(amount) / 100).toFixed(2)} sent to your ${_.replace(sourceObject?.type, /_/g, ' ')}`
                                                                ) : (
                                                                    description
                                                                )}
                                                            </p>
                                                        </td>
                                                        <td
                                                            className={`${amount < 0 ? '!text-red-800 ' : ''}`}
                                                        >
                                                            {parseFloat(
                                                                amount / 100
                                                            ).toLocaleString(
                                                                'en-US',
                                                                {
                                                                    style: 'currency',
                                                                    currency:
                                                                        'GBP',
                                                                }
                                                            )}
                                                        </td>
                                                        <td
                                                            className={`${fee < 0 ? '!text-red-800' : ''} !text-right`}
                                                        >
                                                            {parseFloat(
                                                                fee / 100
                                                            ).toLocaleString(
                                                                'en-US',
                                                                {
                                                                    style: 'currency',
                                                                    currency:
                                                                        'GBP',
                                                                }
                                                            )}
                                                        </td>
                                                        <td
                                                            className={`${net < 0 ? '!text-red-800' : ''}`}
                                                        >
                                                            {parseFloat(
                                                                net / 100
                                                            ).toLocaleString(
                                                                'en-US',
                                                                {
                                                                    style: 'currency',
                                                                    currency:
                                                                        'GBP',
                                                                }
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                        <div className="h-fit w-fit">
                            <BubbleButton
                                text={'View all monthly statements'}
                            />
                        </div>
                    </section>
                </>
            )}
        </section>
    );
}

export default PaymentAccount;
