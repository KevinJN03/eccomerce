import { Modal, buttonBaseClasses } from '@mui/material';
import New_Product_Header from './header';
import MultipleSelect from './select/select';
import CategorySelect from './select/select';
import { useEffect, useState } from 'react';
import axios from '../../../../../api/axios';
import { useNewProduct } from '../../../../../context/newProductContext';
import OptionError from './variation/error/optionError';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import restart from '../../../../../assets/icons/restart.png';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';
function Details() {
    const { category, setCategory , gender, setGender} = useNewProduct();
    const [error, setError] = useState('');
    const [allCategory, setAllCategory] = useState([]);

    const fetchData = async (route) => {
        try {
            const result = await axios.get(route);
            const status = result.status;
            if (status == 200) {
                setError('');
                return result.data;
            }
        } catch (error) {
            setError('Failed to fetch Categories. Please try again');
            console.log({ error });
            return [];
        }
    };

    const handleFetchCategory = () => {
        const data = fetchData('category');
        // console.log(data)
        data.then((res) => {
            setAllCategory(res);
        });
    };

    useEffect(() => {
        handleFetchCategory();
    }, []);

    const restartVariants = {
        initial: {
            rotate: 0,
        },
        hover: {
            rotate: 180,
            transition: {
                type: 'string',
                stiffness: 200,
                repeat: Infinity,
                repeatDelay: 1,
            },
        },

        exit: {
            opacity: 0,
            duration: 2
        },

        animate: {
            transition: {
                ease: 'easeInOut',
            
            }
        }
    };

    return (
        <AnimatePresence>
            <motion.section className="new-product-wrapper">
                <section id="details">
                    <New_Product_Header
                        title={'Details'}
                        text={
                            'Share a few more specifics about your item to make it easier to find in search, and to help buyers know what to expect.'
                        }
                    />

                    <div className="my-3 flex flex-col gap-y-8">
                        <span className="flex h-full  flex-col ">
                            {error && (
                                <OptionError
                                    msg={error}
                                    className={'mb-2 px-0 pb-0'}
                                />
                            )}
                            <span className="flex flex-nowrap items-center gap-2 !h-full">
                                <CategorySelect
                                 setState={setCategory}
                                    options={allCategory?.map((item) =>
                                        item?.name.toUpperCase()
                                    )}
                                    title="Category"
                                />
                                {error && (
                                    
                                        <motion.button
                                            onClick={handleFetchCategory}
                                            className="popover-trigger flex h-full"
                                            variants={restartVariants}
                                        animate="animate"
                                        exit='exit'
                                        whileHover="hover"
                                        
                                        >
                                            <LoopRoundedIcon />
                                        </motion.button>

                                       
                                )}
                            </span>
                        </span>
                        <CategorySelect
                            options={['Men', 'Women']}
                            title="Gender"
                            setState={setGender}
                        />
                    </div>
                </section>
            </motion.section>
        </AnimatePresence>
    );
}

export default Details;
