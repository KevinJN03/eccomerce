import arrow from '../../../assets/footer-icons/right-arrow.png';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useEffect, useState } from 'react';
function DropDown_Detail({
    details,
    header,
    headerClass,
    borderNone,
    className,
    // triggerClose,
    // setTriggerClose,
    // display,
    // setDisplay,
    show,
    toggleShow,
    disable,
}) {
    // const toggleShow = () => {

    //     if (display != undefined) {
    //         setDisplay(show);
    //     }
    // };

    let toggleClass = show ? 'up-arrow' : 'down-arrow';

    // if (triggerClose != null) {
    //     useEffect(() => {
    //         setShow(false);
    //         setTriggerClose(false);
    //         setDisplay(true);
    //     }, [triggerClose]);
    // }

    return (
        <section
            id="dropdown-detail"
            className={`${borderNone ? null : 'border-b-[thin]'} ${className} `}
        >
            <button
                className="section-header w-full disabled:cursor-not-allowed"
                onClick={toggleShow}
                disabled={disable}
            >
                <h3 className={`section-title ${headerClass}`}>{header}</h3>
                <ExpandMoreRoundedIcon className={toggleClass} />
            </button>
            {show && (
                <section className=" mb-5 !max-w-[610px] md:min-w-full sm+md:mb-3">
                    {details}
                </section>
            )}
        </section>
    );
}

export default DropDown_Detail;
