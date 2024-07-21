import { Fragment } from "react";
import { useSalesDiscountContext } from "../../../context/SalesDiscountContext";
import _, {cloneDeep} from "lodash";

function SearchResult({}) {

    const {
        errors,
        setErrors,
        details,
        setDetails,
        clearError,
        errorStyle,
        listingIdsSet,
        setListingIdsSet,
        chosenListings,
        setChosenListings,
        searchResult,
        setSearchResult,
        showSearchResult,
        setShowSearchResult,
        searchText,
        setSearchText,
        isSearching,
        setIsSearching,
        categories,
        setCategories,
    } = useSalesDiscountContext();
    return (
        <section className="absolute left-0 top-full flex w-full max-w-sm flex-col gap-2 rounded border bg-white py-4 ">
            {searchResult.map((listingItem) => {
                return (
                    <Fragment key={`search-result-${listingItem?._id}`}>
                        {!listingIdsSet.has(listingItem?._id) && (
                            <div
                                className="group flex w-full cursor-pointer flex-row flex-nowrap gap-3 p-2 hover:bg-dark-gray/40 "
                                onClick={() => {
                                    const selectedCategory = {};
                                    const { category: listingItemCategory } =
                                        listingItem;

                                    const cloneCategories = cloneDeep(
                                        categories
                                    ).map((category) => {
                                        if (
                                            listingItemCategory == category._id
                                        ) {
                                            const newListingsArray =
                                                category.listings.filter(
                                                    (value) =>
                                                        value._id !=
                                                        listingItem?._id
                                                );

                                            _.merge(selectedCategory, {
                                                ...category,
                                                listings: [],
                                            });

                                            return {
                                                ...category,
                                                listings: newListingsArray,
                                            };
                                        }

                                        return category;
                                    });

                                    let isCategoryFound = false;
                                    const cloneChosenListing = cloneDeep(
                                        chosenListings
                                    ).map((chosenListingsItem) => {
                                        if (
                                            chosenListingsItem._id ==
                                            listingItemCategory
                                        ) {
                                            isCategoryFound = true;
                                            return {
                                                ...chosenListingsItem,
                                                name:
                                                    chosenListingsItem?.name ||
                                                    'Search Result',
                                                listings: [
                                                    listingItem,
                                                    ...chosenListingsItem.listings,
                                                ],
                                            };
                                        }

                                        return chosenListingsItem;
                                    });
                                    if (!isCategoryFound) {
                                        cloneChosenListing.unshift({
                                            ...selectedCategory,
                                            listings: [listingItem],
                                        });
                                    }

                                    setChosenListings(() => cloneChosenListing);

                                    setCategories(() => cloneCategories);

                                    setSearchResult((prevState) =>
                                        prevState.filter(
                                            (value) =>
                                                value._id !== listingItem?._id
                                        )
                                    );
                                }}
                            >
                                <div className=" rounded-sm border p-0.5">
                                    <img
                                        src={listingItem?.images?.[0]}
                                        alt=""
                                        srcset=""
                                        className="h-12 w-12 object-cover "
                                    />
                                </div>

                                <p className="flex-1 text-sm underline-offset-1 transition-all group-hover:underline">
                                    {listingItem?.title}
                                </p>
                            </div>
                        )}
                    </Fragment>
                );
            })}{' '}
        </section>
    );
}

export default SearchResult;
