import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useEffect, useState } from 'react';
function Dropdown_Size({ title, options }) {
    const [size, setSize] = useState();
    const [open, setOpen] = useState(false);

    return (
        <>
            <details
                className="dropdown mb-2 h-14 w-full bg-white"
                onClick={() => setOpen((prevstate) => !prevstate)}
            >
                <summary className="border-1 btn m-1 h-full w-full justify-between rounded-none bg-white pb-6">
                    <div className="text-left">
                        <p className="text-xxs">{title}</p>
                        <span className="mb-3 text-base">{size}</span>
                    </div>

                    {/* <span className="arrow-wrapper">
                        <img loading="lazy"src={arrow} className='down-arrow'/>
                    </span> */}
                    <ExpandMoreRoundedIcon
                        className={open ? 'up-arrow' : 'down-arrow'}
                    />
                </summary>
                <ul className="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow">
                    {options?.map((option) => {
                        return (
                            <li>
                                <option
                                    value={option.size}
                                    onClick={(e) => setSize(e.target.value)}
                                >
                                    {option.size}
                                </option>
                            </li>
                        );
                    })}
                </ul>
            </details>
        </>
    );
}

export default Dropdown_Size;
