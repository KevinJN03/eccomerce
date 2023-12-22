import Header from '../header';
import home_icon from '../../../assets/icons/home.png';
import exampleCustomerInfo from '../../checkout/address/example-customer-info';
import { useState } from 'react';
import Customer_Info from '../../checkout/address/customer-info';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { Outlet } from 'react-router-dom';
function Addresses({}) {
    const [customerAddress, setCustomerAddress] = useState(exampleCustomerInfo);
    return (
        <section className="Addresses w-full">
            <Outlet />
        </section>
    );
}

export default Addresses;
