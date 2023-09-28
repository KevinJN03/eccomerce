import AddRoundedIcon from '@mui/icons-material/AddRounded';

import SingleVariation from './singleVariation';
import Empty from './Empty';
import ToggleSwitch from './toggleSwitch';
import { useState } from 'react';
import { useVariation } from '../../../../../../context/variationContext';
function Manage({ toggle }) {
    const { dispatch, variations, setVariations } = useVariation();
    const [price, setPrice] = useState(false);
    const [quantity, setQuantity] = useState(false);

    const deleteVariation = (id) => {
        const newVariation = [...variations];
        const filteredVariation = newVariation.filter((item) => item.id != id);

        setVariations(filteredVariation);
    };

    const editVariation = (variation) => {
        const {name} = variation
        dispatch({ type: 'select',  currentVariation: variation, title: name});
    };

    return (
        <section className="variation-manage relative flex max-h-full w-full flex-col">
            <h2 className="mb-2 text-left text-2xl font-semibold">
                Manage variations
            </h2>
            {variations.length > 0 &&
                variations.map((variation) => {
                    const { id, name } = variation;
                    return (
                        <SingleVariation
                            key={variation.id}
                            singleVariation={variation}
                            deleteVariation={() => deleteVariation(id)}
                            editVariation={() => editVariation(variation)}
                        />
                    );
                })}
            {variations.length < 2 && (
                <button
                    onClick={() => dispatch({ type: 'main' })}
                    className="border-1 mt-3 box-border flex max-w-fit flex-row flex-nowrap items-center justify-start self-start rounded-full border-black px-2 py-2 transition-all ease-in-out hover:!px-[12.5px]"
                >
                    <AddRoundedIcon className="bg-transparent" />
                    <span className="bg-transparent text-sm">
                        Add a variation
                    </span>
                </button>
            )}
            <section className="manage-body flex h-full min-h-full w-full flex-col items-center gap-y-3">
                {variations.length < 1 && <Empty />}
                {variations.length > 0 && (
                    <div className="mt-2 flex h-full w-full min-w-full flex-col gap-y-5 border-t-2 pt-10">
                        <ToggleSwitch
                            label={'Price'}
                            state={price}
                            setState={setPrice}
                        />
                        <ToggleSwitch
                            label="Quantities"
                            state={quantity}
                            setState={setQuantity}
                        />
                    </div>
                )}
            </section>
            <footer className="variation-footer">
                <button
                    type="button"
                    className="cancel-btn rounded-full px-3 py-2"
                    onClick={toggle}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="rounded-full bg-black px-3 py-2 text-white disabled:opacity-40"
                    disabled
                >
                    Apply
                </button>
            </footer>
        </section>
    );
}

export default Manage;
