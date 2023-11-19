import ErrorMessage from './errorMessage';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
function DobPicker({ error, setDob, showDescription, value, setError }) {
    const handleDateChange = (e) => {
        try {
            setDob(() => e.format());
            setError((prevState) => ({
                ...prevState,
                dob: null,
            }));
        } catch (error) {
            console.log('error changing date: ', error);
        }
    };
    return (
        <div className="input-container">
            {error.dob && <ErrorMessage msg={error.dob} />}
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
