import New_Product_Header from './header';
import CategorySelect from './select/select';
import { useEffect, useState } from 'react';
import { adminAxios } from '../../../../../api/axios.js';
import { useNewProduct } from '../../../../../context/newProductContext';
import OptionError from './variation/error/optionError';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';
function Details() {
    const {
        category,
        setCategory,
        gender,
        setGender,
        publishError,
        publishErrorDispatch,
    } = useNewProduct();
    const [genderError, setGenderError] = useState('');

    const [categoryError, setCategoryError] = useState('');

    const [allCategory, setAllCategory] = useState([]);

    const fetchData = async (route) => {
        try {
            const result = await adminAxios.get('category/all');

            const status = result.status;

            if (status == 200) {
                setCategoryError('');
            }
            setAllCategory(() =>
                result.data?.map(({ _id, name }) => ({ _id, name }))
            );
        } catch (error) {
            setCategoryError({
                msg: 'Failed to fetch Categories. Please try again',
                restart: true,
            });
        }
    };

    // const handleFetchCategory = () => {
    //     const data = fetchData('category');

    //     data.then((res) => {
    //         setAllCategory(res);
    //     });
    // };

    useEffect(() => {
        fetchData();
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
            duration: 2,
        },

        animate: {
            transition: {
                ease: 'easeInOut',
            },
        },
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
                            <div className="flex !h-full flex-nowrap items-center gap-2">
                                <CategorySelect
                                    isCategory={true}
                                    state={category}
                                    options={allCategory}
                                    handleChange={(e) => {
                                        setCategory(() => e.target.value);
                                        publishErrorDispatch({
                                            type: 'CLEAR',
                                            path: 'category',
                                        });
                                    }}
                                    title="Category"
                                />
                                {categoryError?.restart && (
                                    <motion.button
                                        onClick={fetchData}
                                        className="popover-trigger flex h-full"
                                        variants={restartVariants}
                                        animate="animate"
                                        exit="exit"
                                        whileHover="hover"
                                    >
                                        <LoopRoundedIcon />
                                    </motion.button>
                                )}
                            </div>

                            {publishError?.category && (
                                <OptionError
                                    msg={publishError.category}
                                    className={'mb-2 px-0 pb-0'}
                                />
                            )}
                        </span>
                        <div>
                            <CategorySelect
                                options={['Men', 'Women']}
                                title="Gender"
                                handleChange={(e) => {
                                    setGender(() => e.target.value);
                                    publishErrorDispatch({
                                        type: 'CLEAR',
                                        path: 'gender',
                                    });
                                }}
                                state={gender}
                            />

                            {publishError?.gender && (
                                <OptionError
                                    msg={publishError.gender}
                                    className={'mb-2 px-0 pb-0'}
                                />
                            )}
                        </div>
                    </div>
                </section>
            </motion.section>
        </AnimatePresence>
    );
}

export default Details;
