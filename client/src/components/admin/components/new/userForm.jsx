import ReactFlagsSelect from 'react-flags-select';
import { useState } from 'react';
import { userInput } from './formSource.jsx';
function User_Form({ states, interestState }) {
    const [selected, setSelected] = useState('');
    const { interest, setInterest } = interestState;
const handleInterest = (e) => {
setInterest(e.target.value)
}
    return (
        <>
            {states.length > 0 &&
                userInput.map((input) => {
                    const findState = states.find((item) => {
                        if (input.id == item.id) {
                            return item;
                        }
                    });
                    return (
                        <div className="formInput" key={input.id}>
                            <label>{input.label}</label>
                            <input
                                type={input.type}
                                placeholder={input.placeHolder}
                                value={findState.state}
                                onChange={(e) =>
                                    findState.setState(e.target.value)
                                }
                            />
                        </div>
                    );
                })}
            <div className="formInput">
                <label>Interests</label>

                <span className="mt-2 flex flex-row justify-start">
                    <span className="flex flex-row gap-2 mr-2">
                        <input type="radio" id="menswear" name="interest" value={'Menswear'}  onClick={(e) => handleInterest(e)}/>
                        <label htmlFor="menswear">MensWear</label>
                    </span>
                    <span className="flex flex-row gap-2">
                        <input type="radio" id="womenswear" name="interest" value={'Womenswear'}  onClick={(e) => handleInterest(e)}/>
                        <label htmlFor="womenswear">WomensWear</label>
                    </span>
                </span>
            </div>
            <div className="formInput">
                <label>Country</label>
                <ReactFlagsSelect
                    selected={selected}
                    onSelect={(code) => setSelected(code)}
                    selectedSize={14}
                />
            </div>
        </>
    );
}

export default User_Form;
