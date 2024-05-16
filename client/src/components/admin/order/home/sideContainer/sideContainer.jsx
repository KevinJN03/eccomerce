import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import { useState } from 'react';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

import { ThemeDropDown } from '../../../../common/dropdown/seamlessDropdown';
import ThemeBtn from '../../../../buttons/themeBtn';
import { useAdminOrderContext } from '../../../../../context/adminOrderContext';
import _ from 'lodash';
import { getName } from 'country-list';
import { v4 } from 'uuid';
import OptionSection from './OptionSection';

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
    const {
        setFilterList,
        filterList,
        status,
        defaultFilterList,
        setLoading,
        searchParams,
        setSearchParams,
    } = useAdminOrderContext();

    const optionsArray = [
        'Dispatch by date',
        'Destination',
        'Newest',
        'Oldest',
    ];

    const handleClick = (item) => {
        // setOption(() => item);
        searchParams.set('sort_by', item);
        setSearchParams(searchParams);

        setFilterList((prevState) => ({
            ...prevState,
            [status]: { ...prevState?.[status], sort_by: item },
        }));
        setShow(() => false);
    };

    const reset = () => {
        if (!_.isEqual(filterList[status], defaultFilterList[status])) {
            setFilterList((prevState) => ({
                ...prevState,
                [status]: { ...defaultFilterList?.[status] },
            }));
        }
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

            <div className="mt-12">
                {status == 'new' ? (
                    <OptionSection
                        property={'by_date'}
                        options={[
                            'All',
                            'Overdue',
                            'Today',
                            'Tomorrow',
                            'Within a week',
                        ]}
                        title={'Dispatch by date'}
                    />
                ) : (
                    <OptionSection
                        key={'dttfyguhijok'}
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
            </div>

            <OptionSection
                property={'destination'}
                options={[
                    'All',
                    'GB',
                    'US',
                    'everywhere_else',
                    // { text: 'All', value: 'all' },
                    // { text: 'United Kingdom', value: 'GB' },
                    // { text: 'United States', value: 'US' },
                    // { text: 'Everywhere else', value: 'everywhere_else' },
                ]}
                title={'Destination'}
            />
            {/* <div className="destination flex flex-col gap-y-2">
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
                                setLoading(() => true);
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
            </div> */}

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
                                setLoading(() => true);
                                searchParams.set(
                                    lowerCaseItem,
                                    !_.get(filterList, [status, lowerCaseItem])
                                );
                                setSearchParams(searchParams)
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
                <p className="px-1 text-s font-medium">Reset filters</p>
            </ThemeBtn>
        </section>
    );
}

export default SideContainer;
