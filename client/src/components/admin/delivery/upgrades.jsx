function Upgrades({}) {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Delivery upgrades</h2>
            <p className="text-base lg:w-9/12">
                Give buyers the option to pay for expedited delivery during
                checkout. Once enabled, you can add upgrade options to delivery
                profiles or add them manually when listing an item.
            </p>
            <div className="flex flex-col gap-3">
                {[{ text: 'Enabled' }, { text: 'Disabled' }].map(({ text }) => {
                    return (
                        <div className="flex flex-row flex-nowrap items-center gap-2">
                            <input
                                type="radio"
                                key={text}
                                checked
                                name="upgrades"
                                className="daisy-radio daisy-radio-lg border-2 border-dark-gray"
                            />
                            <p className="text-base ">
                                {text}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default Upgrades;
