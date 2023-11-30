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
            console.error('error: ', error);
            logOutUser({ error, authDispatch, navigate });
        }
    };

    return <DeleteModalContent text={'address'} deleteMethod={deleteMethod} />;
}

export default DeleteAddress;
