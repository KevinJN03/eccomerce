import { useEffect, useState } from 'react';
import Address_Input from './address.input';
import { Helmet } from 'react-helmet';
function Address_Form({ setChange, buttontext, change, customer }) {
    const inputs = [
        { label: 'FIRST NAME', defaultValue: customer.firstName},
        { label: 'LAST NAME', defaultValue: customer.lastName },
        { label: 'MOBILE (For delivery updates )', defaultValue: customer.mobile},
        { label: 'ADDRESS FINDER' , placeHolder: 'Start typing a postcode or address...'},
        { label: 'ADDRESS LINE 1', defaultValue: customer.address1 },
        { label: 'ADDRESS LINE 2', defaultValue: customer.address2  },
        { label: 'CITY', defaultValue: customer.city },
        { label: 'COUNTY',defaultValue: customer.county  },
        { label: 'POSTCODE', defaultValue: customer.postCode },
    ];
    return (
        <section id="address-form" className="relative">
            <h1 className="mb-6">EDIT ADDRESS</h1>

            <div className="address-form-wrapper">
                <div className="address-input-wrapper">
                    {inputs.map((input, idx) => {
                        const {label, placeHolder, defaultValue} = input;
                        return <Address_Input key={label} label={input.label} defaultValue={defaultValue} placeHolder={placeHolder} />;
                    })}

                    <h1 className="flex flex-col gap-2">
                        COUNTRY:<span>UK</span>
                    </h1>
                    <button
                        className="my-4 bg-primary px-3 py-3 font-gotham font-bold tracking-wider text-white "
                        type="button"
                        onClick={() => setChange(false)}
                    >
                        {buttontext ? buttontext : 'DELIVER TO THIS ADDRESS'}
                    </button>
                </div>
                <button
                    onClick={() => setChange(false)}
                    className="sm+md:absolute sm+md:right-0 sm+md:top-1"
                    id='checkout-change-btn'
                >
                    Cancel
                </button>
            </div>
        </section>
    );
}
export default Address_Form;
