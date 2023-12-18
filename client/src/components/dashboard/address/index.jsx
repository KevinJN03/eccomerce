import Header from '../header';
import home_icon from '../../../assets/icons/home.png';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserDashboardContext } from '../../../context/userContext';
import Address_Item from './addressItem';
import Empty_Body from '../empty-body';
import Pagination from '../pagination/pagination.jsx';

function Index({}) {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
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

    const divideBy2 = Math.ceil(address?.length / 2);

    const newOrdersArray = useMemo(() => {
        return address
            ?.sort((a, b) => {
                if (a._id == defaultAddresses?.shipping_address) {
                    return -1;
                } else if (b._id == defaultAddresses?.shipping_address) {
                    return +1;
                }

                return 0;
            })
            .slice(2 * page - 2, page * 2);
    }, [page, loading]);

    const content = () => {
        if (address.length > 0) {
            return (
                <>
                    <section>
                        {newOrdersArray.map((addressItem, idx) => {
                            return (
                                <Address_Item
                                    setPage={setPage}
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
                    </section>

                    {address?.length > 2 && (
                        <div className="pagination mt-3 justify-end">
                            <Pagination
                                divideBy={divideBy2}
                                setPage={setPage}
                                page={page}
                            />
                        </div>
                    )}
                </>
            );
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
        <section className='w-full'>
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
                <section className="">{content()}</section>
            )}
        </section>
    );
}

export default Index;
