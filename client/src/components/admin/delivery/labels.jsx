import { usePostageContext } from '../../../context/postageContext';
import label4x6 from '../../../assets/icons/shipping_label/4x6.svg';
import label11x8_single from '../../../assets/icons/shipping_label/11x8.5_single.svg';
import label11x8_double from '../../../assets/icons/shipping_label/11x8.5_double.svg';

function Labels() {
    const { postageSetting, setPostageSetting } = usePostageContext();

    const icons = {
        '1 label per page': label11x8_single,
        '2 label per page': label11x8_double,
        'Label printers': label4x6,
    };
    return (
        <div className="flex w-full flex-col gap-5 rounded-lg border border-dark-gray p-5">
            <h2 className="text-lg font-semibold">Downloading labels</h2>
            <p>Choose how to download and print your postage labels.</p>

            <section className="flex h-fit flex-wrap gap-2">
                <div className="left flex h-fit min-w-fit flex-1 flex-col gap-3">
                    <h2 className="text-base font-semibold">Format</h2>
                    <div className="flex flex-col gap-2">
                        {[
                            { text: '1 label per page' },
                            {
                                text: '2 label per page',
                            },
                            { text: 'Label printers' },
                        ].map(({ text }) => {
                            return (
                                <div
                                    className="flex cursor-pointer flex-nowrap items-center gap-2"
                                    onClick={() =>
                                        setPostageSetting((prevState) => ({
                                            ...prevState,
                                            label_format: text,
                                        }))
                                    }
                                >
                                    <input
                                        readOnly
                                        checked={
                                            postageSetting?.label_format ===
                                            text
                                        }
                                        type="radio"
                                        className="daisy-radio daisy-radio-lg"
                                        name="format"
                                        key={text}
                                    />
                                    <p className="text-base">{text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="right  flex h-full w-full min-w-36 max-w-full flex-1 flex-col items-center">
                    <img
                        src={icons?.[postageSetting?.label_format]}
                        className=" h-full max-h-[12.5rem]"
                    />

                    <p className="text-sm">
                        {postageSetting?.label_format === 'Label printers'
                            ? '4 in x 6 in'
                            : '8.5 in x 11 in'}
                    </p>
                </div>
            </section>
            <div className="flex flex-col gap-3">
                <h2 className="font-semibold">Order Details</h2>

                <div
                    className="flex flex-nowrap gap-2"
                    onClick={() => {
                        setPostageSetting((prevState) => ({
                            ...prevState,
                            include_order_detail:
                                !prevState?.include_order_detail || false,
                        }));
                    }}
                >
                    <input
                        checked={postageSetting?.include_order_detail}
                        readOnly
                        type="checkbox"
                        className="daisy-checkbox daisy-checkbox-lg border-2 border-dark-gray"
                    />
                    <p className="cursor-pointer text-base">
                        When I print postage labels, include order details for
                        my reference. These details will appear outside the
                        label area.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Labels;
