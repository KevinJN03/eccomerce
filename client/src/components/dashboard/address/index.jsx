import Header from '../header';
import home_icon from '../../../assets/icons/home.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserDashboardContext } from '../../../context/userContext';
import Address_Item from './addressItem';
import Empty_Body from '../empty-body';

function Index({}) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { address, setModalCheck, modalContentDispatch, defaultAddresses } =
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

    const content = () => {
        if (address.length > 0) {
            return address
                .sort((a, b) => {
                    console.log('addressId: ', a._id);
                    if (a._id == defaultAddresses?.shipping_address) {
                        return -1;
                    } else if (b._id == defaultAddresses?.shipping_address) {
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
                });
        } else {
            return (
                <Empty_Body
                    text={{
                        big: 'YOU CURRENTLY HAVE NO ADDRESSES',
                        small: '',
                        btn: 'ADD ADDRESS',
                    }}
                    link={'add'}
                />
            );
        }
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
                <div className="flex h-[400px]  w-full items-center justify-center">
                    <div className="spinner-circle [--spinner-color:var(--gray-9)] "></div>
                </div>
            ) : (
                <section className=''>
                    {
                        content()
                      
                    }
                </section>
            )}
        </>
    );
}

export default Index;
