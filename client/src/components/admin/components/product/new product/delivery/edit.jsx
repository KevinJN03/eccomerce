import { useContent } from '../../../../../../context/ContentContext';
import { useNewProduct } from '../../../../../../context/newProductContext';
import New from './New';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
function Edit({ profile }) {
    const { contentDispatch } = useNewProduct();
    const handleEdit = () => {
        contentDispatch({ type: 'delivery_edit', profile: profile });
    };
    return (
        <section className="edit-delivery">
            <button
                className="box-content rounded-full p-1 hover:bg-slate-100"
                onClick={handleEdit}
            >
                <ModeEditOutlineOutlinedIcon />
            </button>
        </section>
    );
}

export default Edit;
