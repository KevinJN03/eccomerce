import arrow from '../../../assets/footer-icons/right-arrow.png';
import { useState } from 'react';
function Dropdown_Size({ title, options }) {
    const [size, setSize] = useState();

    return (
        <>
            <details className="dropdown mb-2 w-full bg-white h-14">
                <summary className="btn m-1 w-full justify-between rounded-none bg-white border-1 pb-6 h-full">
                    <div className='text-left'>
                        <p className='text-xxs'>{title}</p> 
                        <span className='text-base mb-3'>{size}</span>
                    </div>
                   
                    <span className="arrow-wrapper">
                        <img src={arrow} className='down-arrow'/>
                    </span>
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    {options.map((option) => {
                        return (
                            <li>
                                <option value={option} onClick={(e) => setSize(e.target.value)} >{option}</option>
                            </li>
                        );
                    })}
                </ul>
            </details>
        </>
    );
}

export default Dropdown_Size;
