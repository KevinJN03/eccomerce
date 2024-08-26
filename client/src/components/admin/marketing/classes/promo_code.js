import dayjs from 'dayjs';
import { dateFormat } from '../../../../context/SalesDiscountContext';
import { CodeBase } from './codeBase';

export default class PromoCode extends CodeBase {
    constructor(props) {
        super(props);
    }

    // get isActive() {
    //     return dayjs.unix(this.start_date).diff(dayjs(), 'minute') <= 0;
    // }

    // get isExpired() {
    //     return !this.end_date
    //         ? false
    //         : dayjs.unix(this.end_date).diff(dayjs(), 'minute') <= 0;
    // }

    get currentState() {
        return !this.active || this.isExpired
            ? 'Ended'
            : this.isActive
              ? 'Active'
              : 'Scheduled';
    }
    // get generatePromoDuration() {
    //     debugger;
    //     const formatDate = (date, additionalFormat = '') => {
    //         return dayjs.unix(date).format(`${dateFormat} ${additionalFormat}`);
    //     };

    //     if (this.isExpired) {
    //         return `Duration: ${formatDate(this.start_date, 'HH:mm')} - ${formatDate(this.end_date, 'HH:mm')}`;
    //     }

    //     if (!this.active) {
    //         return `Ended on: ${formatDate(this.end_date)}`;
    //     } else {
    //         return `Starts on: ${formatDate(this.start_date)}`;
    //     }
    // }
    
}
