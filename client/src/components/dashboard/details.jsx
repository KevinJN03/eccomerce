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
import logOutUser from '../common/logoutUser.js';
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
        setFooterMessage,
    } = useUserDashboardContext();

    const [onMountValue, setOnMountValue] = useState({
        firstName,
        lastName,
        email,
        interest,
        dob,
    });
    // const [lastName, setLastName] = useState(user?.lastName || '');
    const [newEmail, setNewEmail] = useState(email);
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);
    const [newDob, setNewDob] = useState(dob);
    const [newInterest, setNewInterest] = useState(interest);
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
            const data = {
                firstName,
                lastName,
                email,
                dob,
                interest,
            };
            const result = await axios.put('user/changedetails', data);

            authDispatch({ type: 'LOGIN', payload: result.data });
            setOnMountValue(() => data);
            setDisable(true);
            setFooterMessage({ success: true, text: 'Changes saved' });
            return;
        } catch (error) {
            'error here: ', error;

            logOutUser({ error, authDispatch, navigate });
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
                    value={newFirstName}
                    setValue={setNewFirstName}
                    property={'firstName'}
                    label={'FIRST NAME'}
                    {...options}
                />
                <Input
                    value={newLastName}
                    setValue={setNewLastName}
                    property={'lastName'}
                    label={'LAST NAME'}
                    {...options}
                />
                <Input
                    value={newEmail}
                    setValue={setNewEmail}
                    property={'email'}
                    label={'Email'}
                    {...options}
                />
                <DobPicker
                    showDescription={false}
                    error={error}
                    value={newDob}
                    setError={setError}
                    setDob={setNewDob}
                />

                <Interest setInterest={setNewInterest} interest={newInterest} />

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
