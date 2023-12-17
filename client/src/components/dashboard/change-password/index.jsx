import { useState } from 'react';
import Header from '../header';
import Input from '../../Login-SignUp/input.jsx';
function ChangePassword({}) {
    const [error, setError] = useState();
const [currentPassword, setCurrentPassword] = useState('')


    const props = {
        error,
        setError,
        asterisk: true,
    };
    return (
        <section className="bg-white">
            <Header
                icon={
                    'https://dknhps0hwilzj.cloudfront.net/files/logos/lock.png'
                }
                text={'CHANGE PASSWORD'}
                description={
                    'Feel free to update your password so your GLAMO account stays secure. (* Indicates a required field).'
                }
            />

            <section className="p-4">
                <Input
                    setValue={currentPassword}
                    setValue={setCurrentPassword}
                    {...props}
                />
            </section>
        </section>
    );
}

export default ChangePassword;
