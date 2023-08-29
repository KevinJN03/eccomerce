import Address_Input from './address.input';

function Address_Form({ setChange }) {
    return (
        <section id="address-form">
            <h1 className="mb-6">EDIT ADDRESS</h1>
            <div className="address-form-wrapper">
                <div className="address-input-wrapper">
                    <Address_Input label="FIRST NAME :" />
                    <Address_Input label="LAST NAME :" />
                    <Address_Input label="MOBILE   (For delivery updates ) :" />
                    <Address_Input label="ADDRESS FINDER :" />
                    <Address_Input label="ADDRESS :" />
                    <Address_Input label="CITY :" />
                    <Address_Input label="COUNTY :" />
                    <Address_Input label="POSTCODE :" />
                    <h1 className='flex flex-col gap-2'>
                        COUNTRY:<span>UK</span>
                    </h1>
                    <button className="font-gotham font-bold tracking-wider text-white bg-primary py-3 px-3 my-4 " type="button" onClick={() => setChange(false)}>DELIVER TO THIS ADDRESS</button>
                </div>
                <button onClick={() => setChange(false)}>Cancel</button>
            </div>
        </section>
    );
}

export default Address_Form;
