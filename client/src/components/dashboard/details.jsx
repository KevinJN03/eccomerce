import Header from './header';
import contact_icon from '../../assets/icons/contact.png';

import Input from '../Login-SignUp/input.jsx';
import { useEffect, useState } from 'react';

import ErrorMessage from '../Login-SignUp/errorMessage.jsx';
import { DatePicker } from '@mui/x-date-pickers';
import Interest from '../Login-SignUp/interest.jsx';
import Button from '../Login-SignUp/button.jsx';
import DobPicker from '../Login-SignUp/dobPicker.jsx';
import { useAuth } from '../../hooks/useAuth.jsx';
import { useUserDashboardContext } from '../../context/userContext.jsx';
import _ from 'lodash';
function Details({}) {
    const { user, authenticated } = useAuth();
    const [error, setError] = useState({});

    const {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        interest,
        setInterest,
        dob,
        setDob,
    } = useUserDashboardContext();

    const [onMountValue, setOnMountValue] = useState({
        firstName,
        lastName,
        email,
        interest,
        dob,
    });
    // const [lastName, setLastName] = useState(user?.lastName || '');

    const [disable, setDisable] = useState(true);
    const options = {
        error,
        setError,
        asterisk: true,
    };

    useEffect(() => {
        const newValues = {
            firstName,
            lastName,
            email,
            interest,
            dob,
        };

        const isSame = _.isEqual(onMountValue, newValues);
        console.log({ isSame, onMountValue, newValues });
        if (!isSame) {
            setDisable(false);
        }else {
            setDisable(true);  
        }
    }, [firstName, lastName, email, interest, dob]);

    useEffect(() => {
        setFirstName(() => user?.firstName);
    }, []);
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
                    value={email}
                    setValue={setEmail}
                    property={'email'}
                    label={'Email'}
                    {...options}
                />
                <DobPicker
                    showDescription={false}
                    error={error}
                    value={dob}
                    setError={setError}
                    setDob={setDob}
                />

                <Interest setInterest={setInterest} interest={interest} />

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
