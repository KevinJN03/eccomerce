import { useNewProduct } from '../../../../../context/newProductContext';
import New_Product_Header from './header';
import Input from './input';
import './new_product.scss';
export default function Price_Inventory() {

    const {variations} = useNewProduct()
    const checkPrice = variations.some((item) => item.priceHeader.on == true);

    const checkQuantity = variations.some(
        (item) => item.quantityHeader.on == true
    );

    return (
        <section  className="new-product-wrapper">
            <section id="price-inventory" className="flex flex-col">
                <New_Product_Header
                    title="Price & Inventory"
                    text="Set a price for your item and indicate how many are available for sale."
                />

                {checkPrice == false ? (
                    <Input label={'Price'} className={'price-input'} />
                ) : (
                   <DisableInput text={'Price'}/>
                )}

                {checkQuantity == false ? (
                    <Input label={'Quantity'} className={'quantity-input'} />
                ) : (
                    <DisableInput text={'Quantity'}/>
                )}
            </section>
        </section>
    );
}

function DisableInput({text}) {
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
