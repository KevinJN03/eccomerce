import Modal from '../../../modal/modal';
import New_Product_Header from '../header';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import New from './New';
import { useEffect, useState } from 'react';

import MainContent from './Main';
import {
    ContentProvider,
    useContent,
} from '../../../../../../context/ContentContext';
export default function Delivery() {
  
    const { content, setContent, modalCheck, setModalCheck, profile, loading, setLoading, dispatch } = useContent();
const back = () => {
    dispatch({ type: 'Main' })
}
    return (
        <section id="delivery">
            <New_Product_Header title={'Delivery'} />
            
            <div className="mt-3 flex items-center justify-between rounded-md border-2 p-4 font-semibold">
                <h3>
                    Delivery Option<span>*</span>
                </h3>
                {profile.length > 0  && <button onClick={() => setModalCheck(true)}>
                    <>
                    {profile.map((item) => {
                        return <p>{item.name}</p>
                    })}
                    </>
                    
                    </button>}
                { profile.length == 0  && <button onClick={() => setModalCheck(true)}>
                    Choose Profile
                </button>}
                {modalCheck && (
                    <Modal
                        button_text="Select Profile"
                        ModalContent={content}
                        check={modalCheck}
                        setCheck={setModalCheck}
                       loading={loading}
                       setLoading={setLoading}
                       back={back}
                    />
                )}
            </div>
        </section>
    );
}
