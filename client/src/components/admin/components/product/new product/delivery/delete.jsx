import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import Modal from '../../../modal/modal.jsx';
import { useState } from 'react';
import { useContent } from '../../../../../../context/ContentContext.jsx';
function Delete({ id }) {
    const [check, setCheck] = useState(false);
    const { loading, setLoading } = useContent();
    return (
        <section id="Delete">
            <DeleteForeverSharpIcon onClick={() => setCheck(true)} className='hover:bg-slate-100 box-content p-1 rounded-full' />
            <div className={'!fixed !z-[2000] !min-h-[2000px]'}>
                <Modal
                    setCheck={setCheck}
                    check={check}
                    // className={
                    //     '!absolute '
                    // }
                    deleteType={'delivery'}
                    id={id}
                    loading={loading}
                    setLoading={setLoading}
                    className={'!h-full !min-h-screen'}
                />
            </div>
        </section>
    );
}

export default Delete;
