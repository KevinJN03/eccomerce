import Shipping_Option from "./shipping-option"

function Delivery({}){
  return (
    <section id='delivery'>
      <h1 className="checkout-title delivery-mb">
      DELIVERY OPTIONS
      </h1>
      <Shipping_Option/>
      <Shipping_Option/>
    </section>
  )
};

export default Delivery
