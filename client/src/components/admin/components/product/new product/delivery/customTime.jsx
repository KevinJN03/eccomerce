export default function CustomTime({ setProcessingTime, processingTime, setDisable }) {

    const updateType = (type) => {
        setProcessingTime((prevstate) => {
            return { ...prevstate, type: type };
        });
        setDisable(() => false);
    };

    const handleTime = (value, property) => {
        if(value == 0){
            return setProcessingTime((prevstate) => {
                  return { ...prevstate, [`${property}`]: 1 };
              });
          };
      
          return setProcessingTime((prevstate) => {
              return { ...prevstate,[ `${property}`] : parseInt(value) };
          });
    }

    const handleStart = (value) => {
        handleTime(value, 'start')
        setDisable(() => false);
    }
    const handleEnd = (value) => {
        handleTime(value, 'end')
        setDisable(() => false);
    };

    return (
        <>
            <span className=" mt-3 flex w-full flex-row items-center justify-end gap-6">
                <input
                    type="number"
                    className="border-1 w-16 px-3 py-2"
                    defaultValue={ processingTime ? processingTime.start : '1'}
                    min="1"
                    value={processingTime.start}
                    onChange={(e) => handleStart(e.target.value)}
                />
                <p>-</p>
                <input
                min={processingTime.start.toString()}
               
                    type="number"
                    className="border-1 w-16 px-3 py-2"
                    value={processingTime.end}
                    defaultValue={ processingTime ? processingTime.end : '1'}
                    onChange={(e) => handleEnd(e.target.value)}
                />
            </span>
            <span className="mt-1 flex w-full flex-row justify-end gap-2">
                <label htmlFor="days">Days</label>
                <input
                    type="radio"
                    defaultChecked = {processingTime && processingTime.type == 'days'}
                    id="days"
                    name="dayorweek"
                    value="days"
                    onChange={(e) => updateType(e.target.value)}
                />
                <label htmlFor="weeks" className="ml-4">
                    Weeks
                </label>
                <input
                    type="radio"
                    id="weeks"
                    name="dayorweek"
                    value="weeks"
                    defaultChecked = {processingTime && processingTime.type == 'weeks'}
                    onChange={(e) => updateType(e.target.value)}
                />
            </span>
        </>
    );
}
