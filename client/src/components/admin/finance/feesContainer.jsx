import { KeyboardArrowUpSharp } from '@mui/icons-material';
import BubbleButton from '../../buttons/bubbleButton';
import { useEffect, useState } from 'react';

function FeeContainer({
    text,
    children,
    icon,
    bg,
    stats,
    num,
    numString,
    isOpen,
    setOpen,
}) {
    return (
        <section className="h-fit w-full rounded-xl border border-dark-gray p-3">
            <div
                key={text}
                className="left flex flex-1 items-center justify-between "
            >
                <BubbleButton
                    handleClick={() => setOpen((prevState) => !prevState)}
                >
                    <div className="flex flex-nowrap items-center gap-3">
                        <div className={`rounded-full ${bg} p-2`}>{icon} </div>

                        <p className="text-base font-medium">{text}</p>

                        <KeyboardArrowUpSharp />
                    </div>
                </BubbleButton>

                <p
                    className={`text-base font-semibold ${num < 0 ? 'text-red-700' : num > 0 && 'text-green-700'}`}
                >
                    {numString}
                </p>
            </div>

            {isOpen && <div>{children}</div>}
        </section>
    );
}

export default FeeContainer;
