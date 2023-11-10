import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import { useUserDashboardContext } from '../../../context/userContext';
import Address_Form from './form';

function Add_Address({}) {
    const { setAddress } = useUserDashboardContext();

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

            setTimeout(() => {
                setAddress(() => result.data.address);
              
                setLoading(() => false);
                navigate('/my-account/addresses');
            }, 1500);
        } catch (error) {
            setTimeout(() => {
                setLoading(() => false);
            }, 1500);
            setError(() => error.response.data);
            setDisable(true);
            console.log('error when adding address: ', error);
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
