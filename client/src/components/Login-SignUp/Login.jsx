import { Link } from "react-router-dom";
function Login({}){
  
  return (
    <><div className="input-container">
                    <label htmlFor="email-address">EMAIL ADDRESS: </label>
                    <input
                        type="email"
                        id="email-address"
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
                </div>
                <Link to="/forget-password" className="text-s font-normal tracking-wide">Forgot password?</Link>
                <button type="button" className="login-signup-btn">
                    SIGN IN
                </button>
    </>

      
  )
};

export default Login
