import AddRoundedIcon from '@mui/icons-material/AddRounded';
import New_Product_Header from '../header';
import Modal from '../../../modal/modal';

import { useEffect, useReducer, useState } from 'react';

import SelectVariation from './selectVariation';
import Manage from './manage/manage';

import Main from './main';
import { resetDefaultMap } from './variationData';
import {
    variationReducer,
    VariationProvider,
    useVariation,
} from '../../../../../../context/variationContext';

import Update from './update';

import { useNewProduct } from '../../../../../../context/newProductContext';
import VariationList from './variationList';
import OptionError from './error/optionError';
import { useAdminContext } from '../../../../../../context/adminContext';

const views = {
    manage: <Manage />,
    select: <SelectVariation />,
    main: <Main />,
    update: <Update />,
};

function Variation() {
    // const { variations, setVariations } = useNewProduct();
    // const [loading, setLoading] = useState(false);
    // const [check, setCheck] = useState(false);
    // const [error, setError] = useState('');
    // const [content, dispatch] = useReducer(variationReducer, {
    //     type: 'main',
    // });

    // const [temporaryVariation, setTemporaryVariation] = useState([]);
  

    // useEffect(() => {
    //     setTemporaryVariation(() => variations);
    // }, [check]);

    // useEffect(() => {
    //     if (content.type == 'update') return;

    //     if (variations.length < 1) {
    //         return dispatch({ type: 'main' });
    //     } else {
    //         return dispatch({ type: 'manage' });
    //     }
    // }, [check]);

    // useEffect(() => {
    //     if (check == false) {
    //         resetDefaultMap();
    //     }
    // }, [check]);

    const {
        temporaryVariation,
    
    } = useVariation();

    const {setModalCheck, contentDispatch, variations, setVariations} = useNewProduct()
 
      const toggle = () => {
        // setCheck(() => !check);

        if(variations.length > 0){
            contentDispatch({type: 'manage'})
        }else {
            contentDispatch({type: 'main'}) 
        }
        setModalCheck((prevState)=> !prevState)
    };
    return (
        <section
            id="variations"
            className="new-product-wrapper variations relative"
        >
            <section className="relative flex w-full flex-row flex-wrap justify-between p-4">
                <New_Product_Header
                    title={'Variations'}
                    text={
                        'If your item is offered in different colours, sizes, materials,etc.'
                    }
                />
                <button type="button" onClick={toggle} className="theme-btn">
                    {temporaryVariation.length == 0 ? (
                        <>
                            <AddRoundedIcon />
                            <span>Add Variations</span>
                        </>
                    ) : (
                        'Manage Variations'
                    )}
                </button>
                <VariationList />
            </section>
            {/* {check && (
                <Modal
                    check={check}
                    setCheck={setCheck}
                    ModalContent={views[content.type]}
                    loading={loading}
                    setLoading={setLoading}
                />
            )} */}
        </section>
    );
}

export default Variation;
