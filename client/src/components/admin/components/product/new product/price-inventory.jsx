import { useNewProduct } from '../../../../../context/newProductContext';
import New_Product_Header from './header';
import Input from './input';
import './new_product.scss';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import formatData from './variation/formatData';
import { useState } from 'react';
export default function Price_Inventory() {
    const { globalUpdate, setGlobalUpdate } = useNewProduct();
    const [priceValue, setPriceValue] = useState('');
    const [stockValue, setStockValue] = useState('');
    const { variations } = useNewProduct();
    const checkPrice = variations.some((item) => item.priceHeader.on == true);


    const onStockClickAway = () => {
    

        if(!stockValue ) return
        const formatStock = formatData(stockValue,0)

        setStockValue(formatStock)
        setGlobalUpdate((prev) =>  {return {...prev, stock: formatStock}})
    }

    const onPriceClickAway = () => {
     
        if(!priceValue ) return
        const formatPrice = formatData(priceValue,2)

        setPriceValue(formatPrice)
        setGlobalUpdate((prev) =>  {return {...prev, price: formatPrice}})
    }
    const checkQuantity = variations.some(
        (item) => item.quantityHeader.on == true
    );

    const handlePriceChange = (e) => {
        setPriceValue(e.target.value);
    };

    const handleStockChange = (e) => {
        setStockValue(e.target.value);
    };
    return (
        <section className="new-product-wrapper">
            <section id="price-inventory" className="flex flex-col">
                <New_Product_Header
                    title="Price & Inventory"
                    text="Set a price for your item and indicate how many are available for sale."
                />

                {checkPrice == false ? (
                    <Input label={'Price'}>
                        <ClickAwayListener onClickAway={onPriceClickAway}>
                            <section className='relative flex mt-3 mb-4 items-center'>
                             <span className='absolute left-3 text-xl top-1/2 translate-y-[-50%] font-medium'>£</span>
                            <input
                                type="text"
                                className={'price-input !m-0 !px-7 text-lg'}
                                onChange={handlePriceChange}
                                value={priceValue}

                            />
                            </section>
                           
                        </ClickAwayListener >
                    </Input>
                ) : (
                    <DisableInput text={'Price'} />
                )}

                {checkQuantity == false ? (
                    <Input label={'Quantity'}>
                        <ClickAwayListener onClickAway={onStockClickAway}>
                            <input
                                type="text"
                                className="quantity-input"
                                value={stockValue}
                                onChange={handleStockChange}
                            />
                        </ClickAwayListener>
                    </Input>
                ) : (
                    <DisableInput text={'Quantity'} />
                )}
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
