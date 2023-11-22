import { useEffect, useState } from 'react';
import Address_Input from './address-input';
import { Helmet } from 'react-helmet';
function Address_Form({
    setChange,
    buttontext,
    address,
    setAddress,
    handleClick,
    cancel,

    type,
}) {
    const [edit, setEdit] = useState(false);
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
        if (type == 'edit' && edit) {
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
    return (
        <section id="address-form" className="relative">
            <p className="mb-6 text-[18px] font-bold tracking-wider">{text}</p>

            <div className="address-form-wrapper">
                <div className="address-input-wrapper">
                    {newInputArray.map(
                        ({ label, placeHolder, property }, idx) => {
                            return (
                                <Address_Input
                                    key={label}
                                    label={label}
                                    // defaultValue={defaultValue}
                                    value={address[property]}
                                    placeHolder={placeHolder}
                                    handleOnChange={(e) => {
                                        console.log('clicked on');
                                        setAddress((prevState) => ({
                                            ...prevState,
                                            [property]: e.target.value,
                                        }));
                                    }}
                                />
                            );
                        }
                    )}
                    {!edit && (
                        <div className="bg-[var(--light-grey)] p-4 flex flex-col gap-y-1 mb-4">
                            {addressBoxText.map((data) => {
                                return <p className='text-sm'>{data}</p>;
                            })}
                            <button type='button' className='border-t-2 w-full text-start mt-2 pt-2'>
                                Edit
                            </button>
                        </div>
                    )}

                    <h1 className="mb-2 text-sm font-bold text-gray-400">
                        COUNTRY:
                    </h1>
                    <p className="text-sm">{address?.country}</p>
                    <button
                        className="my-4 !bg-primary px-3 py-3 font-gotham font-bold tracking-wider text-white opacity-90 transition-all hover:opacity-100 "
                        type="button"
                        onClick={handleClick}
                    >
                        {buttontext ? buttontext : 'DELIVER TO THIS ADDRESS'}
                    </button>
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
