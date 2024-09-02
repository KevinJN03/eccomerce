import { useEffect, useRef, useState } from 'react';
import ThemeBtn from '../../buttons/themeBtn';
import { ThemeDropDown } from '../../common/dropdown/seamlessDropdown';
import {
    ArrowDropDownSharp,
    DoneRounded,
    KeyboardBackspaceRounded,
} from '@mui/icons-material';
import { Link, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import ExpandCollapseButton from './expandCollapseButton';
import { useFinanceContext } from '../../../context/financeContext';
import ActivitySummary from './activitySummary';
import SalesAndFees from './sales-and-fees';
import { useAdminContext } from '../../../context/adminContext';
import { adminAxios } from '../../../api/axios.js';
import _ from 'lodash';
import ActivityTable from './activityTable';
import { generate } from 'generate-password-browser';
import { CircularProgress } from '@mui/material';
const { VITE_BACKEND_URL } = import.meta.env;
function MonthStatement({}) {
    const [show, setShow] = useState(false);
    const [showYears, setShowYears] = useState(false);
    const [page, setPage] = useState(1);
    const [activityLoading, setActivityLoading] = useState(true);
    const { searchParams, setSearchParams, generateText } = useFinanceContext();
    const { logoutUser } = useAdminContext();

    const abortControllerRef = useRef(new AbortController());

    const [stats, setStats] = useState({});
    const [salesTotal, setSalesTotal] = useState({});
    const [feesTotal, setFeesTotal] = useState({});
    const [btnLoading, setBtnLoading] = useState(false);
    const fetchStats = async () => {
        try {
            setActivityLoading(() => true);
            setPage(() => 1);

            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            const { data } = await adminAxios.post(
                '/stripe/monthly-statement',
                {
                    year: searchParams.get('year'),

                    month: parseInt(searchParams.get('month')) - 1,
                },
                { signal: abortControllerRef.current.signal }
            );

            setStats(() => data);

            setSalesTotal(() =>
                generateText(
                    _.get(data, 'payments.amount') +
                        _.get(data, 'refunds.amount')
                )
            );

            setFeesTotal(() =>
                generateText(
                    -_.get(data, 'payments.fees') - _.get(data, 'refunds.fees')
                )
            );
        } catch (error) {
            logoutUser({ error });
        } finally {
            setActivityLoading(() => false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [searchParams.get('month'), searchParams.get('year')]);

    const netProfit = generateText(salesTotal?.num + feesTotal?.num);

    const { month, year } = {
        month: parseInt(searchParams.get('month')) - 1,
        year: parseInt(searchParams.get('year')),
    };

    return (
        <section className="flex h-full flex-col gap-5">
            <Link
                to={'/admin/payments/monthly-statements'}
                className="group flex w-fit flex-nowrap items-center gap-2"
            >
                <div className="transition-all group-hover:translate-x-[-0.4rem]">
                    <KeyboardBackspaceRounded />
                </div>
                <p className="text-base font-semibold">
                    View all monthly statements
                </p>
            </Link>
            <header>
                <h2 className="font-EBGaramond text-5xl">Monthly Statement</h2>
            </header>
            {activityLoading ? (
                <div className="flex h-full min-h-72 min-h-full  w-full items-center justify-center">
                    <div className="spinner-circle spinner-lg ![--spinner-color:var(--gray-12)]"></div>
                </div>
            ) : (
                <>
                    <h2 className=" text-2xl font-semibold">
                        Activity Summary
                    </h2>
                    <section className="flex w-full flex-row flex-nowrap">
                        <section className="flex w-full flex-nowrap justify-between gap-3 ">
                            <div className="flex flex-nowrap gap-5">
                                <ThemeDropDown
                                    defaultIcon={
                                        <ThemeBtn
                                            bg={`border-2 ${show ? 'border-transparent' : 'border-black'} `}
                                            className={'z-[3] px-4 py-3'}
                                            hoverClassName={'bg-white '}
                                            handleClick={() =>
                                                setShow(
                                                    (prevState) => !prevState
                                                )
                                            }
                                            isDisableHoverEffect={show}
                                        >
                                            <div className="flex flex-nowrap items-center gap-14">
                                                <span className=" relative w-full cursor-pointer font-semibold  text-black">
                                                    {dayjs()
                                                        .month(month)
                                                        .format('MMMM')}
                                                </span>

                                                <ArrowDropDownSharp />
                                            </div>
                                        </ThemeBtn>
                                    }
                                    show={show}
                                    setShow={setShow}
                                >
                                    <section className="w-full pt-12 ">
                                        <section className="max-h-96  min-w-full overflow-y-scroll">
                                            {Array.from({ length: 12 }).map(
                                                (value, idx) => {
                                                    const monthName = dayjs()
                                                        .month(idx)
                                                        .format('MMMM');
                                                    return (
                                                        <div
                                                            onClick={() => {
                                                                searchParams.set(
                                                                    'month',
                                                                    idx + 1
                                                                );
                                                                setSearchParams(
                                                                    () =>
                                                                        searchParams
                                                                );

                                                                setShow(
                                                                    () => false
                                                                );
                                                            }}
                                                            key={monthName}
                                                            className={` ${month == idx ? 'bg-light-grey' : ''} flex w-full cursor-pointer flex-nowrap justify-between gap-14 px-4 py-3 hover:bg-dark-gray/30`}
                                                        >
                                                            <p className="text-base">
                                                                {monthName}
                                                            </p>

                                                            {month == idx && (
                                                                <DoneRounded fontSize="small" />
                                                            )}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </section>
                                    </section>
                                </ThemeDropDown>
                                <ThemeDropDown
                                    defaultIcon={
                                        <ThemeBtn
                                            bg={`border-2 ${showYears ? 'border-transparent' : 'border-black'} `}
                                            className={'z-[3] px-4 py-3'}
                                            hoverClassName={'bg-white'}
                                            handleClick={() => {
                                                setShowYears(
                                                    (prevState) => !prevState
                                                );
                                            }}
                                            isDisableHoverEffect={showYears}
                                        >
                                            <div className="flex flex-nowrap items-center">
                                                <span className=" relative w-full cursor-pointer font-semibold  text-black">
                                                    {year}
                                                </span>

                                                <ArrowDropDownSharp />
                                            </div>
                                        </ThemeBtn>
                                    }
                                    show={showYears}
                                    setShow={setShowYears}
                                >
                                    <section className="w-full pt-12 ">
                                        <section className="max-h-96  min-w-full overflow-y-scroll">
                                            {Array.from(
                                                { length: 10 },
                                                (v, i) => dayjs().year() - i
                                            ).map((value, idx) => {
                                                return (
                                                    <div
                                                        onClick={() => {
                                                            searchParams.set(
                                                                'year',
                                                                value
                                                            );
                                                            setSearchParams(
                                                                () =>
                                                                    searchParams
                                                            );

                                                            setShowYears(
                                                                () => false
                                                            );
                                                        }}
                                                        key={value}
                                                        className={` ${year == value ? 'bg-light-grey' : ''} flex w-full cursor-pointer flex-nowrap justify-between gap-2 px-4 py-3 hover:bg-dark-gray/30`}
                                                    >
                                                        <p className="text-base">
                                                            {value}
                                                        </p>

                                                        {year == value && (
                                                            <DoneRounded fontSize="small" />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </section>
                                    </section>
                                </ThemeDropDown>
                            </div>

                            <ExpandCollapseButton />
                        </section>
                    </section>
                    <h3 className="text-lg">
                        Your{' '}
                        <span className="font-semibold underline decoration-dashed decoration-2 underline-offset-4">
                            net profit
                        </span>{' '}
                        for the{' '}
                        {`${dayjs().month(month).format('MMMM')} ${year}`} was{' '}
                        <span
                            className={`font-semibold ${netProfit.num > 0 ? 'text-green-700' : netProfit.num < 0 && 'text-red-700'}`}
                        >
                            {netProfit.numString}
                        </span>
                    </h3>{' '}
                    <section className="flex flex-col gap-4">
                        <SalesAndFees
                            stats={stats}
                            salesTotal={salesTotal}
                            feesTotal={feesTotal}
                        />
                    </section>
                    <section className="flex flex-nowrap items-center justify-between">
                        <h2 className="text-2xl font-semibold">
                            All activities
                        </h2>

                        <ThemeBtn
                            bg={'bg-light-grey'}
                            handleClick={async () => {
                                window.location.href = `${VITE_BACKEND_URL}/admin/stripe/generate-csv?month=${month}&year=${year}`;
                            }}
                            isDisableHoverEffect={btnLoading}
                            disabled={btnLoading}
                        >
                            <section className="flex  w-full flex-nowrap items-center gap-2">
                                {btnLoading && (
                                    <div className="h-full w-full">
                                        <div className="spinner-circle spinner-xs ![--spinner-color:var(--slate-12)]"></div>
                                    </div>
                                )}
                                <p className="  w-full cursor-pointer whitespace-nowrap text-s font-semibold text-black">
                                    Generate CSV
                                </p>
                            </section>
                        </ThemeBtn>
                    </section>
                    <ActivityTable
                        activities={stats.data}
                        setLoading={setActivityLoading}
                        page={page}
                        setPage={setPage}
                    />
                </>
            )}
        </section>
    );
}

export default MonthStatement;
