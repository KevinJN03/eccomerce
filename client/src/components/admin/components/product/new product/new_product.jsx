// import "./new_product.scss"

import SideBar from '../../sidebar/sidebar';
import Navbar from '../../navbar/navbar';
import About from'./about.jsx'
import Price_Inventory from './price-inventory';
import Details from './details';
import Delivery from './delivery/delivery';
import DragDropFile from './dragDropFile';
import { ContentProvider } from '../../../../../context/ContentContext';

function New_Product() {
    return (
        <section className="new-product">
            <SideBar />
            <div className="new-product-container">
                <Navbar />

                <div className="product-listing">
                    <div className="title mb-6 font-gotham text-3xl font-bold tracking-wider">
                        New Listing
                    </div>
                    <div className="subheader ">
                        <a href="#about">About</a>
                        <a href="#price-inventory">Price & Inventory</a>
                        <a href="#variations">Variations</a>
                        <a href="#details">Details</a>
                        <a href="#delivery">Delivery</a>
                        <a href="#settings">Settings</a>
                    </div>
                    <About />
                    
                    <Price_Inventory />
                    <Details />
                    <ContentProvider>
                           <Delivery />
                    </ContentProvider>
                 
                </div>
            </div>
        </section>
    );
}

export default New_Product;
