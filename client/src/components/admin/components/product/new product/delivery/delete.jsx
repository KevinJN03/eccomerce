import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import Modal from '../../../modal/modal.jsx';
import { useEffect, useRef, useState } from 'react';
import { useContent } from '../../../../../../context/ContentContext.jsx';
import { useNewProduct } from '../../../../../../context/newProductContext.jsx';

import { motion, AnimatePresence } from 'framer-motion';
import UserLogout from '../../../../../../hooks/userLogout.jsx';
import { adminAxios } from '../../../../../../api/axios.js';
import CancelButton from '../../../../../buttons/cancelButton.jsx';
function Delete({ id }) {
    const [check, setCheck] = useState(false);
    const {
        loading,
        setLoading,
        setModalCheck,
        modalContent,
        contentDispatch,
    } = useNewProduct();
    const [isHover, setIsHover] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const { logoutUser } = UserLogout();

    const abortControllerRef = useRef(new AbortController());

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const handleDelete = async () => {
        try {
            setBtnLoading(() => true);
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            adminAxios.delete(
                `/delete/delivery/${modalContent?.deliveryProfileId}`
            );
        } catch (error) {
            console.error('error while fetching', error.message);
        } finally {
            setTimeout(() => {
                setLoading(() => false);
                contentDispatch({ type: 'delivery_main' });
            }, 1000);
        }
    };

    const variant = {
        initial: {
            scale: 0.5,
        },

        animate: {
            scale: [0.5, 1.2, 1],
            transition: { duration: 0.3 },
        },
        exit: {
            scale: 0,
            opacity: 0,
            transition: {
                duration: 0.3,
            },
        },
    };

    return (
        <section className="delete-delivery-profile flex w-full flex-col items-center gap-7">
            <h1 className="font-EBGaramond text-3xl">
                Delete delivery profiles
            </h1>
            <p className="text-base">
                Are you sure you want to delete this profile?
            </p>

            <div className="relative flex w-full max-w-xs flex-row flex-nowrap items-center justify-between">
                <CancelButton handleClick={() => setModalCheck(() => false)} />
          
                <button
                    disabled={btnLoading}
                    onClick={handleDelete}
                    className="right theme-btn flex min-w-32 items-center justify-center rounded-full bg-black px-5 py-3 font-medium tracking-wide "
                >
                    {btnLoading ? (
                        <div className="daisy-loading daisy-loading-spinner daisy-loading-sm !text-white"></div>
                    ) : (
                        <span className="text-white">Delete Profile</span>
                    )}
                </button>
            </div>
        </section>
    );
}

export default Delete;
