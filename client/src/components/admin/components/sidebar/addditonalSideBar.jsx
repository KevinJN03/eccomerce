import { Fade, Paper, Slide } from '@mui/material';
import { useContent } from '../../../../context/ContentContext';
import { useLocation, useNavigate } from 'react-router-dom';

function AdditionalSideBar({ closed }) {
    const { setAdditionalSideBar, additionalSideBar } = useContent();
    const navigate = useNavigate();

    const location = useLocation();
    return (
        <Slide
            direction={closed ? 'right' : 'left'}
            in={additionalSideBar?.on}
            mountOnEnter
            unmountOnExit
            timeout={500}
        >
            <div className="relative">
                <Fade
                    in={additionalSideBar?.on}
                    mountOnEnter
                    unmountOnExit
                    timeout={500}
                >
                    <Paper
                        onMouseLeave={() => {
                            setAdditionalSideBar(() => ({
                                on: false,
                                title: '',
                                options: [],
                            }));
                        }}
                        sx={{
                            position: 'absolute',
                            right: !closed && '0px',
                            height: '100vh',
                            left: closed && '5rem',

                            width: closed
                                ? 'calc(15rem - 50px)'
                                : 'calc(100% - 50px)',
                            // width: 'calc(15rem - 50px)',
                            // right: open ? '50rem' : '-5rem',
                            zIndex: (theme) => {
                                return theme.zIndex.drawer + 2;
                            },
                        }}
                        // className="!border !border-red-500"
                    >
                        <section className="w-full py-5 ">
                            <p className="px-3 text-sm font-medium text-black/70">
                                {additionalSideBar.title}
                            </p>
                            <div className="mt-5">
                                {additionalSideBar?.options?.map(
                                    ({ title, link }) => {
                                        return (
                                            <p
                                                className={`cursor-pointer p-3 text-s text-black/70 hover:bg-light-grey ${location.pathname == link ? 'bg-light-grey' : ''}`}
                                                onClick={() => {
                                                    navigate(link);

                                                    setAdditionalSideBar(
                                                        () => ({
                                                            on: false,
                                                            options: [],
                                                            title: '',
                                                        })
                                                    );
                                                }}
                                            >
                                                {title}
                                            </p>
                                        );
                                    }
                                )}
                            </div>
                        </section>
                    </Paper>
                </Fade>
            </div>
        </Slide>
    );
}

export default AdditionalSideBar;
