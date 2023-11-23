import { useEffect, useReducer, useRef, useState } from 'react';
import Promo_Voucher_header from '../promo-voucher-header';
import Address_Form from './address-form';
import Customer_Info from './customer-info';
import Change_Btn from '../../common/btn/change-btn';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from '../../../api/axios';
import Address_Item from './address-item';
import { useCheckoutContext } from '../../../context/checkOutContext';
import Address_Book from './address-book';
import checkoutViewReducer from '../../../hooks/checkoutViewReducer';

function Address({ mainAddress, setMainAddress, defaultProperty, addressType}) {
    const {
        error,
        setError,
        defaultAddresses,
        setDefaultAddresses,
        addresses,
        setAddresses,
    } = useCheckoutContext();

    const [viewContent, viewDispatch] = useReducer(checkoutViewReducer, 'main');
    const [checkAddress, setCheckAddress] = useState(null);

    const [sortAddresses, setSortAddresses] = useState({});
    const [loading, setLoading] = useState(false);
    const [editAddress, setEditAddress] = useState({
        edit: false,
        address: {},
    });
    const [temporaryMainAddress, setTemporaryMainAddress] =
        useState(mainAddress);

    useEffect(() => {
        const newAddresses = [...addresses].sort((a, b) => {
            if (a._id == defaultAddresses[defaultProperty]) {
                return -1;
            } else if (b._id == defaultAddresses[defaultProperty]) {
                return +1;
            } else {
                return 0;
            }
        });

        setSortAddresses(() => newAddresses);
    }, [addresses]);
    useEffect(() => {
        setTemporaryMainAddress(() => mainAddress);
    }, [mainAddress]);

    const cancel = () => {
        setTemporaryMainAddress(() => mainAddress);
        viewDispatch({ type: 'main' });
        setEditAddress(() => ({ edit: false }));
    };

    const handleClick = (updateMainAddress = true) => {
        if (updateMainAddress) {
            setMainAddress(() => temporaryMainAddress);
        }

        setEditAddress(() => ({ edit: false }));
    };

    const handleEdit = (address) => {
        setTemporaryMainAddress(() => address);
        setEditAddress((prevState) => ({ ...prevState, edit: true, address }));
        viewDispatch({ type: 'edit' });
    };

    const handleNewAddress = () => {
        setTemporaryMainAddress({});
        viewDispatch({ type: 'add' });
    };

    const handleDefault = (id) => {
        setLoading(true);
        console.log(id);
        const data = {
            [defaultProperty]: id,
        };

        console.log({ data });
        axios
            .put('user/address/changeDefault', data)
            .then((res) => {
                console.log(res.data);

                setTimeout(() => {
                    setDefaultAddresses(() => res.data.default_address);
                    setLoading(false);
                }, 1000);
            })
            .catch((error) => {
                console.error('error while settng default address: ', error);
            });
    };

    const addressFormProps = {
        setLoading,
        setAddresses,
        setDefaultAddresses,

        cancel,
        address: temporaryMainAddress,
        setAddress: setTemporaryMainAddress,
        handleClick,
        viewDispatch,
    };

    const views = {
        book: (
            <Address_Book
                loading={loading}
                viewDispatch={viewDispatch}
                handleNewAddress={handleNewAddress}
                sortAddresses={sortAddresses}
                addressItemProps={{
                    checkAddress,
                    addressType,
                    setCheckAddress,
                    defaultAddresses,
                    defaultProperty,
                    handleDefault,
                    handleEdit,
                    loading,
                    setLoading,
                    setMainAddress,
                    addressType,
                    viewDispatch,
                    currentAddressId: mainAddress?._id,
                }}
            />
        ),

        edit: <Address_Form type={'edit'} {...addressFormProps} />,

        add: <Address_Form type={'add'} {...addressFormProps} />,

        main: (
            <div className="adress-info-container flex flex-row items-baseline justify-between">
                <Customer_Info customer={mainAddress} />
                <button
                    type="button"
                    id="checkout-change-btn"
                    onClick={() => {
                        if (addresses.length > 1) {
                            viewDispatch({ type: 'book' });
                        } else {
                            viewDispatch({ type: 'edit' });
                        }
                    }}
                >
                    CHANGE
                </button>
            </div>
        ),
    };

    return (
        <section className="relative">
            <section
                id="address"
                className={`relative ${loading ? 'opacity-50' : 'opacity-100'}`}
            >
                <HelmetProvider>
                    <Helmet>
                        <script
                            type="text/javascript"
                            src="http://api.addressnow.co.uk/js/addressnow-2.20.min.js?key=hk78-xb99-fb17-wb83"
                        ></script>
                    </Helmet>
                </HelmetProvider>

                <h1 className="checkout-title">{addressType} ADDRESS</h1>
                <div id="address-container">
                    <div className={`address-header relative`}>
                        {views[viewContent]}
                    </div>
                </div>
            </section>

            {loading && (
                <div className="spinner-circle absolute left-2/4 top-2/4 z-10 translate-x-[-50%] translate-y-[-50%] opacity-100 [--spinner-color:var(--gray-12)]"></div>
            )}
        </section>
    );
}

export default Address;
