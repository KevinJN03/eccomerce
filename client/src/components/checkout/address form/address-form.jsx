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
}) {
    const inputs = [
        { label: 'FIRST NAME', property: 'firstName' },
        { label: 'LAST NAME', property: 'lastName' },
        {
            label: 'MOBILE (For delivery updates )',
            property: 'mobile',
        },
        {
            label: 'ADDRESS FINDER',
            placeHolder: 'Start typing a postcode or address...',
        },
        { label: 'ADDRESS LINE 1', property: 'address1' },
        { label: 'ADDRESS LINE 2', property: 'address2' },
        { label: 'CITY', property: 'city' },
        { label: 'COUNTY', property: 'county' },
        { label: 'POSTCODE', property: 'postCode' },
    ];
    return (
        <section id="address-form" className="relative">
            <h1 className="mb-6">EDIT ADDRESS</h1>

            <div className="address-form-wrapper">
                <div className="address-input-wrapper">
                    {inputs.map(({ label, placeHolder, property }, idx) => {
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
                    })}

                    <h1 className="flex flex-col gap-2">
                        COUNTRY:<span>UK</span>
                    </h1>
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
