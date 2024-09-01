import frontendIcon from './ux.png';
import backendIcon from './server.png';
import BubbleButton from '../../buttons/bubbleButton.jsx';
import { useEffect, useRef, useState } from 'react';
import { Box, Modal, Popover, Typography } from '@mui/material';
import BoxWithProps, { CloseModalButton } from '../../common/BoxwithProps.jsx';
import ThemeBtn from '../../buttons/themeBtn.jsx';
import { QuestionMarkOutlined } from '@mui/icons-material';
function PageTemplate({ title, options }) {
    const [openModal, setOpenModal] = useState(false);
    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);

    const [redirectUrl, setRedirectUrl] = useState('');
    const [remainingTime, setRemainingTime] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);
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

    const handleInfoClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleInfoClose = (e) => {
        setAnchorEl(null);
    };
    return (
        <section className="system_health flex h-full min-h-screen w-full flex-col justify-start gap-4 overflow-hidden">
            <header className="flex h-full max-h-20 items-center border-b-2 px-6 py-4">
                <h1 className="text-2xl  font-semibold">{title} </h1>
            </header>

            <div className="flex h-full flex-row items-center justify-center gap-5 ">
                {options.map(({ url, icon, text, title, info }) => {
                    return (
                        <div key={text} className={'relative h-fit w-fit'}>
                            {info && (
                                <div className="absolute right-2 top-2 z-10">
                                    <BubbleButton
                                        handleClick={handleInfoClick}
                                        hoverClassName={'!bg-[#ffaf10]'}
                                        className={
                                            'border border-[#ffaf10] p-2 hover:!border-transparent'
                                        }
                                    >
                                        <QuestionMarkOutlined className="show-info !fill-[#293d7c]" />
                                    </BubbleButton>
                                </div>
                            )}

                            <Popover
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                onClose={handleInfoClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <Typography sx={{ p: 2 }}>
                                    Login Credential
                                    {info}
                                </Typography>
                            </Popover>
                            <BubbleButton
                                className={`!rounded p-8`}
                                handleClick={(e) => {
                                    setRedirectUrl(() => url);
                                    handleClick(url, 5000);
                                }}
                            >
                                <div
                                    id="show-info"
                                    className="relative flex h-full w-full flex-col gap-5"
                                >
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

            <Modal open={openModal} onClose={handleCancel}>
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

export default PageTemplate;
