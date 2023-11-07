import { useState } from 'react';
import Input from '../../Login-SignUp/input';
import '../../../CSS/user-dashboard.scss';
import card_logo from '../../../assets/icons/credit-card.png';
import visa_logo from '../../../assets/icons/payment-icons/visa.svg';
import discover_logo from '../../../assets/icons/payment-icons/discover.svg';

import maestro_logo from '../../../assets/icons/payment-icons/maestro.svg';
import masterCard_logo from '../../../assets/icons/payment-icons/mastercard-alt.svg';

import american_express_logo from '../../../assets/icons/payment-icons/american-express.svg';

const paymentIconArray = [
    american_express_logo,
    visa_logo,
    maestro_logo,
    masterCard_logo,
    discover_logo,
];
function Add_Card({}) {
    const [cardNumber, setCardNumber] = useState('');
    const [error, setError] = useState({});
    const [name, setName] = useState('');
    const errorProps = {
        error,
        setError,
        asterisk: false,
    };
    const numberInputOnWheelPreventChange = (e) => {
        // Prevent the input value change
        e.target.blur();

        // Prevent the page/container scrolling
        e.stopPropagation();

        // Refocus immediately, on the next tick (after the current function is done)
        setTimeout(() => {
            e.target.focus();
        }, 0);
    };

    const handleCardNumber = (e) => {
        e.preventDefault();
        const lastIndex = parseInt(e.target.value.slice(-1));
        console.log({ lastIndex });
        if (!lastIndex && e.target.value.length > cardNumber.length) {
            return;
        }
        const parts = [];
        let value = e.target.value.replaceAll(' ', '');

        for (let i = 0; i < value.length; i += 4) {
            parts.push(value.substring(i, i + 4));
        }

        if (parts.length) {
            setCardNumber(() => parts.join(' '));
        } else {
            setCardNumber(() => value);
        }

        setError((prevState) => ({
            ...prevState,
            cardNumber: null,
        }));
    };

    const range = (start, stop, step, sliceStart) =>
        Array.from({ length: (stop - start) / step + 1 }, (_, i) =>
            ('0' + (start + i * step)).toString().slice(sliceStart)
        );

    const months = range(1, 12, 1, -2);
    const years = range(2023, 2033, 1, -4);

    return (
        <section className="add-card">
            <h2 className="mb-2 text-xl font-bold">{'ADD CARD'}</h2>
            <p>
                Now please enter your card details exactly as they are printed.
            </p>
            <div className="mb-4 mt-4 w-4/6">
                <div className="input-container">
                    <div className="relative">
                        {error.cardNumber && (
                            <ErrorMessage msg={error.cardNumber} />
                        )}
                        <label htmlFor={'card-number'}>CARD NUMBER:</label>
                        <div className="relative">
                            <input
                                onPaste={(e) => e.preventDefault()}
                                onCopy={(e) => e.preventDefault()}
                                pattern="^[0-9]*$"
                                inputMode="numeric"
                                autoCorrect="off"
                                spellCheck="false"
                                autoComplete="cc-number"
                                maxLength="23"
                                type={'text'}
                                name={'cardNumber'}
                                id={'cardNumber'}
                                className="login-signup-input cardNumber-input select-none pr-14"
                                value={cardNumber}
                                onChange={handleCardNumber}
                                // onWheel={numberInputOnWheelPreventChange}
                            />
                            <img
                                src={card_logo}
                                alt={
                                    'black credit card outline icon white transparent background'
                                }
                                className="absolute right-4 top-2/4 h-8 w-8 translate-y-[-50%]"
                            />
                        </div>
                    </div>
                </div>

                <div className="expiry-date input-container w-3/4">
                    <label htmlFor={'card-number'}>EXPIRY DATE: </label>
                    <div className="flex flex-row gap-x-2">
                        <select className="select !rounded-none border-[1px] !border-primary !outline-none">
                            <option>Month</option>

                            {months.map((item) => {
                                return <option>{item}</option>;
                            })}
                        </select>
                        <select className="select !rounded-none border-[1px] !border-primary !outline-none">
                            <option>Year</option>

                            {years.map((item) => {
                                return <option>{item}</option>;
                            })}
                        </select>
                    </div>
                </div>

                <Input
                    value={name}
                    setValue={setName}
                    label={'NAME ON CARD'}
                    property={'name'}
                    autoComplete={'country'}
                    {...errorProps}
                />

                <button
                    type="button"
                    className="w-full !bg-primary py-3 text-base font-bold tracking-wider text-white opacity-90 transition-all hover:opacity-100"
                >
                    SAVE CARD
                </button>
            </div>
            <div className="mt-2 border-t-2 pt-4 flex flex-row items-center gap-x-3">
                <p className="text-lg font-bold">WE ACCEPT: </p>
                <div className='flex flex-row gap-x-2'>
                    {paymentIconArray.map((icon)=> {
                        return <img src={icon} className='w-10 h-10'/>
                    })}
                </div>
            </div>
        </section>
    );
}

export default Add_Card;
