import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useEffect, useState } from 'react';
function Dropdown_Size({ title, options }) {
    const [size, setSize] = useState();
    const [open, setOpen] = useState(false)

    return (
        <>
            <details className="dropdown mb-2 w-full bg-white h-14" onClick={()=> setOpen(prevstate => !prevstate)} >
                <summary className="btn m-1 w-full justify-between rounded-none bg-white border-1 pb-6 h-full">
                    <div className='text-left'>
                        <p className='text-xxs'>{title}</p> 
                        <span className='text-base mb-3'>{size}</span>
                    </div>
                   
                    {/* <span className="arrow-wrapper">
                        <img src={arrow} className='down-arrow'/>
                    </span> */}
                    <ExpandMoreRoundedIcon  className={open ? 'up-arrow' : 'down-arrow'}/>
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
