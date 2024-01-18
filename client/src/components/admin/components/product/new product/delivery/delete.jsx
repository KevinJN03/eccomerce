import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import Modal from '../../../modal/modal.jsx';
import { useState } from 'react';
import { useContent } from '../../../../../../context/ContentContext.jsx';
import { useNewProduct } from '../../../../../../context/newProductContext.jsx';
function Delete({ id }) {
    const [check, setCheck] = useState(false);
    const { loading, setLoading } = useNewProduct();
    return (
        <section id="Delete">
            <DeleteForeverSharpIcon
                onClick={() => setCheck(true)}
                className="box-content rounded-full p-1 hover:bg-slate-100"
            />
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
