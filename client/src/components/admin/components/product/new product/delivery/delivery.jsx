import Modal from '../../../modal/modal';
import New_Product_Header from '../header';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import New from './New';
import { forwardRef, useEffect, useState } from 'react';

import MainContent from './Main';

const views = {
    Main: <MainContent />,
    New: <New />,
    Edit: <New />,
};

import { useNewProduct } from '../../../../../../context/newProductContext';
import OptionError from '../variation/error/optionError';
import useNewProductError from '../../../../../../useNewProductError';
import { useContent } from '../../../../../../context/ContentContext';

function Delivery() {
  
    const { profile, publishErrorDispatch, publishError, setModalCheck, contentDispatch, } = useNewProduct();
    const [deliveryError, setDeliveryError] = useState('');
    useNewProductError('delivery', setDeliveryError);
    useEffect(() => {
        setDeliveryError('');
        publishErrorDispatch({ type: 'clear', path: 'delivery' });
    }, [profile]);

    const openModal = () => {
        contentDispatch({ type: 'delivery_main' });
        setModalCheck(() => true);
    };
    return (
        <section className="new-product-wrapper" id='delivery' >
            <section className='p-5' >
                <New_Product_Header title={'Delivery'} />
                {deliveryError && (
                    <OptionError
                        className={'m-0 px-0 pb-0'}
                        msg={deliveryError}
                    />
                )}
                <div className="mt-3 flex items-center justify-between rounded-md border-2 p-4 font-semibold">
                    <h3>
                        Delivery Option<span>*</span>
                    </h3>
                    {profile.length > 0 && (
                        <button onClick={openModal}>
                            <>
                                {profile.map((item) => {
                                    return <p key={item._id}>{item.name}</p>;
                                })}
                            </>
                        </button>
                    )}
                    {profile.length == 0 && (
                        <button onClick={openModal}>Choose Profile</button>
                    )}
                </div>
            
            </section>
        </section>
    );
}
export default Delivery