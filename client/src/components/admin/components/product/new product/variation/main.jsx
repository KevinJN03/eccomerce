import AddRoundedIcon from '@mui/icons-material/AddRounded';


import SelectVariation from './selectVariation';
export default function Main({setContent, setCheck}) {


    
    return (
        <section className="">
            <h1 className="mb-2">What type of variation is it?</h1>
            <p>
                You can add up to 2 variations. Use the variation types
                listed here for peak discoverability. You can add a
                custom variation, but buyers won’t see the option in
                filters.
            </p>

            <div className="mb-2 mt-5 flex flex-row flex-wrap gap-3">
                <button
                    type="button"
                    className="rounded-full !bg-[var(--light-grey)] px-4 py-2 font-gotham transition-all hover:!bg-gray-200"
                    onClick={() =>
                        setContent({type: 'select', title: 'Colour'})
                    }
                >
                    Colour
                </button>
                <button
                    type="button"
                    className="rounded-full !bg-[var(--light-grey)] px-4 py-2 font-gotham transition-all hover:!bg-gray-200"
                    onClick={() =>
                        setContent({type: 'select', title: 'Size'})
                    }
                >
                    Size
                </button>
            </div>
            <button
                type="button"
                className="mb-6 mt-2 rounded-full px-3 py-2 font-gotham transition-all hover:bg-[var(--light-grey)]"
                onClick={() => setContent({type: 'select'})}
            >
                <AddRoundedIcon className="bg-transparent" />
                <span className="bg-transparent">Create your Own</span>
            </button>
            <footer>
                <button type="button" onClick={() => setCheck(false)} className='hover:!bg-gray-200 py-3 px-3 text-sm font-medium rounded-full'>
                    Cancel
                </button>
            </footer>
        </section>
    );
}