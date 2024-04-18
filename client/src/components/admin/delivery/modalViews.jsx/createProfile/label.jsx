function Label({ title, description, disableAsterisk,  noWhiteSpace }) {
    return (
        <div className="flex flex-col gap-y-1 w-full">
            <label className={`text-base font-semibold ${ noWhiteSpace ? 'whitespace-nowrap' : ''}`}>
                {title}{' '}
                {!disableAsterisk && <span className="text-red-800 ">*</span>}
            </label>

            <p>{description}</p>
        </div>
    );
}

export default Label;
