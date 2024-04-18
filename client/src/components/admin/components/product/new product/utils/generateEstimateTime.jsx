import dayjs from 'dayjs';
import _ from 'lodash';
function generateEstimatedTime({ delivery, shipping }) {
    const timeObj = {
        start: dayjs().date(),
        end: 0,
    };
    const generateValue = ({ field }) => {
        // adding processing time together with shipping time to calculate estimated delivery time frame.
        [_.get(delivery, `processing_time`), shipping].forEach((prop) => {
            if (prop?.type == 'weeks') {
                timeObj[field] += _.get(prop, field) * 7;
            } else if (_.get(prop, `type`) == 'days') {
                timeObj[field] += _.get(prop, field);
            }
        });
    };

    generateValue({
        field: 'end',
    });
    generateValue({
        field: 'start',
    });
    return dayjs()
        .add(timeObj.end, 'day')
        .format(`${timeObj.start}-D MMM`)
        .toString();
}

export default generateEstimatedTime;
