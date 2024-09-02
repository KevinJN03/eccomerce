import CloseRoundedIcon from '@mui/icons-material/CloseRounded.js';
import Size from './size.jsx';
import Color from './color.jsx';
import Category from './category.jsx';
function Mobile_Filter({ filterCount, count, setFilterCount }) {
    return (
        <>
            <input className="modal-state" id="modal-2" type="checkbox" />
            <div className="modal m-0 w-screen items-end p-0">
                <label className="modal-overlay" htmlFor="modal-2"></label>
                <div className="modal-content flex h-full w-full flex-col gap-5 pt-0">
                    <div className="mobile-filter-header min-full !min-h-16 sticky top-0 z-[1] mx-[-24px] flex !h-full !max-h-16 !justify-center border-b-2 !bg-white sm:!items-center">
                        <h2 className="mx-auto flex h-full items-center pl-11 text-base font-medium">
                            Filter & Sort
                        </h2>
                        <label
                            htmlFor="modal-2"
                            className=" mr-3 flex h-8 w-8 items-center justify-center !self-center rounded-full bg-[--light-grey]"
                        >
                            <CloseRoundedIcon className="!text-2xl" />
                        </label>
                    </div>

                    <div className="mobile-filter-container">
                        <Size addToFilter={setFilterCount} />
                        <Color />
                        <Category />
                    </div>

                    <div className="mobile-filter-bottom mb-[-10px] flex h-full w-full !items-end gap-3 place-self-end">
                        <button
                            className="flex-1 rounded-full bg-[var(--light-grey)] py-3 text-sm font-semibold text-[var(--grey)]"
                            onClick={() =>
                                setFilterCount((count) => (count = 0))
                            }
                        >
                            {filterCount > 0
                                ? `Clear (${filterCount})`
                                : 'Clear'}
                        </button>
                        <button className="flex-[2] rounded-full bg-black py-3 text-sm font-semibold text-white ">
                            See {count} items
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Mobile_Filter;
