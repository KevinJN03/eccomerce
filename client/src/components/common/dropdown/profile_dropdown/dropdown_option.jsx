function Dropdown_Option({ option }) {
    return (
        <span
            className="dropdown-item my-3 flex h-12 w-full flex-row  items-center justify-start gap-3 px-3"
            tabIndex="-1"
        >
            <img
                loading="lazy"
                src={option.src}
                className="h-full object-cover"
            />
            <p className="text-s">{option.text}</p>
        </span>
    );
}

export default Dropdown_Option;
