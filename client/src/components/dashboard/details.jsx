import Header from './header';
import contact_icon from '../../assets/icons/contact.png';

import Input from '../Login-SignUp/input.jsx';
import { useState } from 'react';

import ErrorMessage from '../Login-SignUp/errorMessage.jsx';
import { DatePicker } from '@mui/x-date-pickers';
import Interest from '../Login-SignUp/intrest.jsx';
import Button from '../Login-SignUp/button.jsx';
import DobPicker from '../Login-SignUp/dobPicker.jsx';
function Details({}) {
    const [error, setError] = useState({});
    const [firstName, setFistName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [interest, setInterest] = useState('womenswear');
    const [dob, setDob] = useState('');

    const [disable, setDisble] = useState(true);
    const options = {
        error,
        setError,
        asterisk: true,
    };
    return (
        <section className="Details bg-white">
            <Header
                icon={contact_icon}
                text={'MY DETAILS'}
                description={
                    'Feel free to edit any of your details below so your GLAMO account is totally up to date. (* Indicates a required field).'
                }
            />
            <div className="w-4/6 bg-white px-4 pb-4">
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
                    value={email}
                    setValue={setEmail}
                    property={'email'}
                    label={'Email'}
                    {...options}
                />
                <DobPicker
                    showDescription={false}
                    error={error}
                    setError={setError}
                    setDob={setDob}
                />

                <Interest setInterest={setInterest} />

                <Button
                    submit={() => {
                        console.log('submit');
                    }}
                    text={'SAVE CHANGES'}
                    error={error}
                    disable={disable}
                />
            </div>
        </section>
    );
}

export default Details;
