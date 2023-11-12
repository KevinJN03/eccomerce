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

function Index({}) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { address, setModalCheck, modalContentDispatch } =
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
navigate(`edit/${id}`)
     
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
                    <div class="spinner-circle [--spinner-color:var(--gray-9)] "></div>
                </div>
            ) : (
                <>
                {console.log('address before', address)}
                    {address &&
                        address?.map((addressItem, idx) => {
                            return (
                                <section
                                    key={addressItem._id}
                                    className="mt-2 flex flex-row justify-between bg-white px-4 py-8"
                                >
                                    <div className="left">
                                        <Customer_Info
                                            customer={addressItem}
                                            elementClass={'text-base'}
                                        />
                                        {
                                            idx == 0 && <div className='mt-3 flex gap-y-3 flex-col'>
                                                <p>This is your default delivery address</p>
                                                <p>This is your default billing address</p>
                                                </div>
                                        }
                                    </div>
                                    <div className="right flex flex-col gap-y-4">
                                        <EditButton handleEdit={() => handleEdit(addressItem._id)} />

                                        <DeleteButton
                                            handleDelete={() =>
                                                handleDelete(addressItem._id)
                                            }
                                            isDefault={idx == 0}
                                        />
                                    </div>
                                </section>
                            );
                        })}
                </>
            )}
        </>
    );
}

export default Index;
