function Button({ onClick, description, text, icon, alt, loading }) {
    return (
        <button
            onClick={onClick}
            type="button"
            className="transistion-all relative mt-3 flex h-14 w-4/6 flex-row items-center justify-center gap-x-3 border-2 hover:bg-grey-100"
        >
            {loading ? (
                <svg
                    className="spinner-ring spinner-sm ![--spinner-color:var(--slate-12)]"
                    viewBox="25 25 50 50"
                    strokeWidth="5"
                >
                    <circle cx="50" cy="50" r="20" />
                </svg>
            ) : (
                <>
                    <img
                        src={icon}
                        alt={alt}
                        className="absolute left-3 h-9 w-9"
                    />
                    <span className="flex flex-col justify-center">
                        <p className="text-center text-base font-bold">
                            {text}
                        </p>
                        {description && (
                            <p className="h-0 basis-full">{description}</p>
                        )}
                    </span>
                </>
            )}
        </button>
    );
}

export default Button;
