import { useContent } from '../../../../../../context/ContentContext';
import New from './New';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
function Edit({profile}) {
    const {dispatch} = useContent()
    return (
        <section className="edit-delivery">
            <button onClick={() => dispatch({type: 'Edit', profile: profile})}>
                <ModeEditOutlineOutlinedIcon />
            </button>
        </section>
    );
}

export default Edit;
