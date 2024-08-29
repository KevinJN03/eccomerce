/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-expressions

import dayjs from 'dayjs';

const generateDateRange = (props) => {
  const { value, converter } = props;
  const startOfToday = dayjs().startOf('day');
  const end_date = dayjs().endOf('day')[converter]();

  const dateRanges = {
    today: {
      start_date: startOfToday[converter](),
      end_date,
    },
    yesterday: {
      start_date: startOfToday.subtract(1, 'day')[converter](),
      end_date: startOfToday.subtract(1, 'day').endOf('day')[converter](),
    },
    last_7_days: {
      start_date: startOfToday.subtract(7, 'day')[converter](),
      end_date,
    },
    last_30_days: {
      start_date: startOfToday.subtract(30, 'day')[converter](),
      end_date,
    },
    this_month: {
      start_date: dayjs().startOf('month')[converter](),
      end_date,
    },
    last_month: {
      start_date: dayjs().subtract(1, 'month').startOf('month')[converter](),
      end_date: dayjs().subtract(1, 'month').endOf('month')[converter](),
    },
    this_year: {
      start_date: dayjs().startOf('year')[converter](),
      end_date,
    },
    last_year: {
      start_date: dayjs().subtract(1, 'year').startOf('year')[converter](),
      end_date: dayjs().subtract(1, 'year').endOf('year')[converter](),
    },
    last_12_months: {
      start_date: dayjs().subtract(12, 'month').startOf('month')[converter](),
      end_date,
    },
    all_time: {
      start_date: dayjs('01/01/2022', 'DD/MM/YYYY')[converter](),
      end_date,
    },
  };

  if (value === 'custom') {
    dateRanges.custom = {
      start_date: dayjs(props?.start_date, 'DD/MM/YYYY')[converter](),
      end_date: dayjs(props?.end_date, 'DD/MM/YYYY')[converter](),
    };
  }

  return dateRanges[value];
};
export default generateDateRange;
