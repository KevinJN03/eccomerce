import SideBar from '../sidebar/sidebar';
import Navbar from '../navbar/navbar.jsx';
import './all_product.scss';
import Datatable from '../users/datatable/datatable';

function All_Products() {
    return (
        <section className="product">
            <SideBar />
            <div className="productContainer">
                <Navbar />
                <Datatable type="Product" />
            </div>
        </section>
    );
}

export default All_Products;
