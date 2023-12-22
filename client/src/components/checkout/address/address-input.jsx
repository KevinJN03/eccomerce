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
            <label
                className="mb-2 text-sm font-bold text-gray-400"
                htmlFor={newLabel}
            >
                {label} :
            </label>
            <input
                className="mb-4 h-11 border-[1px] border-primary px-3 placeholder:text-sm"
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
