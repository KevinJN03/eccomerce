function Interest({ setInterest, interest }) {
    return (
        <div className="input-container">
            <label>MOSTLY INTERESTED IN:</label>
            <div id="radio-wrapper">
                <div className="radio-containers">
                    <input
                        type="radio"
                        name="interest"
                        id="womenswear"
                        value={'womenswear'}
                        defaultChecked={interest}
                        onClick={(e) => setInterest(() => e.target.value)}
                    />
                    <label htmlFor="womenswear">Womenswear</label>
                </div>
                <div className="radio-containers">
                    <input
                        type="radio"
                        name="interest"
                        id="menswear"
                        value={'menswear'}
                        defaultChecked={interest}
                        onClick={(e) => setInterest(() => e.target.value)}
                    />
                    <label htmlFor="womenswear">Menswear</label>
                </div>
            </div>
        </div>
    );
}

export default Interest;
