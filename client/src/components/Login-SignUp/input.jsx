import ErrorMessage from './errorMessage';

function Input({
    error,
    value,
    setValue,
    property,
    label,
    setError,
    asterisk,
    autoComplete,
}) {
    return (
        <div className="input-container">
            <div className="relative">
                {error[property] && <ErrorMessage msg={error[property]} />}
                <label htmlFor={label.toLowerCase().replaceAll(' ', '-')}>
                    {`${label}${asterisk ? ' *' : ''} :`}{' '}
                </label>
                <input
                    autoComplete={autoComplete}
                    type={property}
                    name={property}
                    id={property}
                    className="login-signup-input"
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);

                        setError((prevState) => ({
                            ...prevState,
                            [property]: null,
                        }));
                    }}
                />
            </div>
        </div>
    );
}

export default Input;
