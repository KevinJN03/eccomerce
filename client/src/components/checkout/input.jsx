import { useState } from 'react';
function Input({
    header,
    button_text,
    handleClick,
    setText,
    error,
    setError,
}) {
    const msg = {
        invalidCoupon:
            "Oops! The code you entered doesn't exist. Please check and try again.",
        emptyField: "Oops! You didn't enter a promo code.",
    };

    const handleOnChange = (e) => {
        setText(e.target.value);
        setError((prevstate) => (prevstate = { bool: false }));
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
                    className={`${error.bool && '!border-red-400'}`}
                ></input>

                <button
                    type="button"
                    className="font-gotham font-bold tracking-wider text-white"
                    onClick={handleClick}
                >
                    {button_text}
                </button>
                {error.bool && (
                    <div className="promo-error border-1 relative relative top-[-5px] flex w-full border-red-500 bg-red-100 p-2">
                        <span className="triangle absolute left-10 top-[-23px] h-0 w-0 border-b-[15px] border-l-[10px] border-r-[10px] border-b-red-500 border-l-transparent border-r-transparent">
                            <span className="inner-triangle relative right-2  top-[-6px] h-0  w-0 border-b-[12px] border-l-[8px] border-r-[8px] border-b-red-100 border-l-transparent border-r-transparent"></span>
                        </span>
                        <p className="!w-full  font-light tracking-wider">
                            {msg[error.msg]}
                        </p>
                    </div>
                )}
            </span>
        </>
    );
}

export default Input;
