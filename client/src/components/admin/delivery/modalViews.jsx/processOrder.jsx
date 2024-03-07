import { useContent } from '../../../../context/ContentContext';
import BubbleButton from '../../../buttons/bubbleButton';

function ProcessOrder({}) {
    const { setModalCheck } = useContent();
    return (
        <section className="flex min-w-full flex-col gap-5 rounded-xl bg-white p-5">
            <h2 className="text-xl font-semibold">
                Your order processing schedule
            </h2>
            <p className="text-base">
                If you're preparing, packaging, or dispatching orders on
                Saturday or Sunday, you can add those days to your processing
                schedule to show shoppers more accurate delivery dates for
                future orders.
            </p>
            <p className="text-base">
                Keep in mind, adding Sunday to your schedule means you prepare
                or package orders that day – but you don't have to dispatch
                them. If a ship-by date falls on a Sunday, we'll always bump it
                to the next business day. Learn about processing times and
                dispatch-by dates
            </p>

            <div>
                <h3 className="text-base font-semibold">
                    When do you process orders?
                </h3>

                <section className="mt-2 flex flex-nowrap items-center gap-4">
                    {[
                        { text: 'Monday-Friday', defaultCheck: true, disabled: true },
                        { text: 'Saturday' },
                        { text: 'Sunday' },
                    ].map((item) => {
                        return (
                            <div className="flex flex-nowrap items-center gap-2">
                                <input
                                defaultChecked={item?.defaultCheck}
                                disabled={item?.disabled}
                                    type="checkbox"
                                    className="daisy-checkbox daisy-checkbox-lg border-dark-gray"
                                />
                                <p className="text-base ">{item.text}</p>
                            </div>
                        );
                    })}
                </section>
            </div>

            <footer className="mt-6 flex w-full items-center justify-between">
                <BubbleButton handleClick={() => setModalCheck(() => false)} />
                <button className="rounded-full bg-black px-5 py-3 font-medium text-white">
                    Update
                </button>
            </footer>
        </section>
    );
}

export default ProcessOrder;
