function Payment_Btn({ onClick, button_text, button_img, additional_text }) {
    return (
        <button type="button" className="payment-btn">
            <img src={button_img} className="w-12 h-8 object-contain"/>
            <aside>
                <h2 className="font-semibold tracking-wider">{button_text}</h2>
                {additional_text ? <p>{additional_text}</p> : null}
            </aside>
        </button>
    );
}

export default Payment_Btn;
