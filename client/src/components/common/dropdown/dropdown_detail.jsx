import arrow from '../../../assets/footer-icons/right-arrow.png';

import { useState } from 'react';
function DropDown_Detail({ details, header }) {
    const [show, setShow] = useState(false);
    const toggleShow = () => {
        setShow(!show);
    };
    let toggleClass = show ? 'up-arrow' : 'down-arrow';
    return (
        <section id="dropdown-detail" className="border-b-2">
            <div className="section-header">
                <h3 className="section-title">{header}</h3>
                <div className="arrow-wrapper" onClick={toggleShow}>
                    <img src={arrow} className={toggleClass} />
                </div>
            </div>
            <section className="max-650">{show ? details : null}</section>
        </section>
    );
}

export default DropDown_Detail;
