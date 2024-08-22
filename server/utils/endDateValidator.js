import dayjs from 'dayjs';
import { check } from 'express-validator';

const endDateValidator = () => {
  return check('end_date', 'Select a date')
    .escape()
    .trim()
    .custom((value, { req }) => {
      const { start_date, no_end_date, end_date } = req.body;
      const dateDiffToday = dayjs.unix(value).diff(dayjs(), 'day');
      const dateDiffPeriod = dayjs
        .unix(value)
        .diff(dayjs.unix(start_date), 'day');

      console.log({ dateDiffToday, dateDiffPeriod, start_date, no_end_date });
      if (no_end_date) {
        return true;
      }

      if (no_end_date == false && !end_date) {
        throw new Error(`Select a date`);
      }

      if (dateDiffToday < 0) {
        throw new Error('Must not be in the past');
      } else if (dateDiffPeriod < 0) {
        throw new Error('Must be after start date');
      }

      return value;
    });
};

export default endDateValidator;
