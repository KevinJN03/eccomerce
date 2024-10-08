import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

function DOB({ states }) {
    const { dob, setDob } = states;

    const handleDateChange = (date) => {
        setDob(date.format('YYYY-MM-DD'));
    };
    return (
        <div className="flex items-center gap-2">
            <label>DOB</label>
            <DatePicker
                value={dayjs(dob)}
                onChange={handleDateChange}
                slotProps={{ textField: { size: 'small' } }}
                // timezone="Europe/London"
            />
        </div>
    );
}

export default DOB;
