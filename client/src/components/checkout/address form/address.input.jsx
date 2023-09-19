function Address_Input({ label, defaultValue, placeHolder }) {
    const newLabel = label.replaceAll(' ', '-').toLowerCase().trim();
    return (
        <div id="address-form-input" className="flex flex-col">
            <label className="mb-3 font-bold" htmlFor={newLabel}>
                {label} :
            </label>
            <input
                className="mb-4 h-14 border-2  px-3"
                id={newLabel}
                defaultValue={defaultValue}
                placeholder={placeHolder}
                
            />
        </div>
    );
}

export default Address_Input;
