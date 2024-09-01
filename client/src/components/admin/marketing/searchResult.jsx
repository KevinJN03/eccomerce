import { Fragment } from 'react';
import { useSalesDiscountContext } from '../../../context/SalesDiscountContext';
import _, { cloneDeep } from 'lodash';
import { useOfferContext } from '../../../context/offerContext';

function SearchResult({}) {
    const {
        listingIdsSet,
        chosenListings,
        setChosenListings,
        searchResult,
        setSearchResult,
        categories,
        setCategories,
    } = useOfferContext();

    const handleOnClick = (listingItem) => {
        const selectedCategory = {};
        const { category: listingItemCategory } = listingItem;

        const cloneCategories = cloneDeep(categories).map((category) => {
            if (listingItemCategory == category._id) {
                const newListingsArray = category.listings.filter(
                    (value) => value._id != listingItem?._id
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
        const cloneChosenListing = cloneDeep(chosenListings).map(
            (chosenListingsItem) => {
                if (chosenListingsItem._id == listingItemCategory) {
                    isCategoryFound = true;
                    return {
                        ...chosenListingsItem,
                        name: chosenListingsItem?.name || 'Search Result',
                        listings: [listingItem, ...chosenListingsItem.listings],
                    };
                }

                return chosenListingsItem;
            }
        );
        if (!isCategoryFound) {
            cloneChosenListing.unshift({
                ...selectedCategory,
                listings: [listingItem],
            });
        }

        setChosenListings(() => cloneChosenListing);

        setCategories(() => cloneCategories);

        setSearchResult((prevState) =>
            prevState.filter((value) => value._id !== listingItem?._id)
        );
    };
    return (
        <section className="absolute left-0 top-full flex w-full max-w-sm flex-col gap-2 rounded border bg-white py-4 ">
            {searchResult.map((listingItem) => {
                return (
                    <Fragment key={`search-result-${listingItem?._id}`}>
                        {!listingIdsSet.has(listingItem?._id) && (
                            <section
                                className="group relative flex h-full w-full !cursor-pointer flex-row flex-nowrap gap-3 p-2 hover:bg-dark-gray/40 "
                                onClick={() => handleOnClick(listingItem)}
                            >
                                <div
                                    className="searchoverlay !z-10  bg-transparent absolute left-0 top-0 h-full w-full"
                                    // onClick={() => alert('hi')}
                                ></div>
                                <div className=" rounded-sm border p-0.5">
                                    <img
                                        src={listingItem?.images?.[0]}
                                        alt=""
                                        srcset=""
                                        className="h-12 w-12 object-cover "
                                    />
                                </div>

                                <p className="flex-1 cursor-pointer text-sm underline-offset-1 transition-all group-hover:underline ">
                                    {listingItem?.title}
                                </p>
                            </section>
                        )}
                    </Fragment>
                );
            })}{' '}
        </section>
    );
}

export default SearchResult;
