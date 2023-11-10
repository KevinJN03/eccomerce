import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import { useUserDashboardContext } from '../../../context/userContext';
import { useAuth } from '../../../hooks/useAuth';
import DeleteModalContent from '../deleteModalContent';

function DeleteAddress() {
    const { authDispatch } = useAuth();
    const { modalContent, setAddress, setModalCheck, address } =
        useUserDashboardContext();

    const navigate = useNavigate();
    const deleteMethod = async () => {
        try {
            const result = await axios.delete(
                `user/address/delete/${modalContent.id}`
            );

            setAddress(result.data.address);
            setModalCheck(false);
        } catch (error) {
            console.log('error: ', error);
            if (error.response.status == 401) {
                authDispatch({ type: 'LOGOUT' });
                navigate('/login');
            }
        }
    };

    return <DeleteModalContent text={'address'} deleteMethod={deleteMethod} />;
}

export default DeleteAddress;
