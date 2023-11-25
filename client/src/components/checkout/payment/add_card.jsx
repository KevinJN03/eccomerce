import { useEffect, useState } from 'react';
import ErrorMessage from '../../Login-SignUp/errorMessage';
import Input from '../../Login-SignUp/input';
import logos from '../../dashboard/payment-methods/logos';
import credit_icon from '../../../assets/icons/credit-card.png';
import dayjs from 'dayjs';
import cvv_icon from '../../../assets/icons/cvv-icon.png';
import { SubHeader } from './payment';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export default function Add_Card({}) {
    const stripe = useStripe();

    const elements = useElements();

    useEffect(() => {
        if (elements) {
            if (elements.getElement('cardNumber')) {
                return;
            }
            var cardNumberElement = elements.create('cardNumber', {
                classes: {
                    base: 'card-number-input',
                },
            });
            var cardCvcElement = elements.create('cardCvc', {
                classes: {
                    base: 'card-number-input',
                },
            });
            cardNumberElement.mount('#cardNumber');
            cardCvcElement.mount('#cardCvc');
        }
    }, [elements]);
    const [cardNumber, setCardNumber] = useState('');
    const [error, setError] = useState({});
    const [name, setName] = useState('');

    const [cvv, setCvv] = useState('');
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

    const tenYearsfromNow = dayjs().add(10, 'year').year();
    const range = (start, stop, step, sliceStart) =>
        Array.from({ length: (stop - start) / step + 1 }, (_, i) =>
            ('0' + (start + i * step)).toString().slice(sliceStart)
        );

    const months = range(1, 12, 1, -2);
    const years = range(dayjs().year(), tenYearsfromNow, 1, -4);

    return (
        <section className="add-card">
            <SubHeader text={'ADD CREDIT/DEBIT CARD'} disablePadding={true} />

            <div className="mb-4 mt-4 w-4/6">
                {/* <div className="input-container">
                    <div className="relative">
                        {error.cardNumber && (
                            <ErrorMessage msg={error['cardNumber']} />
                        )}
                        <label htmlFor={'card-number'}>CARD NUMBER:</label>
                        <div className="relative">
                            <div
                                // onPaste={(e) => e.preventDefault()}
                                // onCopy={(e) => e.preventDefault()}
                                // pattern="^[0-9]*$"
                                // inputMode="numeric"
                                // autoCorrect="off"
                                // spellCheck="false"
                                // autoComplete="cc-number"
                                // maxLength="23"
                                // type={'text'}
                                name={'cardNumber'}
                                id={'cardNumber'}
                                className="login-signup-input cardNumber-input select-none pr-14"
                                value={cardNumber}
                                onChange={handleCardNumber}
                                // onWheel={numberInputOnWheelPreventChange}
                            ></div>
                            <img
                                src={credit_icon}
                                alt={
                                    'black credit card outline icon white transparent background'
                                }
                                className="absolute right-4 top-2/4 h-8 w-8 translate-y-[-50%]"
                            />
                        </div>
                    </div>
                </div> */}


                <ElementDiv
                    label={'CARD NUMBER'}
                    id={'cardNumber'}
                    icon={{ img: credit_icon, alt: 'credit card icon' }}
                    className={'w-full'}
                />
                <div className="expiry-date input-container w-3/4">
                    <label htmlFor={'card-number'}>EXPIRY DATE </label>
                    <div className="flex flex-row gap-x-2">
                        {[
                            { data: months, title: 'Month' },
                            { data: years, title: 'Year' },
                        ].map(({ data, title }, idx) => {
                            return (
                                <select
                                    key={idx}
                                    className="select h-11 !rounded-none border-[1px] !border-primary !outline-none"
                                >
                                    <option>{title}</option>

                                    {data.map((item) => {
                                        return (
                                            <option key={item}>{item}</option>
                                        );
                                    })}
                                </select>
                            );
                        })}
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

                <ElementDiv
                    label={'CVC'}
                    id={'cardCvc'}
                    icon={{ img: cvv_icon, alt: 'cvc icon' }}
                    className={'w-2/6'}
                />

                {/* <div className='h-12 w-full border-black border-[1px] w-2/4 relative flex flex-col gap-y-3 !mt-0 relative'>
                    <input
                        type="text"
                        value={cvv}
                        maxLength={3}
                        className="mt-2 login-signup-input !mt-0"
                        onChange={(e) => setCvv(e.target.value)}
                    />
                    <img src={cvv_icon} alt="cvv icon" className='h-6 w-6 relative' />
                </div> */}

                <button
                    type="button"
                    className="w-full !bg-primary py-3 text-base font-bold tracking-wider text-white opacity-90 transition-all hover:opacity-100"
                >
                    USE THIS CARD
                </button>
            </div>
            {/* <div className="mt-2 flex flex-row items-center gap-x-3 border-t-2 pt-4">
                <p className="text-lg font-bold">WE ACCEPT: </p>
                <div className="flex flex-row gap-x-2">
                    {Object.values(logos).map((icon) => {
                        return <img src={icon} className="h-10 w-10" />;
                    })}
                </div>
            </div> */}
        </section>
    );
}

function ElementDiv({ label, id, icon, className }) {
    return (
        <div className={`${className} input-container relative flex flex-wrap`}>
            <label htmlFor={id} className="w-full basis-full">
                {label}
            </label>
<section className='relative'>
     <div id={id}></div>
          {icon &&  <img
                src={icon.img}
                alt={icon.alt}
                className="absolute right-3 h-6 w-6 top-2/4 translate-y-[-50%]"
            />}
</section>
           
        </div>
    );
}
