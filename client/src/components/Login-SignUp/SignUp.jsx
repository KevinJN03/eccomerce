import '../../CSS/login-signup.css';
import glamo from '../../assets/icons/glamo-black-logo.svg';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
function SignUp() {
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <>
                <h1 className="mb-9 text-center text-xl font-bold">
                    SIGN UP WITH EMAIL
                </h1>
                <div className="input-container">
                    <label htmlFor="email-address">EMAIL ADDRESS: </label>
                    <input
                        type="email"
                        id="email-address"
                        class="login-signup-input"
                    />
                    <p>We'll send your order confirmation here</p>
                </div>

                <div className="input-container">
                    <label htmlFor="first-name">FIRST NAME: </label>
                    <input
                        type="text"
                        id="first-name"
                        class="login-signup-input"
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="last-name">LAST NAME: </label>
                    <input
                        type="text"
                        id="last-name"
                        class="login-signup-input"
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="password">PASSWORD: </label>
                    <input
                        type="password"
                        id="passworde"
                        class="login-signup-input"
                    />
                    <p>Must be 10 or more characters</p>
                </div>

                <div className="input-container">
                    <label htmlFor="password">DATE OF BIRTH: </label>
                    {/* <input type="date" id="passworde" class="login-signup-input"/> */}
                    <div className="date-picker">
                        <DatePicker
                            views={['day']}
                            slotProps={{ textField: { size: 'small' } }}
                        />
                        <DatePicker
                            views={['month']}
                            slotProps={{ textField: { size: 'small' } }}
                        />
                        #
                        <DatePicker
                            views={['year']}
                            slotProps={{ textField: { size: 'small' } }}
                        />
                    </div>

                    <p>
                        You need to be 16 or over to use{' '}
                        <span className="tracking-wider">GLAMO</span>
                    </p>
                </div>
                <div className="input-container">
                    <label>MOSTLY INTERESTED IN:</label>
                    <div id="radio-wrapper">
                        <div className="radio-containers">
                            <input
                                type="radio"
                                name="interest"
                                id="womenswear"
                                value={'womenswear'}
                            />
                            <label htmlFor="womenswear">Womenswear</label>
                        </div>
                        <div className="radio-containers">
                            <input
                                type="radio"
                                name="interest"
                                id="menswear"
                                value={'menswear'}
                               
                            />
                            <label htmlFor="womenswear">Menswear</label>
                        </div>
                    </div>
                </div>

                <button type="button" className="login-signup-btn">
                    JOIN GLAMO
                </button>
            </>
        </LocalizationProvider>
    );
}

export default SignUp;
