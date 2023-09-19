import SideBar from '../sidebar/sidebar';
import Navbar from '../navbar/navbar.jsx';
import './all_product.scss';
import Datatable from '../users/datatable/datatable';
import { useEffect, useState } from 'react';
import axios from '../../../../api/axios';
function All_Products() {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/product').then((res) => {
            setProducts(res.data);
            console.log(res.data);
        });
    }, [loading]);
    return (
        <section className="product">
            <SideBar />
            <div className="productContainer">
                <Navbar />
                <Datatable type="Product" products={products} loading={loading} setLoading={setLoading}/>
            </div>
        </section>
    );
}

export default All_Products;
