import AddRoundedIcon from '@mui/icons-material/AddRounded';
import New_Product_Header from '../header';
import Modal from '../../../modal/modal';
import { createContext, useEffect, useReducer, useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SelectVariation from './selectVariation';
import Manage from './manage';
import { useContent } from '../../../../../../context/ContentContext';
import Main from './main';
import { colorList, generateVariation } from './variationData';

function Variation() {
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState(false);
    const [content, setContent] = useState({ type: 'manage' });

    const [variations, setVariations] = useState([{id: 1, name: 'Colour', options: [...generateVariation(colorList)]}])

    const toggle = () => {
        setCheck(!check);
    };

    return (
        <section
            id="variations"
            className="format relative z-[5] flex w-full flex-row justify-between"
        >
            <New_Product_Header
                title={'Variations'}
                text={
                    'If your item is offered in different colours, sizes, materials,etc.'
                }
            />
            <button
                type="button"
                onClick={toggle}
                className="rounded-full border-2 border-black px-3 py-2"
            >
                <AddRoundedIcon />
                <span>Add Variations</span>
            </button>
            {check && (
                <Modal
                    check={check}
                    setCheck={setCheck}
                    ModalContent={
                        content.type == 'main' ? (
                            <Main setContent={setContent} toggle={toggle} />
                        ) : content.type == 'select' ? (
                            <SelectVariation
                                setContent={setContent}
                                title={content.title}
                            variations = {variations}
                            />
                        ) : (
                            content.type == 'manage' && (
                                <Manage
                                    setContent={setContent}
                                    toggle={toggle}
                                    variations={variations}
                                />
                            )
                        )
                    }
                    loading={loading}
                    setLoading={setLoading}
                    className={
                        ' !min-h-[500px] !w-full !min-w-[700px] overflow-hidden !rounded-3xl'
                    }
                />
            )}
        </section>
    );
}

export default Variation;
