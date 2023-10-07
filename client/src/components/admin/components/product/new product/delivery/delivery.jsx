import Modal from '../../../modal/modal';
import New_Product_Header from '../header';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import New from './New';
import { useEffect, useState } from 'react';

import MainContent from './Main';

const views = {
    Main: <MainContent/>,
    New: <New/>,
    Edit: <New/>
}
import {
    ContentProvider,
    useContent,
} from '../../../../../../context/ContentContext';
import Edit from './edit';
import { useNewProduct } from '../../../../../../context/newProductContext';


export default function Delivery() {
  
    const { content, setContent, modalCheck, setModalCheck, loading, setLoading, dispatch } = useContent();

    const { profile} = useNewProduct()
const back = () => {
    dispatch({ type: 'Main' })
}
console.log({content})
    return (
        <section className='new-product-wrapper'>
        <section id="delivery">
            <New_Product_Header title={'Delivery'} />
            
            <div className="mt-3 flex items-center justify-between rounded-md border-2 p-4 font-semibold">
                <h3>
                    Delivery Option<span>*</span>
                </h3>
                {profile.length > 0  && <button onClick={() => setModalCheck(true)}>
                    <>
                    {profile.map((item) => {
                        return <p key={item._id}>{item.name}</p>
                    })}
                    </>
                    
                    </button>}
                { profile.length == 0  && <button onClick={() => setModalCheck(true)}>
                    Choose Profile
                </button>}
              
            </div>
            {modalCheck && (
                    <Modal
                        button_text="Select Profile"
                        ModalContent={views[content.type]}
                        check={modalCheck}
                        setCheck={setModalCheck}
                       loading={loading}
                       setLoading={setLoading}
                       back={back}
                    />
                )}
        </section>
        </section>
    );
}
