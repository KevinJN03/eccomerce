import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useEffect, useRef, useState } from 'react';
function Switch({state, toggle}) {
    return (
        <div
            className={`relative flex h-full max-w-fit cursor-pointer flex-row items-center`}
            onClick={toggle}
        >
            <input
                type="checkbox"
                className={` daisy-toggle daisy-toggle-lg ${
                    !state ? '!bg-black ' : '!bg-black'
                } `}
                readOnly
                checked={state}
           
            />
            <span className="absolute right-[5px] flex items-center justify-center bg-transparent">
                <CheckRoundedIcon
                    fontSize="small"
                    className="bg-transparent  !fill-white"
                />
            </span>
            <span className="absolute left-[6px] flex items-center justify-center bg-transparent">
                <CloseRoundedIcon
                    fontSize="small"
                    className="bg-transparent !fill-white"
                />
            </span>
        </div>
    );
}

export default Switch;
