function Payment_Btn({
    onClick,
    button_text,
    button_img,
    additional_text,
    disable,
    handleClick,
    view
}) {
    return (
        <button type="button" className="payment-btn" disabled={disable} onClick={handleClick}>
            <img
                loading="lazy"
                src={button_img}
                className={`h-6 w-9 object-cover ${view == 'paypal' ? 'border-[1px] rounded-none' : ''}`}
            />
            <aside>
                <h2 className="font-semibold font-gotham tracking-wider text-sm">{button_text}</h2>
                {additional_text ? <p>{additional_text}</p> : null}
            </aside>
        </button>
    );
}

export default Payment_Btn;
