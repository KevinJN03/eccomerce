import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import arrow from '../../../assets/footer-icons/right-arrow.png';
import Arrow from './arrow.jsx';

function Color({ loading }) {
    const [count, setCount] = useState();
    const [show, setShow] = useState(true);
    const toggleShow = () => {
        setShow(!show);
    };
    const colors = [
        { id: uuidv4(), value: 'Black' },
        { id: uuidv4(), value: 'Blue' },
        { id: uuidv4(), value: 'White' },
        { id: uuidv4(), value: 'Pink' },
        { id: uuidv4(), value: 'Brown' },
        { id: uuidv4(), value: 'Red' },
        { id: uuidv4(), value: 'Yellow' },
        { id: uuidv4(), value: 'Green' },
        { id: uuidv4(), value: 'Gray' },
    ];

    const colorStyle = (color) => {
        return {
            backgroundColor: color,
        };
    };
    let toggleClass = show ? 'up-arrow' : 'down-arrow';
    return (
        <section id="color-section">
            {!loading ? (
                <>
                    <div className="section-header">
                        <h3 className="section-title">
                            {count ? `Colors (${count})` : 'Colors'}
                        </h3>
                        <div className="arrow-wrapper" onClick={toggleShow}>
                            <Arrow show={show} />
                        </div>
                    </div>
                    {show ? (
                        <section id="color-wrapper">
                            {colors.map((color) => {
                                return (
                                    <div key={color.id}>
                                        <div
                                            className="shade"
                                            style={colorStyle(color.value)}
                                        ></div>
                                        <p>{color.value}</p>
                                    </div>
                                );
                            })}
                        </section>
                    ) : (
                        ''
                    )}
                </>
            ) : (
                <div className="skeleton-pulse h-full min-h-[200px] w-full"></div>
            )}
        </section>
    );
}

export default Color;
