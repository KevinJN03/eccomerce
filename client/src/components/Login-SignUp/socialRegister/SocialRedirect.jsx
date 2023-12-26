import { useEffect, useState } from 'react';
import disableLayout from '../../../hooks/disableLayout';
import { useAuth } from '../../../hooks/useAuth';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import GLoader from './gloader';

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
            }, 3000);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <section className="relative flex h-screen w-screen items-center justify-center">
           <GLoader/>
        </section>
    );
}

export default SocialRedirect;
