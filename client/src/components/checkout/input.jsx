function Input({ header, button_text }) {
    return (
        <>
            <label htmlFor="promo" className="font-bold tracking-wide">
                {header}
            </label>
            <span>
                <input type="text" id="promo"></input>
                <button
                    type="button"
                    className="font-gotham font-bold tracking-wider text-white"
                >
                    {button_text}
                </button>
            </span>
        </>
    );
}

export default Input;
