function QTY_SIZE_OPTION({options,label}) {
    return (
        <span id="qty-size-option">
            <label htmlFor="qty-size-select">{label}</label>
            <select name="quantity-select" id="qty-size-select">

                {options.map((num) => {
                    return <option value={num}>{num}</option>;
                })}
            </select>
        </span>
    );
}

export default QTY_SIZE_OPTION;
