import { Modal } from '@mui/material';
import New_Product_Header from './header';
import MultipleSelect from './select/select';
import CategorySelect from './select/select';

function Details() {
    return (
        <section id="details">
            <New_Product_Header
                title={'Details'}
                text={
                    'Share a few more specifics about your item to make it easier to find in search, and to help buyers know what to expect.'
                }
            />

            <div className="flex flex-col">
                <CategorySelect options={['Men', 'Women']} title="Category" />
                <CategorySelect
                    options={['Shirt', 'Bottoms', 'Shoe', 'Accessory']}
                    title="Category"
                />
                <CategorySelect
                    options={[
                        'Red',
                        'Yellow',
                        'Blue',
                        'Green',
                        'Orange',
                        'Black',
                        'White',
                    ]}
                    title="Primary Color"
                />
                <CategorySelect
                    options={[
                        'Red',
                        'Yellow',
                        'Blue',
                        'Green',
                        'Orange',
                        'Black',
                        'White',
                    ]}
                    title="Secondary Color"
                />
            </div>
        </section>
    );
}

export default Details;
