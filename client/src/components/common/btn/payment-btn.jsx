function Payment_Btn({
    onClick,
    button_text,
    button_img,
    additional_text,
    disable,
    handleClick,
    view,
    className,
}) {
    return (
        <button
            type="button"
            className={`${className || ''} payment-btn`}
            disabled={disable}
            onClick={handleClick}
        >
            <img
                loading="lazy"
                src={button_img}
                className={`h-6 w-9 object-cover ${
                    view == 'paypal' ? 'rounded-none border-[1px]' : ''
                }`}
            />
            <aside>
                <h2 className="font-gotham text-sm font-semibold tracking-wider">
                    {button_text}
                </h2>
                {additional_text ? <p>{additional_text}</p> : null}
            </aside>
        </button>
    );
}

export default Payment_Btn;
