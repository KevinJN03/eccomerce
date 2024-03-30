import { useDeliveryContext } from '../../../context/deliveryContext';

function CustomForm() {
    const { postageSetting, setPostageSetting } = useDeliveryContext();
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
                            <p className="text-base cursor-pointer">{title}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CustomForm;
