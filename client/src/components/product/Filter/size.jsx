import { useState } from 'react';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence, animate, easeIn, motion } from 'framer-motion';
import { Container, duration } from '@mui/material';
import { useWindowSize } from '@uidotdev/usehooks';

const sizes = [
    { id: uuidv4(), value: 'S', type: 'shirt' },
    { id: uuidv4(), value: 'M', type: 'shirt' },
    { id: uuidv4(), value: 'L', type: 'shirt' },
    { id: uuidv4(), value: 'XL', type: 'shirt' },
    { id: uuidv4(), value: 'XXL', type: 'shirt' },
    { id: uuidv4(), value: 'XXXL', type: 'shirt' },
    { id: uuidv4(), value: '8', type: 'shoe' },
    { id: uuidv4(), value: '9', type: 'shoe' },
    { id: uuidv4(), value: '10', type: 'shoe' },
    { id: uuidv4(), value: '11', type: 'shoe' },
    { id: uuidv4(), value: '12', type: 'shoe' },
    { id: uuidv4(), value: '13', type: 'shoe' },
    { id: uuidv4(), value: '30', type: 'pant' },
    { id: uuidv4(), value: '32', type: 'pant' },
    { id: uuidv4(), value: '34', type: 'pant' },
    { id: uuidv4(), value: '36', type: 'pant' },
    { id: uuidv4(), value: '38', type: 'pant' },
    { id: uuidv4(), value: '40', type: 'pant' },
    { id: uuidv4(), value: '42', type: 'pant' },
];

function Size({ addToFilter }) {
    const [count, setCount] = useState();
    const [show, setShow] = useState(true);
    const [select, setSelect] = useState(false);
    const [shortView, setShortView] = useState(true);
    const screenSize = useWindowSize();

    const toggleShow = () => {
        setShow(!show);
    };
    const toggleSelect = () => {
        setSelect((select) => !select);
    };
    let toggleClass = show ? 'up-arrow' : 'down-arrow';

    const viewVars = {
        initial: {
            scaleY: 0,
        },
        animate: {
            scaleY: 1,
            transition: {
                duration: 0.5,
                ease: [0.12, 0, 0.39, 0],
            },
        },
        exit: {
            scaleY: 0,
            opacity: 0,
            transition: {
                duration: 0.5,
                ease: [0.22, 0, 0.36, 1],
            },
        },
    };

    const buttonVars = {
        initial: {
            y: '100%',
            transition: {
                duration: 0.5,
                // ease: [0.37, 0, 0.63, 1]
            },
        },
        open: {
            y: '0',
            transition: {
                duration: 0.5,
                ease: [0, 0.55, 0.45, 1],
            },
        },
    };

    const sizeView = (sizes, shortView) => {
        let viewArr = [];
        for (let i = 0; i < sizes.length; i++) {
            if (i == 6 && shortView && screenSize.width > 980) break;
            viewArr.push(
                <motion.button
                    variants={buttonVars}
                    initial="initial"
                    animate="open"
                    key={sizes[i].id}
                    type="button"
                    value={sizes[i].value}
                    onClick={(e) => addToFilter((num) => num + 1)}
                >
                    {sizes[i].value}
                </motion.button>
            );
        }

        return viewArr;
    };
    return (
        <section id="size-section">
            <div className="section-header" onClick={toggleShow}>
                <h3 className="section-title">
                    {count ? `Size (${count})` : 'Size'}
                </h3>
                <div className="arrow-wrapper" onClick={toggleShow}>
                    <KeyboardArrowDownRoundedIcon
                        className={` !text-[32px] ${
                            show ? 'up-arrow' : 'down-arrow'
                        }`}
                    />
                </div>
            </div>
            <AnimatePresence>
                {show && (
                    <motion.section
                        variants={viewVars}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="origin-top"
                    >
                        <motion.div id="size-btn-wrapper">
                            {sizeView(sizes, shortView)}
                        </motion.div>

                        {
                            <button
                                className="view-more-btn mt-3 flex items-center gap-2 text-sm underline underline-offset-[6px]"
                                onClick={() => setShortView(!shortView)}
                            >
                                {screenSize.width > 980 && (
                                    <>
                                        {shortView ? (
                                            <>
                                                {' '}
                                                <AddSharpIcon /> View More
                                            </>
                                        ) : (
                                            <>
                                                <RemoveSharpIcon /> View Less
                                            </>
                                        )}
                                    </>
                                )}
                            </button>
                        }
                    </motion.section>
                )}
            </AnimatePresence>
        </section>
    );
}

export default Size;
