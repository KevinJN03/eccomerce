import ErrorMessage, { ErrorMessagePointerUp } from './errorMessage';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
function DobPicker({ error, setDob, showDescription, value, setError }) {
    const handleDateChange = (e) => {
        try {
            
            setDob(() => e.set('h', 1).set('m', 0).set('s', 0).format());
            setError((prevState) => ({
                ...prevState,
                dob: null,
            }));
        } catch (error) {
            'error changing date: ', error;
        }
    };
    return (
        <div className="input-container">
            <label htmlFor="dob">DATE OF BIRTH: </label>
            <div className="date-picker">
                <DatePicker
                    inputFormat="DD-MM-YYYY"
                    views={['day', 'month', 'year']}
                    slotProps={{
                        textField: { size: 'small', fullWidth: true },
                    }}
                    onChange={handleDateChange}
                    defaultValue={dayjs(value)}
                />
            </div>
            {error?.dob && (
                <ErrorMessagePointerUp
                    msg={error.dob}
                    className={'!relative !top-3 w-full'}
                />
            )}
            {showDescription && (
                <p>
                    You need to be 18 or over to use{' '}
                    <span className="tracking-wider">GLAMO</span>
                </p>
            )}
        </div>
    );
}

export default DobPicker;
