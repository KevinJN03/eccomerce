import Header from '../header';
import home_icon from '../../../assets/icons/home.png';
import exampleCustomerInfo from '../../checkout/address form/example-customer-info';
import { useState, useEffect } from 'react';
import Customer_Info from '../../checkout/address form/customer-info';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useUserDashboardContext } from '../../../context/userContext';
import { DeleteButton } from '../delete-btn';
import EditButton from '../edit-btn';
import Address_Item from './addressItem';

function Index({}) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { address, setModalCheck, modalContentDispatch, defaultAddresses, } =
        useUserDashboardContext();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [address]);

    const handleDelete = (id) => {
        modalContentDispatch({
            type: 'deleteAddress',
            id,
        });
        setModalCheck(() => true);
    };

    const handleEdit = (id) => {
        navigate(`edit/${id}`);
    };

    return (
        <>
            <Header
                icon={home_icon}
                text={'ADDRESS BOOK'}
                buttonText={'ADD NEW ADDRESS'}
                buttonClick={() => navigate('add')}
            />
            {loading ? (
                <div className="flex h-[400px] w-full items-center justify-center">
                    <div className="spinner-circle [--spinner-color:var(--gray-9)] "></div>
                </div>
            ) : (
                <>
                    {address
                        .sort((a, b) => {
                            console.log('addressId: ', a._id);
                            if (a._id == defaultAddresses?.shipping_address) {
                                return -1;
                            } else if (
                                b._id == defaultAddresses?.shipping_address
                            ) {
                                return +1;
                            }

                            return 0;
                        })
                        .map((addressItem, idx) => {
                            return (
                                <Address_Item
                                    setLoading={setLoading}
                                    isDefaultShippingAddress={
                                        defaultAddresses?.shipping_address ==
                                        addressItem._id
                                    }
                                    isDefaultBillingAddress={
                                        defaultAddresses?.billing_address ==
                                        addressItem._id
                                    }
                                    key={addressItem._id}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                    addressItem={addressItem}
                                    idx={idx}
                                />
                            );
                        })}
                </>
            )}
        </>
    );
}

export default Index;
