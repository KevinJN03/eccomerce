import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import defaultAxios from '../../../api/axios';
import Input from '../input';
import { SetMeal } from '@mui/icons-material';
import DobPicker from '../dobPicker';
import Interest from '../interest';
import Button from '../button';
import { PasswordInput } from '../../dashboard/change-password';
import { AnimatePresence, animate, motion } from 'framer-motion';
import { initial } from 'lodash';

function SocialRegister({}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [user, setUser] = useState({});
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [interest, setInterest] = useState('womenswear');
    const [errors, setErrors] = useState({});
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState('');

    useEffect(() => {
        const id = searchParams?.get('signin');

        defaultAxios
            .get(`user/oauth/${id}`)
            .then(({ data }) => {
                console.log(data?.user);
                setUser(() => data?.user);
                setEmail(() => data?.user?.email);
            })
            .catch((error) => {
                console.error('error while getting oauthuser info', error);
            });
    }, []);

    const submit = async () => {
        try {
            const { data } = await defaultAxios.post('user/ouath/user', {
                ...user,
                email,
                dob,
                interest,
                password,
            });
        } catch (error) {
            console.error('error while creating user', error);

            if (error.response?.status == 400) {
                setErrors((prevError) => ({
                    ...prevError,
                    ...error.response.data?.error,
                }));
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
        <AnimatePresence mode='wait'>
            <section className="social-register flex flex-col justify-center gap-y-5">
                <p className="text-center font-gotham text-lg tracking-wide">
                    HI {user?.firstName?.toUpperCase()}, WE'RE NEARLY DONE...
                </p>

                <motion.div
                    variants={variants}
                    initial={'initial'}
                    animate={'animate'}
                    className="mx-[-12px] my-4 bg-blue-200 px-9 flex flex-col justify-center"
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
                        of it so you can use Google or your email address from
                        now on.
                    </motion.p>
                </motion.div>
                <section className="flex w-8/12 flex-col self-center ">
                    <section className="flex flex-col gap-y-3">
                        <Input
                            {...inputProps}
                            label={'EMAIL ADDRESS'}
                            value={email}
                            property={'email'}
                            setValue={setEmail}
                        />
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
                    />
                </section>
            </section>
        </AnimatePresence>
    );
}

export default SocialRegister;
