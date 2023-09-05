import ReactFlagsSelect from 'react-flags-select';
import { useState } from "react";
import {userInput}from "./formSource.jsx"
function User_Form() {
    const [selected, setSelected] = useState("");
    return (
        <>
            {userInput.map(input => {
                return(
                    <div className="formInput" key={input.id}>
                        <label>{input.label}</label>
                        <input type={input.type} placeholder={input.placeHolder}/>
                    </div>
                )
            })}
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

export default User_Form
