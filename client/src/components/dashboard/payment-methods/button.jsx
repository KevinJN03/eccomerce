function Button({ onClick, description, text, icon, alt }) {
    return (
        <button
            onClick={onClick}
            type="button"
            className="transistion-all relative mt-3 flex h-14 w-4/6 flex-row items-center justify-center gap-x-3 border-2 hover:bg-grey-100"
        >
            <img src={icon} alt={alt} className="absolute left-3 h-9 w-9" />
            <span className="flex flex-col justify-center">
                <p className="text-center text-base font-bold">{text}</p>
                {description && <p className="h-0 basis-full">{description}</p>}
            </span>
        </button>
    );
}

export default Button;
