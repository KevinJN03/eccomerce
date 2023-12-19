import ErrorMessage, { ErrorMessagePointerUp } from './errorMessage';

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
    errorMsgClassName,
    type,
}) {
    const handleOnchange = (e) => {
        if (manyProperty) {
            setValue((prevState) => ({
                ...prevState,
                [property]: e.target.value,
            }));
        } else {
            setValue(() => e.target.value);
        }

        setError((prevState) => ({
            ...prevState,
            [property]: null,
        }));
    };
    return (
        <div className={`input-container`}>
            <div className="relative flex flex-col">
          

                <label
                    htmlFor={label.toLowerCase().replaceAll(' ', '-')}
                    className={className}
                >
                    {`${label}${asterisk ? ' *' : ''} :`}{' '}
                </label>
                <div className={`relative flex flex-row ${inputClassName}`}>
                    <input
                        autoComplete={autoComplete}
                        type={type || 'text'}
                        name={property}
                        id={property}
                        className={`login-signup-input py-4 ${
                            error?.[property] ? '!border-2 !border-red-500' : ''
                        }`}
                        value={value}
                        onChange={handleOnchange}
                    />
                    {icon && (
                        <img
                            src={icon.img}
                            alt={icon.alt}
                            className="absolute right-2 top-2/4 h-6 w-6 translate-y-[-50%]"
                        />
                    )}




                </div>

                {error?.[property] && (
                    // <ErrorMessage
                    //     msg={error[property]}
                    //     className={errorMsgClassName}
                    // />
                    <ErrorMessagePointerUp  msg={error[property]}
                        className={'w-full !top-3 !relative'} />
                )}
            </div>
        </div>
    );
}

export default Input;
