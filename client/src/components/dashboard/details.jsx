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
import axios from '../../api/axios.js';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import objectSupport from 'dayjs/plugin/objectSupport';
dayjs.extend(objectSupport);
dayjs.extend(utc);
function Details({}) {
    const { user, authDispatch } = useAuth();
    const [error, setError] = useState({});
    const navigate = useNavigate();
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
        } else {
            setDisable(true);
        }
    }, [firstName, lastName, email, interest, dob]);

    useEffect(() => {
        setFirstName(() => user?.firstName);
    }, []);

    const onSubmit = async () => {
        try {
            const result = await axios.put('user/changedetails', {
                firstName,
                lastName,
                email,
                dob,
                interest,
            });

            authDispatch({ type: 'LOGIN', payload: result.data });
            setDisable(true);
            return;
        } catch (error) {
            console.log('error here: ', error);
            authDispatch({ type: 'LOGOUT' });
            navigate('/login');
        }
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
                    submit={onSubmit}
                    text={'SAVE CHANGES'}
                    error={error}
                    disable={disable}
                />
            </div>
        </section>
    );
}

export default Details;
