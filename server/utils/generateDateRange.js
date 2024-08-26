/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-expressions

import dayjs from 'dayjs';

const generateDateRange = () => {
  const startOfToday = dayjs().startOf('day');
  const end_date = dayjs().endOf('day').toDate();

  return {
    today: {
      start_date: startOfToday.toDate(),
      end_date,
    },
    yesterday: {
      start_date: startOfToday.subtract(1, 'day').toDate(),
      end_date: startOfToday.subtract(1, 'day').endOf('day').toDate(),
    },
    last_7_days: {
      start_date: startOfToday.subtract(7, 'day').toDate(),
      end_date,
    },
    last_30_days: {
      start_date: startOfToday.subtract(30, 'day').toDate(),
      end_date,
    },
    this_month: {
      start_date: dayjs().startOf('month').toDate(),
      end_date,
    },
    last_month: {
      start_date: dayjs().subtract(1, 'month').startOf('month').toDate(),
      end_date: dayjs().subtract(1, 'month').endOf('month').toDate(),
    },
    this_year: {
      start_date: dayjs().startOf('year').toDate(),
      end_date,
    },
    last_year: {
      start_date: dayjs().subtract(1, 'year').startOf('year').toDate(),
      end_date: dayjs().subtract(1, 'year').endOf('year').toDate(),
    },
    last_12_months: {
      start_date: dayjs().subtract(12, 'month').startOf('month').toDate(),
      end_date,
    },
    all_time: { start_date: '' },
    custom: { start_date: '' },
  };
};
export default generateDateRange;
