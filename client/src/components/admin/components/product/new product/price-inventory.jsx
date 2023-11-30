import { useNewProduct } from '../../../../../context/newProductContext';
import New_Product_Header from './header';
import InputLabel from './inputLabel.jsx';

import { Input } from './utils/Input';
import './new_product.scss';
import { useClickAway } from '@uidotdev/usehooks';
import formatData from './variation/formatData';
import { useState } from 'react';
import OptionError from './variation/error/optionError';
import { useEffect } from 'react';
import useNewProductError from '../../../../../useNewProductError';
import handleValue from './utils/handleValue';
import { quantityOptions, priceOptions } from './utils/handleValueOptions';
import { v4 as uuidv4 } from 'uuid';
export default function Price_Inventory() {
 
    const {
        globalUpdate,
        setGlobalUpdate,
        publishError,
        priceValue,
        setPriceValue,
        stockValue,
        setStockValue,
        publish,
        publishErrorDispatch,
        variations,
    } = useNewProduct();

    const [error, setError] = useState({ price: null, stock: null });
    useNewProductError('price', setError, { obj: true, property: 'price' });
    useNewProductError('stock', setError, { obj: true, property: 'stock' });

    useEffect(() => {
    
        publishErrorDispatch({ type: 'clear', path: 'price' });
    }, [priceValue.value]);

    useEffect(() => {
       
        publishErrorDispatch({ type: 'clear', path: 'stock' });
    }, [stockValue.value]);

    const onStockClickAwayRef = useClickAway(() => {
        if (!stockValue.value) return;
        const formatStock = formatData(stockValue.value, 0);
       
        setStockValue({ value: formatStock, on: true });
        // setGlobalUpdate((prev) => {
        //     return { ...prev, stock: formatStock };
        // });
    });

    const onPriceClickAwayRef = useClickAway(() => {
        if (!priceValue.value) return;
        
        const formatPrice = formatData(priceValue.value, 2);

        setPriceValue({ value: formatPrice, on: true });
        // setGlobalUpdate((prev) => {
        //     return { ...prev, price: formatPrice };
        // });
    });
    const checkQuantity = variations.some(
        (item) => item.quantityHeader.on == true
    );
    const checkPrice = variations.some((item) => item.priceHeader.on == true);
    const handlePriceChange = (value) => {
  
        const options = {
            ...priceOptions,
            value,
            setValue: setPriceValue,
            setError,
            isObject: true,
        };
        handleValue(options);
    };

    const handleStockChange = (value) => {
        const options = {
            ...quantityOptions,
            value,
            setValue: setStockValue,
            setError,
            isObject: true,
        };
        handleValue(options);
    };

    const priceInputProps = {
        id: 1,
        label: 'Price',
        checker: checkPrice,
        visible: true,
        property: 'price',
        value: priceValue.value,
        handleOnchange: handlePriceChange,
        error,
        setValue: setPriceValue,
        ref: onPriceClickAwayRef,
    };

    const stockInputProps = {
        id: 2,
        label: 'Quantity',
        checker: checkQuantity,
        visible: true,
        property: 'stock',
        value: stockValue.value,
        handleOnchange: handleStockChange,
        error,
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

                                    <InventoryInput
                                        {...props}
                                        ref={props?.ref}
                                    />
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

function InventoryInput(props) {
    const { setValue, value } = props;

    useEffect(() => {
      
        setValue((obj) => ({ ...obj, on: true }));

        return () => {
          
            setValue((obj) => ({ ...obj, on: false }));
        };
    }, []);

    return <Input {...props} />;
}
