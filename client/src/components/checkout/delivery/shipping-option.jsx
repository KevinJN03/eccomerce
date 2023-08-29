
function Shipping_Option({}){
  return (
    <div className='shipping_option'>
      <p className="font-semibold">FREE</p>
      <div className="shipping-option-detail">
        <p className="font-semibold text-sm">
        Standard Delivery:
        </p>
        <p>Delivered on or before Friday, 1 September, 2023</p>

      </div>
      <input type="radio" name="delivery"></input>
    </div>
  )
};

export default Shipping_Option
