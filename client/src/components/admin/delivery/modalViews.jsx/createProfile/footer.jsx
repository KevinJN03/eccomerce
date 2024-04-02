import { AnimatePresence, motion } from 'framer-motion';
import { useContent } from '../../../../../context/ContentContext';
import { useCreateProfileContext } from '../../../../../context/createProfileContext';
import BubbleButton from '../../../../buttons/bubbleButton';
import ThemeBtn from '../../../../buttons/themeBtn';

function Footer({}) {
    const { setModalCheck, modalContent } = useContent();

    const { profile, btnLoad, handleSubmit } = useCreateProfileContext();
    return (
        <footer className="mt-10 flex items-center justify-between">
            <BubbleButton
                handleClick={() => {
                    if (modalContent?.handleCancel) {
                        modalContent.handleCancel();
                    } else {
                        setModalCheck(() => false);
                    }
                }}
            />

            <ThemeBtn text={'Save profile'} handleClick={handleSubmit}>
                {btnLoad ? (
                    <div className="spinner-circle spinner-sm [--spinner-color:255,255,255]" />
                ) : (
                    <div className="flex flex-row flex-nowrap items-center text-base font-medium text-white">
                        {modalContent?.button?.text || 'Save profile'}
                        <AnimatePresence>
                            {profile?.active_listings > 0 &&
                                modalContent?.version == 'edit' && (
                                    <motion.div
                                        className="relative ml-2 origin-right rounded-full bg-white px-2 py-1 text-xs font-normal"
                                        initial={{ opacity: 0, scaleX: 0 }}
                                        animate={{
                                            opacity: 1,
                                            scaleX: 1,
                                            transition: { duration: 0.5 },
                                        }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <motion.p
                                            className="!z-10"
                                            initial={{ opacity: 0 }}
                                            animate={{
                                                opacity: 1,
                                                transition: { delay: 0.5 },
                                            }}
                                        >
                                            {`Affects ${profile?.active_listings} ${profile.active_listings > 1 ? 'listings' : 'listing'}`}
                                        </motion.p>
                                    </motion.div>
                                )}
                        </AnimatePresence>
                    </div>
                )}
            </ThemeBtn>
        </footer>
    );
}

export default Footer;
