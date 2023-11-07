import { useState } from 'react';
import Input from '../../Login-SignUp/input';
import ReactCountryFlag from 'react-country-flag';
import ReactFlagsSelect from 'react-flags-select';

function Address_Form({ description, title }) {
    const [error, setError] = useState({});
    const [firstName, setFistName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [dob, setDob] = useState('');
    const [select, setSelect] = useState('GB');

    const [address, setAddress] = useState({});
    const onSelect = (code) => setSelect(() => code);
    const options = {
        error,
        setError,
        asterisk: false,
    };
    return (
        <section className=" bg-white p-4">
            <h2 className="mb-2 text-xl font-bold">{title}</h2>
            <p className="text-sm">{description}</p>
            <div className="mt-5 w-4/6 bg-white">
                <Input
                    value={firstName}
                    setValue={setFistName}
                    property={'firstName'}
                    label={'FIRST NAME'}
                    {...options}
                />
                <Input
                    value={lastName}
                    setValue={setLastName}
                    property={'lastName'}
                    label={'LAST NAME'}
                    {...options}
                />

                <Input
                    value={mobile}
                    setValue={setMobile}
                    property={'mobile'}
                    label={'MOBILE'}
                    {...options}
                />
                <section className="input-container flex flex-col gap-y-2">
                    <label>COUNTRY: </label>
                    <div className=" flex flex-row items-center justify-start gap-x-4">
                        <ReactCountryFlag
                            countryCode={select}
                            svg
                            style={{
                                width: '3em',
                                height: '3em',
                                borderRadius: '50%',
                            }}
                            cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                        />

                        <ReactFlagsSelect
                            selected={select}
                            onSelect={onSelect}
                            selectedSize={14}
                            className="!w-full"
                        />
                    </div>
                </section>
                <Input
                    value={address?.line1}
                    setValue={setAddress}
                    property={'line1'}
                    label={'ADDRESS'}
                    {...options}
                />
                <Input
                    value={address?.city}
                    setValue={setAddress}
                    property={'city'}
                    label={'CITY'}
                    {...options}
                />
                <Input
                    value={address?.county}
                    setValue={setAddress}
                    property={'county'}
                    label={'COUNTY'}
                    {...options}
                />
                <Input
                    value={address?.postCode}
                    setValue={setAddress}
                    property={'postCode'}
                    label={'POSTCODE'}
                    {...options}
                />

                <button
                    disabled={true}
                    type="button"
                    className="w-full !bg-primary py-3 font-semibold tracking-wide text-white opacity-90 transition-all hover:opacity-100 disabled:opacity-50"
                >
                    SAVE ADDRESS
                </button>
                <button
                    disabled={true}
                    type="button"
                    className="mt-3 w-full border-2 !border-primary py-3 font-semibold tracking-wide !text-primary opacity-90 transition-all hover:opacity-100 disabled:opacity-50"
                >
                    DELETE ADDRESS
                </button>
            </div>

            <p className="mt-3">
                To delete this, you must add a new address and set that as the
                default billing & delivery address first.
            </p>
        </section>
    );
}

export default Address_Form;
