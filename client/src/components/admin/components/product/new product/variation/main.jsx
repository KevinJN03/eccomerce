import AddRoundedIcon from '@mui/icons-material/AddRounded';

import SelectVariation from './selectVariation';
import { useVariation } from '../../../../../../context/variationContext';
export default function Main() {
    const { dispatch, variations, setCheck } = useVariation();
    const findVariation = (name) => {
        const result =  variations.some((item) => item.name == name);
      
        return result
    };

    const exit = () => {
        if (variations.length >= 1){
            return dispatch({type: 'manage'})
        }

        return setCheck(false)
    }
    return (
        <section className="variation-main relative h-full">
            <h1 className="mb-2">What type of variation is it?</h1>
            <p>
                You can add up to 2 variations. Use the variation types listed
                here for peak discoverability. You can add a custom variation,
                but buyers won’t see the option in filters.
            </p>
            <div className="variation-main-wrapper h-full">
                <div className="mb-2 mt-5 flex flex-row flex-wrap gap-3">
                    {
                        ['Colour','Size' ].map((option) => {
                            return (
                             <button
                        type="button"
                        className="options-btn"
                        disabled={findVariation(option)}
                        onClick={() =>
                            dispatch({ type: 'select', title: option })
                        }
                    >
                       {option}
                    </button>   
                            )
                        })
                    }
                    
                </div>
                <button
                    type="button"
                    className="mt-2 rounded-full px-3 py-2 font-gotham transition-all hover:bg-[var(--light-grey)]"
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
