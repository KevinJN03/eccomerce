import SideBar from '../sidebar/sidebar';
import Navbar from '../navbar/navbar.jsx';
import './all_product.scss';
import Datatable from '../users/datatable/datatable';
import { useEffect, useState } from 'react';
import axios from '../../../../api/axios';
import { productColumn } from '../users/datatable/datatable-source';
import actionColumn from '../users/datatable/actionColumn.jsx';
function All_Products() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [selection, setSelection] = useState([]);

    useEffect(() => {
        axios
            .get('/product')
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => {});
    }, [loading]);
    const deleteButtonClick = () => {};
    const columnAction = actionColumn({
        selection,
        viewBtn: false,
        deleteButtonClick,
    });
    return (
        <Datatable
            type="product"
            loading={loading}
            setLoading={setLoading}
            column={productColumn}
            row={products}
            actionColumn={columnAction}
        />
    );
}

export default All_Products;
