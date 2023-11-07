import Shipping_Option from './shipping-option';

function Delivery(props) {
    return (
        <section id="delivery">
            <h1 className="checkout-title delivery-mb">DELIVERY OPTIONS</h1>
            <Shipping_Option {...props} />
        </section>
    );
}

export default Delivery;
