import AddRoundedIcon from '@mui/icons-material/AddRounded';
import New_Product_Header from '../header';
import Modal from '../../../modal/modal';
import { useEffect, useReducer, useState } from 'react';

import SelectVariation from './selectVariation';
import Manage from './manage/manage';

import Main from './main';
import {
    colorList,
    defaultMap,
    generateVariation,
    resetDefaultMap,
    updatedDefaultMap,
} from './variationData';
import {
    variationReducer,
    VariationProvider,
} from '../../../../../../context/variationContext';
import VariationList from './variationList';
import Update from './update';

const views = {
    manage: <Manage />,
    select: <SelectVariation />,
    main: <Main />,
    update: <Update />,
};

function Variation() {
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState(false);
    const [selected, setSelected] = useState([]);
    const [deleteList, setDeleteList] = useState([]);

    const [temporaryDeleteList, setTemporaryDeleteList] = useState([]);
    const [update, setUpdate] = useState({ price: null, quantity: null });

    const [content, dispatch] = useReducer(variationReducer, {
        type: 'main',
    });

    const [variations, setVariations] = useState([
        {
            id: 1,
            name: 'Colour',
            options: generateVariation('Colour'),
            disabled: false,
            default: true, 
        },
        {
            id: 2,
            name: 'Size',
            options: generateVariation('Size'),
            disabled: false,
            default: true, 
        },
    ]);
    const [temporaryVariation, setTemporaryVariation] = useState([]);
    const toggle = () => {
        setCheck(!check);
        dispatch({ type: 'manage' });
    };

    useEffect(() => {
        setTemporaryVariation(variations);
    }, [check]);

    useEffect(() => {
        if (content.type == 'update') return;

        if (variations.length < 1) {
            return dispatch({ type: 'main' });
        } else {
            return dispatch({ type: 'manage' });
        }
    }, [check]);

    const cleanup = () => {
        setDeleteList([]);
        // setTemporaryVariation([]);

        // const newArr = [...temporaryVariation];
        // const updateDisabled = newArr.map((item) => {
        //     return { ...item, disabled: false };
        // });

        resetDefaultMap();

        // setVariations(updateDisabled);
    };

    const value = {
        check,
        setCheck,
        content,
        dispatch,
        variations,
        setVariations,
        setSelected,
        selected,
        update,
        setUpdate,
        deleteList,
        setDeleteList,
        temporaryVariation,
        setTemporaryVariation,
        temporaryDeleteList,
        setTemporaryDeleteList,
    };

    return (
        <VariationProvider value={value}>
            <section className="new-product-wrapper variations relative">
                <section className="relative flex w-full flex-row flex-wrap justify-between p-4">
                    <New_Product_Header
                        title={'Variations'}
                        text={
                            'If your item is offered in different colours, sizes, materials,etc.'
                        }
                    />
                    <button
                        type="button"
                        onClick={toggle}
                        className="theme-btn"
                    >
                        <AddRoundedIcon />
                        <span>Add Variations</span>
                    </button>
                    <VariationList />
                </section>
                {check && (
                    <Modal
                        cleanup={cleanup}
                        check={check}
                        setCheck={setCheck}
                        ModalContent={views[content.type]}
                        loading={loading}
                        setLoading={setLoading}
                        className={
                            ' w-full max-w-[600px]  !rounded-3xl px-7 pt-8'
                        }
                    />
                )}
            </section>
        </VariationProvider>
    );
}

export default Variation;
