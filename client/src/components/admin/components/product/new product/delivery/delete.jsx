import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import Modal from '../../../modal/modal.jsx';
import { useState } from 'react';
import { useContent } from '../../../../../../context/ContentContext.jsx';
function Delete({ id }) {
    const [check, setCheck] = useState(false);
    const {loading, setLoading} = useContent()
    return (
        <section id="Delete" className="">
            <DeleteForeverSharpIcon onClick={() => setCheck(true)} />
            <Modal
                setCheck={setCheck}
                check={check}
                className={'!absolute !z-[2000] '}
                deleteType={'delivery'}
                id={id}
                loading={loading}
                setLoading={setLoading}
            />
        </section>
    );
}

export default Delete;
