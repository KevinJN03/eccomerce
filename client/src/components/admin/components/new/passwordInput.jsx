import FormInput from './formInput';
import { passwordInput } from './formSource';
import { useState } from 'react';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import generator from 'generate-password-browser';
function Passwordinput({ passwordRef, setPassword, password }) {
    const PasswordContent = () => {
        const [show, setShow] = useState(false);
        const toggleShow = (e) => {
            setShow(!show);
            console.log(passwordRef.current.type);
            if (show) {
                passwordRef.current.type = 'password';
            } else {
                passwordRef.current.type = 'text';
            }
        };
        const generatePassword = () => {
            let newPassword = generator.generate({
                length: 12,
                numbers: true,
                symbols: true,
            });
            console.log(newPassword);
            setPassword(newPassword)
        };
        return (
            <span className="absolute right-2 top-2/4">
                <KeyRoundedIcon className="mr-2" onClick={generatePassword} />
                {show && <VisibilityRoundedIcon onClick={toggleShow} />}
                {!show && <VisibilityOffRoundedIcon onClick={toggleShow} />}
            </span>
        );
    };

    return (
        <FormInput
            inputInfo={passwordInput}
            content={<PasswordContent />}
            ref={passwordRef}
            value={password}
            setState={setPassword}
            className={'pr-20'}
        />
    );
}

export default Passwordinput;
