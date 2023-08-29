function Address_Input({label}){
    return(
        <div id="address-form-input" className="flex flex-col">
            <label className="font-bold mb-3" htmlFor={label.replace(" ", "-").toLowerCase().trim()}>
                {label}
            </label>
            <input className="border-2 h-14 mb-4  px-3" id={label.replace(" ", "-").toLowerCase().trim()}/>
        </div>
    )
}

export default Address_Input