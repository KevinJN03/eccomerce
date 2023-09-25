

function Interest({ states }) {
    const { interest, setInterest } = states[5];
    const handleInterest = (e) => {
        setInterest(e.target.value);
    };
    return (
        <div className="formInput">
            <label>Interests</label>

            <span className="mt-2 flex flex-row justify-start">
                <span className="mr-2 flex flex-row gap-2">
                    <input
                        type="radio"
                        id="menswear"
                        name="interest"
                        value={'Menswear'}
                        defaultChecked
                        onClick={(e) => handleInterest(e)}
                    />
                    <label htmlFor="menswear">MensWear</label>
                </span>
                <span className="flex flex-row gap-2">
                    <input
                        type="radio"
                        id="womenswear"
                        name="interest"
                        value={'Womenswear'}
                        onClick={(e) => handleInterest(e)}
                    />
                    <label htmlFor="womenswear">WomensWear</label>
                </span>
            </span>
        </div>
    );
}

export default Interest;
