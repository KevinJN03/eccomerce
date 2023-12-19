import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import { useUserDashboardContext } from '../../../context/userContext';
import Address_Form from './form';
import { useAuth } from '../../../hooks/useAuth';

function Add_Address({}) {
    const {
        setAddress,
        defaultAddresses,
        setDefaultAddresses,
        setFooterMessage,
    } = useUserDashboardContext();
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
        let success = false;
        var errorData = {};
        try {
            setLoading(() => true);
            const result = await axios.post('user/address/add', {
                firstName,
                lastName,
                mobile,
                ...address,
            });
            const { data } = result;
            // setTimeout(() => {
            setAddress(() => data.address);
            if (data.default_address) {
                setDefaultAddresses(() => data.default_address);
            }

            // }, 1500);
            success = true;
        } catch (error) {
            'error when adding address: ', error;

            if (error.response.status == 401) {
                authDispatch({ type: 'LOGOUT' });
                return navigate('/login');
            }

            // setError(() => error.response.data);

            Object.assign(errorData, error.response?.data);

            success = false;
            setDisable(true);
        } finally {
            setTimeout(() => {
                setLoading(() => false);
                if (success) {
                    navigate('/my-account/addresses');
                    setFooterMessage({ success, text: 'Address added' });
                } else {
                    console.log('here: ', errorData);
                    setError(() => errorData);
                }
            }, 1200);
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
