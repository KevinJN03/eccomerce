import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import './mobile-nav.scss';
import { useState } from 'react';
import close from '../../../assets/icons/close.png';

import Nav_Options from './nav-options';
function Mobile_Nav({}) {
    const [sideBar, setSideBar] = useState(false);

    const openMenu = () => {
        setSideBar((prevState) => !prevState);
        // toggle();
    };

    const closeMenu = () => {
        setSideBar(!sideBar);
        // toggle();
    };
    return (
        <section className="mobile-nav">
            <div
                className={sideBar ? 'opacity-0' : 'burger'}
                onClick={() => openMenu()}
            >
                <MenuRoundedIcon className="icon !fill-white" />
            </div>

            <Nav_Options sideBar={sideBar} closeMenu={closeMenu} />

            <div
                className={`backdrop ${sideBar && 'backdrop-open'}`}
                onClick={() => closeMenu()}
            ></div>
        </section>
    );
}

export default Mobile_Nav;
