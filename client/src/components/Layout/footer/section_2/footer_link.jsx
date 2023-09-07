import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { useWindowSize } from '@uidotdev/usehooks';
function Footer_Link({ legend, linkArr }) {
    const [open, setOpen] = useState(false);

    const screenSize = useWindowSize();

    function Mobile_Footer_Link() {
        const [open, setOpen] = useState(false);
        return (
            <>
                <div
                    className="py-2 pt-3 sm+md:flex sm+md:flex-row "
                    onClick={() => setOpen((prevstate) => !prevstate)}
                >
                    <legend className="text-sm font-bold">{legend}</legend>
                    <span className="lg:!hidden lg:!underline">
                        {open ? <RemoveRoundedIcon /> : <AddRoundedIcon />}
                    </span>
                </div>
                <div className="border-b-[1px] border-[var(--primary)] sm+md:pb-3">
                    {open &&
                        linkArr.map((item) => {
                            return (
                                <div key={linkArr.indexOf(item)}>
                                    <a
                                        href={item.url}
                                        className="text-s font-light"
                                    >
                                        {item.name}
                                    </a>
                                </div>
                            );
                        })}
                </div>
            </>
        );
    }

    return (
        <section id="footer-link">
            {screenSize.width <= 980 ? (
                <Mobile_Footer_Link />
            ) : (
                <>
                    <legend className="text-sm font-bold">{legend}</legend>

                    <div className="sm+md:border-b-[1px] sm+md:border-[var(--primary)] sm+md:pb-3">
                        {linkArr.map((item) => {
                            return (
                                <div key={linkArr.indexOf(item)}>
                                    <a
                                        href={item.url}
                                        className="text-s font-light"
                                    >
                                        {item.name}
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </section>
    );
}

export default Footer_Link;
