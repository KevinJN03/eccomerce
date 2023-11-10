import ErrorMessage from './errorMessage';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
function DobPicker({ error, setDob, showDescription, value, setError }) {
    return (
        <div className="input-container">
            {error.dob && <ErrorMessage msg={error.dob} />}
            <label htmlFor="dob">DATE OF BIRTH: </label>
            <div className="date-picker">
                <DatePicker
                    inputFormat="DD/MM/YYYY"
                    views={['day', 'month', 'year']}
                    slotProps={{
                        textField: { size: 'small', fullWidth: true },
                    }}
                    onChange={(e) => {
                        setDob(()=> e.format('DD/MM/YYYY'));
                        setError((prevState) => ({
                            ...prevState,
                            dob: null,
                        }));
                    }}
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
