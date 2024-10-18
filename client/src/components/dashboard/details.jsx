import Header from './header.jsx';
import contact_icon from '../../assets/icons/contact.png';

import Input from '../portal/input.jsx';
import { useEffect, useRef, useState } from 'react';
import ErrorMessage from '../portal/errorMessage';
import { DatePicker } from '@mui/x-date-pickers';
import Interest from '../portal/interest.jsx';
import Button from '../portal/button.jsx';
import DobPicker from '../portal/dobPicker.jsx';
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
    const { setFooterMessage, setIsDetailsUnSaved, userData, setUserData } =
        useUserDashboardContext();
    const [newUserData, setNewUserData] = useState(() => ({ ...userData }));

    const [disable, setDisable] = useState(true);

    const abortControllerRef = useRef(new AbortController());

    const options = {
        error,
        setError,
        asterisk: true,
        manyProperty: true,
    };

    useEffect(() => {
        const isSame = _.isEqual(userData, newUserData);

        if (!isSame) {
            setIsDetailsUnSaved(true);
            setDisable(false);
        } else {
            setDisable(true);
            setIsDetailsUnSaved(() => false);
        }
    }, [newUserData]);

    const onSubmit = async () => {
        try {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            const { data } = await axios.put(
                'user/changedetails',
                newUserData,
                {
                    signal: abortControllerRef.current.signal,
                }
            );

            authDispatch({ type: 'LOGIN', payload: data });

            //update mountValues
            console.log({ dataafterapply: { user: data.user } });
            const { user } = data;
            setUserData(() => user);

            setDisable(() => true);

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
    console.log({ newUserData, userData });
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
                    value={newUserData.firstName}
                    setValue={setNewUserData}
                    property={'firstName'}
                    label={'FIRST NAME'}
                    {...options}
                />
                <Input
                    value={newUserData.lastName}
                    setValue={setNewUserData}
                    property={'lastName'}
                    label={'LAST NAME'}
                    {...options}
                />
                <Input
                    value={newUserData.email}
                    setValue={setNewUserData}
                    property={'email'}
                    label={'Email'}
                    {...options}
                />
                <DobPicker
                    showDescription={false}
                    error={error}
                    value={newUserData?.dob}
                    setError={setError}
                    setDob={(callback) => {
                        setNewUserData((prevState) => ({
                            ...prevState,
                            dob: callback(),
                        }));
                    }}
                />

                <Interest
                    setInterest={(callback) => {
                        setNewUserData((prevState) => ({
                            ...prevState,
                            interest: callback(),
                        }));
                    }}
                    interest={newUserData?.interest}
                />

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
