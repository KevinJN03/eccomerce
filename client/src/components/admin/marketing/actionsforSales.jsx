import { ClickAwayListener } from '@mui/base';
import { AnimatePresence, motion } from 'framer-motion';
import variant from '../order/home/variant';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSalesDiscountContext } from '../../../context/SalesDiscountContext';
import _ from 'lodash';
import dayjs from 'dayjs';

function ActionsForSales({}) {
    const closeAction = () => {
        setShowAction(() => false);
    };

    const {
        setShowCustomPicker,
        option,
        setOption,
        showAction,
        setShowAction,
    } = useSalesDiscountContext();
    const [optionsArray, setOptionsArray] = useState(() => {
        const startOfToday = dayjs().startOf('day');
        const end_date = dayjs().endOf('day').toISOString();
        return [
            'today',
            'yesterday',
            'last_7_days',
            'last_30_days',
            'this_month',
            'last_month',
            'this_year',
            'last_year',
            'last_12_months',
            'all_time',
            'custom',
            ,
        ];
        // return [
        //     { text: 'Today' },
        //     { text: 'Yesterday' },
        //     { text: 'Last 7 Days' },
        //     { text: 'Last 30 Days' },
        //     { text: 'This month' },
        //     { text: 'Last month' },
        //     { text: 'This Year' },
        //     { text: 'Last Year' },
        //     { text: 'Last 12 Months' },
        //     { text: 'All Time' },
        //     { text: 'Custom' },
        // ].map(({ text }) => {
        //     return { text, value: _.toLower(text).replaceAll(' ', '_') };
        // });
    });
    return (
        <AnimatePresence>
            {showAction && (
                <ClickAwayListener onClickAway={closeAction}>
                    <motion.div
                        variants={variant}
                        animate={'animate'}
                        initial={'initial'}
                        exit={'exit'}
                        className={`absolute left-0 top-full z-10  rounded border border-gray-300 bg-white py-2`}
                    >
                        {optionsArray.map((value) => {
                            return (
                                <button
                                    key={value}
                                    onClick={(e) => {
                                        if (value == 'custom') {
                                            setShowCustomPicker(() => true);
                                        } else {
                                            setOption(() => ({ value }));
                                        }
                                        setShowAction(() => false);
                                    }}
                                    className={`whitespace-nowrap ${option.value == value ? 'bg-dark-gray/30' : ''} w-full py-2 pl-4 pr-10 text-left text-sm hover:bg-light-grey`}
                                >
                                    {_.upperFirst(value).replace(/_/g, ' ')}
                                </button>
                            );
                        })}
                        {/* {product?.status == 'active' && (
                            <div className="w-full border-b border-gray-300 pb-2">
                                <Link
                                    onClick={closeAction}
                                    to={`/product/${product?._id}`}
                                    target="_blank"
                                >
                                    <p className="!w-full !min-w-full cursor-pointer whitespace-nowrap py-2  pl-4 text-s hover:bg-light-grey/50">
                                        View on glamo
                                    </p>
                                </Link>

                                <p className="cursor-pointer whitespace-nowrap py-2 pl-4 text-s hover:bg-light-grey/50">
                                    View stats
                                </p>
                            </div>
                        )}
                        <div className="border-b border-gray-300 py-2">
                            <Link
                                onClick={closeAction}
                                to={`edit/${product._id}`}
                            >
                                <p className="cursor-pointer whitespace-nowrap py-2 pl-4 hover:bg-light-grey/50">
                                    Edit
                                </p>
                            </Link>

                            <Link
                                onClick={closeAction}
                                to={`copy/${product?._id}`}
                                target="_blank"
                            >
                                <p className="cursor-pointer whitespace-nowrap py-2 pl-4 hover:bg-light-grey/50">
                                    Copy
                                </p>
                            </Link>

                            <button
                                onClick={() => {
                                    handleClick({
                                        productIds: [product?._id],
                                        type: text[
                                            product?.status
                                        ].toLowerCase(),
                                    });
                                    closeAction();
                                }}
                                className="w-full cursor-pointer py-2 pl-4 text-left hover:bg-light-grey/50"
                            >
                                <p>{text[product?.status]}</p>
                            </button>
                        </div>
                        <div className="border-b border-gray-300 py-2">
                            <p
                                onClick={() => {
                                    handleClick({
                                        productIds: [product?._id],
                                        type: 'change_section',
                                    });
                                    closeAction();
                                }}
                                className="cursor-pointer whitespace-nowrap py-2 pl-4 pr-14 hover:bg-light-grey/50"
                            >
                                Change Section
                            </p>
                        </div>
                        <p
                            onClick={() => {
                                handleClick({
                                    type: 'delete',
                                    productIds: [product?._id],
                                });
                                closeAction();
                            }}
                            className="mt-2 cursor-pointer whitespace-nowrap py-2 pl-4 hover:bg-light-grey/50"
                        >
                            Delete
                        </p> */}
                    </motion.div>
                </ClickAwayListener>
            )}
        </AnimatePresence>
    );
}

export default ActionsForSales;
