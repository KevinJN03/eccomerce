import { ClickAwayListener } from '@mui/base';
import { ArrowDropDown, SearchRounded } from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';
import _ from 'lodash';
import SearchResult from './searchResult';
import { Fragment, useState } from 'react';
import Table from './table';
import { useSalesDiscountContext } from '../../../context/SalesDiscountContext';
import { useOfferContext } from '../../../context/offerContext';

function SelectedListings({}) {
    const {
        listingIdsSet,
        chosenListings,
        setChosenListings,
        searchResult,
        showSearchResult,
        setShowSearchResult,
        searchText,
        setSearchText,
        isSearching,
        setIsSearching,
        categories,
        setCategories,
        handleAddListing,
        loading,
    } = useOfferContext();
    const [showOptions, setShowOptions] = useState(false);

    return (
        <Fragment>
            <section className="mt-6 flex w-full flex-row gap-6 border-green-400">
                <div className="relative flex-1">
                    <button
                        onClick={() => setShowOptions(() => true)}
                        className="flex h-full w-full flex-1 cursor-pointer flex-nowrap items-center justify-between rounded border border-dark-gray px-3 transition-all hover:bg-dark-gray/5"
                    >
                        <p className="cursor-pointer text-sm font-semibold">
                            Add listings by shop section
                        </p>

                        <ArrowDropDown />
                    </button>
                    {showOptions && (
                        <ClickAwayListener
                            onClickAway={() => setShowOptions(() => false)}
                        >
                            <div className="absolute top-full z-[1] mt-1 min-w-44 rounded-md border bg-white py-4">
                                {categories.map((item, idx) => {
                                    return (
                                        <button
                                            disabled={
                                                item.listings?.length == 0
                                            }
                                            key={`option-${item._id}`}
                                            onClick={() => {
                                                handleAddListing({
                                                    category: item,
                                                });

                                                setShowOptions(() => false);
                                            }}
                                            className="flex  w-full flex-nowrap justify-between px-3 py-3 enabled:cursor-pointer hover:enabled:bg-dark-gray/40 disabled:cursor-not-allowed hover:disabled:bg-none "
                                        >
                                            {item.name}{' '}
                                            <span className="font-semibold">
                                                {item.listings?.length}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </ClickAwayListener>
                    )}
                </div>

                <div className="relative flex w-full flex-1 flex-row flex-nowrap items-center">
                    <div className="relative w-full flex-1">
                        <div className="absolute left-2 top-1/2 h-fit w-fit translate-y-[-50%]">
                            {isSearching ? (
                                <div className="spinner-dot-circle spinner-xs">
                                    {Array(8)
                                        .fill('')
                                        .map((item, idx) => {
                                            return (
                                                <div
                                                    key={`spinner-dot-${idx}`}
                                                    className="spinner-dot [--spinner-color:var(--slate-8)]"
                                                ></div>
                                            );
                                        })}
                                </div>
                            ) : (
                                <SearchRounded />
                            )}
                        </div>
                        <input
                            type="text"
                            className="!w-full !flex-1 rounded-l border !px-10 py-2 text-sm !outline-none transition-all hover:border-dark-gray  focus:border-dark-gray active:border-dark-gray "
                            placeholder="Search for a specific listing"
                            value={searchText}
                            onClick={() => setShowSearchResult(() => true)}
                            onChange={(e) => {
                                if (e.target.value) {
                                    setIsSearching(() => true);
                                }
                                setSearchText(() => e.target.value);
                            }}
                        />
                    </div>

                    <button
                        type="button"
                        className="h-full cursor-pointer rounded-r border border-l-0 px-3 text-sm hover:bg-dark-gray/5"
                    >
                        Add
                    </button>
                    <AnimatePresence>
                        {searchResult.length >= 1 && showSearchResult && (
                            <motion.section
                                initial={{
                                    opacity: 0.5,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                exit={{
                                    opacity: 1,
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <ClickAwayListener
                                    onClickAway={() =>
                                        setShowSearchResult(() => false)
                                    }
                                >
                                    <SearchResult />
                                </ClickAwayListener>
                            </motion.section>
                        )}
                    </AnimatePresence>
                </div>
            </section>
            <section className="mb-12 mt-8 flex h-full min-h-64 w-full flex-col gap-4 rounded">
                {loading ? (
                    <section className="w-full min-h-64 border self-center justify-center items-center flex">
                        <div className="spinner-circle spinner-md ![--spinner-color:var(--slate-12)]"/>
                    </section>
                ) : (
                    <Fragment>
                        {listingIdsSet.size == 0 ? (
                            <div className="flex min-h-64 items-center justify-center rounded border p-5">
                                <p className="text-base text-black/80">
                                    Add some listings to get started
                                </p>
                            </div>
                        ) : (
                            <Table {...{ chosenListings, setChosenListings }} />
                        )}
                    </Fragment>
                )}{' '}
            </section>
        </Fragment>
    );
}

export default SelectedListings;
