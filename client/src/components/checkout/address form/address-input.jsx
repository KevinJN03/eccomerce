function Address_Input({
    label,
    value,
    placeHolder,
    setValue,
    handleOnChange,
}) {
    const newLabel = label.replaceAll(' ', '-').toLowerCase().trim();
    return (
        <div id="address-form-input" className="flex flex-col">
            <label className="mb-3 font-bold" htmlFor={newLabel}>
                {label} :
            </label>
            <input
                className="mb-4 h-14 border-2  px-3"
                id={newLabel}
                value={value}
                placeholder={placeHolder}
                setValue={setValue}
                onChange={handleOnChange}
            />
        </div>
    );
}

export default Address_Input;
