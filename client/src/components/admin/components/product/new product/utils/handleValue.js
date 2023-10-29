export default function handleValue(options) {
    const {
        value,
        setValue,
        property,
        text,
        errorMessage,
        setError,
        maxValue,
    } = options;

    let err = null;
    const minValue = options?.minValue || 0;
    if (!value || isNaN(value)) {
        err = `Please enter a valid ${text}.`;
        setError((prevState) => {
            return {
                ...prevState,
                [property]: `Please enter a valid ${text}.`,
            };
        });
    } else if (value == 0) {
        err = errorMessage.zero;
        setError((prevState) => {
            return { ...prevState, [property]: errorMessage.zero };
        });
    } else if (value < minValue || value > maxValue) {
        err = errorMessage.underZero;
        setError((prevState) => {
            return {
                ...prevState,
                [property]: errorMessage.underZero,
            };
        });
    } else {
        setError((prevState) => {
            return {
                ...prevState,
                [property]: null,
            };
        });
    }

    options?.isObject
        ? setValue((obj) => {
              return { ...obj, value, on: true };
          })
        : setValue(() => value);
    return err;
}
