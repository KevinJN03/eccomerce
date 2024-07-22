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
import { v4 } from 'uuid';
import SearchResult from './searchResult';
import Table from './table';
import SelectedListings from './selectedListings';
import { useOfferContext } from '../../../context/offerContext';
function Step2({}) {
    const {
        details,
        setDetails,

        listingIdsSet,
        setListingIdsSet,
        chosenListings,

        setSearchResult,

        setShowSearchResult,
        searchText,

        setIsSearching,
    } = useOfferContext();
    

    const { logoutUser } = useAdminContext();
    const debouncedSearchText = useDebounce(searchText, 300);
    const abortControllerRef = useRef(new AbortController());
    const timeoutRef = useRef(null);

    

    

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
                    <SelectedListings />
                </section>
            )}
        </section>
    );
}

export default Step2;
