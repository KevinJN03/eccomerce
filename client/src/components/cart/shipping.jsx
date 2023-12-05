import { useCart } from '../../context/cartContext';

function Shipping({ options }) {
    const { setDeliveryOption } = useCart();

    const handleOnChange = (e) => {
        setDeliveryOption(() => JSON.parse(e.target.value));
    };
    return (
        <span className="shipping">
            <select
                id="shipping"
                name="shipping"
                className="shipping-select"
                onChange={handleOnChange}
            >
                {options.map(({ name, cost, _id }) => {
                    return (
                        <option
                            key={_id}
                            value={JSON.stringify({ cost, name, id: _id })}
                        >
                            {name}
                        </option>
                    );
                })}
            </select>
        </span>
    );
}

export default Shipping;
