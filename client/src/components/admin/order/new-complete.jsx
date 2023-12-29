import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAdminOrderContext } from '../../../context/adminOrder';
function NewComplete({}) {
    const [hoverNew, setHoverNew] = useState(false);
    const [hoverComplete, setHoverComplete] = useState(false);

    const { status, setStatus, totalOrders } = useAdminOrderContext();
    const variant = (hover, value) => {
        return {
            initial: { scaleX: status == value ? 1 : 0 },
            animate: {
                backgroundColor:
                    status == value
                        ? '#000000'
                        : hover
                          ? 'rgba(0, 0, 0, 0.5)'
                          : '',
                scaleX: 1,
                transition: {
                    duration: 0.2,
                },
            },
            exit: {
                scaleX: 0,
                transition: { duration: 0.2 },
            },
        };
    };

    return (
        <section className="mb-4 flex flex-col gap-x-5 px-5">
            <div className="flex flex-row gap-6">
                <div
                    onClick={() => setStatus('New')}
                    className="relative"
                    onMouseEnter={() => setHoverNew(() => true)}
                    onMouseLeave={() => setHoverNew(() => false)}
                >
                    <p className="pb-3 text-base">
                        New <span className="text-sm">{totalOrders}</span>{' '}
                    </p>
                    <AnimatePresence>
                        {(hoverNew || status == 'New') && (
                            <motion.div
                                key={hoverNew}
                                variants={variant(hoverNew, 'New')}
                                animate={'animate'}
                                initial={'initial'}
                                exit={'exit'}
                                className={`bottom-[calc(0px - 2px)] absolute h-[2px] w-full ${
                                    status === 'New' ? 'bg-black' : ''
                                }`}
                            />
                        )}
                    </AnimatePresence>
                </div>
                <div
                    className="relative"
                    onClick={() => setStatus('Completed')}
                    onMouseEnter={() => setHoverComplete(() => true)}
                    onMouseLeave={() => setHoverComplete(() => false)}
                >
                    <p className="pb-3 text-base">Completed</p>
                    <AnimatePresence>
                        {(hoverComplete || status == 'Completed') && (
                            <motion.div
                                key={hoverComplete}
                                variants={variant(hoverComplete, 'Completed')}
                                animate={'animate'}
                                initial={'initial'}
                                exit={'exit'}
                                className={`bottom-[calc(0px - 2px)] absolute h-[2px] w-full ${
                                    status === 'Completed' ? 'bg-black' : ''
                                }`}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <div class=" m-0 h-[2px] w-full bg-light-grey !py-0"></div>
        </section>
    );
}

export default NewComplete;
