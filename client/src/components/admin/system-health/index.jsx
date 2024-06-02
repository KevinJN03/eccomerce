import frontendIcon from './ux.png';
import backendIcon from './developing.png';
import BubbleButton from '../../buttons/bubbleButton.jsx';
import { useEffect, useRef, useState } from 'react';
import { Box, Modal } from '@mui/material';
import BoxWithProps, { CloseModalButton } from '../../common/BoxwithProps.jsx';
import ThemeBtn from '../../buttons/themeBtn.jsx';
function SystemHealth({}) {
    const { VITE_FRONTEND_SYSTEM_HEALTH_URL, VITE_BACKEND_SYSTEM_HEALTH_URL } =
        import.meta.env;

    const [openModal, setOpenModal] = useState(false);
    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);

    const [redirectUrl, setRedirectUrl] = useState('');
    const [remainingTime, setRemainingTime] = useState(5);
    const reset = () => {
        setRemainingTime(() => 5);
        clearTimeout(timeoutRef.current);
        clearInterval(intervalRef.current);
    };
    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    const handleClick = (url, time = 0, activateInterval = true) => {
        reset();

        setOpenModal(() => true);
        if (activateInterval) {
            intervalRef.current = setInterval(() => {
                setRemainingTime((prevState) => prevState - 1);
            }, 1000);
        }

        timeoutRef.current = setTimeout(() => {
            window.open(url);
            setRemainingTime(() => 5);
            clearInterval(intervalRef.current);

            setOpenModal(() => false);
        }, time);
    };

    const handleCancel = () => {
        reset();
        setOpenModal(() => false);
    };
    return (
        <section className="system_health flex h-full min-h-screen w-full flex-col justify-start gap-4 overflow-hidden">
            <h1 className="border-b-2 px-10 py-6 text-2xl  font-semibold">
                System Health
            </h1>

            <div className="flex h-full flex-row items-center justify-center gap-5 ">
                {[
                    {
                        icon: backendIcon,
                        text: 'software development',
                        title: 'Backend',
                        url: VITE_BACKEND_SYSTEM_HEALTH_URL,
                    },
                    {
                        icon: frontendIcon,
                        text: 'monitor icon with web designing',
                        title: 'Frontend',
                        url: VITE_FRONTEND_SYSTEM_HEALTH_URL,
                    },
                ].map(({ url, icon, text, title }) => {
                    return (
                        <div key={text} className={'h-fit w-fit'}>
                            <BubbleButton
                                className={`!rounded p-8`}
                                handleClick={() => {
                                    setRedirectUrl(() => url);
                                    handleClick(url, 5000);
                                }}
                            >
                                <div className="flex h-full w-full flex-col gap-5">
                                    <img
                                        src={icon}
                                        alt={text}
                                        className="h-40 w-40 object-cover"
                                    />
                                    <p className="font-gotham text-xl font-medium">
                                        {title}
                                    </p>
                                </div>
                            </BubbleButton>
                        </div>
                    );
                })}
            </div>

            <Modal open={openModal} onClose={() => setOpenModal(() => false)}>
                <BoxWithProps>
                    <CloseModalButton handleClick={handleCancel} />

                    <section className="flex w-full flex-col rounded-3xl bg-white p-8">
                        <h1 className="font-EBGaramond text-3xl font-medium">
                            Redirecting{' '}
                        </h1>

                        <p className="mt-5 text-base">
                            You will be redirected in {remainingTime}{' '}
                            {remainingTime > 1 ? 'seconds' : 'second'}. If you
                            want to cancel the redirection, click the Cancel
                            button. To redirect immediately, click the Redirect
                            button.
                        </p>

                        <div className="mt-10 flex flex-nowrap justify-between">
                            <BubbleButton
                                text={'Cancel'}
                                handleClick={handleCancel}
                            />

                            <ThemeBtn
                                text={'Redirect'}
                                handleClick={() => {
                                    handleClick(redirectUrl, 0, false);
                                }}
                            />
                        </div>
                    </section>
                </BoxWithProps>
            </Modal>
        </section>
    );
}

export default SystemHealth;
