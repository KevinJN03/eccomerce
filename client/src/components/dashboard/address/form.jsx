import { useEffect, useState } from 'react';
import Input from '../../Login-SignUp/input';
import ReactCountryFlag from 'react-country-flag';
import ReactFlagsSelect from 'react-flags-select';
import _ from 'lodash';
function Address_Form({ description, title, handleClick, customer }) {
    const [error, setError] = useState({});
    const [firstName, setFirstName] = useState(customer?.firstName || '');
    const [lastName, setLastName] = useState(customer?.lastName || '');
    const [loading, setLoading] = useState(false);
    const [mobile, setMobile] = useState(customer?.mobile || '');

    const [disable, setDisable] = useState(true);
    const [address, setAddress] = useState(customer?.address || { country: 'GB' });
    const onSelect = (code) =>
        setAddress((prevState) => ({ ...prevState, country: code }));
    const options = {
        error,
        setError,
        asterisk: false,
    };
    const [onMount, setOnMount] = useState({
        firstName,
        lastName,
        mobile,

        address,
    });

    const values = {
        firstName,
        lastName,
        mobile,

        address,
    };
    useEffect(() => {
        setDisable(false);

        const isObjectSame = _.isEqual(onMount, values);
        if (isObjectSame) {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, [firstName, address, lastName, mobile]);
    return (
        <section className=" bg-white p-4">
            <h2 className="mb-2 text-xl font-bold">{title}</h2>
            <p className="text-sm">{description}</p>
            <div className="mt-5 w-4/6 bg-white">
                <Input
                    value={firstName}
                    setValue={setFirstName}
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
                            countryCode={address.country}
                            svg
                            style={{
                                width: '3em',
                                height: '3em',
                                borderRadius: '50%',
                            }}
                            cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                        />

                        <ReactFlagsSelect
                            selected={address.country}
                            onSelect={onSelect}
                            selectedSize={14}
                            className="!w-full"
                        />
                    </div>
                </section>
                <Input
                    manyProperty={true}
                    value={address?.address_1}
                    setValue={setAddress}
                    property={'address_1'}
                    label={'ADDRESS'}
                    {...options}
                />
                <Input
                    manyProperty={true}
                    value={address?.city}
                    setValue={setAddress}
                    property={'city'}
                    label={'CITY'}
                    {...options}
                />
                <Input
                    manyProperty={true}
                    value={address?.county}
                    setValue={setAddress}
                    property={'county'}
                    label={'COUNTY'}
                    {...options}
                />
                <Input
                    manyProperty={true}
                    value={address?.postCode}
                    setValue={setAddress}
                    property={'postCode'}
                    label={'POSTCODE'}
                    {...options}
                />

                <button
                    disabled={disable}
                    onClick={() =>
                        handleClick({
                            ...values,
                            setError,
                            setDisable,
                            setLoading,
                        })
                    }
                    type="button"
                    className=" flex w-full items-center justify-center !bg-primary py-3 font-semibold tracking-wide text-white opacity-90 transition-all hover:opacity-100 disabled:opacity-50"
                >
                    {loading ? (
                        <div class="spinner-circle [--spinner-color:var(--gray-9)] spinner-sm"></div>
                    ) : (
                        'SAVE ADDRESS'
                    )}
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
