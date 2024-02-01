import { useEffect, useState } from 'react';
import { useContent } from '../../../../context/ContentContext';
import Template from './template';
import { adminAxios } from '../../../../api/axios';
import UserLogout from '../../../../hooks/userLogout';

function EditPrice({}) {
    const { modalContent } = useContent();
    const { logoutUser } = UserLogout();
    const [productData, setProductData] = useState({});
    const [newPrice, setNewPrice] = useState({});
    const [amount, setAmount] = useState();
    const [originalPrice, setOriginalPrice] = useState({});

    const [select, setSelect] = useState('increase_by_amount');
    useEffect(() => {
        adminAxios
            .get(
                `product/${
                    modalContent?.products || ['65ace5838f9aa588e0e6d225']
                }`
            )
            .then(({ data }) => {
                setProductData(() => data[0]);

                setOriginalPrice(() => ({
                    max: data[0].additional_data.price?.max,
                    min: data[0].additional_data.price?.min,
                }));
            })
            .catch(() => {
                console.error(error);
                logoutUser({ error });
            });
    }, []);

    const handleAmountChange = (e) => {
        setAmount(() => e.target.value);

        const parseValue = parseFloat(e.target.value);
        console.log({ select });
        let min = originalPrice?.min;
        let max = originalPrice?.max;

        if (select == 'increase_by_amount') {
            min += parseValue;
            max += parseValue;
        }

        if (select == 'decrease_by_amount') {
            min -= parseValue;
            max -= parseValue;
        }

        if (select == 'set_new_amount') {
            min = parseValue;
            max = parseValue;
        }

        if (select == 'percentage_increase') {
            min *= 1 + parseValue / 100;
            max *= 1 + parseValue / 100;
        }

        if (select == 'percentage_decrease') {
            min *= 1 - parseValue / 100;
            max *= 1 - parseValue / 100;
        }
        setNewPrice(() => ({
            min: parseFloat(min).toFixed(2),
            max: parseFloat(max).toFixed(2),
        }));
    };
    return (
        <Template
            title={`Editing price for ${modalContent.products?.length} listing`}
        >
            <section className="flex flex-col gap-3">
                <section className="top flex gap-3">
                    <div className="left flex w-full">
                        <select
                            onChange={(e) => setSelect(() => e.target.value)}
                            name="new-amount"
                            id="new-amount"
                            className="daisy-select daisy-select-bordered daisy-select-md w-full rounded "
                        >
                            <optgroup
                                label="Edit price mode"
                                className="text-sm !font-medium"
                            >
                                {[
                                    'Increase by amount',
                                    'decrease by amount',
                                    'Set new amount',
                                    'Percentage increase',
                                    'Percentage decrease',
                                ].map((value) => {
                                    const newValue = value
                                        .replaceAll(' ', '_')
                                        .toLowerCase();
                                    return (
                                        <option
                                            key={newValue}
                                            selected={newValue == select}
                                            className="text-s"
                                            value={newValue}
                                        >
                                            {value}
                                        </option>
                                    );
                                })}
                            </optgroup>
                        </select>
                    </div>
                    <div className="right w-full">
                        <div className="relative w-4/6">
                            {!select.includes('percentage') && (
                                <p className="absolute left-2 top-2/4 translate-y-[-50%] text-sm">
                                    £
                                </p>
                            )}
                            <input
                                value={amount}
                                onChange={handleAmountChange}
                                type="text"
                                autoComplete={'off'}
                                name="price"
                                id="price"
                                className="daisy-input daisy-input-bordered w-full rounded px-5"
                            />
                            {select.includes('percentage') && (
                                <p className="absolute right-2 top-2/4 translate-y-[-50%] text-sm">
                                    %
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {productData?._id && (
                    <section className="bottom mt-8">
                        <p className="text-s font-semibold">
                            Preview your prices
                        </p>

                        <div className="mt-3 flex w-10/12 flex-row flex-nowrap gap-3">
                            <img
                                src={productData?.images?.[0]}
                                className=" max-h-28 min-h-28 min-w-28 max-w-28 rounded-md object-cover"
                                alt=""
                            />

                            <div className="flex flex-col gap-2">
                                <p className="text-sm leading-6 text-black/80">
                                    {productData?.title}
                                </p>
                                {amount ? (
                                    <div className="flex flex-row items-center gap-1">
                                        <p className="text-lg font-semibold text-green-700">
                                            Now{' '}
                                            {originalPrice?.min ==
                                            originalPrice?.max
                                                ? `£${newPrice?.max}`
                                                : `${newPrice?.min}-£${newPrice?.max}`}
                                        </p>
                                        <p className="whitespace-nowrap text-base text-black/60">
                                            <span className="pr-0.5 text-s text-black/60">
                                                (
                                            </span>
                                            was{' '}
                                            {originalPrice?.max !=
                                            originalPrice?.min ? (
                                                <>
                                                    {`£${originalPrice?.min}-£${originalPrice?.max}`}
                                                </>
                                            ) : (
                                                <>£{originalPrice?.max}</>
                                            )}
                                            <span className="pl-0.5 text-s text-black/60">
                                                )
                                            </span>
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        {originalPrice?.max !=
                                        originalPrice?.min ? (
                                            <p className="text-base font-semibold">
                                                {`£${originalPrice?.min}-£${originalPrice?.max}`}
                                            </p>
                                        ) : (
                                            <p className="text-lg font-semibold">
                                                £{originalPrice?.max}
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </section>
                )}
            </section>
        </Template>
    );
}

export default EditPrice;
