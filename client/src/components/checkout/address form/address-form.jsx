import { useEffect, useState } from 'react';
import Address_Input from './address-input';
import { Helmet } from 'react-helmet';
import axios from '../../../api/axios';
import { useCheckoutContext } from '../../../context/checkOutContext';
import logOutUser from '../../common/logoutUser';
import Input from '../../Login-SignUp/input';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { generateVariants } from './address-item';
import { useAuth } from '../../../hooks/useAuth';
import { useAddressContext } from '../../../context/checkOutAddressContext';
import {
    postcodeValidator,
    postcodeValidatorExistsForCountry,
} from 'postcode-validator';
function Address_Form({ type }) {
    const {
        viewDispatch,

        setTemporaryMainAddress,
        temporaryMainAddress,
        handleClick,
        cancel,
        setDefaultAddresses,
        setAddresses,
        loading,
        setLoading,
        addressType,
    } = useAddressContext();
    const { authDispatch } = useAuth();
    const { setError, select } = useCheckoutContext();

    const navigate = useNavigate();
    const [showAddressBox, setShowAddressBox] = useState(
        type == 'add' ? false : true
    );

    const [inputError, setInputError] = useState({});
    const generalInput = [
        { label: 'FIRST NAME', property: 'firstName' },
        { label: 'LAST NAME', property: 'lastName' },
        {
            label: 'MOBILE',
            property: 'mobile',
        },
        // {
        //     label: 'ADDRESS FINDER',
        //     placeHolder: 'Start typing a postcode or address...',
        // },
    ];

    useEffect(() => {
        if (type === 'add') {
            setTemporaryMainAddress((prevState) => ({
                ...prevState,
                country: select,
            }));
        }
    }, [select]);

    const addressInput = [
        { label: 'ADDRESS LINE 1', property: 'address_1' },
        { label: 'ADDRESS LINE 2', property: 'address_2' },
        { label: 'CITY', property: 'city' },
        { label: 'COUNTY', property: 'county' },
        { label: 'POSTCODE', property: 'postCode' },
    ];

    const text =
        type == 'edit' ? ' EDIT ADDRESS' : type == 'add' && 'ADD NEW ADDRESS';

    const getInputArray = () => {
        if (type == 'add') {
            return generalInput.concat(addressInput);
        }
        if (type == 'edit' && !showAddressBox) {
            return generalInput.concat(addressInput);
        } else {
            return generalInput;
        }
    };

    const newInputArray = getInputArray();

    const addressBoxText = [
        `${temporaryMainAddress?.address_1}${
            temporaryMainAddress?.address_2
                ? `, ${temporaryMainAddress?.address_2}`
                : ''
        }`,
        temporaryMainAddress?.city,
        temporaryMainAddress?.postCode,
        temporaryMainAddress?.country,
    ];

    async function handleSubmit(returnTo = 'main', updateMainAddress = true) {
        var updatedAddress = temporaryMainAddress;

        try {
            setLoading(true);
            let result;
            if (type == 'edit') {
                result = await axios.put(
                    `user/address/edit/${updatedAddress._id}`,
                    updatedAddress
                );

                const { address, default_address } = result.data.user;
                setAddresses(() => address);
                setDefaultAddresses(() => default_address);
            } else if (type == 'add') {
                result = await axios.post(`user/address/add`, updatedAddress);
                setAddresses(() => result.data.address);
                setDefaultAddresses(() => result.data.default_address);
            }

            setTimeout(() => {
                handleClick(updateMainAddress);
                setLoading(false);
                viewDispatch({ type: returnTo });
            }, 1000);
        } catch (error) {
            console.error('error while updating/adding address', error);
            setTimeout(() => {
                if (error.response.status == 400) {
                    setInputError(() => ({
                        ...error.response.data,
                    }));
                }

                if (error.response.status == 500) {
                    setError((prevState) => ({
                        ...prevState,
                        msg: error.response.data.msg[0],
                    }));
                }
                setLoading(false);
                logOutUser({ error, navigate, authDispatch });
            }, 1000);
        }
    }

    const inputProps = {
        error: inputError,
        setError: setInputError,
        asterisk: false,
        autoComplete: true,
        manyProperty: true,
        className: 'text-gray-500',
        setValue: setTemporaryMainAddress,
    };

    const returnToBook = () => {
        handleSubmit('book', false);
    };

    const variants = generateVariants(1, 0.2);
    return (
        <motion.section
            variants={variants}
            animate={'animate'}
            initial={'initial'}
            exit={'exit'}
            id="address-form"
            className="relative"
        >
            {/* {(viewContent == 'add' || viewContent == 'edit') && ( */}

            <>
                <p className="mb-6 text-[18px] font-bold tracking-wider">
                    {text}
                </p>

                <div className="address-form-wrapper">
                    <div className="address-input-wrapper">
                        {newInputArray.map(
                            ({ label, placeHolder, property }, idx) => {
                                return (
                                    <>
                                        <Input
                                            {...inputProps}
                                            key={label}
                                            label={label}
                                            value={
                                                temporaryMainAddress[property]
                                            }
                                            property={property}
                                        />
                                    </>
                                );
                            }
                        )}
                        {showAddressBox && (
                            <div className="mb-4 flex flex-col gap-y-1 bg-[var(--light-grey)] py-4 pl-4 pr-4">
                                {addressBoxText.map((data) => {
                                    return <p className="text-sm">{data}</p>;
                                })}
                                <button
                                    onClick={() =>
                                        setShowAddressBox(() => false)
                                    }
                                    type="button"
                                    className="mt-2 w-full border-t-2 border-gray-300 pt-2 text-start  hover:underline"
                                >
                                    Edit
                                </button>
                            </div>
                        )}

                        <h1 className="mb-2 text-sm font-bold text-gray-500">
                            COUNTRY:
                        </h1>
                        <p className="text-sm">
                            {temporaryMainAddress?.country || select}
                        </p>
                        <button
                            className="my-4 !bg-primary px-3 py-3 font-gotham font-bold tracking-wider text-white opacity-90 transition-all hover:opacity-100 "
                            type="button"
                            onClick={() => handleSubmit()}
                        >
                            {addressType == 'DELIVERY'
                                ? 'DELIVER TO THIS ADDRESS'
                                : 'USE THIS ADDRESS'}
                        </button>
                        {type == 'edit' && (
                            <p
                                className="cursor-pointer hover:underline"
                                onClick={returnToBook}
                            >
                                Save and return to address book
                            </p>
                        )}
                    </div>
                    <button
                        disabled={loading}
                        onClick={cancel}
                        className="sm+md:absolute sm+md:right-0 sm+md:top-1"
                        id="checkout-change-btn"
                    >
                        CANCEL
                    </button>
                </div>
            </>
        </motion.section>
    );
}
export default Address_Form;
