export default function handleValue({
    value,
    setValue,
    property,
    text,
    errorMessage,
    maxValue,
    publishErrorDispatch,
    minValue,
}) {
    let error = null;

    if (!value || isNaN(value)) {
        error = `Please enter a valid ${text}.`;
    } else if (value == 0) {
        error = errorMessage.zero;
    } else if (value < minValue || value > maxValue) {
        error = errorMessage.underZero;
    }

    setValue(() => value);

    if (error) {
        publishErrorDispatch({ type: 'ADD', msg: error, path: property });
    } else {
        publishErrorDispatch({ type: 'CLEAR', path: property });
    }

    return;
}
