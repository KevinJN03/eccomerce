import paypal from '../../../../assets/icons/payment-icons/paypal.svg';
import ItemTemplate from './itemTemplate.jsx';
function PaypalItem({ method, handleClick }) {
    return (
        <ItemTemplate
            id={method?.id}
            icon={paypal}
            text={'PAYPAL'}
            isDefault={false}
            alt={'paypal logo'}
            handleClick={handleClick}
        />
    );
}

export default PaypalItem;
