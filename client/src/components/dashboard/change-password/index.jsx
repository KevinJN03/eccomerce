import { useEffect, useState } from 'react';
import Header from '../header';
import Input from '../../portal/input.jsx';
import ErrorMessage, { ErrorMessagePointerUp } from '../../portal/errorMessage';
import defaultAxios from '../../../api/axios.js';
import { useUserDashboardContext } from '../../../context/userContext.jsx';

export function PasswordInput({
    error,
    property,
    label,
    value,
    setValue,
    visible,
    setError,
    className,
    setVisible,
}) {
    return (
        <div className="input-container">
            <label htmlFor="password" className={className}>
                {label}:{' '}
            </label>

            <div className="relative">
                <input
                    id="password"
                    className="login-signup-input pr-20"
                    value={value}
                    type={visible ? 'text' : 'password'}
                    onChange={(e) => {
                        setValue(e.target.value);
                        setError((prevState) => ({
                            ...prevState,
                            [property]: null,
                        }));
                    }}
                />
                {value.length > 0 && (
                    <button
                        onClick={() => setVisible((prevState) => !prevState)}
                        className="absolute right-4 top-1/2 translate-y-[-50%] text-s font-bold"
                    >
                        {visible ? 'HIDE' : 'SHOW'}
                    </button>
                )}
            </div>
            {error?.[property] && (
                <ErrorMessagePointerUp
                    msg={error?.[property]}
                    className={'!relative !left-0 !top-[10px] mb-3'}
                />
            )}
        </div>
    );
}
function ChangePassword({}) {
    const [error, setError] = useState();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [disable, setDisable] = useState(true);
    const [newPassVisible, setNewPassVisible] = useState(false);
    const [currentPassVisible, setCurrentPassVisible] = useState(false);

    const { setIsDetailsUnSaved, setFooterMessage } = useUserDashboardContext();
    useEffect(() => {
        if (currentPassword && newPassword) {
            setDisable(() => false);
            setIsDetailsUnSaved(true);
        }

        if (currentPassword || newPassword) {
            setIsDetailsUnSaved(true);
        }
    }, [newPassword, currentPassword]);
    const props = {
        error,
        setError,
        asterisk: true,
        manyProperty: false,
        className: 'text-dark-gray',
    };

    const handleSubmit = async () => {
        try {
            const { data } = await defaultAxios.post('user/change-password', {
                currentPassword,
                newPassword,
            });

            setCurrentPassword(() => '');
            setNewPassword(() => '');
            setFooterMessage({
                text: 'Changes saved',
                success: true,
            });

            setIsDetailsUnSaved(() => false);
        } catch (error) {
            console.error('error while changing password', error);

            if (error?.response?.status == 400) {
                setError((prevError) => ({
                    ...prevError,
                    ...error?.response?.data?.error,
                }));
            }
        }
    };
    return (
        <section className="bg-white">
            <Header
                icon={
                    `${import.meta.env.VITE_CLOUDFRONT_URL}/files/logos/lock.png`
                }
                text={'CHANGE PASSWORD'}
                description={
                    'Feel free to update your password so your GLAMO account stays secure. (* Indicates a required field).'
                }
            /> 

            <section className="w-7/12 p-4">
                <PasswordInput
                    visible={currentPassVisible}
                    setVisible={setCurrentPassVisible}
                    label={'CURRENT PASSWORD'}
                    value={currentPassword}
                    property={'currentPassword'}
                    setValue={setCurrentPassword}
                    {...props}
                />
                <PasswordInput
                    visible={newPassVisible}
                    setVisible={setNewPassVisible}
                    value={newPassword}
                    label={'NEW PASSWORD'}
                    property={'newPassword'}
                    setValue={setNewPassword}
                    {...props}
                />

                <div className="mb-4 ml-4 mt-6 flex flex-row flex-nowrap items-center gap-x-4">
                    <span
                        className={`dot ${
                            newPassword.length > 10 && currentPassword
                                ? 'dot-success'
                                : ''
                        }`}
                    ></span>
                    <p>Must be 10 or more characters</p>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={disable}
                    type="button"
                    className="mt-4 w-full !bg-primary py-3 font-semibold text-white hover:!bg-black disabled:opacity-50"
                >
                    SAVE PASSWORD
                </button>
            </section>
        </section>
    );
}

export default ChangePassword;
