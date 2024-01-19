import { useState } from 'react';


import { ErrorMessagePointerUp } from '../Login-SignUp/errorMessage';
function Input({ header, button_text, handleClick, setText, error, setError }) {
    const msg = {
        invalidCoupon:
            "Oops! The code you entered doesn't exist. Please check and try again.",
        emptyField: "Oops! You didn't enter a promo code.",
    };

    const handleOnChange = (e) => {
        setText(e.target.value);
        setError((prevstate) => (prevstate = { bool: false }));
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleClick();
        }
    };
    return (
        <>
            <label htmlFor="promo" className="font-bold tracking-wide">
                {header}
            </label>
            <span>
                <input
                    type="text"
                    id="promo"
                    onChange={(e) => handleOnChange(e)}
                    className={`!border-2 !border-black ${
                        error.bool && '!border-red-400'
                    }`}
                    onKeyDown={(e) => onKeyDown(e)}
                    tabIndex="0"
                ></input>

                <button
                    type="button"
                    className="!bg-[var(--primary-2)] font-gotham font-bold tracking-wider text-white transition-all hover:!bg-black"
                    onClick={handleClick}
                >
                    {button_text}
                </button>
                {error.bool && <ErrorMessagePointerUp msg={msg[error.msg]} />}
            </span>
        </>
    );
}

export default Input;
