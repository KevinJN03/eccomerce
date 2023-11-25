function Payment_Btn({
    onClick,
    button_text,
    button_img,
    additional_text,
    disable,
    handleClick
}) {
    return (
        <button type="button" className="payment-btn" disabled={disable} onClick={handleClick}>
            <img
                loading="lazy"
                src={button_img}
                className="h-6 w-8 object-contain"
            />
            <aside>
                <h2 className="font-semibold font-gotham tracking-wider text-sm">{button_text}</h2>
                {additional_text ? <p>{additional_text}</p> : null}
            </aside>
        </button>
    );
}

export default Payment_Btn;
