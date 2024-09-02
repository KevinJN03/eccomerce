import getRanges from './ranges.js';
import logos from './logos.jsx';
import Input from '../../Login-SignUp/input.jsx';
function Form({
    error,
    setError,
    name,
    setName,
    cardNumber,
    handleCardNumber,
    handleClick,
    cvc,
    setCvc,
}) {
    const { months, years } = getRanges();

    const errorProps = {
        error,
        setError,
    };
    return (
        <section className="">
            <div>
                <div className="input-container">
                    <div className="relative">
                        {error?.cardNumber && (
                            <ErrorMessage msg={error?.cardNumber} />
                        )}
                        <label htmlFor={'card-number'}>CARD NUMBER:</label>
                        <div className="relative">
                            <div id="card-number" className="border-2"></div>
                            {/* <input
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
                            /> */}
                            {/* <img
                                src={logos.card_logo}
                                alt={
                                    'black credit card outline icon white transparent background'
                                }
                                className="absolute right-4 top-2/4 h-8 w-8 translate-y-[-50%]"
                            /> */}
                        </div>
                    </div>
                </div>

                <div className="expiry-date input-container w-3/4">
                    <label htmlFor={'card-number'}>EXPIRY DATE: </label>
                    <div className="flex flex-row gap-x-2 " id="card-expiry">
                        {/* <select className="select !!rounded-none border-[1px] !border-primary !outline-none">
                            <option>Month</option>

                            {months.map((item) => {
                                return <option key={item}>{item}</option>;
                            })}
                        </select>
                        <select className="select !!rounded-none border-[1px] !border-primary !outline-none">
                            <option>Year</option>

                            {years.map((item) => {
                                return <option key={item}>{item}</option>;
                            })}
                        </select> */}
                    </div>
                </div>

                <div id="card-cvc"></div>

                {/* <Input
                    value={cvc}
                    setValue={setCvc}
                    label={'CVC'}
                    property={'cvc'}
                    className={'w-2/6'}
                    {...errorProps}
                /> */}
                <Input
                    value={name}
                    setValue={setName}
                    label={'NAME ON CARD'}
                    property={'name'}
                    autoComplete={'country'}
                    {...errorProps}
                />

                <button
                    onClick={handleClick}
                    type="button"
                    className="w-full !bg-primary py-3 text-base font-bold tracking-wider text-white opacity-90 transition-all hover:opacity-100"
                >
                    SAVE CARD
                </button>
            </div>
            <div className="mt-2 flex flex-row items-center gap-x-3 border-t-2 pt-4">
                <p className="whitespace-nowrap text-lg font-bold">
                    WE ACCEPT:{' '}
                </p>
                <div className="flex flex-row gap-x-2">
                    {Object.values(logos).map((icon) => {
                        return <img src={icon} className="h-10 w-10" />;
                    })}
                </div>
            </div>
        </section>
    );
}

export default Form;
