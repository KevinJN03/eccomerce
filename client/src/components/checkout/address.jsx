import { useEffect, useState } from 'react';
import Promo_Voucher_header from './promo-voucher-header';
import Address_Form from './address form/address-form';
import Customer_Info from './address form/customer-info';
import Change_Btn from '../common/btn/change-btn';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function Address({
    shippingAddress,
    setShippingAddress,
    addresses,
    defaultAddresses,
    defaultProperty,
}) {
    const [checkAddress, setCheckAddress] = useState(
        defaultAddresses[defaultProperty]
    );

    const [editAddress, setEditAddress] = useState({
        edit: false,
        address: {},
    });
    const [temporaryShippingAddress, setTemporaryShippingAddress] =
        useState(shippingAddress);
    const [newAddress, setNewAddress] = useState(false);
    useEffect(() => {
        setTemporaryShippingAddress(() => shippingAddress);
    }, [shippingAddress]);

    useEffect(() => {
        setCheckAddress(() => defaultAddresses[defaultProperty]);
    }, [defaultAddresses]);
    const [change, setChange] = useState(false);

    const cancel = () => {
        setTemporaryShippingAddress(() => shippingAddress);
        setChange(() => false);
        setEditAddress(() => ({ edit: false }));
        setNewAddress(false);
    };

    const handleClick = () => {
        setShippingAddress(() => temporaryShippingAddress);
        setChange(() => false);
        setEditAddress(() => ({ edit: false }));
    };

    const handleEdit = (address) => {
        setEditAddress((prevState) => ({ ...prevState, edit: true, address }));
    };

    const handleNewAddress = () => {
        setNewAddress(true);
    };

    const content = () => {
        if (!change) {
            return (
                <div className="adress-info-container flex flex-row items-baseline justify-between">
                    <Customer_Info customer={shippingAddress} />
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
                            setChange={setChange}
                            cancel={cancel}
                            address={{}}
                            setAddress={setTemporaryShippingAddress}
                            text={'ADD NEW ADDRESS'}
                            handleClick={handleClick}
                        />
                    ) : editAddress.edit ? (
                        <Address_Form
                            setChange={setChange}
                            cancel={cancel}
                            text={'EDIT ADDRESS'}
                            address={editAddress.address}
                            setAddress={setTemporaryShippingAddress}
                            handleClick={handleClick}
                        />
                    ) : (
                        <>
                            {[...addresses]
                                .sort((a, b) => {
                                    if (
                                        a._id ==
                                        defaultAddresses[defaultProperty]
                                    ) {
                                        return -1;
                                    } else if (
                                        b._id ==
                                        defaultAddresses[defaultProperty]
                                    ) {
                                        return +1;
                                    } else {
                                        return 0;
                                    }
                                })
                                .map((address, idx) => {
                                    return (
                                        <section className="border-b-[1px]">
                                            <div
                                                key={address._id}
                                                className="flex flex-row items-center"
                                            >
                                                <Customer_Info
                                                    customer={address}
                                                />
                                                <input
                                                    onChange={() =>
                                                        setCheckAddress(
                                                            () => address._id
                                                        )
                                                    }
                                                    type="radio"
                                                    name="address"
                                                    className="daisy-radio ml-auto mr-20"
                                                    checked={
                                                        checkAddress ==
                                                        address._id
                                                    }
                                                />
                                            </div>

                                            {address._id ==
                                            defaultAddresses[
                                                defaultProperty
                                            ] ? (
                                                <p className="mt-6">
                                                    This is your default
                                                    delivery address
                                                </p>
                                            ) : (
                                                <div className="mt-6 flex items-center gap-x-3">
                                                    <input
                                                        type="checkbox"
                                                        id="checkbox"
                                                        className="daisy-checkbox rounded-none"
                                                    />
                                                    <p>
                                                        Set as your default
                                                        delivery address
                                                    </p>
                                                </div>
                                            )}

                                            <button
                                                onClick={() =>
                                                    handleEdit(address)
                                                }
                                                className={
                                                    'my-5 text-sm font-bold tracking-widest hover:underline'
                                                }
                                            >
                                                EDIT ADDRESS
                                            </button>
                                        </section>
                                    );
                                })}

                            <div className="flex flex-row justify-between">
                                <button
                                    onClick={handleNewAddress}
                                    className="!bg-primary px-4 py-2 font-bold tracking-wider text-white transition-all hover:!bg-black"
                                >
                                    ADD NEW ADDRESS
                                </button>
                                <button
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
                    address={temporaryShippingAddress}
                    setAddress={setTemporaryShippingAddress}
                    handleClick={handleClick}
                />
            );
        }
    };
    return (
        <section id="address">
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
                <div className="address-header">{content()}</div>
            </div>
        </section>
    );
}

export default Address;
