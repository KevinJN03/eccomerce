function Input({ label, id, children }) {
    return (
        <form className="mt-6 flex flex-col">
            <label htmlFor={`#${id}`} className="text-lg font-medium">
                {label}
                <span className="asterisk">*</span>
            </label>
            {
                children
            }
           
        </form>
    );
}

export default Input;
