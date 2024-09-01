import dayjs from "dayjs";

const getMatchStage = ({ filter }) => {
  const matchArray = [];
  if (filter?.destination == 'EVERYWHERE_ELSE') {
    matchArray.push({
      'shipping_address.address.country': { $nin: ['GB', 'US'] },
    });
  } else if (filter?.destination != 'ALL') {
    matchArray.push({
      'shipping_address.address.country': { $eq: filter.destination },
    });
  }

  if (filter?.completed_status == 'all') {
    matchArray.push({ status: { $nin: ['received'] } });
  } else {
    matchArray.push({ status: { $in: [filter?.completed_status] } });
  }

  if (filter?.mark_as_gift) {
    matchArray.push({ mark_as_gift: { $eq: true } });
  }

  if (filter?.by_date == 'overdue') {
    matchArray.unshift({
      ship_date: { $lt: dayjs().startOf('day').toDate() },
    });
  } else if (filter?.by_date == 'today') {
    matchArray.unshift({
      ship_date: {
        $gt: dayjs().startOf('day').toDate(),
        $lt: dayjs().endOf('day').toDate(),
      },
    });
  } else if (filter?.by_date == 'tomorrow') {
    matchArray.unshift({
      ship_date: {
        $gt: dayjs().add(1, 'day').startOf('day').toDate(),
        $lt: dayjs().add(1, 'day').endOf('day').toDate(),
      },
    });
  } else if (filter?.by_date == 'within_a_week') {
    matchArray.unshift({
      ship_date: {
        $gt: dayjs().startOf('day').toDate(),
        $lt: dayjs().add(1, 'week').endOf('day').toDate(),
      },
    });
  }

  return matchArray;
};

export default getMatchStage;
