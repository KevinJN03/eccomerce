import { useEffect, useState } from 'react';
import { useDeliveryContext } from '../../../context/deliveryContext';
import { useContent } from '../../../context/ContentContext';

function Upgrades({}) {
    const [loading, setLoading] = useState(true);
    const [postageSetting, setPostageSetting] = useState({
        delivery_upgrades: false,
    });
    const { fetchSetting, save } = useContent();
    useEffect(() => {
        fetchSetting({ setLoading, setPostageSetting });
    }, []);

    const handleOnchange = ({ value }) => {
        console.log(value);

        if (postageSetting?.delivery_upgrades != value) {
            save({
                msg: `You've updated your settings.`,
                postageSetting: { ...postageSetting, delivery_upgrades: value },
            });
        }
        setPostageSetting((prevState) => ({
            ...prevState,
            delivery_upgrades: value,
        }));
    };
    return (
        <section>
            {loading ? (
                <div className="flex w-full justify-center">
                    <div className="spinner-circle spinner-lg ![--spinner-color:0,0,0]" />
                </div>
            ) : (
                <section className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold">Delivery upgrades</h2>
                    <p className="text-base lg:w-9/12">
                        Give buyers the option to pay for expedited delivery
                        during checkout. Once enabled, you can add upgrade
                        options to delivery profiles or add them manually when
                        listing an item.
                    </p>
                    <div className="flex flex-col gap-3">
                        {[
                            { text: 'Enabled', value: true },
                            { text: 'Disabled', value: false },
                        ].map(({ text, value }) => {
                            return (
                                <div
                                    onClick={() => handleOnchange({ value })}
                                    className="flex flex-row flex-nowrap items-center gap-2"
                                >
                                    <input
                                        type="radio"
                                        key={text}
                                        readOnly
                                        checked={
                                            postageSetting?.delivery_upgrades ==
                                            value
                                        }
                                        name="upgrades"
                                        className="daisy-radio daisy-radio-lg border-2 border-dark-gray"
                                    />
                                    <p className="cursor-pointer text-base">
                                        {text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}
        </section>
    );
}

export default Upgrades;
