function Label({ title, description, disableAsterisk, noWhiteSpace }) {
    return (
        <div className="flex w-full flex-col gap-y-1">
            <label
                className={`text-base font-semibold ${noWhiteSpace ? 'whitespace-nowrap' : ''}`}
            >
                {title}{' '}
                {!disableAsterisk && <span className="text-red-800 ">*</span>}
            </label>

            <p>{description}</p>
        </div>
    );
}

export default Label;
