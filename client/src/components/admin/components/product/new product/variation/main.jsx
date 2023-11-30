import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { defaultMap, updatedDefaultMap } from './variationData';
import SelectVariation from './selectVariation';
import { useVariation } from '../../../../../../context/variationContext';
import { useEffect, useState } from 'react';
import { useAdminContext } from '../../../../../../context/adminContext';
import { useNewProduct } from '../../../../../../context/newProductContext';
export default function Main() {
    const [defaultVariations, setDefaultVariations] = useState([]);
    const { temporaryVariation } = useVariation();

    const { contentDispatch, setModalCheck } = useNewProduct();

    const [disabled, setDisabled] = useState({});
    const findVariation = (option) => {
        const result = temporaryVariation.some((item) => item.disabled);

        ({ option });
        return result;
    };

    const exit = () => {
        if (temporaryVariation.length >= 1) {
            contentDispatch({ type: 'manage' });
        }

        return setModalCheck(false);
    };

    const checkEntries = () => {
        let entriesData = [];
        for (const item of defaultMap.entries()) {
            const [key, value] = item;

            const { id, disabled } = value;
            entriesData.push({ category: key, id, disabled });
        }
        // setDefaultVariations(entriesData);

        return entriesData;
    };

    useEffect(() => {
        let newTemporaryVariation = [...temporaryVariation];
        ('mount here');
        const newDefaultVariations = checkEntries();
        /* disable default variation button if the variation exists already */

        if (temporaryVariation.length > 0) {
            const updateDefaultDisabled = [];

            newDefaultVariations.map((variation) => {
                const { category } = variation;

                newTemporaryVariation.map((item) => {
                    const { name, id, disabled } = item;
                    if (name == category && item.default == true) {
                        if (disabled == false) {
                            variation.disabled = true;
                            // let obj = { ...variation, disabled: true };
                            // updateDefaultDisabled.push(obj);
                            // return;
                        } else if (disabled == true) {
                            // let obj = { ...variation, disabled: false };
                            variation.disabled = false;
                            // updateDefaultDisabled.push(obj);
                            // return;
                        }
                    }
                });

                updateDefaultDisabled.push(variation);
                return;
            });
            setDefaultVariations(updateDefaultDisabled);
            return;
        }

        return setDefaultVariations(newDefaultVariations);
    }, []);

    'defaultMap: ', defaultMap;
    return (
        <section className="variation-main relative h-full ">
            <h1 className="mb-2">What type of variation is it?</h1>
            <p>
                You can add up to 2 variations. Use the variation types listed
                here for peak discoverability. You can add a custom variation,
                but buyers won’t see the option in filters.
            </p>
            <div className="variation-main-wrapper h-full">
                <div className="mb-2 mt-5 flex flex-row flex-wrap gap-3">
                    {defaultVariations.map((option) => {
                        return (
                            <button
                                type="button"
                                className="options-btn"
                                disabled={option.disabled}
                                onClick={() =>
                                    contentDispatch({
                                        type: 'select',
                                        title: option.category,
                                        default: true,
                                    })
                                }
                            >
                                {option.category}
                            </button>
                        );
                    })}
                </div>
                <button
                    type="button"
                    className="mb-14 mt-2 rounded-full px-3 py-2 font-gotham transition-all hover:bg-[var(--light-grey)]"
                    onClick={() => contentDispatch({ type: 'select' })}
                >
                    <AddRoundedIcon className="bg-transparent" />
                    <span className="bg-transparent">Create your Own</span>
                </button>
            </div>

            <footer className="variation-footer">
                <button type="button" onClick={exit} className="cancel-btn">
                    Cancel
                </button>
            </footer>
        </section>
    );
}
