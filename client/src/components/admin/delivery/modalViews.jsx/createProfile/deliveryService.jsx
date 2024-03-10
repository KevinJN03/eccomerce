import Section from "./section";

function DeliveryService({ title }) {
    return (
        <Section title={title} disableAsterisk={true}>
            <div className="mb-5 flex w-full flex-col gap-4">
                <div>
                    <p className="text-base font-semibold">Delivery service</p>

                    <select
                        name="delivery-service"
                        id="delivery-service"
                        className="daisy-select daisy-select-bordered w-full"
                    ></select>
                </div>

                <section className="w-full max-w-[calc(8/12*100%)]">
                    <p className="text-base font-semibold">
                        What you'll charge
                    </p>

                    <select
                        name="shipping-charge"
                        id="shipping-charge"
                        className="daisy-select daisy-select-bordered w-full"
                    ></select>

                    <div className="mt-4 flex w-full flex-nowrap gap-4">
                        <div className="left flex flex-col gap-1 ">
                            <p className="text-base font-semibold">One item</p>

                            <input
                                type="text"
                                className="daisy-input daisy-input-bordered w-full"
                            />
                        </div>
                        <div className="right flex flex-col gap-1">
                            <p className="text-base font-semibold">
                                Additional item
                            </p>

                            <input
                                type="text"
                                className="daisy-input daisy-input-bordered w-full"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </Section>
    );
}

export default DeliveryService;
