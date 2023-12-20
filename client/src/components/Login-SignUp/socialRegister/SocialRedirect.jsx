import { useEffect, useState } from 'react';
import disableLayout from '../../../hooks/disableLayout';
import { useAuth } from '../../../hooks/useAuth';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

function SocialRedirect({}) {
  

    const [loading, setLoading] = useState(true);
    const { authDispatch } = useAuth();
    const navigate = useNavigate();
    const fetchData = async () => {
        let success = false;
        try {
            const { data } = await axios.get('user/userData');

            authDispatch({ type: 'LOGIN', payload: data });
            success = true;
        } catch (error) {
        } finally {
            setTimeout(() => {
                if (!success) {
                    navigate('/portal/login');
                } else {
                    navigate('/my-account');
                }
            }, 1000);
        }
    };

    useEffect(() => {
        // fetchData();
    }, []);

    return (
        <section className="relative flex h-screen w-screen items-center justify-center">
            <div className="relative h-fit w-fit">
                <p className="absolute left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] font-gotham text-xl font-semibold">
                    G
                </p>
                <div className="spinner-simple spinner-xl [--spinner-color:var(--slate-11)]"></div>
            </div>
        </section>
    );
}

export default SocialRedirect;
