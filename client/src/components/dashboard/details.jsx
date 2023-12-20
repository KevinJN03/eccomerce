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

import _ from 'lodash';
import axios from '../../api/axios.js';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import logOutUser from '../common/logoutUser.js';
import { useUserDashboardContext } from '../../context/userContext.jsx';

function Details({}) {
    const { user, authDispatch } = useAuth();
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const {
        firstName,
        lastName,
        email,
        interest,
        dob,
        setFooterMessage,
        setIsDetailsUnSaved,
        setEmail,
        setDob,
        setInterest,
        setFirstName,
        setLastName,
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

    console.log({dob})
    const options = {
        error,
        setError,
        asterisk: true,
    };

    useEffect(() => {
        const newValues = {
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail,
            dob: newDob,
            interest: newInterest,
        };

        const isSame = _.isEqual(onMountValue, newValues);
        console.log({ isSame, onMountValue, newValues });
        if (!isSame) {
            setIsDetailsUnSaved(true);
            setDisable(false);
        } else {
            setDisable(true);
            setIsDetailsUnSaved(() => false);
        }
    }, [newFirstName, newLastName, newEmail, newDob, newInterest]);

    const onSubmit = async () => {
        try {
            const data = {
                firstName: newFirstName,
                lastName: newLastName,
                email: newEmail,
                dob: newDob,
                interest: newInterest,
            };

            console.log(data)
            const result = await axios.put('user/changedetails', data);

            authDispatch({ type: 'LOGIN', payload: result.data });

            //update mountValues
            setOnMountValue(() => data);

            // update values
            setEmail(() => newEmail);
            setInterest(() => newInterest);
            setDob(() => newDob);
            setLastName(() => newLastName);
            setFirstName(() => newFirstName);
            setDisable(() => true);
            setIsDetailsUnSaved(() => false);

            // notify user that changes were successfull
            setFooterMessage(() => ({ success: true, text: 'Changes saved' }));
            return;
        } catch (error) {
            console.error('error while updating details', error);

            logOutUser({ error, authDispatch, navigate });

            if (error?.response?.status == 500) {
                setFooterMessage({
                    success: false,
                    text: 'Changes failed to save. Try again later',
                });

                return;
            }

            if (error?.response?.status == 400) {
                setError((prevError) => ({
                    ...prevError,
                    ...error.response.data?.error,
                }));
            }
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
