import { useContent } from '../../../../../../context/ContentContext';
import New from './New';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
function Edit({profile}) {
    const {dispatch} = useContent()
const handleEdit = ( ) => {
 
    dispatch({type: 'Edit', profile: profile})
}
    return (
        <section className="edit-delivery">
            <button className= '' onClick={handleEdit}>
                <ModeEditOutlineOutlinedIcon />
            </button>
        </section>
    );
}

export default Edit;
