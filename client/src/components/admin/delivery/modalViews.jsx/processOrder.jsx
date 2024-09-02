import { useEffect, useState } from 'react';
import { useContent } from '../../../../context/ContentContext';
import BubbleButton from '../../../buttons/bubbleButton';
import ThemeBtn from '../../../buttons/themeBtn';

function ProcessOrder({}) {
    const { setModalCheck, modalContent } = useContent();
    const [postageSetting, setPostageSetting] = useState();
    const [loading, setLoading] = useState(true);
    const { fetchSetting, save } = useContent();
    const [btnLoad, setBtnLoad] = useState(false);
    useEffect(() => {
        fetchSetting({ setPostageSetting, setLoading });
    }, []);

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
                        {
                            text: 'Monday-Friday',
                            field: 'monday_friday',
                            defaultCheck: true,
                            disabled: true,
                        },
                        { text: 'Saturday', field: 'saturday' },
                        { text: 'Sunday', field: 'sunday' },
                    ].map(({ field, text, ...item }) => {
                        return (
                            <div
                                onClick={() => {
                                    if (field != 'monday_friday') {
                                        setPostageSetting((prevState) => ({
                                            ...prevState,
                                            processing_schedule: {
                                                ...prevState?.processing_schedule,
                                                [field]:
                                                    !prevState
                                                        ?.processing_schedule?.[
                                                        field
                                                    ],
                                            },
                                        }));
                                    }
                                }}
                                className="flex flex-nowrap items-center gap-2"
                            >
                                <input
                                    checked={
                                        postageSetting?.processing_schedule?.[
                                            field
                                        ]
                                    }
                                    readOnly
                                    defaultChecked={item?.defaultCheck}
                                    disabled={item?.disabled}
                                    type="checkbox"
                                    className="daisy-checkbox daisy-checkbox-lg border-dark-gray"
                                />
                                <p className="text-base ">{text}</p>
                            </div>
                        );
                    })}
                </section>
            </div>

            <footer className="mt-6 flex w-full items-center justify-between">
                <BubbleButton handleClick={() => setModalCheck(() => false)} />

                <ThemeBtn
                    text={'Update'}
                    handleClick={() =>
                        save({
                            msg: 'Success – your order processing schedule is updated.',
                            postageSetting,
                            setBtnLoad,
                            handleFunc: () => {
                                modalContent?.setTriggerFetchSetting(
                                    (prevState) => !prevState
                                );
                            },
                        })
                    }
                >
                    {btnLoad ? (
                        <div className="spinner-circle ![--spinner-color:255,255,255] [--spinner-size:25px]" />
                    ) : (
                        <p className="text-base font-medium text-white">
                            Update
                        </p>
                    )}
                </ThemeBtn>
            </footer>
        </section>
    );
}

export default ProcessOrder;
