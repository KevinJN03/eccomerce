import ReactFlagsSelect from 'react-flags-select';
import { useRef, useState } from 'react';
import { userInput, passwordInput } from './formSource.jsx';
import Address from './address.jsx';
import FormInput from './formInput.jsx';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import Passwordinput from './passwordInput.jsx';
import DOB from './dob.jsx';
import Interest from './interest.jsx';

function User_Form({ states, interestState, type }) {
    const { password, setPassword } = states[4];
    const { dob, setDob } = states[7];
    const passwordRef = useRef(null);

    return (
        <>
            {userInput.map((input, idx) => {
                const state = Object.values(states[idx]);
                const value = state[0];
                const setState = state[1];
                return (
                    <FormInput
                        inputInfo={input}
                        setState={setState}
                        key={input.label}
                        value={value}
                    />
                );
            })}
            {type !== 'edit' && (
                <Passwordinput
                    passwordRef={passwordRef}
                    setPassword={setPassword}
                    password={password}
                />
            )}
            {/* <FormInput
                inputInfo={passwordInput}
                content={<PasswordContent />}
                ref={passwordRef}
                setState={setPassword}
                className={'pr-10'}
            /> */}

            <DOB states={{ dob, setDob }} />
            <Interest states={states} />
            <Address states={states} />
        </>
    );
}

export default User_Form;
