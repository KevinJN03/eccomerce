import Header from '../header';
import home_icon from '../../../assets/icons/home.png';
import exampleCustomerInfo from '../../checkout/address form/example-customer-info';
import { useState } from 'react';
import Customer_Info from '../../checkout/address form/customer-info';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { Outlet } from 'react-router-dom';
function Addresses({}) {
    const [customerAddress, setCustomerAddress] = useState(exampleCustomerInfo);
    return (
        <section className="Addresses">
            <Outlet />
        </section>
    );
}

export default Addresses;