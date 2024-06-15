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
import { adminAxios } from '../../../api/axios';
import _ from 'lodash';
import ActivityTable from './activityTable';

function MonthStatement({}) {
    const [show, setShow] = useState(false);
    const [showYears, setShowYears] = useState(false);
    const [loading, setLoading] = useState(true);

    const {
        searchParams,
        setSearchParams,
        generateText,
        activityLoading,
        setActivityLoading,
    } = useFinanceContext();
    const { logoutUser } = useAdminContext();
    const [selected, setSelected] = useState(() => {
        const month = parseInt(searchParams.get('month'));

        return {
            month: month > 0 && month <= 12 ? month - 1 : dayjs().month(),
            year: parseInt(searchParams.get('year') || dayjs().year()),
        };
    });

    const abortControllerRef = useRef(new AbortController());

    const [stats, setStats] = useState({});
    const [salesTotal, setSalesTotal] = useState({});
    const [feesTotal, setFeesTotal] = useState({});

    const fetchStats = async () => {
        try {
            setActivityLoading(() => true);
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            const { data } = await adminAxios.post(
                '/stripe/monthly-statement',
                selected,
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
    }, [selected.month, selected.year]);

    const netProfit = generateText(salesTotal?.num + feesTotal?.num);

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
                                                        .month(selected.month)
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
                                                                setSelected(
                                                                    (
                                                                        prevState
                                                                    ) => ({
                                                                        ...prevState,
                                                                        month: idx,
                                                                    })
                                                                );

                                                                setShow(
                                                                    () => false
                                                                );
                                                            }}
                                                            key={monthName}
                                                            className={` ${selected.month == idx ? 'bg-light-grey' : ''} flex w-full cursor-pointer flex-nowrap justify-between gap-14 px-4 py-3 hover:bg-dark-gray/30`}
                                                        >
                                                            <p className="text-base">
                                                                {monthName}
                                                            </p>

                                                            {selected.month ==
                                                                idx && (
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
                                            handleClick={() =>
                                                setShowYears(
                                                    (prevState) => !prevState
                                                )
                                            }
                                            isDisableHoverEffect={showYears}
                                        >
                                            <div className="flex flex-nowrap items-center">
                                                <span className=" relative w-full cursor-pointer font-semibold  text-black">
                                                    {selected.year}
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
                                            ).map((year, idx) => {
                                                return (
                                                    <div
                                                        onClick={() => {
                                                            setSelected(
                                                                (
                                                                    prevState
                                                                ) => ({
                                                                    ...prevState,
                                                                    year,
                                                                })
                                                            );

                                                            setShow(
                                                                () => false
                                                            );
                                                        }}
                                                        key={year}
                                                        className={` ${selected.year == year ? 'bg-light-grey' : ''} flex w-full cursor-pointer flex-nowrap justify-between gap-2 px-4 py-3 hover:bg-dark-gray/30`}
                                                    >
                                                        <p className="text-base">
                                                            {year}
                                                        </p>

                                                        {selected.year ==
                                                            year && (
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
                        {`${dayjs().month(selected.month).format('MMMM')} ${selected.year}`}{' '}
                        was{' '}
                        <span
                            className={`font-semibold ${netProfit.num > 0 ? 'text-green-700' : netProfit < 0 && 'text-red-700'}`}
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

                        <ThemeBtn bg={'bg-light-grey'}>
                            <p className="  w-full cursor-pointer text-s font-semibold text-black">
                                Generate CSV
                            </p>
                        </ThemeBtn>
                    </section>
                    {stats.data?.length > 0 ? (
                        <ActivityTable activities={stats.data} />
                    ) : (
                        <p>No recent activity</p>
                    )}
                </>
            )}
        </section>
    );
}

export default MonthStatement;
