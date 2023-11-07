import ErrorMessage from './errorMessage';
import { DatePicker } from '@mui/x-date-pickers';
function DobPicker({ error, setDob, showDescription }) {
    return (
        <div className="input-container">
            {error.dob && <ErrorMessage msg={error.dob} />}
            <label htmlFor="dob">DATE OF BIRTH: </label>
            <div className="date-picker">
                <DatePicker
                    views={['day', 'month', 'year']}
                    slotProps={{
                        textField: { size: 'small', fullWidth: true },
                    }}
                    onChange={(e) => {
                        setDob(e.format());
                        setError((prevState) => ({
                            ...prevState,
                            dob: null,
                        }));
                    }}
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
