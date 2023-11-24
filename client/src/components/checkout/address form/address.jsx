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
import { ClickAwayListener } from '@mui/material';
import { useClickAway } from '@uidotdev/usehooks';
import { AnimatePresence, motion } from 'framer-motion';
import { generateVariants } from './address-item';

function Address({
    mainAddress,
    setMainAddress,
    defaultProperty,
    addressType,
    enableAddressEdit,
}) {
    const {
        error,
        setError,
        defaultAddresses,
        setDefaultAddresses,
        addresses,
        setAddresses,
        disableOtherComponents,
        SetDisableOtherComponents,
    } = useCheckoutContext();

    const [viewContent, viewDispatch] = useReducer(checkoutViewReducer, 'main');
    const [checkAddress, setCheckAddress] = useState(null);
    const [height, setHeight] = useState('0');
    const [sortAddresses, setSortAddresses] = useState({});
    const [loading, setLoading] = useState(false);
    const [editAddress, setEditAddress] = useState({
        edit: false,
        address: {},
    });
    const [temporaryMainAddress, setTemporaryMainAddress] =
        useState(mainAddress);

    const disable =
        disableOtherComponents.disable &&
        disableOtherComponents.addressType != addressType;

    const clickAwayRef = useClickAway(() => {
        if (!disableOtherComponents.disable) {
            return;
        }
        if (disableOtherComponents.addressType == addressType) {
            SetDisableOtherComponents(() => ({
                disable: false,
                addressType: null,
            }));
            viewDispatch({ type: 'main' });
        }
    });
    const mainComponentVariant = generateVariants(0);
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

    const containerRef = useRef();
    // heightRef.current = 10;
    const cancel = () => {
        setTemporaryMainAddress(() => mainAddress);
        viewDispatch({ type: 'main' });
        setEditAddress(() => ({ edit: false }));
        SetDisableOtherComponents({
            addressType: null,
            disable: false,
        });
    };

    const handleClick = (updateMainAddress = true) => {
        if (updateMainAddress) {
            setMainAddress(() => temporaryMainAddress);
        }

        setEditAddress(() => ({ edit: false }));
        SetDisableOtherComponents({
            addressType: null,
            disable: false,
        });
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
        addressType,
    };

    useEffect(() => {
        if (
            disableOtherComponents.disable &&
            disableOtherComponents.addressType != addressType
        ) {
            viewDispatch({ type: 'main' });
        }
    }, [disableOtherComponents.disable, disableOtherComponents.addressType]);

    const views = {
        book: (
            <Address_Book
                viewContent={viewContent}
                cancel={cancel}
                loading={loading}
                viewDispatch={viewDispatch}
                handleNewAddress={handleNewAddress}
                sortAddresses={sortAddresses}
                addressItemProps={{
                    viewContent,
                    enableAddressEdit,
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
                    handleClick,
                    currentAddressId: mainAddress?._id,
                }}
            />
        ),

        edit: <Address_Form type={'edit'} {...addressFormProps} />,

        add: <Address_Form type={'add'} {...addressFormProps} />,

        main: (
            <motion.div
                className="adress-info-container flex flex-row items-baseline justify-between"
                variants={mainComponentVariant}
                animate={'animate'}
                initial={'initial'}
                exit={'exit'}
               
            >
                <Customer_Info customer={mainAddress} />
                <button
                    disabled={
                        disableOtherComponents.disable &&
                        disableOtherComponents.addressType != addressType
                    }
                    type="button"
                    id="checkout-change-btn"
                    onClick={() => {
                        if (
                            disableOtherComponents.disable &&
                            disable.addressType != addressType
                        ) {
                            return;
                        }

                        SetDisableOtherComponents(() => ({
                            addressType,
                            disable: true,
                        }));
                        viewDispatch({ type: 'book' });
                    }}
                >
                    CHANGE
                </button>
            </motion.div>
        ),
    };

    const variants = {
        initial: {
            height: containerRef?.current
                ? containerRef.current.clientHeight + 'px'
                : 'auto',
            opacity: 0.5,
        },
        animate: {
            height: 'auto',

            opacity: 1,

            transition: { duration: 0.7 },
        },

        // exit: {
        //     opacity: 1,
        //     height: 0,

        //     transition: { duration: 3, ease: 'easeOut'},
        // },
    };

    const onClickAway = () => {
        if (!disableOtherComponents.disable) {
            return;
        }
        console.log('testing');
        if (disableOtherComponents.addressType == addressType) {
            SetDisableOtherComponents({
                disable: false,
                addressType: null,
            });
            viewDispatch({ type: 'main' });
        }
    };
    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <motion.section
                className={`relative ${
                    disable ? 'disable-component' : 'display-component'
                }`}
                ref={clickAwayRef}
            >
                <section
                    id="address"
                    className={`${loading ? 'opacity-50' : 'opacity-100'}`}
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
                    <div id="address-container" ref={containerRef}>
                        <AnimatePresence>
                            <motion.div
                                className={`address-header relative`}
                                key={viewContent}
                                variants={variants}
                                animate={'animate'}
                                initial={'initial'}
                                exit={'exit'}
                            >
                                {views[viewContent]}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>

                {loading && (
                    <div className="spinner-circle absolute left-2/4 top-2/4 z-10 translate-x-[-50%] translate-y-[-50%] opacity-100 [--spinner-color:var(--gray-12)]"></div>
                )}
            </motion.section>
        </ClickAwayListener>
    );
}

export default Address;
