function CustomForm({customForm, setCustomForm}) {
    return (
        <div className="custom-form w-full rounded-lg border border-dark-gray p-5">
            <h2 className="text-lg font-semibold">
                International customs forms
            </h2>

            <p>
                Add a description for the items you dispatch internationally.
                This will be the default description added to international
                customs forms.
            </p>
            <div className="mt-3 flex flex-col gap-3">
                {[
                    'Prefill item description with my listing title',
                    'Use the same description for all of my items',
                ].map((title) => {
                    return (
                        <div
                            key={title}
                            className="flex flex-nowrap items-center gap-2"
                            onClick={() => setCustomForm(() => title)}
                        >
                            <input
                                readOnly
                                checked={customForm === title}
                                type="radio"
                                className="daisy-radio daisy-radio-lg"
                                name="custom-form"
                            />
                            <p className="text-base">{title}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CustomForm;
