import { useNewProduct } from '../../../../../context/newProductContext';
import New_Product_Header from './header';
import InputLabel from './inputLabel.jsx';

import { Input } from './utils/Input';
import './new_product.scss';
import { useClickAway } from '@uidotdev/usehooks';
import formatData from './variation/formatData';
import { forwardRef, useRef, useState } from 'react';
import handleValue from './utils/handleValue';
import { quantityOptions, priceOptions } from './utils/handleValueOptions';
function Price_Inventory() {
    const {
        publishError,
        priceValue,
        setPriceValue,
        stockValue,
        setStockValue,
        publishErrorDispatch,
        variations,
    } = useNewProduct();
    const onClickAway = ({ setValue, value, toDecimals }) => {
        if (!value) return;

        const formatValue = formatData(value, toDecimals);
        setValue(() => formatValue);
    };

    const onStockClickAwayRef = useClickAway(() => {
        onClickAway({
            setValue: setStockValue,
            toDecimals: 0,
            value: stockValue,
        });
    });

    const onPriceClickAwayRef = useClickAway(() => {
        console.log('here');
        onClickAway({
            setValue: setPriceValue,
            toDecimals: 2,
            value: priceValue,
        });
    });

    const checkQuantity = variations.some(
        (item) => item.quantityHeader.on == true
    );
    const checkPrice = variations.some((item) => item.priceHeader.on == true);

    const handleOnchange = ({ value, optionObj, setValue, clearError }) => {
        const options = {
            ...optionObj,
            value,
            setValue,
            publishErrorDispatch,
        };
        handleValue(options);
    };

    const priceInputProps = {
        id: 1,
        label: 'Price',
        checker: checkPrice,
        visible: true,
        property: 'price',
        value: priceValue,
        handleOnchange: (e) =>
            handleOnchange({
                setValue: setPriceValue,
                value: e.target.value,
                optionObj: priceOptions,
            }),
        error: publishError,
        setValue: setPriceValue,
        ref: onPriceClickAwayRef,
    };

    const stockInputProps = {
        id: 2,
        label: 'Quantity',
        checker: checkQuantity,
        visible: true,
        property: 'stock',
        value: stockValue,
        handleOnchange: (e) =>
            handleOnchange({
                setValue: setStockValue,
                value: e.target.value,
                optionObj: quantityOptions,
            }),
        error: publishError,
        setValue: setStockValue,
        ref: onStockClickAwayRef,
    };

    return (
        <section className="new-product-wrapper">
            <section id="price-inventory" className="flex flex-col">
                <New_Product_Header
                    title="Price & Inventory"
                    text="Set a price for your item and indicate how many are available for sale."
                />
                {[priceInputProps, stockInputProps].map((props) => {
                    const { checker, label } = props;
                    return (
                        <div className="w-fit" key={props.id}>
                            {!checker ? (
                                <>
                                    <InputLabel
                                        label={label}
                                        id={label.toLowerCase()}
                                    />

                                    <Input {...props} ref={props.ref} />
                                </>
                            ) : (
                                <DisableInput text={label} />
                            )}
                        </div>
                    );
                })}
            </section>
        </section>
    );
}
function DisableInput({ text }) {
    return (
        <div className="mt-3 flex flex-col flex-nowrap gap-2">
            <p className="text-lg font-medium">
                {' '}
                {text}
                <span className="asterisk">*</span>
            </p>
            <p>Enter {text.toLowerCase()} in variations</p>
        </div>
    );
}

const InventoryInput = forwardRef(function InventoryInput(props, ref) {
    const { setValue, value } = props;

    // useEffect(() => {
    //     setValue((obj) => ({ ...obj, on: true }));

    //     return () => {
    //         setValue((obj) => ({ ...obj, on: false }));
    //     };
    // }, []);

    return (
        // <div className="h-fit w-fit bg-transparent" ref={ref}>
        <Input {...props} ref={ref} />
        // </div>
    );
});
export default Price_Inventory;
