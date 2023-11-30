function Payment_Btn({
    onClick,
    button_text,
    button_img,
    additional_text,
    disable,
    handleClick,
    view,
    className,
    disableMsg,
}) {
    return (
        <div className="mb-4">
            <button
                type="button"
                className={`${className || ''} payment-btn disabled:opacity-60`}
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
            {disable && disableMsg && <p  className="bg-red-100 p-2">{disableMsg}</p>}
        </div>
    );
}

export default Payment_Btn;
