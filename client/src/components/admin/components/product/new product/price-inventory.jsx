import New_Product_Header from './header';
import Input from './input';
import './new_product.scss';
export default function Price_Inventory() {
    return (
        <section id="price-inventory" className="flex flex-col">
            <New_Product_Header
                title="Price & Inventory"
                text="Set a price for your item and indicate how many are available for sale."
            />

            <Input label={'Price'} className={'price-input'} />
            <Input label={'Quantity'} className={'quantity-input'} />
        </section>
    );
}
