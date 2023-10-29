function Select({ text, single, array, setSelect, property }) {
    return (
        <>
            {array.length == 1 && (
                <p className="mb-2 text-sm">
                    {' '}
                    <span className="text-s font-bold  tracking-wide">
                        {text}:{' '}
                    </span>
                    {single}
                </p>
            )}

            {array.length > 1 && (
                <section>
                    <p className="mb-2 text-s font-bold tracking-wide">
                        {text}:
                    </p>
                    <select
                        onChange={(e) => setSelect(e.target.value)}
                        className="item-select select mb-3 min-h-0  min-w-full rounded-none border-[1px] border-black !outline-none focus:!drop-shadow-2xl"
                    >
                        <option value={null}>Please Select</option>
                        {array.map((item, index) => {
                            return (
                                <option
                                    value={property ? item[property] : item}
                                    key={index}
                                >
                                    {property ? item[property] : item}
                                </option>
                            );
                        })}
                    </select>
                </section>
            )}
        </>
    );
}

export default Select;
