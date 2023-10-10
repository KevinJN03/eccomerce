import Modal from '../../../modal/modal';
import New_Product_Header from '../header';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import New from './New';
import { useEffect, useState } from 'react';

import MainContent from './Main';

const views = {
    Main: <MainContent />,
    New: <New />,
    Edit: <New />,
};
import {
    ContentProvider,
    useContent,
} from '../../../../../../context/ContentContext';
import Edit from './edit';
import { useNewProduct } from '../../../../../../context/newProductContext';
import OptionError from '../variation/error/optionError';
import useNewProductError from '../../../../../../useNewProductError';

export default function Delivery() {
    const {
        content,
  
        modalCheck,
        setModalCheck,
        loading,
        setLoading,
        dispatch,
        publishError,
    } = useContent();
    const { profile } = useNewProduct();
    const [deliveryError, setDeliveryError] = useState('');

    useNewProductError('delivery', setDeliveryError);
    useEffect(() => {
setDeliveryError('')
    },[profile])
    
    const back = () => {
        dispatch({ type: 'Main' });
    };

    return (
        <section className="new-product-wrapper">
            <section id="delivery">
                <New_Product_Header title={'Delivery'} />
               {deliveryError && <OptionError className={'m-0 px-0 pb-0'}msg={deliveryError}/>}
                <div className="mt-3 flex items-center justify-between rounded-md border-2 p-4 font-semibold">
                    <h3>
                        Delivery Option<span>*</span>
                    </h3>
                    {profile.length > 0 && (
                        <button onClick={() => setModalCheck(true)}>
                            <>
                                {profile.map((item) => {
                                    return <p key={item._id}>{item.name}</p>;
                                })}
                            </>
                        </button>
                    )}
                    {profile.length == 0 && (
                        <button onClick={() => setModalCheck(true)}>
                            Choose Profile
                        </button>
                    )}
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
