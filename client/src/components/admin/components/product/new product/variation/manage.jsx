import AddRoundedIcon from '@mui/icons-material/AddRounded';

import SingleVariation from './singleVariation';
import Empty from './Empty';
function Manage({ setContent, toggle, variations }) {
    return (
        <section className="variation-manage relative flex w-full flex-col">
            <h2 className="text-left text-2xl font-semibold mb-2">
                Manage variations
            </h2>
            {variations.length > 0 &&
                variations.map((variation) => {
                    return <SingleVariation singleVariation={variation} />;
                })}
            {variations.length < 2 && (
                <button
                    onClick={() => setContent({ type: 'main' })}
                    className="border-1 mt-3 box-border flex max-w-fit flex-row flex-nowrap items-center justify-start self-start rounded-full border-black px-2 py-2 transition-all ease-in-out hover:!px-[12.5px]"
                >
                    <AddRoundedIcon className="bg-transparent" />
                    <span className="bg-transparent text-sm">
                        Add a variation
                    </span>
                </button>
            )}
            <section className="manage-body mt-4 flex max-w-[400px] flex-col items-center gap-y-3 self-center">
                {variations.length < 1 && <Empty/>}
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
