function Interest({ setInterest, interest }) {
    return (
        <div className="input-container">
            <label>MOSTLY INTERESTED IN:</label>
            <div id="radio-wrapper">
                {['womenswear', 'menswear'].map((option) => {
                    return (
                        <div className="radio-containers" key={option}>
                            <input
                                className="daisy-radio"
                                type="radio"
                                name="interest"
                                id={option}
                                value={option}
                                checked={interest === option}
                                onChange={(e) =>
                                    setInterest(() => e.target.value)
                                }
                            />
                            <label htmlFor={option}>
                                {option[0].toUpperCase() + option.slice(1)}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Interest;
