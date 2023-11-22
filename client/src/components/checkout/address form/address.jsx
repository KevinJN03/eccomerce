import { useEffect, useRef, useState } from 'react';
import Promo_Voucher_header from '../promo-voucher-header';
import Address_Form from './address-form';
import Customer_Info from './customer-info';
import Change_Btn from '../../common/btn/change-btn';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from '../../../api/axios';
import Address_Item from './address-item';

function Address({
    mainAddress,
    setMainAddress,
    addresses,
    defaultAddresses,
    defaultProperty,
    setDefaultAddresses,
}) {
    const [checkAddress, setCheckAddress] = useState(null);

    const [sortAddresses, setSortAddresses] = useState({});
    const [loading, setLoading] = useState(false);
    const [editAddress, setEditAddress] = useState({
        edit: false,
        address: {},
    });
    const [temporaryMainAddress, setTemporaryMainAddress] =
        useState(mainAddress);
    const [newAddress, setNewAddress] = useState(false);

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

    const [change, setChange] = useState(false);

    const cancel = () => {
        setTemporaryMainAddress(() => mainAddress);
        setChange(() => false);
        setEditAddress(() => ({ edit: false }));
        setNewAddress(false);
    };

    const handleClick = () => {
        setMainAddress(() => temporaryMainAddress);
        setChange(() => false);
        setEditAddress(() => ({ edit: false }));
    };

    const handleEdit = (address) => {
        setEditAddress((prevState) => ({ ...prevState, edit: true, address }));
    };

    const handleNewAddress = () => {
        setNewAddress(true);
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
    const content = () => {
        if (!change) {
            return (
                <div className="adress-info-container flex flex-row items-baseline justify-between">
                    <Customer_Info customer={mainAddress} />
                    {/* <button type="button" id="checkout-change-btn" onClick={()=> setChange(!change)}>Change</button> */}
                    <Change_Btn setChange={setChange} change={change} />
                </div>
            );
        }

        if (change && addresses.length > 1) {
            return (
                <section className="flex flex-col gap-y-6">
                    {newAddress ? (
                        <Address_Form
                        type={'add'}
                            setChange={setChange}
                            cancel={cancel}
                            address={{}}
                            setAddress={setTemporaryMainAddress}
                            text={'ADD NEW ADDRESS'}
                            handleClick={handleClick}
                        />
                    ) : editAddress.edit ? (
                        <Address_Form
                            type={'edit'}
                            setChange={setChange}
                            cancel={cancel}
                            text={'EDIT ADDRESS'}
                            address={editAddress.address}
                            setAddress={setTemporaryMainAddress}
                            handleClick={handleClick}
                        />
                    ) : (
                        <>
                            {sortAddresses.map((address, idx) => {
                                const props = {
                                    address,
                                    checkAddress,
                                    setCheckAddress,
                                    defaultAddresses,
                                    defaultProperty,
                                    handleDefault,
                                    handleEdit,
                                    loading,
                                    setLoading,
                                    setMainAddress,
                                    setChange,
                                };

                                return (
                                    <Address_Item
                                        {...props}
                                        key={address._id}
                                    />
                                );
                            })}

                            <div className="flex flex-row justify-between">
                                <button
                                    disabled={loading}
                                    onClick={handleNewAddress}
                                    className="!bg-primary px-4 py-2 font-bold tracking-wider text-white transition-all hover:!bg-black disabled:cursor-not-allowed"
                                >
                                    ADD NEW ADDRESS
                                </button>
                                <button
                                    disabled={loading}
                                    id="checkout-change-btn"
                                    onClick={() => setChange(() => false)}
                                >
                                    CANCEL
                                </button>
                            </div>
                        </>
                    )}
                </section>
            );
        }

        if (change && addresses.length == 1) {
            return (
                <Address_Form
                    setChange={setChange}
                    cancel={cancel}
                    address={temporaryMainAddress}
                    setAddress={setTemporaryMainAddress}
                    handleClick={handleClick}
                />
            );
        }
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

                <h1 className="checkout-title">DELIVERY ADDRESS</h1>
                <div id="address-container">
                    <div className={`address-header relative`}>{content()}</div>
                </div>
            </section>
            {loading && (
                <div class="spinner-circle absolute left-2/4 top-2/4 z-10 translate-x-[-50%] translate-y-[-50%] opacity-100 [--spinner-color:var(--gray-12)]"></div>
            )}
        </section>
    );
}

export default Address;
