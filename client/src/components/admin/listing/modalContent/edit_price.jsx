import { useEffect, useState } from 'react';
import { useContent } from '../../../../context/ContentContext';
import Template from './template';
import { adminAxios } from '../../../../api/axios';
import UserLogout from '../../../../hooks/userLogout';
import { AnimatePresence } from 'framer-motion';
import OptionError from '../../components/product/new product/variation/error/optionError';
import { priceOptions } from '../../components/product/new product/utils/handleValueOptions';

import handleValue from '../../components/product/new product/utils/handleValue';
function EditPrice({}) {
    const { modalContent } = useContent();
    const { logoutUser } = UserLogout();
    const [productData, setProductData] = useState({});
    const [productDataMap, setProductDataMap] = useState(new Map());
    const [newPrice, setNewPrice] = useState({});
    const [amount, setAmount] = useState();
    const [originalPrice, setOriginalPrice] = useState({});
    const [loading, setLoading] = useState(false);
    const [select, setSelect] = useState('increase_by_amount');
    const [finishLoading, setFinishLoading] = useState(false);
    const [error, setError] = useState({});
    const [failedProductIds, setFailedProductIds] = useState([]);
    useEffect(() => {
        adminAxios
            .get(`product/${modalContent?.products}`)
            .then(({ data }) => {
                setProductData(() => data[0]);
                setProductDataMap(
                    () =>
                        new Map(
                            data.map(({ _id, ...rest }) => [
                                _id,
                                { ...rest, _id },
                            ])
                        )
                );
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

    const handleAmountChange = (value) => {
        setAmount(() => value);
        // handleValue({
        //     ...priceOptions,
        //     setError,
        //     value,
        //     setValue: setAmount,
        // });

        const parseValue = parseFloat(value);
        let min = originalPrice?.min;
        let max = originalPrice?.max;

        if (
            (select == 'increase_by_amount' ||
                select == 'decrease_by_amount' ||
                select == 'set_new_amount') &&
            (parseValue < priceOptions.minValue ||
                value > priceOptions.maxValue)
        ) {
            setError((prevState) => ({
                ...prevState,
                price: 'Price must be between £0.17 and £42,933.20.',
            }));
        } else if (
            (select == 'percentage_decrease' ||
                select == 'percentage_increase') &&
            parseValue < 0
        ) {
            setError(() => ({ price: 'Percent must be a positive number.' }));
        } else {
            setError(() => {});
        }
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

    useEffect(() => {
        handleAmountChange(amount);
    }, [select]);
    useEffect(() => {
        setFailedProductIds(() => []);
    }, [amount]);

    const handleClick = async () => {
        let success = false;

        const errorData = [];
        try {
            setLoading(() => true);
            const { data } = await adminAxios.post('/product/price/update', {
                productIds:
                    failedProductIds.length > 0 &&
                    failedProductIds.length != productDataMap.size
                        ? modalContent?.products.filter(
                              (id) =>
                                  !failedProductIds.some(
                                      ({ id: failedId }) => failedId == id
                                  )
                          )
                        : modalContent?.products,

                selectedOption: select,
                amount,
            });

            success = true;
        } catch (error) {
            logoutUser({ error });
            console.log(error);
            if (error.response.data?.failedProductIds) {
                errorData.push(...error.response.data.failedProductIds);

                console.log({ errorData });
            }

            if (error.response.data?.error?.amount) {
                setError((prevState) => ({
                    ...prevState,
                    price: error.response.data.error.amount,
                }));
            }
        } finally {
            setTimeout(() => {
                setLoading(() => false);
                if (success) {
                    setFinishLoading(() => true);
                } else {
                    setFailedProductIds(() => errorData);
                }
            }, 1200);
        }
    };
    return (
        <Template
            handleClearSelection={modalContent.clearSelection}
            title={`Editing price for ${modalContent.products?.length} listing`}
            finishLoading={finishLoading}
            submit={{
                handleClick,
                loading,
                disabled: !amount,
                text:
                    failedProductIds.length > 0 &&
                    failedProductIds.length != productDataMap.size
                        ? `Apply to ${productDataMap.size - failedProductIds.length} eligible Listings`
                        : 'Apply',
            }}
        >
            <section className="flex flex-col gap-3">
                <section className="top flex  w-full gap-3">
                    <div className="left flex max-w-[65%] flex-[1.5]">
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
                    <div className="right flex max-w-[45%] flex-1  flex-col">
                        <section className=" w-full pr-20">
                            <div className="relative w-fit">
                                {!select.includes('percentage') && (
                                    <p className="absolute left-2 top-2/4 translate-y-[-50%] text-sm">
                                        £
                                    </p>
                                )}
                                <input
                                    value={amount}
                                    onChange={(e) =>
                                        handleAmountChange(e.target.value)
                                    }
                                    type="text"
                                    autoComplete={'off'}
                                    name="price"
                                    id="price"
                                    className="daisy-input daisy-input-bordered !w-full !max-w-full  rounded px-5"
                                />
                                {select.includes('percentage') && (
                                    <p className="absolute right-2 top-2/4 translate-y-[-50%] text-sm">
                                        %
                                    </p>
                                )}
                            </div>

                            <AnimatePresence>
                                {error?.price && (
                                    <OptionError
                                        disableIcon
                                        msg={error?.price}
                                        className={
                                            '!items-start !break-words !pl-0'
                                        }
                                    />
                                )}
                            </AnimatePresence>
                        </section>
                    </div>
                </section>

                {productData?._id && (
                    <section className="bottom mt-8">
                        <p className="text-lg font-semibold text-black/90">
                            Preview your prices
                        </p>

                        <div className="mt-3 flex w-10/12 flex-row flex-nowrap gap-8">
                            <img
                                src={productData?.images?.[0]}
                                className=" max-h-28 min-h-28 min-w-28 max-w-28 rounded-md object-cover"
                                alt=""
                            />

                            <div className="flex flex-col gap-2">
                                <p className="font-raleway text-[1.05rem] font-semibold leading-6 text-black/80">
                                    {productData?.title}
                                </p>
                                {amount ? (
                                    <div className="flex flex-row items-center gap-1">
                                        <p className="text-lg font-semibold text-green-700">
                                            Now{' '}
                                            {originalPrice?.min ==
                                            originalPrice?.max
                                                ? `${newPrice?.max < 0 ? '-' : ''}£${Math.abs(newPrice?.max)?.toFixed(2)}`
                                                : `${newPrice?.min < 0 ? '-' : ''}£${Math.abs(newPrice?.min)?.toFixed(2)}-${newPrice?.max < 0 ? '-' : ''}£${Math.abs(newPrice?.max)?.toFixed(2)}`}
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
                                            <p className="text-lg font-semibold">
                                                {`£${originalPrice?.min.toFixed(2)}-£${originalPrice?.max.toFixed(2)}`}
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

                {failedProductIds.length > 0 && (
                    <div className="my-4 flex flex-col gap-8 px-6">
                        <div className="w-full rounded-md bg-red-800 p-6">
                            <p className="text-sm text-white">
                                {productDataMap.size == failedProductIds.length
                                    ? 'None of the selected listings could be updated'
                                    : `${failedProductIds.length} listing could not be updated`}
                            </p>
                        </div>
                        {failedProductIds.map(({ id, msg }) => {
                            const productInfo = productDataMap.get(id);
                            return (
                                <div
                                    key={`failedProductId-${id}`}
                                    className="flex flex-row gap-6"
                                >
                                    <img
                                        src={productInfo?.images[0]}
                                        alt=""
                                        className="h-14 w-14 rounded"
                                    />

                                    <div>
                                        <p className="font-raleway text-[1.05rem] font-semibold text-black/80">
                                            {productInfo?.title}
                                        </p>
                                        <p className="font-raleway text-[1.05rem] font-semibold text-red-700">
                                            {msg}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </Template>
    );
}

export default EditPrice;
