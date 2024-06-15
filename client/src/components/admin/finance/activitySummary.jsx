import {
    ArrowDropDownSharp,
    AssignmentSharp,
    CloseFullscreenRounded,
    CreditCardRounded,
    DoneRounded,
    OpenInFullRounded,
} from '@mui/icons-material';
import ThemeBtn from '../../buttons/themeBtn';
import { ThemeDropDown } from '../../common/dropdown/seamlessDropdown';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useFinanceContext } from '../../../context/financeContext';
import FeeContainer from './feesContainer';
import sortCategory from './sortCategory';
import ExpandCollapseButton from './expandCollapseButton';
import SalesAndFees from './sales-and-fees';
function ActivitySummary({}) {
    const {
        salesTotal,
        feesTotal,

        show,
        setShow,
        stats,
        generateText,
        dateSelection,
        setDateSelection,
        selectString,
        activityLoading,
    } = useFinanceContext();
    return (
        <section className="h-full min-h-72">
            {/* <h2 className=" text-2xl font-semibold">Activity Summary</h2> */}

            {activityLoading ? (
                <div className="flex h-full min-h-72 w-full  items-center justify-center">
                    <div className="spinner-circle spinner-lg ![--spinner-color:var(--gray-12)]"></div>
                </div>
            ) : (
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
                                            setShow((prevState) => !prevState)
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

                                    {sortCategory.map(
                                        ({ text, end_date, start_date }) => {
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
                                                        setShow(() => false);
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
                                                        text && <DoneRounded />}
                                                </div>
                                            );
                                        }
                                    )}
                                </section>
                            </ThemeDropDown>
                        </div>

                        <ExpandCollapseButton />
                    </section>

                    <h3 className="text-lg">
                        Your{' '}
                        <span className="font-semibold underline decoration-dashed decoration-2 underline-offset-4">
                            net profit
                        </span>{' '}
                        for the last 12 months was{' '}
                        <span className="font-semibold text-green-700">
                            {
                                generateText(salesTotal?.num + feesTotal?.num)
                                    .numString
                            }
                        </span>
                    </h3>

                    <section className="flex flex-col gap-4">
                        <SalesAndFees
                            stats={stats}
                            salesTotal={salesTotal}
                            feesTotal={feesTotal}
                        />
                    </section>
                </section>
            )}
        </section>
    );
}

export default ActivitySummary;
