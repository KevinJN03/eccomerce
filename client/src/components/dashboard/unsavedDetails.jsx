import { useNavigate } from 'react-router-dom';
import DeleteModalContent from './deleteModalContent';
import { useUserDashboardContext } from '../../context/userContext';

function UnsavedDetails({}) {
    const { modalContent, setIsDetailsUnSaved, setModalCheck } =
        useUserDashboardContext();
    const navigate = useNavigate();
    const handleClick = () => {
        setIsDetailsUnSaved(() => false);
        setModalCheck(() => false);
        navigate(modalContent?.link);
    };
    return (
        <DeleteModalContent
            text={'UNSAVED DETAILS'}
            buttonText="LEAVE WITHOUT SAVING"
            description={
                'You are attempting to leave this page without saving your changes'
            }
            handleClick={handleClick}
        />
    );
}

export default UnsavedDetails;
