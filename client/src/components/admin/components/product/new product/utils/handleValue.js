export default function handleValue(options) {
    const { value, setValue, property, text, errorMessage, setError } = options;
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
    } else if (value < 0) {
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
    setValue(() => value);
}
