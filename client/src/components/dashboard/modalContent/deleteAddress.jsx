import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios.js';
import { useUserDashboardContext } from '../../../context/userContext.jsx';
import { useAuth } from '../../../hooks/useAuth';
import DeleteModalContent from './deleteModalContent.jsx';

function DeleteAddress() {
    const { authDispatch } = useAuth();
    const {
        modalContent,
        setAddress,
        setModalCheck,
        address,
        setFooterMessage,
    } = useUserDashboardContext();

    const navigate = useNavigate();
    const deleteMethod = async () => {
        let success = false;
        try {
            const result = await axios.delete(
                `user/address/delete/${modalContent.id}`
            );

            setAddress(result.data.address);
            success = true;
            setModalCheck(false);
        } catch (error) {
            console.error('error: ', error);
            logOutUser({ error, authDispatch, navigate });
        } finally {
            if (success) {
                setFooterMessage({ success: null, text: 'Address deleted' });
            } else {
                setFooterMessage({
                    success,
                    text: 'Address failed to deleted. Please try again later',
                });
            }
        }
    };

    return (
        <DeleteModalContent
            text={'delete address'}
            buttonText="DELETE"
            description={'Are you sure you want to delete this address?'}
            handleClick={deleteMethod}
        />
    );
}

export default DeleteAddress;
