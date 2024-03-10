function Label({ title, description, disableAsterisk }) {
    return (
        <div className="flex flex-col gap-y-1">
            <label className="whitespace-nowrap text-base font-semibold">
                {title}{' '}
                {!disableAsterisk && <span className="text-red-800 ">*</span>}
            </label>

            <p>{description}</p>
        </div>
    );
}

export default Label;
