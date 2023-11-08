import Header from '../header';
import home_icon from '../../../assets/icons/home.png';
import exampleCustomerInfo from '../../checkout/address form/example-customer-info';
import { useState } from 'react';
import Customer_Info from '../../checkout/address form/customer-info';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
function Index({}) {
    const [customerAddress, setCustomerAddress] = useState(exampleCustomerInfo);

    const navigate = useNavigate()
    return (
        <>
            <Header
                icon={home_icon}
                text={'ADDRESS BOOK'}
                buttonText={'ADD NEW ADDRESS'}
                buttonClick={() => navigate('add')}
            />

            <section className="mt-2 flex flex-row justify-between bg-white px-4 py-8">
                <div className="left">
                    <Customer_Info
                        customer={customerAddress}
                        elementClass={'text-base'}
                    />
                </div>
                <div className="right flex flex-col gap-y-4">
                    <span className="flex cursor-pointer items-center gap-x-2 self-end">
                        <p className="text-base font-medium">EDIT</p>
                        <EditSharpIcon className="!text-3xl" onClick={() => navigate('edit/1')} />
                    </span>
                    <span className="flex cursor-pointer items-center gap-x-2 self-end">
                        <p className="text-base font-medium">DELETE</p>
                        <DeleteSharpIcon className="!text-3xl" />
                    </span>
                </div>
            </section>
        </>
    );
}

export default Index;
