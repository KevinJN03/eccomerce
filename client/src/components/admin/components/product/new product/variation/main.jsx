import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { defaultMap, updatedDefaultMap } from './variationData';
import SelectVariation from './selectVariation';
import { useVariation } from '../../../../../../context/variationContext';
import { useEffect, useState } from 'react';
export default function Main() {
    const { dispatch, temporaryVariation,  setCheck, deleteList, setDeleteList } =
        useVariation();
    const [defaultVariations, setDefaultVariations] = useState([]);
    const findVariation = (option) => {
        const result = temporaryVariation.some((item) => item.disabled);

        console.log({ option });
        return result;
    };

    const exit = () => {
        if (temporaryVariation.length >= 1) {
            setDeleteList([]);
            return dispatch({ type: 'manage' });
        }

        return setCheck(false);
    };

    const checkEntries = () => {
        let entriesData = [];
        for (const item of defaultMap.entries()) {
            const [key, value] = item;

            const { id, disabled } = value;
            entriesData.push({ category: key, id, disabled });
        }
        setDefaultVariations(entriesData);
    };

    useEffect(() => {
        checkEntries();

        let newArr = [...temporaryVariation];

        const checkBoolean = newArr.every((item) => item.disabled == false);

        if (checkBoolean) {
            newArr.map(({ id, name }) => {
               
                return updatedDefaultMap(name, id, true);
            });
        }


    }, []);

    /* 
    
    if in delete list, i want reenable the variation category and then when i create a new variation, that variation is then deleted
    
    */

    console.log('defaultMap: ', defaultMap);
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
                                disabled={
                                    defaultMap.get(option.category).disabled
                                }
                                onClick={() =>
                                    dispatch({
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
                    onClick={() => dispatch({ type: 'select' })}
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
