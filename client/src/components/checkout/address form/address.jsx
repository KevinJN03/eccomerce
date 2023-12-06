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
import { AnimatePresence, motion } from 'framer-motion';

import Main from './main';
import { AddressContextProvider } from '../../../context/checkOutAddressContext';
import _ from 'lodash';
const views = {
    book: <Address_Book />,
    edit: <Address_Form type={'edit'} />,
    add: <Address_Form type={'add'} />,
    main: <Main />,
};

function Address({
    mainAddress,
    setMainAddress,
    defaultProperty,
    addressType,
    enableAddressEdit,
    disableHeader,
    disableChangeBtn,
    subHeader,
    disable,
}) {
    const {
        defaultAddresses,
        setDefaultAddresses,
        addresses,
        setAddresses,
        disableOtherComponents,
        SetDisableOtherComponents,
        isDataSet,
    } = useCheckoutContext();

    const [viewContent, viewDispatch] = useReducer(checkoutViewReducer, 'main');
    const [checkAddress, setCheckAddress] = useState(null);
    const [sortAddresses, setSortAddresses] = useState({});
    const [loading, setLoading] = useState(false);
    const disableRef = useRef(false);
    const [enableCancelBtn, setEnableCancelBtn] = useState(true);
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

    const containerRef = useRef();

    const handleDefault = (id) => {
        setLoading(true);

        const data = {
            [defaultProperty]: id,
        };

        axios
            .put('user/address/changeDefault', data)
            .then((res) => {
                setTimeout(() => {
                    setDefaultAddresses(() => res.data.default_address);
                    setLoading(false);
                }, 1000);
            })
            .catch((error) => {
                console.error('error while settng default address: ', error);
            });
    };

    useEffect(() => {
        if (
            // disableOtherComponents?.disable &&
            // disableOtherComponents?.addressType != addressType
            disable
        ) {
            viewDispatch({ type: 'main' });
        }
    }, [disableOtherComponents.disable, disableOtherComponents.addressType]);

    const onClickAway = () => {
        if (!disableOtherComponents.disable) {
            return;
        }

        if (disableOtherComponents.addressType == addressType) {
            SetDisableOtherComponents({
                disable: false,
                addressType: null,
            });

            viewDispatch({ type: 'main' });
        }
    };
    // const disable =
    //     disableOtherComponents?.disable &&
    //     disableOtherComponents.addressType != addressType;

    const value = {
        setAddresses,
        setDefaultAddresses,
        disableRef,
        viewDispatch,
        addressType,
        viewContent,
        mainAddress,
        setMainAddress,
        defaultProperty,
        addressType,
        enableAddressEdit,
        defaultAddresses,
        viewDispatch,
        checkAddress,
        setCheckAddress,
        sortAddresses,
        setSortAddresses,
        loading,
        setLoading,
        temporaryMainAddress,
        setTemporaryMainAddress,
        handleDefault,
        disableChangeBtn,
        subHeader,
        enableCancelBtn,
        addresses,
        disable,
    };

    const view = () => {
        if (viewContent == 'main') {
            return <Main />;
        } else if (viewContent == 'add') {
            return <Address_Form type={'add'} />;
        } else if (viewContent == 'edit') {
            return <Address_Form type={'edit'} />;
        } else if (viewContent == 'book') {
            return <Address_Book />;
        }
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

            transition: { duration: 0.5 },
        },
    };

    useEffect(() => {
        if (isDataSet) {
            const isAddressEmpty = _.isEmpty(mainAddress);
            console.log({ isAddressEmpty });
            if (isAddressEmpty) {
                setEnableCancelBtn(() => false);

                viewDispatch({ type: 'add' });
            } else {
                setEnableCancelBtn(() => true);
                viewDispatch({ type: 'main' });
            }
        }
    }, [isDataSet]);

    return (
        <AddressContextProvider value={value}>
            <ClickAwayListener onClickAway={onClickAway}>
                <motion.section
                    className={`relative ${
                        disable ? 'disable-component' : 'display-component'
                    }`}
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
                        {!disableHeader && (
                            <h1 className="checkout-title">
                                {addressType} ADDRESS
                            </h1>
                        )}
                        {/* {isDataSet && (
                            <div id="address-container" ref={containerRef}>
                                <AnimatePresence mode="wait">
                                    {viewContent && (
                                        <motion.div
                                            className={`address-header relative`}
                                            key={viewContent}
                                            variants={variants}
                                            animate={'animate'}
                                            initial={'initial'}
                                        >
                                            {views[viewContent]}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )} */}{' '}
                        <AnimatePresence mode="wait">
                            {isDataSet && (
                                <motion.div
                                    id="address-container"
                                    ref={containerRef}
                                >
                                    {viewContent && (
                                        <motion.div
                                            className={`address-header relative`}
                                            key={viewContent}
                                            variants={variants}
                                            animate={'animate'}
                                            initial={'initial'}
                                        >
                                            {views[viewContent]}
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>

                    {loading && (
                        <div className="spinner-circle absolute left-2/4 top-2/4 z-10 translate-x-[-50%] translate-y-[-50%] opacity-100 [--spinner-color:var(--gray-12)]"></div>
                    )}
                </motion.section>
            </ClickAwayListener>
        </AddressContextProvider>
    );
}

export default Address;
