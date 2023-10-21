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

    const minValue = options?.minValue || 0
    if (!value) {
        setError((prevState) => {
            return {
                ...prevState,
                [property]: `Please enter a valid ${text}.`,
            };
        });
    } else if (value == 0) {
        setError((prevState) => {
            return { ...prevState, [property]: errorMessage.zero };
        });
    } else if (value < minValue || value > maxValue) {
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
    options?.isObject ? setValue((obj) => {return {...obj, value, on: true}}): setValue(() => value);
}
