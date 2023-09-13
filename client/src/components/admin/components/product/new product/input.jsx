function Input({ label, id, className, defaultValue }) {
    return (
        <form className="mt-6 flex flex-col">
            <label htmlFor={`#${id}`} className="text-lg font-medium">
                {label}
                <span className="asterisk">*</span>
            </label>
            <input
                type="text"
                id={id}
                defaultValue={defaultValue && defaultValue}
                className={className}
            />
        </form>
    );
}

export default Input;
