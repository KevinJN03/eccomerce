import { info } from 'autoprefixer';
import SystemHealth from '../system-health';
import PageTemplate from '../system-health/pageTemplate';
import logIcon from './log-data.png';
import Iframe from 'react-iframe';
const { VITE_LOGS_URL, VITE_BETTERSTACK_EMAIL, VITE_BETTERSTACK_PASSWORD } =
    import.meta.env;
function Logs({}) {
    return (
        <section className="h-full w-full">
            {/* <header className="flex h-full max-h-20 items-center border-b-2 px-6 py-4">
                <h1 className="text-2xl  font-semibold">{'Logs'} </h1>
            </header> */}
            {/* <div className='w-full border border-black min-h-screen h-full relative'>
               <iframe
               seamless="seamless"
              // scrolling="no"
                src={ VITE_LOGS_URL}
                frameborder="0"
                width={'100%'}
                height={'100%'}
                
                className=" !h-full !w-full !overflow-hidden absolute top-0 left-0"
            ></iframe>
            </div> */}

            <PageTemplate
                title={'Logs'}
                options={[
                    {
                        icon: logIcon,
                        text: 'log file icon',
                        title: 'Logs',
                        url: VITE_LOGS_URL,
                        info: (
                            <>
                                <p>
                                    Email: <span>{VITE_BETTERSTACK_EMAIL}</span>
                                </p>
                                <p>
                                    Password:{' '}
                                    <span>{VITE_BETTERSTACK_PASSWORD}</span>
                                </p>
                            </>
                        ),
                    },
                ]}
            />
        </section>
    );
}

export default Logs;
