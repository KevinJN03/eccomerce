import { useState } from 'react';
import Input from '../../Login-SignUp/input';
import ReactCountryFlag from 'react-country-flag';
import ReactFlagsSelect from 'react-flags-select';
import Address_Form from './form';

function Edit_Address({}) {
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
        <section className="edit_address">
            <Address_Form
                title={'EDIT ADDRESS'}
                description={` Update your address details and all future delivery labels will
                appear exactly as they are below.`}
            />
        </section>
    );
}

export default Edit_Address;
