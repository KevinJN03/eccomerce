import { useNewProduct } from '../../../../../context/newProductContext';
import New_Product_Header from './header';
import InputLabel from './inputLabel.jsx';

import { Input as InventoryInput } from './variation/table/row';
import './new_product.scss';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import formatData from './variation/formatData';
import { useState } from 'react';
import OptionError from './variation/error/optionError';
import { useEffect } from 'react';
import useNewProductError from '../../../../../useNewProductError';
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
    } = useNewProduct();

    const { variations } = useNewProduct();
    const checkPrice = variations.some((item) => item.priceHeader.on == true);
    const [error, setError] = useState({ price: null, stock: null });
    const [priceError, setPriceError] = useState('');
    const [stockError, setStockError] = useState('');

    // useNewProductError('price', setPriceError);
    // useNewProductError('stock', setStockError);

    useEffect(() => {
        setPriceError('');
    }, [priceValue]);

    useEffect(() => {
        setStockError('');
    }, [stockValue]);

    useEffect(() => {
        return () => {
            setPriceValue('');
            setPriceValue('');
        };
    }, []);
    const onStockClickAway = () => {
        if (!stockValue) return;
        const formatStock = formatData(stockValue, 0);

        setStockValue(formatStock);
        setGlobalUpdate((prev) => {
            return { ...prev, stock: formatStock };
        });
    };

    const onPriceClickAway = () => {
        if (!priceValue) return;
        const formatPrice = formatData(priceValue, 2);

        setPriceValue(formatPrice);
        setGlobalUpdate((prev) => {
            return { ...prev, price: formatPrice };
        });
    };
    const checkQuantity = variations.some(
        (item) => item.quantityHeader.on == true
    );

    const handlePriceChange = (e) => {
        setPriceValue(e.target.value);
    };

    const handleStockChange = (e) => {
        setStockValue(e.target.value);
    };

    const priceInputProps = {
        label: 'Price',
        checker: checkPrice,
        visible: true,
        property: 'price',
        value: priceValue,
        handleOnchange: handlePriceChange,
        error,
    };

    const stockInputProps = {
        label: 'Quantity',
        checker: checkQuantity,
        visible: true,
        property: 'stock',
        value: stockValue,
        handleOnchange: handleStockChange,
        error,
    };

    return (
        <section className="new-product-wrapper">
            <section id="price-inventory" className="flex flex-col">
                <New_Product_Header
                    title="Price & Inventory"
                    text="Set a price for your item and indicate how many are available for sale."
                />
                {[priceInputProps, stockInputProps].map((item)=> {

                    const {checker, label} = item
                    return (
                        <>
                        {!checker ? (
                            <>
                              <InputLabel label={label} id={label.toLowerCase()} />
                                <ClickAwayListener onClickAway={onPriceClickAway}>
                                    <InventoryInput {...item} />
                                </ClickAwayListener>
                            </>
                        ) : (
                            <DisableInput text={'Price'} />
                        )}
                        </>
                    )
  
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