import { Toolbar, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';

function CollapseExpandIcon({ array }) {
    const getVariants = (idx) => {
        return {
            initial: {
                marginLeft: idx == 0 ? '0rem' : '-2rem',
            },
            whileHover: {
                marginLeft: idx == 0 ? '0rem' : '-0.5rem',
                transition: {
                    duration: 0.5,
                },
            },
            transition: {
                duration: 0.5,
            },
        };
    };

    return (
        <section className=" flex !w-32 flex-row flex-nowrap overflow-hidden">
            {array.slice(0, 2)?.map(({ images, title, ...item }, idx) => {
                return (
                    <Tooltip
                        title={title}
                        placement="top"
                        arrow
                        slotProps={{
                            arrow: {
                                sx: {
                                    fontSize: '0.8rem',
                                    '&:before': {
                                        // border: '1px solid #E6E8ED',
                                        borderColor: 'rgb(0,0,0,0.90)',

                                        backgroundColor: 'rgb(0,0,0,0.90)',
                                    },
                                },
                            },
                            tooltip: {
                                sx: {
                                    fontSize: '0.7rem',
                                    backgroundColor: 'rgb(0,0,0,0.90)',
                                    padding: '0.5rem 0.8rem',
                                    borderRadius: '0.5rem',
                                    borderWidth: '0px',
                                    borderColor: 'rgb(0,0,0,0.90)',
                                },
                            },
                        }}
                        classes={{
                            arrow: {
                                fontSize: '1rem',
                                '&:before': {
                                    // border: '1px solid #E6E8ED',
                                    borderColor: 'rgb(0,0,0,0.90)',

                                    backgroundColor: 'rgb(0,0,0,0.90)',
                                },
                            },
                        }}
                    >
                        <motion.img
                            variants={getVariants(idx)}
                            initial={'initial'}
                            whileHover={'whileHover'}
                            transition={'transition'}
                            key={`tester-${idx}`}
                            className={`inset-0 h-14 w-14 min-w-14 cursor-pointer ${idx == 0 ? 'rounded-lg' : 'rounded-r-lg'} object-cover`}
                            src={images[0]}
                            style={{
                                zIndex: array.length + 1 - idx,
                            }}
                        />
                    </Tooltip>
                );
            })}

            {array?.length > 2 && (
                <motion.div
                    variants={getVariants(1)}
                    initial={'initial'}
                    whileHover={'whileHover'}
                    transition={'transition'}
                    style={{
                        zIndex: 1,
                    }}
                    className=" inset-0 flex h-14 w-14 cursor-pointer items-center justify-center rounded-r-lg bg-black/50 "
                >
                    <p className="text-sm text-white">
                        {`+${array?.length - 2}`}
                    </p>
                </motion.div>
            )}
        </section>
    );
}

export default CollapseExpandIcon;
