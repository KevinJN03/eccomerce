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
import VariationList from './variationList';

function Variation() {
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState(false);
    const [content, dispatch] = useReducer(variationReducer, {
        type: 'main',
    });

    const [variations, setVariations] = useState([{id: 1, name: 'Colour', options: generateVariation('Colour') },{id: 1, name: 'Size', options: generateVariation('Size') } ]);

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

    useEffect(() => {
if (variations.length < 1) {
    console.log(variations)
    console.log('clean up', variations.length );
            return dispatch({ type: 'main' });
        } else {
           return  dispatch({ type:  'manage' });
        }
    }, [check])

  

    return (
        <VariationProvider value={value}>
            <section className="new-product-wrapper variations relative">
                <section className="relative z-[5] flex w-full flex-row justify-between flex-wrap">
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
                    <VariationList/>
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
                                    <Manage />
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
