import AddRoundedIcon from '@mui/icons-material/AddRounded';
import New_Product_Header from '../header';
import Modal from '../../../modal/modal';
import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SelectVariation from './selectVariation';
import Manage from './manage';
import { useContent } from '../../../../../../context/ContentContext';
import Main from './main';
import { colorList, generateVariation } from './variationData';
import {
    variationReducer,
    VariationProvider,
} from '../../../../../../context/variationContext';

function Variation() {
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState(false);
    const [content, dispatch] = useReducer(variationReducer, {
        type: 'manage',
    });

    const [variations, setVariations] = useState([
        { id: 1, name: 'Colour', options: [...generateVariation('Colour')] },
    ]);

    const toggle = () => {
        setCheck(!check);
    };

    const value = {
        check,
        setCheck,
        content,
        dispatch,
        variations,
        setVariations,
    };

    return (
        
        <VariationProvider value={value}>
            <section className="new-product-wrapper relative variations">
                <section
             
                    className="relative z-[5] flex w-full flex-row justify-between"
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
                </section>
                {check && (
                    <Modal
                        check={check}
                        setCheck={setCheck}
                        ModalContent={
                            content.type == 'main' ? (
                                <Main toggle={toggle} />
                            ) : content.type == 'select' ? (
                                <SelectVariation
                                    title={content.title}
                                    setAllVariations={setVariations}
                                    allVariations={variations}
                                />
                            ) : (
                                content.type == 'manage' && (
                                    <Manage
                                        toggle={toggle}
                                   
                                    />
                                )
                            )
                        }
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
