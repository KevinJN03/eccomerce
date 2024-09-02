import dayjs from 'dayjs';

const sortCategory = [
    {
        text: 'this_month',
        start_date: dayjs().startOf('M').unix(),
        end_date: dayjs().unix(),
    },
    {
        text: 'last_3_months',
        start_date: dayjs().subtract(3, 'M').startOf('M').unix(),
        end_date: dayjs().subtract(1, 'M').endOf('M').unix(),
    },
    {
        text: 'last_6_months',
        start_date: dayjs().subtract(6, 'M').startOf('M').unix(),
        end_date: dayjs().subtract(1, 'M').endOf('M').unix(),
    },
    {
        text: 'last_12_months',
        start_date: dayjs().subtract(12, 'M').startOf('M').unix(),
        end_date: dayjs().subtract(1, 'M').endOf('M').unix(),
    },
    {
        text: 'all_this_year',
        start_date: dayjs().startOf('year').unix(),
        end_date: dayjs().unix(),
    },
    {
        text: 'all_last_year',
        start_date: dayjs().subtract(1, 'year').startOf('year').unix(),
        end_date: dayjs().subtract(1, 'year').endOf('year').unix(),
    },
];

export default sortCategory;
