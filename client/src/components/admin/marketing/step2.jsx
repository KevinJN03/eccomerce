import {
    ArrowDropDown,
    CloseRounded,
    CloseSharp,
    SearchRounded,
} from '@mui/icons-material';
import { useSalesDiscountContext } from '../../../context/SalesDiscountContext';
import { Fragment, useEffect, useRef, useState } from 'react';
import { ClickAwayListener } from '@mui/base';
import { useAdminContext } from '../../../context/adminContext';
import { adminAxios } from '../../../api/axios';
import _, { cloneDeep, forEach, result } from 'lodash';
import { Link } from 'react-router-dom';
import { useDebounce } from '@uidotdev/usehooks';
import { AnimatePresence, motion } from 'framer-motion';

function Step2({}) {
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
        setIsSearching,categories, setCategories
    } = useSalesDiscountContext();
    const [showOptions, setShowOptions] = useState(false);
    
    const { logoutUser } = useAdminContext();
    const debouncedSearchText = useDebounce(searchText, 300);
    const abortControllerRef = useRef(new AbortController());
    const timeoutRef = useRef(null);
 


    useEffect(() => {
        const fetchSearchResult = async () => {
            try {
                setIsSearching(() => true);
                clearTimeout(timeoutRef.current);
                abortControllerRef.current?.abort();
                abortControllerRef.current = new AbortController();
                const { data } = await adminAxios.get(
                    `/product/search?searchText=${debouncedSearchText}`,
                    {
                        signal: abortControllerRef.current.signal,
                    }
                );

                setSearchResult(() => {
                    const filteredResult = [];
                    data.result.forEach((element) => {
                        if (!listingIdsSet.has(element?._id)) {
                            filteredResult.push(element);
                        }
                    });

                    return filteredResult;
                });
            } catch (error) {
                logoutUser({ error });
            } finally {
                setIsSearching(() => false);
                setShowSearchResult(() => true);

                // timeoutRef.current = setTimeout(() => {
                //     setIsSearching(() => false);
                // }, 500);
            }
        };

        if (debouncedSearchText) {
            fetchSearchResult();
        } else {
            setSearchResult(() => []);
            setIsSearching(() => false);
        }
    }, [debouncedSearchText]);

    useEffect(() => {
        setListingIdsSet(() => {
            const newListingIdsSet = new Set(
                _.flatMapDeep(chosenListings, (category) => {
                    return _.flatMap(category.listings, (value) => value._id);
                })
            );

            return newListingIdsSet;
            // return new Set(
            //     chosenListings.map((category) => {
            //         return category.listings?.map((item) => {
            //             return item._id;
            //         });
            //     })
            // );
        });
    }, [chosenListings]);

    return (
        <section className="">
            <header className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold">
                    Which listings can buyers use this promo code on?
                </h2>
                <p className="text-sm">
                    Your discount can apply shop-wide, or be limited to specific
                    items.
                </p>
            </header>

            <section className="mt-5 flex w-full flex-row gap-3">
                {[
                    {
                        text: 'All listings',
                        description: `Discount can be used shop-wide, on all current and future listings.`,
                        value: 'all',
                    },
                    {
                        text: 'Select listings',
                        description: `This promo code can only be applied to specific listings.`,
                        value: 'select',
                    },
                ].map(({ text, value, description }) => {
                    return (
                        <button
                            type="button"
                            className={`left flex flex-1 !cursor-pointer flex-row  gap-5 rounded-xl border-2 p-5 ${details.listings_type == value ? 'border-black' : 'border-dark-gray/40'} hover:shadow-my-shadow`}
                            key={value}
                            onClick={() => {
                                setDetails((prevState) => ({
                                    ...prevState,
                                    listings_type: value,
                                }));
                            }}
                        >
                            <input
                                type="radio"
                                className="daisy-radio daisy-radio-lg"
                                name="listing_type"
                                readOnly={true}
                                checked={details.listings_type == value}
                            />
                            <div>
                                <p className="text-left text-lg font-semibold">
                                    {text}
                                </p>

                                <p className="w-3/4 text-left text-sm">
                                    {description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </section>

            {details?.listings_type == 'select' && (
                <section className="mt-16">
                    <h3 className="font-semibold">
                        Choose which listings to include{' '}
                        <span className="text-black/60">
                            ({listingIdsSet.size} selected)
                        </span>
                    </h3>

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
                                    onClickAway={() =>
                                        setShowOptions(() => false)
                                    }
                                >
                                    <div className="absolute top-full z-[1] mt-1 min-w-44 rounded-md border bg-white py-4">
                                        {categories.map((item, idx) => {
                                            return (
                                                <button
                                                    disabled={
                                                        item.listings?.length ==
                                                        0
                                                    }
                                                    key={`option-${item._id}`}
                                                    onClick={() => {
                                                        setChosenListings(
                                                            (prevState) => {
                                                                let foundId = false;
                                                                const cloneArray =
                                                                    _.cloneDeep(
                                                                        prevState
                                                                    ).map(
                                                                        (
                                                                            category
                                                                        ) => {
                                                                            if (
                                                                                category._id ==
                                                                                item._id
                                                                            ) {
                                                                                foundId = true;
                                                                                return {
                                                                                    ...category,
                                                                                    listings:
                                                                                        [
                                                                                            ...item.listings,
                                                                                            ...category.listings,
                                                                                        ],
                                                                                };
                                                                            } else {
                                                                                return category;
                                                                            }
                                                                        }
                                                                    );

                                                                if (!foundId) {
                                                                    cloneArray.unshift(
                                                                        item
                                                                    );
                                                                }
                                                                return cloneArray;
                                                            }
                                                        );
                                                        setCategories(
                                                            (prevState) => {
                                                                const cloneArray =
                                                                    _.cloneDeep(
                                                                        prevState
                                                                    );
                                                                cloneArray[
                                                                    idx
                                                                ].listings = [];

                                                                return cloneArray;
                                                            }
                                                        );
                                                        setShowOptions(
                                                            () => false
                                                        );
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
                                    onClick={() =>
                                        setShowSearchResult(() => true)
                                    }
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
                                {searchResult.length >= 1 &&
                                    showSearchResult && (
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
                                                    setShowSearchResult(
                                                        () => false
                                                    )
                                                }
                                            >
                                                <div className="absolute left-0 top-full flex w-full max-w-sm flex-col gap-2 rounded border bg-white py-4 ">
                                                    {searchResult.map(
                                                        (listingItem) => {
                                                            return (
                                                                <Fragment
                                                                    key={`search-result-${listingItem?._id}`}
                                                                >
                                                                    {!listingIdsSet.has(
                                                                        listingItem?._id
                                                                    ) && (
                                                                        <div
                                                                            className="group flex w-full cursor-pointer flex-row flex-nowrap gap-3 p-2 hover:bg-dark-gray/40 "
                                                                            onClick={() => {
                                                                                const selectedCategory =
                                                                                    {};
                                                                                const {
                                                                                    category:
                                                                                        listingItemCategory,
                                                                                } =
                                                                                    listingItem;

                                                                                const cloneCategories =
                                                                                    _.cloneDeep(
                                                                                        categories
                                                                                    ).map(
                                                                                        (
                                                                                            category
                                                                                        ) => {
                                                                                            if (
                                                                                                listingItemCategory ==
                                                                                                category._id
                                                                                            ) {
                                                                                                const newListingsArray =
                                                                                                    category.listings.filter(
                                                                                                        (
                                                                                                            value
                                                                                                        ) =>
                                                                                                            value._id !=
                                                                                                            listingItem?._id
                                                                                                    );

                                                                                                _.merge(
                                                                                                    selectedCategory,
                                                                                                    {
                                                                                                        ...category,
                                                                                                        listings:
                                                                                                            [],
                                                                                                    }
                                                                                                );

                                                                                                return {
                                                                                                    ...category,
                                                                                                    listings:
                                                                                                        newListingsArray,
                                                                                                };
                                                                                            }

                                                                                            return category;
                                                                                        }
                                                                                    );

                                                                                let isCategoryFound = false;
                                                                                const cloneChosenListing =
                                                                                    cloneDeep(
                                                                                        chosenListings
                                                                                    ).map(
                                                                                        (
                                                                                            chosenListingsItem
                                                                                        ) => {
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
                                                                                                    listings:
                                                                                                        [
                                                                                                            listingItem,
                                                                                                            ...chosenListingsItem.listings,
                                                                                                        ],
                                                                                                };
                                                                                            }

                                                                                            return chosenListingsItem;
                                                                                        }
                                                                                    );
                                                                                if (
                                                                                    !isCategoryFound
                                                                                ) {
                                                                                    cloneChosenListing.unshift(
                                                                                        {
                                                                                            ...selectedCategory,
                                                                                            listings:
                                                                                                [
                                                                                                    listingItem,
                                                                                                ],
                                                                                        }
                                                                                    );
                                                                                }

                                                                                setChosenListings(
                                                                                    () =>
                                                                                        cloneChosenListing
                                                                                );

                                                                                setCategories(
                                                                                    () =>
                                                                                        cloneCategories
                                                                                );

                                                                                setSearchResult(
                                                                                    (
                                                                                        prevState
                                                                                    ) =>
                                                                                        prevState.filter(
                                                                                            (
                                                                                                value
                                                                                            ) =>
                                                                                                value._id !==
                                                                                                listingItem?._id
                                                                                        )
                                                                                );
                                                                            }}
                                                                        >
                                                                            <div className=" rounded-sm border p-0.5">
                                                                                <img
                                                                                    src={
                                                                                        listingItem
                                                                                            ?.images?.[0]
                                                                                    }
                                                                                    alt=""
                                                                                    srcset=""
                                                                                    className="h-12 w-12 object-cover "
                                                                                />
                                                                            </div>

                                                                            <p className="flex-1 text-sm underline-offset-1 transition-all group-hover:underline">
                                                                                {
                                                                                    listingItem?.title
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </Fragment>
                                                            );
                                                        }
                                                    )}{' '}
                                                </div>
                                            </ClickAwayListener>
                                        </motion.section>
                                    )}
                            </AnimatePresence>
                        </div>
                    </section>

                    <section className="mb-12 mt-8 flex min-h-64 w-full flex-col gap-4 rounded">
                        {listingIdsSet.size == 0 ? (
                            <div className="flex min-h-64 items-center justify-center rounded border p-5">
                                <p className="text-base text-black/80">
                                    Add some listings to get started
                                </p>
                            </div>
                        ) : (
                            <>
                                {chosenListings.map(
                                    (
                                        { _id: categoryId, name, listings },
                                        categoryIdx
                                    ) => {
                                        // const listings = [...men, ...women];

                                        return (
                                            <Fragment key={categoryId}>
                                                {listings.length > 0 && (
                                                    <div>
                                                        <p className="mb-2 text-sm font-semibold">
                                                            {`Listings from ${_.upperFirst(name)} (${listings?.length || 0})`}
                                                        </p>
                                                        <section className="flex flex-col gap-2">
                                                            {listings.map(
                                                                (
                                                                    item,
                                                                    listingIdx
                                                                ) => {
                                                                    const {
                                                                        _id,
                                                                        images: [
                                                                            image,
                                                                        ],
                                                                        title,
                                                                        additional_data,
                                                                    } = item;
                                                                    const isAllSamePrice =
                                                                        _.get(
                                                                            additional_data,
                                                                            'price.min'
                                                                        ) ==
                                                                        _.get(
                                                                            additional_data,
                                                                            'price.max'
                                                                        );

                                                                    const stock =
                                                                        _.get(
                                                                            additional_data,
                                                                            'stock.total'
                                                                        );
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                _id
                                                                            }
                                                                            className="flex w-full flex-row items-center gap-3 border p-3"
                                                                        >
                                                                            <div className=" rounded-sm border border-dark-gray p-0.5">
                                                                                <img
                                                                                    src={
                                                                                        image
                                                                                    }
                                                                                    alt=""
                                                                                    srcset=""
                                                                                    className="h-12 w-12 min-w-12 object-cover"
                                                                                />
                                                                            </div>
                                                                            <div className="flex w-full flex-row">
                                                                                <Link
                                                                                    to={`/admin/products/edit/${_id}`}
                                                                                    target="_blank"
                                                                                    className="flex-1  cursor-pointer truncate text-sm font-semibold underline-offset-1 transition-all hover:underline"
                                                                                >
                                                                                    {
                                                                                        title
                                                                                    }
                                                                                </Link>
                                                                                <p className=" flex-1 text-center text-sm">
                                                                                    {`${
                                                                                        !_.get(
                                                                                            additional_data,
                                                                                            'price.min'
                                                                                        )
                                                                                            ? '--'
                                                                                            : isAllSamePrice
                                                                                              ? parseFloat(
                                                                                                    _.get(
                                                                                                        additional_data,
                                                                                                        'price.min'
                                                                                                    )
                                                                                                ).toLocaleString(
                                                                                                    'en-GB',
                                                                                                    {
                                                                                                        style: 'currency',
                                                                                                        currency:
                                                                                                            'GBP',
                                                                                                    }
                                                                                                )
                                                                                              : `${parseFloat(
                                                                                                    _.get(
                                                                                                        additional_data,
                                                                                                        'price.min'
                                                                                                    )
                                                                                                ).toLocaleString(
                                                                                                    'en-GB',
                                                                                                    {
                                                                                                        style: 'currency',
                                                                                                        currency:
                                                                                                            'GBP',
                                                                                                    }
                                                                                                )} - ${parseFloat(
                                                                                                    _.get(
                                                                                                        additional_data,
                                                                                                        'price.max'
                                                                                                    )
                                                                                                ).toLocaleString(
                                                                                                    'en-GB',
                                                                                                    {
                                                                                                        style: 'currency',
                                                                                                        currency:
                                                                                                            'GBP',
                                                                                                    }
                                                                                                )}`
                                                                                    }`}
                                                                                </p>
                                                                                <p className=" flex-1 text-sm">
                                                                                    {!stock
                                                                                        ? '--'
                                                                                        : `${_.get(additional_data, 'stock.total')} in stock`}
                                                                                </p>

                                                                                <div className=" pr-8">
                                                                                    <button
                                                                                        type="button"
                                                                                        className="cursor-pointer"
                                                                                        onClick={() => {
                                                                                            setChosenListings(
                                                                                                (
                                                                                                    prevState
                                                                                                ) => {
                                                                                                    const cloneArray =
                                                                                                        _.cloneDeep(
                                                                                                            prevState
                                                                                                        ).map(
                                                                                                            (
                                                                                                                category
                                                                                                            ) => {
                                                                                                                if (
                                                                                                                    category._id ==
                                                                                                                    categoryId
                                                                                                                ) {
                                                                                                                    return {
                                                                                                                        ...category,
                                                                                                                        listings:
                                                                                                                            category.listings?.filter(
                                                                                                                                ({
                                                                                                                                    _id,
                                                                                                                                }) =>
                                                                                                                                    _id !=
                                                                                                                                    item._id
                                                                                                                            ),
                                                                                                                    };
                                                                                                                } else {
                                                                                                                    return category;
                                                                                                                }
                                                                                                            }
                                                                                                        );

                                                                                                    return cloneArray;
                                                                                                }
                                                                                            );
                                                                                            setCategories(
                                                                                                (
                                                                                                    prevState
                                                                                                ) => {
                                                                                                    const cloneArray =
                                                                                                        _.cloneDeep(
                                                                                                            prevState
                                                                                                        ).map(
                                                                                                            (
                                                                                                                category
                                                                                                            ) => {
                                                                                                                if (
                                                                                                                    category._id ==
                                                                                                                    categoryId
                                                                                                                ) {
                                                                                                                    return {
                                                                                                                        ...category,
                                                                                                                        listings:
                                                                                                                            [
                                                                                                                                item,
                                                                                                                                ...category.listings,
                                                                                                                            ],
                                                                                                                    };
                                                                                                                } else {
                                                                                                                    return category;
                                                                                                                }
                                                                                                            }
                                                                                                        );

                                                                                                    return cloneArray;
                                                                                                }
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <CloseRounded className="!fill-dark-gray" />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </section>
                                                    </div>
                                                )}
                                            </Fragment>
                                        );
                                    }
                                )}
                            </>
                        )}
                    </section>
                </section>
            )}
        </section>
    );
}

export default Step2;
