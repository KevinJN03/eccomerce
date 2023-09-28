import AddRoundedIcon from '@mui/icons-material/AddRounded';


import SelectVariation from './selectVariation';
import { useVariation } from '../../../../../../context/variationContext';
export default function Main({ toggle}) {

const {dispatch} = useVariation()
    
    return (
        <section className="">
            <h1 className="mb-2">What type of variation is it?</h1>
            <p>
                You can add up to 2 variations. Use the variation types
                listed here for peak discoverability. You can add a
                custom variation, but buyers won’t see the option in
                filters.
            </p>
            <div className="variation-main-wrapper max-h-full h-full">
            <div className="mb-2 mt-5 flex flex-row flex-wrap gap-3">
                <button
                    type="button"
                    className="rounded-full !bg-[var(--light-grey)] px-4 py-2 font-gotham transition-all hover:!bg-gray-200"
                    onClick={() =>
                        dispatch({type: 'select', title: 'Colour'})
                    }
                >
                    Colour
                </button>
                <button
                    type="button"
                    className="rounded-full !bg-[var(--light-grey)] px-4 py-2 font-gotham transition-all hover:!bg-gray-200"
                    onClick={() =>
                        dispatch({type: 'select', title: 'Size'})
                    }
                >
                    Size
                </button>
            </div>
            <button
                type="button"
                className="mb-6 mt-2 rounded-full px-3 py-2 font-gotham transition-all hover:bg-[var(--light-grey)]"
                onClick={() => dispatch({type: 'select'})}
            >
                <AddRoundedIcon className="bg-transparent" />
                <span className="bg-transparent">Create your Own</span>
            </button>
            </div>
            
            <footer className='variation-footer'>
                <button type="button" onClick={toggle} className='hover:!bg-gray-200 py-3 px-3 text-sm font-medium rounded-full'>
                    Cancel
                </button>
            </footer>
        </section>
    );
}