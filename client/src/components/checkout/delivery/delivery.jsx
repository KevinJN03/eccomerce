import Shipping_Option from './shipping-option';

function Delivery({ disable }) {
    return (
        <section
            id="delivery"
            className={`${disable ? 'disable-component' : 'display-component'}`}
        >
            <h1 className="checkout-title delivery-mb">DELIVERY OPTIONS</h1>
            <Shipping_Option disable={disable} />
        </section>
    );
}

export default Delivery;
