import { Modal } from '@mui/material';
import New_Product_Header from './header';
import MultipleSelect from './select/select';
import CategorySelect from './select/select';
import { useEffect, useState } from 'react';
import axios from '../../../../../api/axios';
function Details() {
    const [category, setCategory] = useState([]);

    const fetchData = (route, setState) => {
        axios
            .get(route)
            .then((res) => {
                if (res.status == 200) {
                    setState(res.data);
                }
            })
            .catch((error) => {
                console.log('error at details: ', error);
            });
    };
    useEffect(() => {
        fetchData('category', setCategory);
    }, []);
    return (
        <section className="new-product-wrapper">
            <section id="details">
                <New_Product_Header
                    title={'Details'}
                    text={
                        'Share a few more specifics about your item to make it easier to find in search, and to help buyers know what to expect.'
                    }
                />

                <div className="flex flex-col">
                    <CategorySelect
                        options={category.map((cat) => cat.name.toUpperCase())}
                        title="Category"
                    />
                    <CategorySelect options={['Men', 'Women']} title="Gender" />

                
                </div>
            </section>
        </section>
    );
}

export default Details;
