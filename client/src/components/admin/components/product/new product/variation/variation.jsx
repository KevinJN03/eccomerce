import AddRoundedIcon from '@mui/icons-material/AddRounded';
import New_Product_Header from '../header';
import Modal from '../../../modal/modal';
import { useEffect, useReducer, useState } from 'react';

import SelectVariation from './selectVariation';
import Manage from './manage';

import Main from './main';
import { colorList, generateVariation } from './variationData';
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
    const [selected, setSelected] = useState(0);
    const [content, dispatch] = useReducer(variationReducer, {
        type: 'main',
    });

    const [variations, setVariations] = useState([
        { id: 1, name: 'Colour', options: generateVariation('Colour') },
        { id: 2, name: 'Size', options: generateVariation('Size') },
    ]);

    const toggle = () => {
        setCheck(!check);
        dispatch({ type: 'manage' })
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
    };

    useEffect(() => {
        if (content.type == 'update') return;

        if (variations.length < 1) {
            console.log(variations);
            console.log('clean up', variations.length);
            return dispatch({ type: 'main' });
        } else {
            return dispatch({ type: 'manage' });
        }
    }, [check]);

    return (
        <VariationProvider value={value}>
            <section className="new-product-wrapper variations relative">
                <section className="relative z-[5] flex w-full flex-row flex-wrap justify-between">
                    <New_Product_Header
                        title={'Variations'}
                        text={
                            'If your item is offered in different colours, sizes, materials,etc.'
                        }
                    />
                    <button
                        type="button"
                        onClick={toggle}
                        className="rounded-full border-2 border-black px-3 py-2 "
                       
                    >
                        <AddRoundedIcon />
                        <span>Add Variations</span>
                    </button>
                    <VariationList />
                </section>
                {check && (
                    <Modal
                        check={check}
                        setCheck={setCheck}
                        ModalContent={views[content.type]}
                        loading={loading}
                        setLoading={setLoading}
                        className={' w-full max-w-[600px]  !rounded-3xl'}
                    />
                )}
            </section>
        </VariationProvider>
    );
}

export default Variation;
