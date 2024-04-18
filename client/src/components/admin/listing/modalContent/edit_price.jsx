import { useEffect, useState } from 'react';
import { useContent } from '../../../../context/ContentContext';
import Template from './template';
import { adminAxios } from '../../../../api/axios';
import UserLogout from '../../../../hooks/userLogout';
import { AnimatePresence } from 'framer-motion';
import OptionError from '../../components/product/new product/variation/error/optionError';
import { priceOptions } from '../../components/product/new product/utils/handleValueOptions';

import handleValue from '../../components/product/new product/utils/handleValue';
import _ from 'lodash';
function EditPrice({}) {
    const { modalContent, setShowAlert, setModalCheck } = useContent();
    const { logoutUser } = UserLogout();
    const [productData, setProductData] = useState({});

    const [newPrice, setNewPrice] = useState({});
    const [amount, setAmount] = useState();
    const [originalPrice, setOriginalPrice] = useState({});
    const [btnLoading, setBtnLoading] = useState(false);
    const [select, setSelect] = useState('increase_by_amount');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [failedData, setFailedData] = useState({});
    useEffect(() => {
        adminAxios
            .get(`product/${_.get(modalContent, ['productIds', 0])}`)
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

    const handleAmountChange = (value) => {
        setAmount(() => value);

        const parseValue = parseFloat(value);
        let min = originalPrice?.min;
        let max = originalPrice?.max;

        if (
            select == 'increase_by_amount' ||
            select == 'decrease_by_amount' ||
            select == 'set_new_amount'
        ) {
            if (isNaN(parseValue)) {
                setError((prevState) => ({
                    ...prevState,
                    price: 'Please enter a price.',
                }));
                return;
            } else if (
                parseValue < priceOptions.minValue ||
                value > priceOptions.maxValue
            ) {
                setError((prevState) => ({
                    ...prevState,
                    price: 'Price must be between £0.17 and £42,933.20.',
                }));
                return;
            } else {
                setError(() => ({}));
            }
        }

        if (
            select == 'percentage_decrease' ||
            select == 'percentage_increase'
        ) {
            if (parseValue < 0 || isNaN(parseValue)) {
                setError(() => ({
                    price: 'Percent must be a positive number.',
                }));
                return;
            } else if (parseValue > 1000) {
                setError(() => ({
                    price: 'Percent must be between 1 and 1000.',
                }));

                return;
            } else {
                console.log('clear');
                setError(() => ({}));
            }
        }

        console.log('pass');
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
        setError(() => ({}));
    }, [select]);
    useEffect(() => {
        setFailedData((prevState) => ({ ...prevState, failedProductIds: [] }));
    }, [amount]);

    const handleClick = async () => {
        let success = false;

        const errorData = [];
        const failedDataValue = {};
        let count = null;
        try {
            setBtnLoading(() => true);
            const { data } = await adminAxios.post('/product/price/update', {
                productIds:
                    failedData?.failedProductIds?.length > 0 &&
                    failedData?.eligibleId?.length > 0
                        ? failedData?.eligibleId
                        : modalContent?.productIds,

                selectedOption: select,
                amount,
            });

            count = data?.count;

            success = true;
        } catch (error) {
            logoutUser({ error });
            console.log(error);
            if (error.response.status == 409) {
                _.assign(failedDataValue, error.response.data);
            }

            if (error.response.status == 400) {
                setError((prevState) => ({
                    ...prevState,
                    ...error.response.data,
                }));
            }
        } finally {
            setTimeout(() => {
                setBtnLoading(() => false);

                if (success) {
                    setLoading(() => true)
                    setTimeout(() => {
                        setShowAlert(() => ({
                            on: true,
                            bg: 'bg-green-100',
                            icon: 'check',
                            size: 'large',
                            msg:
                                count > 1
                                    ? `You've updated ${count} listings.`
                                    : 'Listing updated.',
                            text: 'text-black text-base',
                        }));
                        setModalCheck(() => false);
                        modalContent?.setTriggerSearch(
                            (prevState) => !prevState
                        );
                    }, 2000);
                } else {
                    setFailedData(() => failedDataValue);
                }
            }, 1000);
        }
    };
    return (
        <Template
            handleClearSelection={modalContent.clearSelection}
            title={`Editing price for ${modalContent.productIds?.length} listing`}
            loading={loading}
            submit={{
                handleClick,
                loading: btnLoading,
                disabled: !amount || error?.price,
                text:
                    failedData?.failedProductIds?.length > 0 &&
                    failedData?.eligibleId?.length > 0
                        ? `Apply to ${failedData?.eligibleId?.length} eligible Listings`
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
                                    className={`${error?.price ? 'border-red-700 bg-red-100' : ''} daisy-input daisy-input-bordered !w-full !max-w-full  rounded px-5`}
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
                                {amount && !error?.price ? (
                                    <div className="flex flex-row items-center gap-1">
                                        <p className="whitespace-nowrap text-lg font-semibold text-green-700">
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

                {failedData?.failedProductIds?.length > 0 && (
                    <div className="my-4 flex flex-col gap-8 px-6">
                        <div className="w-full rounded-md bg-red-800 p-6">
                            <p className="text-sm text-white">
                                {modalContent?.productIds?.length ==
                                failedData?.failedProductIds?.length
                                    ? 'None of the selected listings could be updated'
                                    : `${failedData?.failedProductIds?.length} listings could not be updated`}
                            </p>
                        </div>
                        {failedData?.failedProductIds?.map(
                            ({ id, msg, images, title }) => {
                                return (
                                    <div
                                        key={`failedProductId-${id}`}
                                        className="flex flex-row gap-6"
                                    >
                                        <img
                                            src={images?.[0]}
                                            alt=""
                                            className="h-14 w-14 rounded"
                                        />

                                        <div>
                                            <p className="font-raleway text-[1.05rem] font-semibold text-black/80">
                                                {title}
                                            </p>
                                            <p className="font-raleway text-[1.05rem] font-semibold text-red-700">
                                                {msg}
                                            </p>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                )}
            </section>
        </Template>
    );
}

export default EditPrice;
