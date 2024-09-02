import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useSalesDiscountContext } from './SalesDiscountContext';
import { adminAxios } from '../api/axios.js';
import { useAdminContext } from './adminContext';
import _ from 'lodash';
import { useDebounce } from '@uidotdev/usehooks';
const OfferContext = createContext();

export const useOfferContext = () => {
    return useContext(OfferContext);
};

function OfferContextProvider({ initialDetails, newValue, children }) {
    const { offerType, selectedOfferType } = useSalesDiscountContext();

    const [defaultDetails, setDefaultDetails] = useState({
        type: 'fixed',
        order_minimum: 'none',
        no_end_date: false,
        custom: false,
        listings_type: 'all',
        offer_type: offerType || 'promo_code',
    });
    const [showAction, setShowAction] = useState(!false);
    const [listingIdsSet, setListingIdsSet] = useState(new Set());
    const [chosenListings, setChosenListings] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [chosenMap, setChosenMap] = useState(new Map());
    const [details, setDetails] = useState({
        ...defaultDetails,
    });
    const [isSearching, setIsSearching] = useState(false);
    const [errors, setErrors] = useState({});
    const [btnLoading, setBtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [initialFetch, setInitialFetch] = useState(false);
    const [modalView, setModalView] = useState(1);
    const { logoutUser } = useAdminContext();
    const { modalOpen, setModalOpen, searchParams } = useSalesDiscountContext();
    const [count, setCount] = useState(0);
    const [categories, setCategories] = useState([]);
    const [categoriesMap, setCategoriesMap] = useState(new Map());
    const debouncedSearchText = useDebounce(searchText, 300);
    const [trigger, setTrigger] = useState(false);

    const clearError = (field) => {
        setErrors(({ [field]: prop, ...prevState }) => prevState);
    };
    const errorStyle = '!border-red-700 !bg-red-100';

    const abortControllerRef = useRef(new AbortController());
    const timeoutRef = useRef(null);

    const convertMapToArray = ({ mapState }) => {
        let newCount = 0;

        const mapToArray = Array.from(mapState, ([name, value]) => {
            newCount += value.listings?.size || 0;

            return {
                _id: name,
                ...value,
                listings: Array.from(value.listings, ([key, listing]) => ({
                    _id: key,
                    ...listing,
                })),
            };
        });

        return { newCount, mapToArray };
    };

    const generateMapFromOffers = ({ offerData, newCategoryMap }) => {
        const newChosenMap = new Map();
        const newListingIdSet = new Set();

        offerData?.listings.forEach((element) => {
            newListingIdSet.add(element._id);
            if (newChosenMap.has(element.category)) {
                const getMapItem = _.cloneDeep(
                    newChosenMap.get(element.category)
                );

                getMapItem.listings.set(element._id, element);

                newChosenMap.set(element.category, getMapItem);

                const { listings: categoryListings, ...getCategoryMapItem } =
                    newCategoryMap.get(element.category);

                categoryListings.delete(element._id);

                newCategoryMap.set(getCategoryMapItem._id, {
                    ...getCategoryMapItem,
                    listings: categoryListings,
                });
            } else {
                // add product listing to the chosen map
                // remove product from category map
                const { listings: categoryListings, ...getMapItem } =
                    newCategoryMap.get(element.category);

                const newListings = new Map([[element._id, element]]);

                newChosenMap.set(element.category, {
                    ...getMapItem,
                    listings: newListings,
                });
                // debugger;
                categoryListings.delete(element._id);
                newCategoryMap.set(getMapItem._id, {
                    ...getMapItem,
                    listings: categoryListings,
                });
            }
        });

        return { newCategoryMap, newChosenMap, newListingIdSet };
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                //
                abortControllerRef.current?.abort();
                abortControllerRef.current = new AbortController();
                const [{ data }, { data: couponData }] = await Promise.all([
                    adminAxios.get(
                        'category/all',

                        {
                            signal: abortControllerRef.current.signal,
                        }
                    ),

                    (() => {
                        const getOfferId = searchParams.get('offer');
                        if (getOfferId) {
                            return adminAxios.get(
                                `offer/${getOfferId}?offer_type=${selectedOfferType}`,
                                {
                                    signal: abortControllerRef.current?.signal,
                                }
                            );
                        } else {
                            return { data: false };
                        }
                    })(),
                ]);

                // debugger;

                const newChosenMap = new Map();

                const newCategoryMap = new Map();

                data.forEach(({ men, women, count, ...element }) => {
                    newCategoryMap.set(element?._id, {
                        ...element,
                        listings: new Map(
                            [...men, ...women].map((item) => [item._id, item])
                        ),
                    });
                });

                if (couponData) {
                    setDetails(() => couponData[0]);

                    const { newChosenMap, newListingIdSet } =
                        generateMapFromOffers({
                            offerData: couponData[0],
                            newCategoryMap,
                        });
                    const { mapToArray, newCount } = convertMapToArray({
                        mapState: newChosenMap,
                    });
                    setChosenListings(() => mapToArray);
                    setCount(() => newCount);
                    setListingIdsSet(() => newListingIdSet);
                    setChosenMap(() => newChosenMap);

                    // couponData[0]?.listings.forEach((element) => {
                    //     newListingIdSet.add(element._id);
                    //     if (newChosenMap.has(element.category)) {
                    //         const getMapItem = _.cloneDeep(
                    //             newChosenMap.get(element.category)
                    //         );

                    //         getMapItem.listings.set(element._id, element);

                    //         newChosenMap.set(element.category, getMapItem);

                    //         const {
                    //             listings: categoryListings,
                    //             ...getCategoryMapItem
                    //         } = newCategoryMap.get(element.category);

                    //         categoryListings.delete(element._id);

                    //         newCategoryMap.set(getCategoryMapItem._id, {
                    //             ...getCategoryMapItem,
                    //             listings: categoryListings,
                    //         });
                    //     } else {
                    //         // add product listing to the chosen map
                    //         // remove product from category map
                    //         const {
                    //             listings: categoryListings,
                    //             ...getMapItem
                    //         } = newCategoryMap.get(element.category);

                    //         const newListings = new Map([
                    //             [element._id, element],
                    //         ]);

                    //         newChosenMap.set(element.category, {
                    //             ...getMapItem,
                    //             listings: newListings,
                    //         });
                    //         // debugger;
                    //         categoryListings.delete(element._id);
                    //         newCategoryMap.set(getMapItem._id, {
                    //             ...getMapItem,
                    //             listings: categoryListings,
                    //         });
                    //     }
                    // });
                }

                setCategoriesMap(() => newCategoryMap);
                setCategories(
                    () =>
                        convertMapToArray({ mapState: newCategoryMap })
                            .mapToArray
                );

                clearTimeout(timeoutRef.current);

                timeoutRef.current = setTimeout(() => {
                    setLoading(() => false);
                }, 500);
            } catch (error) {
                console.error(error.message, error);
                logoutUser({ error });
            } finally {
                setInitialFetch(() => true);
            }
        };

        fetchCategories();
        return () => {
            abortControllerRef.current?.abort();
            clearTimeout(timeoutRef.current);
        };
    }, []);

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

    const handleContinue = async () => {
        try {
            setBtnLoading(() => true);
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            const obj = {
                promo_code: 'coupon',
                gift_card: 'giftcards',
            };

            const { data } = await adminAxios.post(
                `/${_.get(obj, details?.offer_type)}/create`,
                {
                    ...details,
                    listings: Array.from(listingIdsSet),
                    create: modalView == 3 ? true : false,
                },
                {
                    signal: abortControllerRef.current?.signal,
                }
            );

            if (data?.created) {
                setDetails(() => data);
            }
            setModalView((prevState) => prevState + 1);
        } catch (error) {
            logoutUser({ error });

            if (error.response.status == 400) {
                setErrors(() => error.response.data);
                setModalView(() => 1);
            }
        } finally {
            setBtnLoading(() => false);
        }
    };

    const reset = (value = { close: true }) => {
        if (value.close) {
            setModalOpen(() => false);
        }
        setModalView(() => 1);
        setChosenListings(() => []);
        setDetails(() => defaultDetails);
        setErrors(() => ({}));
        setSearchResult(() => []);
        setShowSearchResult(() => false);
        setSearchText(() => '');
    };
    const generateDiscountText = () => {
        return `${
            details?.type == 'fixed'
                ? `${parseFloat(details?.amount).toLocaleString('en-GB', {
                      style: 'currency',
                      currency: 'GBP',
                  })} GBP`
                : `${details.amount}% off`
        }`;
    };

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

    const handleListing = ({
        listing,
        addMap,
        removeMap,
        setAddMap,
        setRemoveMap,
        setRemoveArray,
        setAddArray,
    }) => {
        const newAddMap = new Map([...addMap]);
        const newRemoveMap = new Map([...removeMap]);
        const { listings: removeListingsMap } = newRemoveMap.get(
            listing.category
        );
        const { listings: addListingsMap } = newAddMap.get(listing.category);

        addListingsMap.set(listing._id, listing);
        removeListingsMap.delete(listing._id);
        setAddMap(() => newAddMap);
        setRemoveMap(() => newRemoveMap);

        const { mapToArray, newCount } = convertMapToArray({
            mapState: newAddMap,
        });
        setAddArray(() => mapToArray);
        // setCount(() => newCount);

        setRemoveArray(
            () => convertMapToArray({ mapState: newRemoveMap }).mapToArray
        );
    };

    const handleDeleteListing = ({ listing, categoryId }) => {
        // remove listing from chosen map and add to category map
        // convert Map to array

        handleListing({
            listing,
            addMap: categoriesMap,
            setAddMap: setCategoriesMap,
            setAddArray: setCategories,
            removeMap: chosenMap,
            setRemoveArray: setChosenListings,
            setRemoveMap: setChosenMap,
        });

        // const newChosenMap = new Map([...chosenMap]);
        // const newCategoryMap = new Map([...categoriesMap]);
        // const { listings, ...getChosenCategory } = newChosenMap.get(
        //     listing.category
        // );
        // const { listings: categoryListings, ...getCategory } =
        //     newCategoryMap.get(listing.category);

        // categoryListings.set(listing._id, listing);
        // listings.delete(listing._id);
        // setChosenMap(() => newChosenMap);
        // setCategoriesMap(() => newCategoryMap);

        // const { mapToArray, newCount } = convertMapToArray({
        //     mapState: newChosenMap,
        // });
        // setChosenListings(() => mapToArray);
        // setCount(() => newCount);

        // setCategories(
        //     () => convertMapToArray({ mapState: newCategoryMap }).mapToArray
        // );

        // setChosenListings((prevState) => {
        //     const cloneArray = _.cloneDeep(prevState).map((category) => {
        //         if (category._id == categoryId) {
        //             return {
        //                 ...category,
        //                 listings: category.listings?.filter(
        //                     ({ _id }) => _id != listing._id
        //                 ),
        //             };
        //         } else {
        //             return category;
        //         }
        //     });

        //     return cloneArray;
        // });
        // setCategories((prevState) => {
        //     const cloneArray = _.cloneDeep(prevState).map((category) => {
        //         if (category._id == categoryId) {
        //             return {
        //                 ...category,
        //                 listings: [listing, ...category.listings],
        //             };
        //         } else {
        //             return category;
        //         }
        //     });

        //     return cloneArray;
        // });
    };

    const handleAddListing = ({ category }) => {
        // remove listing from chosen map and add to category map
        // convert Map to array

        const newChosenMap = new Map([...chosenMap]);
        const newCategoriesMap = new Map([...categoriesMap]);

        const { listings: categoryListingsMap, ...getCategory } =
            newCategoriesMap.get(category._id);

        debugger;

        if (newChosenMap.has(category._id)) {
            const { listings: chosenListingMap, ...getChosenCategory } =
                newChosenMap.get(category._id);
            getChosenCategory['listings'] = new Map([
                ...categoryListingsMap,
                ...chosenListingMap,
            ]);

            newChosenMap.set(category._id, getChosenCategory);
        } else {
            newChosenMap.set(category._id, {
                ...getCategory,
                listings: categoryListingsMap,
            });
        }

        getCategory['listings'] = new Map();
        newCategoriesMap.set(getCategory._id, getCategory);

        setChosenMap(() => newChosenMap);
        setCategoriesMap(() => newCategoriesMap);
        const { mapToArray, newCount } = convertMapToArray({
            mapState: newChosenMap,
        });

        setCount(() => newCount);
        setChosenListings(() => mapToArray);
        setCategories(
            () => convertMapToArray({ mapState: newCategoriesMap }).mapToArray
        );

        // handleListing({
        //     listing,
        //     addMap: chosenMap,
        //     setAddMap: setChosenMap,
        //     setAddArray: setChosenListings,
        //     removeMap: categoriesMap,
        //     setRemoveArray: setCategories,
        //     setRemoveMap: setCategoriesMap,
        // });
    };

    const value = {
        details,
        setDetails,
        count,
        setCount,
        loading,
        setLoading,
        reset,
        btnLoading,
        setBtnLoading,
        handleContinue,
        showAction,
        setShowAction,
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
        chosenMap,
        setChosenMap,
        details,
        setDetails,
        isSearching,
        setIsSearching,
        chosenMap,
        setChosenMap,
        errors,
        setErrors,
        clearError,
        modalView,
        setModalView,
        errorStyle,
        categoriesMap,
        categories,
        setCategories,
        ...newValue,
        generateDiscountText,
        initialFetch,
        setInitialFetch,
        handleDeleteListing,
        handleAddListing,
        generateMapFromOffers,
        convertMapToArray,
        trigger,
        setTrigger,
    };
    return (
        <OfferContext.Provider value={value}>{children}</OfferContext.Provider>
    );
}

export default OfferContextProvider;
