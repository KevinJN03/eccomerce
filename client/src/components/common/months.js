import dayjs from 'dayjs';

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
].map((month, idx) => ({ month, num: idx + 1 }));

const get6MonthFromToday = (todaysMonth) => {
    let monthsArray;
    const sixMonthsFromToday = todaysMonth - 6;
    if (sixMonthsFromToday < 1) {
        monthsArray = months
            .slice(12 + sixMonthsFromToday)
            .concat(months.slice(0, todaysMonth));
    } else {
        monthsArray = months.slice(todaysMonth - 6, todaysMonth);
    }

    return monthsArray;
};

const get6MonthsData = (data) => {
    const todaysMonth = dayjs().month();
    const monthsArray = get6MonthFromToday(todaysMonth + 1);
    let counter = 0;
    let pointer = null;
    if (data.length > 0) {
        pointer = data[0]?._id;
    }
    let newData = monthsArray.map(({ month, num }, idx) => {
        let total = 0;
        let numOfOrders = 0;
        if (num == pointer) {
            total = data[counter]?.total;
            numOfOrders = data[counter]?.numOfOrders;
            if (data?.[counter + 1]) {
                pointer = data?.[counter + 1]?._id;
                counter++;
            }
        }
        return {
            month: month,
            total,
            numOfOrders,
        };
    });

    return newData;
};

export { get6MonthFromToday, months, get6MonthsData };
