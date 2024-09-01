import { IconButton, Modal } from '@mui/material';
import BoxWithProps from '../../common/BoxwithProps';
import { DateCalendar, PickersDay } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import OptionError from '../components/product/new product/variation/error/optionError';
import { useSalesDiscountContext } from '../../../context/SalesDiscountContext';
import _ from 'lodash';
const dateFormat = 'DD/MM/YYYY';
function CustomDateRange({}) {
    const { showCustomPicker, setShowCustomPicker, setOption } =
        useSalesDiscountContext();
    const [dates, setDates] = useState({
        start_date: '',
        end_date: '',
    });
    const [selected, setSelected] = useState('start_date');
    const [error, setError] = useState({ start_date: '', end_date: '' });
    const [dateValue, setDateValue] = useState(null);

    const CustomPickersDay = styled(PickersDay, {
        shouldForwardProp: (prop) =>
            prop !== 'isInRange' && prop !== 'isStart' && prop !== 'isEnd',
    })(({ theme, isInRange, isStart, isEnd }) => ({
        borderRadius: 0,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
        },

        ...(isInRange && {
            backgroundColor: alpha(theme.palette.primary.main, 0.3),

            color: theme.palette.common.black,
            borderRadius: 0,
        }),
        ...(isStart && {
            backgroundColor: alpha(theme.palette.primary.main, 0.3),
            color: theme.palette.common.black,
            // borderTopLeftRadius: '50%',
            // borderBottomLeftRadius: '50%',
            // borderTopRightRadius: '0%',
            // borderBottomRightRadius: '0%',
        }),
        ...(isEnd && {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            // borderTopRightRadius: '40%',
            // borderBottomRightRadius: '40%',
            // borderTopLeftRadius: '0%',
            // borderBottomLeftRadius: '0%',
        }),
    }));
    const handleDaySelect = (date) => {
        setDateValue(() => date);
        const notSelected =
            selected == 'start_date' ? 'end_date' : 'start_date';
        const isAfter =
            selected == 'start_date' &&
            date.isAfter(dayjs(dates?.end_date, dateFormat));
        const isBefore =
            selected == 'end_date' &&
            date.isBefore(dayjs(dates?.start_date, dateFormat));

        const isSame = date.isSame(dayjs(dates[notSelected], dateFormat));

        const newDates = { ...dates };
        const newErrors = { ...error };

        if (isBefore || isAfter || isSame) {
            if (isBefore) {
                newDates[selected] = date.format(dateFormat);
                newDates[notSelected] = date
                    .subtract(1, 'day')
                    .format(dateFormat);

                _.unset(newErrors, selected);
            } else if (isAfter || isSame) {
                const tomorrowDate = date.add(1, 'day');

                const isTomorrowGreater = tomorrowDate.isAfter(dayjs());
                newDates[selected] = isTomorrowGreater
                    ? date.subtract(1, 'day').format(dateFormat)
                    : date.format(dateFormat);

                newDates[notSelected] = isTomorrowGreater
                    ? date.format(dateFormat)
                    : date.add(1, 'day').format(dateFormat);
            }

            _.assign(newErrors, {});
        } else {
            newDates[selected] = date.format(dateFormat);
            _.unset(newErrors, selected);
        }

        if (selected == 'start_date') {
            setSelected(() => 'end_date');
        }
        setDates(() => newDates);
        setError(() => newErrors);
    };

    const renderDay = (date, selectedDates, pickersDayProps) => {
        const { start_date, end_date } = dates;
        const dayjsStartDate = dayjs(start_date, dateFormat);
        const dayjsEndDate = dayjs(end_date, dateFormat);

        const { day } = date;
        const isAfterToday = day.isAfter(dayjs());
        const isInRange =
            day.isAfter(dayjsStartDate) &&
            day.isBefore(dayjsEndDate) &&
            !isAfterToday;
        const isStart =
            (start_date && day.isSame(dayjsStartDate, 'date')) || false;
        const isEnd = (end_date && day.isSame(dayjsEndDate, 'date')) || false;
        return (
            <div key={day.toISOString()}>
                <CustomPickersDay
                    {...date}
                    isInRange={isInRange}
                    isStart={isStart}
                    isEnd={isEnd}
                >
                    {day.get('date')}
                </CustomPickersDay>
            </div>
        );
    };
    const handleOnchange = (e, value) => {
        try {
            let newErrors = { ...error };
            const today = dayjs();
            const valueToDate = dayjs(e.target.value, dateFormat, true);
            const isValid = valueToDate.isValid();

            setDates((prevState) => ({
                ...prevState,
                [value]: e.target.value,
            }));

            if (!isValid) {
                newErrors[selected] = `Date format must be ${dateFormat}`;
            } else if (valueToDate.isAfter(today)) {
                newErrors[selected] =
                    `${_.upperFirst(selected).replace(/_/g, ' ')} must be on or before ${today.format(dateFormat)}`;
            } else {
                _.unset(newErrors, selected);
            }

            if (
                (selected == 'start_date' &&
                    valueToDate.isAfter(dayjs(dates.end_date, dateFormat))) ||
                (selected == 'end_date' &&
                    valueToDate.isBefore(dayjs(dates.start_date, dateFormat)))
            ) {
                newErrors['both'] =
                    'End date must be at least 1 day after start date';
            } else {
                _.unset(newErrors, 'both');
            }

            setError(() => newErrors);
            console.log({ newErrors });
        } catch (error) {
            console.error(error.message, error);
        }
    };
    return (
        <Modal open={showCustomPicker}>
            <BoxWithProps
                customSx={{
                    top: '5%',
                    left: '50%',

                    transform: 'translate(-50%, -0%)',
                    backgroundColor: 'white',
                    // padding: '2rem',
                    borderRadius: '0.2rem',
                    maxWidth: '35rem',
                    width: '100%',
                    // maxWidth:
                    //     modalView == 4 ? '37.5rem' : '80vw',
                    // height: '100%',
                    // minHeight: '100vh',
                }}
            >
                <section>
                    <header className="border-b border-b-dark-gray/30">
                        <p className="px-4 py-2 text-sm font-medium">
                            Pick your date range
                        </p>
                    </header>

                    <body className="px-14 py-4">
                        <div className="top flex flex-row flex-nowrap justify-between gap-5">
                            {[
                                {
                                    value: 'start_date',
                                    text: 'From',
                                },
                                {
                                    value: 'end_date',
                                    text: 'To',
                                },
                            ].map(({ value, text }) => {
                                return (
                                    <label
                                        key={`custom-picker-input-${value}`}
                                        className="daisy-form-control w-full max-w-xs"
                                    >
                                        <div className="daisy-label !pb-1">
                                            <span className="daisy-label-text font-medium">
                                                {text}:
                                            </span>
                                        </div>
                                        <input
                                            onClick={() => {
                                                setSelected(() => value);
                                            }}
                                            onChange={(e) =>
                                                handleOnchange(e, value)
                                            }
                                            value={dates[value]}
                                            type="text"
                                            placeholder={dateFormat}
                                            className="input-bordered input w-full max-w-xs"
                                        />
                                        {error?.[value] && (
                                            <div className="daisy-label !p-0 !pt-1">
                                                <span className="daisy-label-text font-medium">
                                                    <OptionError
                                                        msg={error[value]}
                                                        className={
                                                            '!items-start !gap-2 !p-0 !text-xs'
                                                        }
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    </label>
                                );
                            })}
                        </div>
                        {error?.both && (
                            <p className="pb-0 pt-4 text-red-800">
                                {error.both}
                            </p>
                        )}

                        <div className="bottom mt-6 w-full rounded-sm border border-dark-gray">
                            <DateCalendar
                                // readOnly
                                views={['year', 'month', 'day']}
                                onChange={handleDaySelect}
                                value={dateValue}
                                // renderDay={renderDay}
                                slots={{
                                    day: renderDay,
                                    nextIconButton: (props) => {
                                        return (
                                            <IconButton
                                                type="button"
                                                {...props}
                                                className="disabled:!opacity-40"
                                            />
                                        );
                                    },
                                }}
                                showDaysOutsideCurrentMonth
                                maxDate={dayjs()}
                                sx={{
                                    width: '100%',
                                    maxWidth: '100%',
                                    // border: '2px solid red',
                                    '& .MuiPickersDay-today': {
                                        border: '0px',
                                        fontWeight: 600,
                                    },
                                }}
                                slotProps={{
                                    day: {
                                        sx: {
                                            fontSize: '0.8rem',
                                            // border: '2px solid black',

                                            width: '100%',
                                            margin: '0px',

                                            // borderRadius: '0px'
                                        },
                                    },
                                }}
                            />
                        </div>
                    </body>
                    <footer className="mt-4 flex flex-nowrap justify-end gap-3 border-t border-dark-gray/40 p-4">
                        <button
                            onClick={() => setShowCustomPicker(() => false)}
                            type="button"
                            className="cursor-pointer rounded-md border px-4 py-2 text-sm font-medium transition-all hover:bg-light-grey"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            disabled={!_.isEmpty(error)}
                            onClick={() => {
                                setOption(() => ({
                                    value: 'custom',
                                    start_date: dayjs(
                                        dates.start_date,
                                        dateFormat
                                    ).toISOString(),
                                    end_date: dayjs(
                                        dates.end_date,
                                        dateFormat
                                    ).toISOString(),
                                }));

                                setShowCustomPicker(() => false);
                            }}
                            className="cursor-pointer rounded-md border bg-black px-4 py-2 text-sm font-medium text-white transition-all disabled:bg-black/40"
                        >
                            Apply
                        </button>
                    </footer>
                </section>
            </BoxWithProps>
        </Modal>
    );
}

export default CustomDateRange;
