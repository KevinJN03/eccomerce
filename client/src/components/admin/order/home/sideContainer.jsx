import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import { useState } from 'react';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

import { ThemeDropDown } from '../../../common/dropdown/seamlessDropdown';
import ThemeBtn from '../../../buttons/themeBtn';
import { useAdminOrderContext } from '../../../../context/adminOrder';
import _ from 'lodash';

function OptionSection({ title, options, property }) {
    const { setFilterList, filterList, status } = useAdminOrderContext();
    return (
        <div className="dispatch-by-date mt-12 flex flex-col gap-y-2">
            <p className="text-base font-semibold">{title}</p>
            {options.map((item) => {
                const lowerCaseItem = item.toLowerCase().replaceAll(' ', '_');
                return (
                    <div
                        key={item}
                        className="flex flex-row flex-nowrap gap-x-2"
                        onClick={() => {
                            setFilterList((prevState) => ({
                                ...prevState,
                                [status]: {
                                    ...prevState?.[status],
                                    [property]: lowerCaseItem,
                                },
                            }));
                        }}
                    >
                        <input
                            readOnly
                            checked={
                                _.get(filterList, [status, property]) ==
                                lowerCaseItem
                            }
                            type="radio"
                            name="dispatch-by-date"
                            className="daisy-radio daisy-radio-sm cursor-pointer"
                        />
                        <p className="cursor-pointer">{item}</p>
                    </div>
                );
            })}
        </div>
    );
}
function Label({ option }) {
    return (
        <label
            className={` flex w-full items-center gap-1  whitespace-nowrap text-s`}
            tabIndex="0"
        >
            <span className="font-semibold">Sort by</span>
            <span>{option}</span>
            <ArrowDropDownSharpIcon />
        </label>
    );
}
function SideContainer({}) {
    const [show, setShow] = useState(false);
    const { setFilterList, filterList, status, defaultFilterList } =
        useAdminOrderContext();
    const [orderDetail, setOrderDetail] = useState({
        'Has note from buyer': null,
        'Mark as gift': null,
    });
    const optionsArray = [
        'Dispatch by date',
        'Destination',
        'Newest',
        'Oldest',
    ];

    const handleClick = (item) => {
        // setOption(() => item);
        setFilterList((prevState) => ({
            ...prevState,
            [status]: { ...prevState?.[status], sort_by: item },
        }));
        setShow(() => false);
    };

    const reset = () => {
        setFilterList((prevState) => ({
            ...prevState,
            [status]: { ...defaultFilterList?.[status] },
        }));
        setOrderDetail(() => ({
            'Has note from buyer': null,
            'Mark as gift': null,
        }));
        // setOption(() => 'Dispatch by date');
    };

    return (
        <section className="side-container relative mt-4 flex flex-1 flex-col justify-start gap-5">
            <div className=" absolute top-0 z-[1] h-fit rounded-full bg-white">
                <ThemeDropDown
                    {...{
                        defaultIcon: (
                            <ThemeBtn
                                isDisableHoverEffect={show}
                                className={'z-[3] px-3 py-1.5'}
                                bg={`bg-transparent  ${!show ? 'border-2 border-black' : ''}`}
                                handleClick={() =>
                                    setShow((prevState) => !prevState)
                                }
                            >
                                <Label
                                    option={_.upperFirst(
                                        _.get(filterList, [status, 'sort_by'])
                                    )}
                                />
                            </ThemeBtn>
                        ),
                        // showIcon: ( <div className='px-4'><Label option={option} /></div>),

                        show,
                        setShow,
                    }}
                >
                    <div className="pt-8">
                        {optionsArray.map((option, idx) => {
                            const lowerCaseOption = option.toLowerCase();
                            const getSortBy = _.get(filterList, [
                                status,
                                'sort_by',
                            ]);
                            return (
                                <span
                                    // key={`${item}-${idx}`}
                                    className={` item-center flex cursor-pointer gap-x-2 whitespace-nowrap py-2 pl-4 pr-8 ${
                                        getSortBy == lowerCaseOption
                                            ? 'bg-light-grey/50'
                                            : ''
                                    }  hover:bg-light-grey ${
                                        idx == optionsArray.length - 1
                                            ? 'rounded-b-lg'
                                            : ''
                                    }`}
                                    onClick={() => handleClick(lowerCaseOption)}
                                >
                                    {option}
                                    {lowerCaseOption == getSortBy && (
                                        <CheckRoundedIcon className="self-center !text-base" />
                                    )}
                                </span>
                            );
                        })}
                    </div>
                </ThemeDropDown>
            </div>
            {status == 'new' ? (
                <OptionSection
                    property={'by_date'}
                    options={[
                        'All',
                        'Overdue',
                        'Today',
                        'Tomorrow',
                        'Within a week',
                        'No estimate',
                    ]}
                    title={'Dispatch by date'}
                />
            ) : (
                <OptionSection
                    property={'completed_status'}
                    options={[
                        'All',
                        'Processing',
                        'Shipped',
                        'Delivered',
                        'Cancelled',
                    ]}
                    title={'Completed Status'}
                />
            )}

            <div className="destination flex flex-col gap-y-2">
                <p className="text-base font-semibold">Destination</p>
                {[
                    { text: 'All', value: 'all' },
                    { text: 'United Kingdom', value: 'GB' },
                    { text: 'United States', value: 'US' },
                    { text: 'Everywhere else', value: 'everywhere_else' },
                ].map(({ text, value }) => {
                    return (
                        <div
                            key={text}
                            className="flex flex-row flex-nowrap gap-x-2"
                            onClick={() => {
                                setFilterList((prevState) => ({
                                    ...prevState,
                                    [status]: {
                                        ...prevState?.[status],
                                        destination: value,
                                    },
                                }));
                            }}
                        >
                            <input
                                readOnly
                                checked={
                                    _.get(filterList, [
                                        status,
                                        'destination',
                                    ]) == value
                                }
                                type="radio"
                                name="destination"
                                className="daisy-radio daisy-radio-sm cursor-pointer"
                            />
                            <p className="cursor-pointer">{text}</p>
                        </div>
                    );
                })}
            </div>

            <div className="destination flex flex-col gap-y-2">
                <p className="text-base font-semibold">Order details</p>
                {['Has note from buyer', 'Mark as gift'].map((item) => {
                    const lowerCaseItem = item
                        .toLowerCase()
                        .replaceAll(' ', '_');
                    return (
                        <div
                            key={item}
                            className="flex flex-row flex-nowrap gap-x-2"
                            onClick={() => {
                                setFilterList((prevState) => ({
                                    ...prevState,
                                    [status]: {
                                        ...prevState?.[status],
                                        [lowerCaseItem]: !_.get(prevState, [
                                            status,
                                            lowerCaseItem,
                                        ]),
                                    },
                                }));
                            }}
                        >
                            <input
                                readOnly
                                checked={_.get(filterList, [
                                    status,
                                    lowerCaseItem,
                                ])}
                                type="checkbox"
                                name="order-detail"
                                className="daisy-checkbox daisy-checkbox-sm cursor-pointer !rounded-sm"
                            />
                            <p className="cursor-pointer">{item}</p>
                        </div>
                    );
                })}
            </div>

            <ThemeBtn
                bg={'bg-light-grey'}
                className={'px-3 py-2'}
                handleClick={reset}
            >
                <p className="text-sm font-medium">Reset filters</p>
            </ThemeBtn>
            {/* <button
                onClick={reset}
                type="button"
                className="w-fit rounded-full bg-light-grey px-4 py-2 text-s font-semibold text-gray-700 transition-all hover:scale-x-105 hover:bg-dark-gray/50 hover:!shadow-my-shadow "
            >
                Reset filters
            </button> */}
        </section>
    );
}

export default SideContainer;
