import { CodeBase } from './codeBase';

export default class GiftCard extends CodeBase {
    constructor(props) {
        super(props);
        this.code = props.redacted_code;
    }

    get currentState() {
        return !this.isActive || this.isExpired ? 'Ended' : 'Active';
    }
}
