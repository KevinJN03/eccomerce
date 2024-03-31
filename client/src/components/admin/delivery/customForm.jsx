import { usePostageContext } from '../../../context/postageContext';

function CustomForm() {
    const { postageSetting, setPostageSetting } = usePostageContext();
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
                    {
                        value: true,
                        title: 'Prefill item description with my listing title',
                    },
                    {
                        value: false,
                        title: 'Use the same description for all of my items',
                    },
                ].map(({ title, value }) => {
                    return (
                        <div
                            key={title}
                            className="flex flex-nowrap items-center gap-2 "
                            onClick={() =>
                                setPostageSetting((prevState) => ({
                                    ...prevState,
                                    custom_form: {
                                        ...prevState?.custom_form,
                                        prefill_with_title: value,
                                    },
                                }))
                            }
                        >
                            <input
                                readOnly
                                checked={
                                    postageSetting?.custom_form
                                        ?.prefill_with_title == value
                                }
                                type="radio"
                                className="daisy-radio daisy-radio-lg"
                                name="custom-form"
                            />
                            <p className="cursor-pointer text-base">{title}</p>
                        </div>
                    );
                })}

                {!postageSetting?.custom_form?.prefill_with_title && (
                    <div>
                        <label className="daisy-form-control w-full">
                            <div className="daisy-label">
                                <span className="daisy-label-text font-semibold">
                                    Description{' '}
                                </span>
                            </div>
                            <input
                                value={postageSetting?.custom_form?.description}
                                onChange={(e) => {
                                    setPostageSetting((prevState) => ({
                                        ...prevState,
                                        custom_form: {
                                            ...prevState?.custom_form,
                                            description: e.target.value,
                                        },
                                    }));
                                }}
                                type="text"
                                placeholder="ex. Black Cotton t-shirt, Gold Necklace..."
                                className="daisy-input daisy-input-bordered w-full max-w-full"
                            />
                            <div className="daisy-label">
                                <span className="daisy-label-text-alt" />
                                <span className="daisy-label-text-alt text-sm">
                                    {postageSetting?.custom_form?.description
                                        ?.length || 0}
                                    /25
                                </span>
                            </div>
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CustomForm;
