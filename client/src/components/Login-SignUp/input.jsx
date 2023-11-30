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
    inputClassName,
    icon,
}) {
    return (
        <div className={`input-container`}>
            <div className="relative flex flex-col">
                {error?.[property] && <ErrorMessage msg={error[property]} />}

                <label
                    htmlFor={label.toLowerCase().replaceAll(' ', '-')}
                    className={className}
                >
                    {`${label}${asterisk ? ' *' : ''} :`}{' '}
                </label>
                <div className={`relative flex flex-row ${inputClassName}`}>
                    <input
                        autoComplete={autoComplete}
                        type={property}
                        name={property}
                        id={property}
                        className={`login-signup-input`}
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
                    {icon && (
                        <img
                            src={icon.img}
                            alt={icon.alt}
                            className="absolute right-2 top-2/4 h-6 w-6 translate-y-[-50%]"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Input;
