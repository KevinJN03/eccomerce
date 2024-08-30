const Input = ({ check, setCheck, text, property }) => {
    return (
        <div className="flex flex-row gap-x-2">
            <input
                type="checkbox"
                checked={check[property]}
                onChange={() =>
                    setCheck((prevState) => ({
                        ...prevState,
                        [property]: !prevState[property],
                    }))
                }
                className="!!rounded-none  daisy-checkbox border-[1px] border-black"
            />
            <p className="text-sm">{text}</p>
        </div>
    );
};

export default Input;
