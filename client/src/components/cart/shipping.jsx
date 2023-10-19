function Shipping({}) {
    return (
        <span className="shipping">
            <select id='shipping' name="shipping" className="shipping-select">
                <option value="Standard Shipping">
                    Standard Shipping (Free)
                </option>
                <option value="Express Shipping">Express Shipping</option>
                <option value="Standard Shipping">Standard Shipping</option>
                <option value="Express Shipping">Express Shipping</option>
            </select>
        </span>
    );
}

export default Shipping;
