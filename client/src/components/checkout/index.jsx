import '../../CSS/checkout.css';

import RedirectImage from '../../assets/icons/forwarding.png';
import disableLayout from '../../hooks/disableLayout';
import Address from './address form/address.jsx';
import Checkout_Header from './checkout_header';
import Checkout_Total from './checkout_total/Checkout_Total.jsx';
import Country_Picker from './country_picker';
import Delivery from './delivery/delivery';
import Email_address from './email-address';
import Payment from './payment/payment';
import Promo from './promo';
import { PromoProvider } from '../../hooks/promoContext';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from 'framer-motion';
import exampleCustomerInfo from './address form/example-customer-info.jsx';
import axios from '../../api/axios.js';
import variants from '../common/framerMotionVariants.jsx';
import logOutUser from '../common/logoutUser.js';
import { useAuth } from '../../hooks/useAuth.jsx';
import CheckOutProvider from '../../context/checkOutContext.jsx';

function Checkout() {
    disableLayout();

    const [error, setError] = useState({
        msg: null,
        positionY: '0px',
    });
    const { authDispatch } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isOrderSubmit, setOrderSubmit] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [shippingAddress, setShippingAddress] = useState({});
    const [billingAddress, setBillingAddress] = useState(exampleCustomerInfo);
    const [defaultAddresses, setDefaultAddresses] = useState({});
    const [select, setSelect] = useState('GB');
    const [disableOtherComponents, SetDisableOtherComponents] = useState({
        disable: false,
        addressType: null,
    });
    useEffect(() => {
        axios
            .get('user/userData')
            .then((res) => {
                const { user } = res.data;

                const default_address = user?.default_address;
                setDefaultAddresses(() => user?.default_address || {});
                const findAddress = (property, setState) => {
                    if (default_address[property]) {
                        const foundAddress = user.address.find(
                            (item) => item._id == default_address[property]
                        );

                        console.log({ foundAddress });
                        setState(() => foundAddress);
                    }
                };

                findAddress('shipping_address', setShippingAddress);
                findAddress('billing_address', setBillingAddress);

                setAddresses(() => user.address);
            })
            .catch((error) => {
                console.error(
                    'error while trying to get logged in user data',
                    error
                );

                logOutUser({ error, authDispatch, navigate });
            });
    }, []);
    const { cart } = useCart();
    useEffect(() => {
        if (cart.length == 0) {
            setLoading(() => true);

            const timeout = setTimeout(() => {
                navigate('/home');
                setLoading(false);
            }, 5000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [cart]);

    const submitOrder = () => {
        setOrderSubmit(() => true);

        axios
            .post('/order/create', {
                billingAddress,
                shippingAddress,
                cart,
            })
            .then((res) => {
                console.log({ res });
                setTimeout(() => {
                    setOrderSubmit(() => false);
                }, 2000);
            })
            .catch((error) => {
                setTimeout(() => {
                    setOrderSubmit(() => false);
                }, 2000);
                console.log('error when creating order: ', error);
            });
    };

    return (
        <CheckOutProvider
            value={{
                loading,
                setLoading,
                error,
                setError,
                addresses,
                setAddresses,
                shippingAddress,
                setShippingAddress,
                billingAddress,
                setBillingAddress,
                defaultAddresses,
                setDefaultAddresses,
                error,
                setError,
                select,
                setSelect,
                disableOtherComponents,
                SetDisableOtherComponents,
            }}
        >
            {loading && (
                <div className="flex h-screen w-full max-w-[400px] flex-col items-center justify-center gap-y-4">
                    <img src={RedirectImage} className="h-28 w-28" />
                    <p className="text-center text-lg">
                        Your cart is Empty, you will get redirected to the Home
                        Page in a few seconds.
                    </p>
                    <span className="loading loading-infinity loading-lg"></span>
                </div>
            )}

            {!loading && (
                <section id="checkout-page">
                    <section
                        id="checkout"
                        variants={variants}
                        animate={'animate'}
                        initial={'initial'}
                        exit={'exit'}
                    >
                        <Checkout_Header text={'CHECKOUT'} />
                        <div className="checkout-body">
                            <section id="checkout-body-wrapper">
                                <section className="left flex flex-col !bg-[var(--light-grey)]">
                                    <section className="top relative flex min-h-screen flex-col gap-y-3 !bg-[var(--light-grey)]">
                                        <Country_Picker
                                            disable={
                                             disableOtherComponents.disable
                                                
                                            }
                                            select={select}
                                            setSelect={setSelect}
                                        />
                                        <Promo
                                            disable={
                                           disableOtherComponents.disable
                                         
                                            }
                                        />
                                        <Email_address
                                            disable={
                                                disableOtherComponents.disable
                                            }
                                        />
                                        <Address
                                            mainAddress={shippingAddress}
                                            setMainAddress={setShippingAddress}
                                            defaultProperty={'shipping_address'}
                                            addressType={'DELIVERY'}
                                            enableAddressEdit={true}
                                        />

                                        <Delivery
                                            disable={
                                                disableOtherComponents.disable
                                            }
                                        />
                                        <Payment
                                            defaultProperty={'billing_address'}
                                            billingAddress={billingAddress}
                                            setBillingAddress={
                                                setBillingAddress
                                            }
                                        />
                                    </section>
                                    <div className="bottom mt-5 flex flex-col gap-y-3">
                                        <button
                                            className=" flex h-14 max-h-20 w-11/12 items-center justify-center self-center bg-primary-green font-gotham font-bold text-white opacity-95 transition-all hover:opacity-100 disabled:opacity-40"
                                            type="button"
                                            onClick={submitOrder}
                                             disabled={disableOtherComponents.disable}
                                        >
                                            {isOrderSubmit ? (
                                                <svg
                                                    className="spinner-ring spinner-sm !m-0 !p-0 [--spinner-color:var(--test123)]"
                                                    viewBox="25 25 50 50"
                                                    strokeWidth="5"
                                                >
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="20"
                                                    />
                                                </svg>
                                            ) : (
                                                <span className="text-white">
                                                    BUY NOW
                                                </span>
                                            )}
                                        </button>
                                        <p className="mb-12 w-11/12 self-center">
                                            By placing your order you agree to
                                            our Terms & Conditions, privacy and
                                            returns policies . You also consent
                                            to some of your data being stored by
                                            GLAMO, which may be used to make
                                            future shopping experiences better
                                            for you.
                                        </p>
                                    </div>
                                </section>
                            </section>

                            <Checkout_Total />
                        </div>
                        <footer className="relative left-[calc(-50vw+50%)] mt-5 min-w-[100vw] self-start bg-white  py-6 text-center">
                            GLAMO Help
                        </footer>
                    </section>
                </section>
            )}
        </CheckOutProvider>
    );
}

export default Checkout;
