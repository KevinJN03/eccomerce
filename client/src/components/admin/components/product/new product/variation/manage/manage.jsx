import AddRoundedIcon from '@mui/icons-material/AddRounded';

import SingleVariation from '../singleVariation.jsx';
import Empty from '../Empty';
import ToggleSwitch from '../toggleSwitch';
import { useEffect, useState } from 'react';
import { useVariation } from '../../../../../../../context/variationContext';
import VariationItem from './variationItem.jsx';
import { defaultMap, updatedDefaultMap } from '../variationData.js';
function Manage({}) {
    const {
        dispatch,
        variations,
        setVariations,
        setCheck,
        deleteList,
        setDeleteList,
        temporaryDeleteList,
        setTemporaryDeleteList,
        temporaryVariation,
        setTemporaryVariation,
    } = useVariation();
    const [price, setPrice] = useState(false);
    const [quantity, setQuantity] = useState(false);

    // useEffect(()=>{
    // }, [])

    const deleteVariation = ({ id, name }, type) => {
        updatedDefaultMap(name, id, false);

        if (type == 'main') {
            let newArr = [...variations];

            let update = newArr.map((item) => {
                if (item.id == id) {
                    return { ...item, disabled: true };
                }
                return item;
            });
            setVariations(update);
        } else if (type == 'temporary') {
            const newArr = [...temporaryVariation];

            const update = newArr.map((item) => {
                if (item.id == id) {
                    return { ...item, disabled: true };
                }
                return item;
            });

            setTemporaryVariation(update);
        }
    };

    const editVariation = (item) => {
        const { name } = item;
        // debugger
        dispatch({ type: 'select', currentVariation: item, title: name });
    };

    const apply = () => {
        if (deleteList.length > 0) {
            const newVariation = [...variations];
            const filteredVariation = newVariation.filter(
                ({ id }) => !deleteList.includes(id)
            );

            console.log(filteredVariation);
            setVariations(filteredVariation);

            setCheck(false);
            return;
        }
    };
    return (
        <section className="variation-manage relative flex min-h-full w-full flex-col">
            <h2 className="mb-2 text-left text-2xl font-semibold">
                Manage variations
            </h2>
            <VariationItem
                deleteVariation={deleteVariation}
                editVariation={editVariation}
                variations={variations}
                type="main"
            />
            <VariationItem
                deleteVariation={deleteVariation}
                editVariation={editVariation}
                variations={temporaryVariation}
                type="temporary"
            />
            {/* (temporaryVariation < 2 && temporaryDeleteList >= 1) */}
            {
                <button
                    onClick={() => dispatch({ type: 'main' })}
                    className="border-1 mb-4 mt-3 box-border flex max-w-fit flex-row flex-nowrap items-center justify-start self-start rounded-full border-black px-2 py-2 transition-all ease-in-out hover:!px-[12.5px]"
                >
                    <AddRoundedIcon className="bg-transparent" />
                    <span className="bg-transparent text-sm">
                        Add a variation
                    </span>
                </button>
            }
            <section className="manage-body mb-10 flex h-full w-full flex-col items-center gap-y-3">
                {(variations.length == deleteList.length ||
                    variations.length < 1) && <Empty />}
                {variations.length > 0 &&
                    variations.length != deleteList.length && (
                        <div className="mt-2 flex h-full w-full flex-col gap-y-5 border-t-2 pt-10">
                            <ToggleSwitch
                                label={'Prices'}
                                state={price}
                                setState={setPrice}
                                deleteList={deleteList}
                            />
                            <ToggleSwitch
                                label="Quantities"
                                state={quantity}
                                setState={setQuantity}
                                deleteList={deleteList}
                            />
                        </div>
                    )}
            </section>
            <footer className="variation-footer">
                <button
                    type="button"
                    className="cancel-btn rounded-full px-3 py-2"
                    onClick={() => setCheck(false)}
                >
                    Cancel
                </button>
                <button type="button" className="apply-btn" onClick={apply}>
                    Apply
                </button>
            </footer>
        </section>
    );
}

export default Manage;
