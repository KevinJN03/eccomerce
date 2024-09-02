import dayjs from 'dayjs';
import { dateFormat } from '../../../../context/SalesDiscountContext';
import _ from 'lodash';

export class CodeBase {
    constructor({ code, offer_type, start_date, end_date, active, timestamp }) {
        this.code = code;
        this.offer_type = offer_type;
        this.start_date = start_date;
        this.end_date = end_date;
        this.active = active;
        this.timestamp = timestamp;
    }

    get isActive() {
        // try using end date to find if active like ingenerate date period
        if (this.start_date) {
            return dayjs.unix(this.start_date).diff(dayjs(), 'minute') <= 0;
        } else {
            return dayjs(this.timestamp).diff(dayjs(), 'minute') <= 0;
        }
    }

    get isExpired() {
        return !this.end_date
            ? false
            : dayjs.unix(this.end_date).diff(dayjs(), 'minute') <= 0;
    }

    get generatePromoDuration() {
        const formatDate = (date, additionalFormat = '') => {
            return dayjs.unix(date).format(`${dateFormat} ${additionalFormat}`);
        };

        if (this.isExpired) {
            return `Duration: ${formatDate(this.start_date || dayjs(this.timestamp).unix(), 'HH:mm')} - ${formatDate(this.end_date, 'HH:mm')}`;
        }

        if (!this.active) {
            return `Ended on: ${formatDate(this.end_date)}`;
        } else {
            return `Starts on: ${formatDate(this?.start_date || dayjs(this.timestamp).unix())}`;
        }
    }

    get generateDatePeriod() {
        const array = [
            'year',
            'month',
            'week',
            'day',
            'hour',
            'minute',
            'second',
            'millisecond',
        ];

        const today = dayjs();
        let isActive = this.active;

        const findDurationValue = (value = 0) => {
            const endPeriod = dayjs();
            const startPeriod = this?.start_date
                ? dayjs.unix(this.start_date)
                : dayjs(this.timestamp);

            // decide a start period and an end period, based on that calculate the difference in minute
            // if in future, set the value as 0 days
            // if end_date is past from today, calculate period from start to end
            // if end_date is in future, calculate from today;

            if (this.end_date) {
                const endDateDayjs = dayjs.unix(this.end_date);
                const endDateFromNow = endDateDayjs.diff(today, 'minute');
                const endDiffFromStart = endDateDayjs.diff(
                    startPeriod,
                    'minute'
                );

                // if (endDiffFromStart <= 0) {
                //     //end on end_date
                //     return `0 Days`;
                // }

                if (endDateFromNow <= 0) {
                    isActive = false;
                    _.assign(endPeriod, endDateDayjs);
                } else {
                    _.assign(endPeriod, endDateDayjs);
                }

                // else {
                //     endPeriod = today;
                // }
            }

            const diffFromPeriod = startPeriod.diff(endPeriod, array[value]);

            if (value == array.length - 1) {
                console.log({ value, length: array.length });
                return {
                    text: 'failed',
                    dateText: 'failed',
                };
            }

            if (diffFromPeriod < 0) {
                const positiveValue = Math.abs(diffFromPeriod);
                return {
                    text: `${positiveValue} ${_.upperFirst(array[value])}${positiveValue > 1 ? 's' : ''}`,
                    dateText: `${startPeriod.format(`${dateFormat} HH:mm`)}—${
                        !this.end_date
                            ? 'no end date'
                            : endPeriod.format(dateFormat + ' HH:mm')
                    }`,
                    isActive,
                };
            } else if (diffFromPeriod > 0) {
                // 0 days
                return {
                    isActive,
                    text: `0 Days`,
                    dateText: (this.active ? startPeriod : endPeriod).format(
                        `[${this.active ? 'Starts on' : 'Ended on'}] ${dateFormat}`
                    ),
                };
            } else {
                // return `${diffFromPeriod}`;
                return findDurationValue(value + 1);
            }
        };

        return findDurationValue();
    }
}
