import { AddRounded } from '@mui/icons-material';
import secure_icon from '../../../../assets/icons/secure-document.png';
import { useState } from 'react';
function PrivateNote({}) {
    const [open, setOpen] = useState(false);
    const toggle = () => {
        setOpen((prevState) => !prevState);
        return;
    };
    return (
        <div className="my-3 flex flex-row justify-between gap-3 rounded-sm border-[1px] p-4">
            <div className="left flex items-center gap-3">
                <img
                    src={secure_icon}
                    alt="secure document icon"
                    className={`h-5 w-5 ${open ? 'self-start' : 'self-center'}`}
                />
                {!open && <p className=''>Only you can see this note</p>}
            </div>
            {!open && (
                <button
                    onClick={toggle}
                    className="flex flex-nowrap items-center gap-1 rounded border-[1px] border-dark-gray/60 px-2 py-2 hover:bg-light-grey/100"
                >
                    <AddRounded className="!text-sm" />
                    <p className="text-xs">Add a private note</p>
                </button>
            )}
            {open && (
                <div className="flex w-full flex-col">
                    <textarea
                        className="border-[1px]"
                        name="private-note"
                        id="private-note"
                        // cols="30"
                        rows="4"
                    ></textarea>
                    <div className="mt-3 flex flex-row justify-end gap-2">
                        <button onClick={toggle} className="px-2 py-1 text-s rounded-sm border-[1px]">
                            Cancel
                        </button>
                        <button className="bg-black px-2 py-1  text-s text-white rounded-sm">
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PrivateNote;
