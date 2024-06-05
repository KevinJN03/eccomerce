import frontendIcon from './ux.png';
import backendIcon from './server.png';
import PageTemplate from './pageTemplate.jsx';
const {
    VITE_FRONTEND_SYSTEM_HEALTH_URL,
    VITE_BACKEND_SYSTEM_HEALTH_URL,
    VITE_FRONTEND_SYSTEM_HEALTH_ACCOUNT,
    VITE_FRONTEND_SYSTEM_HEALTH_PASSWORD,
} = import.meta.env;

function SystemHealth({}) {
    return (
        <PageTemplate
            title={'System Health'}
            options={[
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
                    info: (
                        <>
                            <p>
                                Account:{' '}
                                <span>
                                    {VITE_FRONTEND_SYSTEM_HEALTH_ACCOUNT}
                                </span>
                            </p>
                            <p>
                                Password:{' '}
                                <span>
                                    {VITE_FRONTEND_SYSTEM_HEALTH_PASSWORD}
                                </span>
                            </p>
                        </>
                    ),
                },
            ]}
        />
    );
}

export default SystemHealth;
