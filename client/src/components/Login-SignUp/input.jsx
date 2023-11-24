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
    manyProperty,
    className,
}) {
    return (
        <div className={`input-container`}>
            <div className="relative">
                {error?.[property] && <ErrorMessage msg={error[property]} />}
           
                <label
                    htmlFor={label.toLowerCase().replaceAll(' ', '-')}
                    className={className}
                >
                    {`${label}${asterisk ? ' *' : ''} :`}{' '}
                </label>
                <input
                    autoComplete={autoComplete}
                    type={property}
                    name={property}
                    id={property}
                    className="login-signup-input mt-2"
                    value={value}
                    onChange={(e) => {
                        manyProperty
                            ? setValue((prevState) => ({
                                  ...prevState,
                                  [property]: e.target.value,
                              }))
                            : setValue(e.target.value);

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
