function Payment_Btn({
    onClick,
    button_text,
    button_img,
    additional_text,
    disable,
}) {
    return (
        <button type="button" className="payment-btn" disabled={disable}>
            <img
                loading="lazy"
                src={button_img}
                className="h-8 w-12 object-contain"
            />
            <aside>
                <h2 className="font-semibold tracking-wider">{button_text}</h2>
                {additional_text ? <p>{additional_text}</p> : null}
            </aside>
        </button>
    );
}

export default Payment_Btn;
