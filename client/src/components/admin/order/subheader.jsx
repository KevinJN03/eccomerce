import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import { useState } from 'react';

function SubHeader({}) {
    const [check, setCheck] = useState(false);
    return (
        <section className="subheader flex flex-row gap-x-3 px-5 pb-6 pt-5">
            <div
                className={`${
                    check ? 'bg-black text-white' : ''
                } flex max-w-20 flex-row items-center rounded-sm border-[1px] p-2`}
            >
                <input
                    checked={check}
                    onChange={() => setCheck((prevState) => !prevState)}
                    type="checkbox"
                    className="daisy-checkbox daisy-checkbox-xs mr-2 rounded-sm checked:border-orange-400"
                />
                <p className="font-gotham text-sm text-inherit">0</p>
                <ArrowDropDownSharpIcon className="!fill-dark-gray" />
            </div>
            <button
                disabled
                class=" !rounded-sm border-[1px] bg-white px-3 text-sm font-medium disabled:bg-light-grey/40"
            >
                Print postage labels
            </button>
            <button
                disabled
                class="!rounded-sm border-[1px] bg-white px-3 text-sm font-medium disabled:bg-light-grey/40"
            >
                More actions
                <ArrowDropDownSharpIcon className="ml-1 !fill-dark-gray" />
            </button>
        </section>
    );
}

export default SubHeader;
