import { adminAxios } from '../../../api/axios';
import LoginSignUp from '../../Login-SignUp/Index';
import Login from '../../Login-SignUp/Login';

function AdminLogin({}) {
    const handleSubmit = async (data, setError) => {
        debugger;

        if (!data.email) {
            setError((prevState) => ({
                ...prevState,
                email: 'Oops! You need to type your email here',
            }));
        }

        if (!data.password) {
            setError((prevState) => ({
                ...prevState,
                password: 'Hey, we need a password here',
            }));

            return;
        }

        try {
            const result = await adminAxios.post('login', data);

            console.log({ result });
        } catch (error) {
            console.log('error at admin login', error.response.data);

            setError(() => error.response.data);
        }
    };
    return (
        <section id="AdminLogin" className="h-screen">
            <LoginSignUp
                loginorSignup={'login'}
                admin={true}
                handleSubmit={handleSubmit}
            />
        </section>
    );
}

export default AdminLogin;
