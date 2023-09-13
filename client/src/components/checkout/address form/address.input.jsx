function Address_Input({ label }) {
    return (
        <div id="address-form-input" className="flex flex-col">
            <label
                className="mb-3 font-bold"
                htmlFor={label.replace(' ', '-').toLowerCase().trim()}
            >
                {label}
            </label>
            <input
                className="mb-4 h-14 border-2  px-3"
                id={label.replace(' ', '-').toLowerCase().trim()}
            />
        </div>
    );
}

export default Address_Input;
