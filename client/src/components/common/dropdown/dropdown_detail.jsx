import arrow from '../../../assets/footer-icons/right-arrow.png';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useState } from 'react';
function DropDown_Detail({ details, header, headerClass, borderNone }) {
    const [show, setShow] = useState(false);
    const toggleShow = () => {
        setShow(!show);
    };
    let toggleClass = show ? 'up-arrow' : 'down-arrow';
    return (
        <section
            id="dropdown-detail"
            className={borderNone ? null : 'border-b-[thin]'}
        >
            <div className="section-header" onClick={toggleShow}>
                <h3 className={`section-title ${headerClass}`}>{header}</h3>
                <ExpandMoreRoundedIcon className={toggleClass} />
            </div>
            {show && (
                <section className=" mb-5 !max-w-[610px] md:min-w-full sm+md:mb-3">
                    {details}
                </section>
            )}
        </section>
    );
}

export default DropDown_Detail;
