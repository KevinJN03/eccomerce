import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import defaultAxios from '../../../api/axios';
import Input from '../input';
import { SetMeal } from '@mui/icons-material';
import DobPicker from '../dobPicker';
import Interest from '../interest';
import Button from '../button';
import { PasswordInput } from '../../dashboard/change-password';
import { AnimatePresence, animate, motion } from 'framer-motion';
import { initial } from 'lodash';
import ErrorAlert from '../../common/error-alert.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
function SocialRegister({}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [user, setUser] = useState({});
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [interest, setInterest] = useState('womenswear');
    const [errors, setErrors] = useState({});
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState('');
    const { authDispatch } = useAuth();
    const [loading, setLoading] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [socialAccount, setSocialAccount] = useState('');

    const [mountFirstName, setMountFirstName] = useState('')
    const [mountLastName, setMountLastName] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        const id = searchParams?.get('signin');

        defaultAxios
            .get(`user/oauth/${id}`)
            .then(({ data }) => {
                console.log(data?.user)
                setUser(() => data?.user);
                setEmail(() => data?.user?.email);
                setMountFirstName(() => data?.user?.firstName);
                setMountLastName(() => data?.user?.lastName);
                setSocialAccount(
                    () => Object.keys(data?.user?.social_accounts)?.[0]
                );
            })
            .catch((error) => {
                console.error('error while getting oauthuser info', error);

                setErrors(() => error?.response?.data?.error);
            });
    }, []);

    const submit = async () => {
        let success = false;
        try {
            const { data } = await defaultAxios.post('user/ouath/user', {
                ...user,
                firstName,
                lastName,
                email,
                dob,
                interest,
                password,
                key: searchParams?.get('signin'),
            });

            authDispatch({ type: 'LOGIN', payload: data });
            setLoading(() => true);
            success = true;
        } catch (error) {
            console.error('error while creating user', error);
            if (error.response?.status == 400) {
                setErrors((prevError) => ({
                    ...prevError,
                    ...error.response.data?.error,
                }));

                setLoading(() => false);
            }
        } finally {
            if (success == true) {
                setTimeout(() => {
                    navigate('/my-account');
                    setLoading(() => false);
                }, 1200);
            }
        }
    };

    const variants = {
        initial: {
            height: '0px',

            opacity: 0,
        },
        animate: {
            height: '90px',
            opacity: 1,
            transition: {
                duration: 0.9,
            },
        },
    };

    const pVariant = (idx) => {
        return {
            initial: {
                opacity: 0,
            },
            animate: {
                opacity: 1,
                transition: {
                    delay: 0.9 * idx,
                    duration: 0.5,
                },
            },
        };
    };

    const inputProps = {
        error: errors,
        setError: setErrors,
    };
    return (
        <AnimatePresence mode="wait">
            <section className="social-register flex flex-col justify-center gap-y-5">
                <p className="text-center font-gotham text-lg tracking-wide">
                    HI {user?.firstName?.toUpperCase()}, WE'RE NEARLY DONE...
                </p>

                <motion.div
                    variants={variants}
                    initial={'initial'}
                    animate={'animate'}
                    className="mx-[-12px] my-4 flex flex-col justify-center bg-blue-200 px-9"
                >
                    <motion.p
                        variants={pVariant(0)}
                        initial={'initial'}
                        animate={'animate'}
                        className="mb-3 font-gotham text-sm"
                    >
                        SHOPPED WITH US BEFORE?
                    </motion.p>
                    <motion.p
                        variants={pVariant(1)}
                        initial={'initial'}
                        animate={'animate'}
                    >
                        Sign in using your existing details and we'll take care
                        of it so you can use{' '}
                        {socialAccount[0]?.toUpperCase() +
                            socialAccount?.substring(1)}{' '}
                        or your email address from now on.
                    </motion.p>
                </motion.div>
                <section className="flex w-8/12 flex-col self-center ">
                    <ErrorAlert
                        property={'general'}
                        error={errors}
                        setError={setErrors}
                    />

                    <section className="flex flex-col gap-y-3">
                        <Input
                            {...inputProps}
                            label={'EMAIL ADDRESS'}
                            value={email}
                            property={'email'}
                            setValue={setEmail}
                        />

                        {!mountFirstName && (
                            <Input
                                {...inputProps}
                                label={'FIRST NAME'}
                                value={firstName}
                                property={'firstName'}
                                setValue={setFirstName}
                            />
                        )}

                        {!mountLastName && (
                            <Input
                                {...inputProps}
                                label={'LAST NAME'}
                                value={lastName}
                                property={'lastName'}
                                setValue={setLastName}
                            />
                        )}
                        <PasswordInput
                            value={password}
                            setValue={setPassword}
                            {...inputProps}
                            visible={visible}
                            setVisible={setVisible}
                            property={'password'}
                            label={'PASSWORD'}
                        />
                        <DobPicker
                            value={dob}
                            setDob={setDob}
                            {...inputProps}
                            showDescription={true}
                        />
                        <Interest
                            interest={interest}
                            setInterest={setInterest}
                        />
                    </section>

                    <Button
                        text={'JOIN GLAMO'}
                        error={errors}
                        submit={submit}
                        loading={loading}
                    />
                </section>
            </section>
        </AnimatePresence>
    );
}

export default SocialRegister;
