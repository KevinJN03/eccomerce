import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import { useUserDashboardContext } from '../../../context/userContext';
import Address_Form from './form';
import { useAuth } from '../../../hooks/useAuth';

function Add_Address({}) {
    const { setAddress, defaultAddresses, setDefaultAddresses } =
        useUserDashboardContext();
    const { authDispatch } = useAuth();
    const navigate = useNavigate();
    const handleClick = async ({
        firstName,
        lastName,
        mobile,
        address,
        setError,
        setDisable,
        setLoading,
    }) => {
        try {
            setLoading(() => true);
            const result = await axios.post('user/address/add', {
                firstName,
                lastName,
                mobile,
                ...address,
            });
            const { data } = result;
            setTimeout(() => {
                setAddress(() => data.address);
                if (data.default_address) {
                    setDefaultAddresses(() => data.default_address);
                }
                setLoading(() => false);
                navigate('/my-account/addresses');
            }, 1500);
        } catch (error) {
            'error when adding address: ', error;
            setTimeout(() => {
                setLoading(() => false);
                if (error.response.status == 401) {
                    authDispatch({ type: 'LOGOUT' });
                    return navigate('/login');
                }

                setError(() => error.response.data);
                setDisable(true);
            }, 1500);
        }
    };

    return (
        <section className="Add_Address">
            <Address_Form
                handleClick={handleClick}
                title={'NEW ADDRESS'}
                description={
                    'Please enter an address you would like to save and deliver your items to.'
                }
            />
        </section>
    );
}

export default Add_Address;
