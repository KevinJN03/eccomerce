import { useEffect, useRef, useState } from 'react';
import BubbleButton from '../../buttons/bubbleButton';
import RevenueContainer from './revenueContainer';
import { useContent } from '../../../context/ContentContext';
import { useAdminContext } from '../../../context/adminContext';
import { adminAxios } from '../../../api/axios.js';
import _, { upperFirst } from 'lodash';
import { Link, useNavigate } from 'react-router-dom';

import '../../../CSS/payment.scss';

import ActivitySummary from './activitySummary';
import { useFinanceContext } from '../../../context/financeContext';
import ActivityTable from './activityTable';
import ThemeBtn from '../../buttons/themeBtn';

function PaymentAccount({}) {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);

    const [balance, setBalance] = useState({});
    const abortControllerRef = useRef(new AbortController());
    const { logoutUser } = useAdminContext();
    const { setShowAlert } = useContent();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {
        setSalesTotal,
        setFeesTotal,
        setStats,
        generateText,
        dateSelection,
        setActivityLoading,
        stats,
        bankAccount,
        setBankAccount,
    } = useFinanceContext();

    const fetchTransactions = async () => {
        try {
            setActivityLoading(() => true);

            setPage(() => 1);

            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            const [
                {
                    value: { data },
                },
                {
                    value: { data: bankAccountData },
                },
            ] = await Promise.allSettled([
                adminAxios.post(
                    '/stripe/transactions/',
                    { ...dateSelection },
                    { signal: abortControllerRef.current.signal }
                ),
                adminAxios.get('/stripe/bank-account', {
                    signal: abortControllerRef.current.signal,
                }),
            ]);

            setBankAccount(() => bankAccountData);

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
            setActivityLoading(() => false);
        }
    };
    useEffect(() => {
        fetchTransactions();
    }, [
        dateSelection.select,
        dateSelection.start_date,
        dateSelection.end_date,
    ]);

    const generateValue = (amount) => {
        if (amount < 0) {
            return `-£${parseFloat(Math.abs(amount / 100)).toFixed(2)}`;
        }

        return `£${parseFloat(amount / 100).toFixed(2)}`;
    };

    return (
        <section className=" flex flex-col gap-8">
            <>
                <header>
                    <h2 className="font-EBGaramond text-5xl">
                        Payment account
                    </h2>
                </header>

                {loading ? (
                    <div className="flex w-full justify-center">
                        <div className="spinner-circle spinner-lg ![--spinner-color:var(--gray-12)]"></div>
                    </div>
                ) : (
                    <>
                        <section className=" flex w-full gap-5">
                            <RevenueContainer
                                title={'Amount due for June'}
                                includeQuestion={true}
                                amount={0}
                                text={'Amount awaiting clearing'}
                            >
                                <div className="border-t border-dark-gray pt-4">
                                    <p className="cursor-pointer font-medium underline-offset-2 hover:underline">
                                        Update billing settings
                                    </p>
                                </div>
                            </RevenueContainer>
                            <RevenueContainer
                                title={'Available for deposit'}
                                text={'Your sales covered your fees'}

                                amount={
                                    
                                        _.get(balance, 'available.0.amount') / 100
                                    
                                }
                                underline
                            >
                                <div className="flex w-full justify-between border-t border-dark-gray pt-4">
                                    <p className="font-medium">
                                        Update billing settings
                                        <Link
                                            to={'/admin/payments/settings'}
                                            className="block cursor-pointer text-left font-normal underline"
                                        >
                                            weekly
                                        </Link>
                                    </p>

                                    <p className="font-medium">
                                        Bank account{' '}
                                        <Link
                                            to={'/admin/payments/settings'}
                                            className="block cursor-pointer text-right font-normal underline"
                                        >
                                            ...{bankAccount.last4 || '1234'}
                                        </Link>
                                    </p>
                                </div>
                            </RevenueContainer>
                        </section>
                        <ActivitySummary />
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
                                        _.get(balance, 'available.0.amount') /
                                            100
                                    ).toFixed(2)}
                                </span>
                            </h3>

                            <ActivityTable
                                activities={transactions}
                                setLoading={setLoading}
                                page={page}
                                setPage={setPage}
                            />
                            <div className="h-fit w-fit">
                                <ThemeBtn
                                    bg={'bg-light-grey text-black'}
                                    handleClick={() =>
                                        navigate('monthly-statements')
                                    }
                                >
                                    <p className="cursor-pointer text-base font-medium text-black">
                                        View all monthly statements
                                    </p>
                                </ThemeBtn>
                            </div>
                        </section>
                    </>
                )}
            </>
        </section>
    );
}

export default PaymentAccount;
