import SideBar from '../sidebar/sidebar';
import Navbar from '../navbar/navbar.jsx';
import './all_product.scss';
import Datatable from '../users/datatable/datatable';
import { useEffect, useState } from 'react';
import axios from '../../../../api/axios';
import { productColumn } from '../users/datatable/datatable-source';
function All_Products() {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/product').then((res) => {
            setProducts(res.data)
        });
    }, [loading]);

    console.log({products})
    return (
        <section className="product">
            <SideBar />
            <div className="productContainer">
                <Navbar />
                <Datatable type="product" loading={loading} setLoading={setLoading} column={productColumn} row={products}/>
            </div>
        </section>
    );
}

export default All_Products;
