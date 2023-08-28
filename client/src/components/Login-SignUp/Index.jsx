import '../../CSS/login-signup.css';
import glamo from '../../assets/icons/glamo-black-logo.svg';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SignUp from './SignUp';
import Login from './Login';
import { Link } from 'react-router-dom';
import { useState } from 'react';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
function LoginSignUp({ loginorSignup }) {
    const [option, setOption] = useState()
    return (
        <>
            <secton className="login-signup-page ">
                <section id="login-signup-container" className="">
                    <Link to="/" className="login-logo mt-10 w-40">
                        <img src={glamo} />
                    </Link >
                    <div id="login-signup-option">
                        <span onClick={()=> setOption("login") } className={option=="login" ? "active-option" :"not-active-option"}>
                            <Link to='/signup'>Join</Link>
                        </span>
                        <span id="midldle-border"></span>
                        <span onClick={()=> setOption("signup") } className={option=="signup" ? "active-option" : "not-active-option"}>
                            <Link to="/login" >Sign In</Link>
                        </span>
                    </div>
                    <section id="form-container">
                      {loginorSignup == 'login' && <Login />}
                    {loginorSignup == 'signup' && <SignUp />}  
                    </section>
                    
                </section>
                <div className="mt-2 flex flex-row gap-2 text-xs underline underline-offset-2 pb-5">
                    <span>
                        <a href="/pages/privacy-policy">Privacy Policy</a>
                    </span>
                    <span className="middle-seperator"></span>
                    <span>
                        <a href="/pages/terms-of-service">Term Of Service</a>
                    </span>
                </div>
            </secton>
        </>
    );
}

export default LoginSignUp;
