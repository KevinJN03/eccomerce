import { useCart } from '../../context/cartContext';

function Shipping({ options }) {
    const { setDeliveryOption, deliveryOption } = useCart();

    const handleOnChange = (e) => {
        console.log(e.target.options[e.target.options.selectedIndex].dataset);
        const { cost, name } =
            e.target.options[e.target.options.selectedIndex]?.dataset;
        setDeliveryOption(() => ({
            cost: parseFloat(cost),
            name,
            id: e.target.value,
        }));
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
                        selected={deliveryOption?.id == _id}
                            key={_id}
                            data-cost={cost}
                            data-name={name}
                            value={_id}
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
