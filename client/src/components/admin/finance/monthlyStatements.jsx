import {
    ArrowDropDownSharp,
    DoneRounded,
    KeyboardBackspaceRounded,
} from '@mui/icons-material';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { ThemeDropDown } from '../../common/dropdown/seamlessDropdown';
import ThemeBtn from '../../buttons/themeBtn';
import { useEffect, useState } from 'react';
import MonthStatement from './monthStatement';
import { useFinanceContext } from '../../../context/financeContext';
function MonthlyStatements({}) {
    const [selected_year, setSelectedYear] = useState(dayjs().year());
    const { searchParams, setSearchParams } = useFinanceContext();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [yearArray, setYearArray] = useState(() =>
        Array.from({ length: 10 }, (v, idx) => dayjs().year() - idx)
    );

    const [monthsArray, setMonthsArray] = useState(() =>
        getMonthsUpToYear(dayjs().year())
    );

    const [showStatement, setShowStatement] = useState(false);

    function getMonthsUpToYear(year) {
        const today = dayjs();
        const currentYear = today.year();
        const currentMonth = today.month(); // 0-based, January is 0
        if (year == currentYear) {
            // setMonthsArray(() => [...Array(currentMonth).keys()]);

            return [
                currentMonth,
                ...Array.from(
                    { length: currentMonth },
                    (v, idx) => currentMonth - (idx + 1)
                ),
            ];
        } else {
            return [...Array.from({ length: 12 }, (v, idx) => 11 - idx)];
        }
    }

    return (
        <section className="flex h-full w-full flex-col gap-5 ">
            <Link
                to={'/admin/payments'}
                className="group flex w-fit flex-nowrap items-center gap-2"
            >
                <div className="transition-all group-hover:translate-x-[-0.4rem]">
                    <KeyboardBackspaceRounded />
                </div>
                <p className="text-base font-semibold">View payment account</p>
            </Link>
            <header>
                <h2 className="font-EBGaramond text-5xl">Monthly Statements</h2>
            </header>

            <section>
                <ThemeDropDown
                    defaultIcon={
                        <ThemeBtn
                            bg={`border-2 ${show ? 'border-transparent' : 'border-black'} `}
                            className={'z-[3] px-4 py-3'}
                            hoverClassName={'bg-white'}
                            handleClick={() =>
                                setShow((prevState) => !prevState)
                            }
                            isDisableHoverEffect={show}
                        >
                            <div className="flex flex-nowrap items-center">
                                <span className=" relative w-full cursor-pointer font-semibold  text-black">
                                    {selected_year}
                                </span>

                                <ArrowDropDownSharp />
                            </div>
                        </ThemeBtn>
                    }
                    show={show}
                    setShow={setShow}
                >
                    <section className=" pt-10">
                        {yearArray.map((year, idx) => {
                            return (
                                <div
                                    onClick={() => {
                                        setSelectedYear(() => year);

                                        const getMonths =
                                            getMonthsUpToYear(year);

                                        setMonthsArray(() => getMonths);
                                        setShow(() => false);
                                    }}
                                    key={year}
                                    className={` ${selected_year == year ? 'bg-light-grey' : ''} flex w-full cursor-pointer flex-nowrap justify-between gap-2 px-4 py-3 hover:bg-dark-gray/30`}
                                >
                                    <p className="text-base">{year}</p>

                                    {selected_year == year && (
                                        <DoneRounded fontSize="small" />
                                    )}
                                </div>
                            );
                        })}
                    </section>
                </ThemeDropDown>
            </section>
            <section>
                <div className="flex w-full overflow-x-auto">
                    <table className="table">
                        <thead className="!border-none !bg-transparent">
                            <tr className="!border-none !bg-transparent">
                                <th
                                    style={{ width: '80%' }}
                                    className="!border-none !bg-transparent !text-s !font-semibold"
                                >
                                    Month
                                </th>
                                <th
                                    style={{ width: '10%' }}
                                    className="!border-none !bg-transparent !text-s !font-semibold"
                                >
                                    Sales and credits
                                </th>
                                <th
                                    style={{ width: '10%' }}
                                    className="!border-none !bg-transparent !text-s !font-semibold"
                                >
                                    Fees and taxes
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthsArray.map((month) => {
                                const monthName = dayjs()
                                    .month(month)
                                    .format('MMMM');
                                return (
                                    <tr key={monthName}>
                                        <td className="">
                                            <Link
                                                to={`/admin/payments/monthly-statement?month=${month + 1}&year${selected_year}`}
                                                className="w-fit cursor-pointer !text-sm text-black/90 underline underline-offset-1"
                                            >
                                                {`${monthName} ${selected_year}`}
                                            </Link>
                                        </td>
                                        <td className="!text-right !text-sm">
                                            --
                                        </td>
                                        <td className="!text-right !text-sm">
                                            --
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </section>
    );
}

export default MonthlyStatements;
