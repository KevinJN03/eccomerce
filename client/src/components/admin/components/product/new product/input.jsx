function Input({ label, id, className, defaultValue }) {
    return (
        <form className="flex flex-col mt-6">
            <label htmlFor={`#${id}`} className= "text-lg font-medium">
                {label}<span className="asterisk">*</span>
            </label>
            <input type="text" id={id} defaultValue={defaultValue && defaultValue} className={className}/>

            
        </form>
    );
}

export default Input;
