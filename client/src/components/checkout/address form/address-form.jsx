import { useEffect, useState } from 'react';
import Address_Input from './address-input';
import { Helmet } from 'react-helmet';
import axios from '../../../api/axios';
import { useCheckoutContext } from '../../../context/checkOutContext';
import logOutUser from '../../common/logoutUser';
import Input from '../../Login-SignUp/input';
import { useNavigate } from 'react-router-dom';

function Address_Form({
    viewDispatch,
    buttontext,
    setAddress,
    address,
    handleClick,
    cancel,
    setDefaultAddresses,
    setAddresses,
    type,
    setChange,
    setLoading,
}) {
    const { setError, select } = useCheckoutContext();

    const naviage = useNavigate();
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
            setAddress((prevState) => ({ ...prevState, country: select }));
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
        `${address.address_1}${
            address.address_2 ? `, ${address.address_2}` : ''
        }`,
        address.city,
        address.postCode,
        address.country,
    ];

    async function handleSubmit() {
        var updatedAddress = address;
        try {
            setLoading(true);
            let result;
            console.log({ updatedAddress });
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
                handleClick();
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error('error while updating/adding address', error);
            setTimeout(() => {
                if (error.response.status == 400) {
                    setInputError((prevState) => ({
                        ...prevState,
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
        setValue: setAddress,
    };
    return (
        <section id="address-form" className="relative">
            <p className="mb-6 text-[18px] font-bold tracking-wider">{text}</p>

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
                                        value={address[property]}
                                        property={property}
                                    />
                                    {/* <Address_Input
                                        key={label}
                                        label={label}
                                        // defaultValue={defaultValue}
                                        value={address[property]}
                                        placeHolder={placeHolder}
                                        handleOnChange={(e) => {
                                            setAddress((prevState) => ({
                                                ...prevState,
                                                [property]: e.target.value,
                                            }));
                                        }}
                                    /> */}
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
                                onClick={() => setShowAddressBox(() => false)}
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
                    <p className="text-sm">{address?.country || select}</p>
                    <button
                        className="my-4 !bg-primary px-3 py-3 font-gotham font-bold tracking-wider text-white opacity-90 transition-all hover:opacity-100 "
                        type="button"
                        onClick={handleSubmit}
                    >
                        {buttontext ? buttontext : 'DELIVER TO THIS ADDRESS'}
                    </button>
                    {type == 'edit' && (
                        <p
                            className="cursor-pointer hover:underline"
                            onClick={() => viewDispatch({ type: 'book' })}
                        >
                            Save and return to address book
                        </p>
                    )}
                </div>
                <button
                    onClick={cancel}
                    className="sm+md:absolute sm+md:right-0 sm+md:top-1"
                    id="checkout-change-btn"
                >
                    CANCEL
                </button>
            </div>
        </section>
    );
}
export default Address_Form;
