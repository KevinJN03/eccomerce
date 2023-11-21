import Info from '../../common/info';
import { Link } from 'react-router-dom';
import { useGenderCategory } from '../../../hooks/genderCategory';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

import variants from '../../common/framerMotionVariants';
import { motion } from 'framer-motion';
function Item({ image, title, price, text, url , loading}) {
    const [state] = useGenderCategory();
    return (
        <motion.a
            href={`/${state.gender}/product/${url}`}
            className="card"
            variants={variants}
            animate={'animate'}
            initial={'initial'}
            exit={'exit'}
        >
            <div id="image-wrapper" className="relative w-full h-full min-h-full">
                <div className="absolute bottom-2 right-0 flex flex-col gap-y-2">
                    <span className=" rounded-l-full bg-[var(--primary-2)] px-2 py-1 text-s font-semibold text-white sm:text-xs   sm:font-medium">
                        SELLING FAST
                    </span>
                    <span className="mr-3 flex items-center justify-center self-end rounded-full bg-white p-1">
                        <FavoriteBorderRoundedIcon />
                    </span>
                </div>

                <img
                    loading="lazy"
                    src={image}
                    className="h-full w-full object-cover"
                />
            </div>
            <Info title={title} price={price} text={text} />
        </motion.a>
    );
}

export default Item;
