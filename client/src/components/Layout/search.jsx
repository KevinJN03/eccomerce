import { Fragment, useRef, useState, useEffect } from 'react';
import search_icon from '../../assets/search.svg';
import { SearchRounded, CloseRounded } from '@mui/icons-material';
import useBodyScollLock from '../../hooks/useBodyScollLock';
import axios from '../../api/axios';
import { useDebounce, useWindowSize } from '@uidotdev/usehooks';
import { Link, useNavigate } from 'react-router-dom';

function Search({ search }) {
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isLocked, toggle] = useBodyScollLock();
    const [suggestions, setSuggestions] = useState([]);
    const debounceValue = useDebounce(searchText, 500);

    const [mobileOverlay, setMobileOverlay] = useState(false);
    // const screenSize = useWindowSize();
    const inputRef = useRef(null);
    const mobileInputRef = useRef(null);
    const navigate = useNavigate();
    const handleOnChange = (e) => {
        setSearchText(e.target.value);
    };

    useEffect(() => {
        if (debounceValue) {
            axios
                .get(`/search?q=${debounceValue}`)
                .then((res) => {
                    console.log('suggestions', res.data);
                    setSuggestions(res.data);
                })
                .catch((error) => {
                    console.log('error fetching suggestions: ', error);
                });
        }
    }, [debounceValue]);

    const openSearch = () => {
        setOpen(true);
        toggle();
    };
    console.log('searchText: ', searchText);
    const closeSearch = () => {
        setOpen(false);
        toggle();
    };

    const clearInput = () => {
        setSearchText((prevState) => (prevState = ''));
        inputRef.current.value = '';
        mobileInputRef.current.value = '';
        setSuggestions((prevState) => (prevState = []));
    };
    return (
        <section
            className={`search sm:!bg-blue flex w-full flex-row justify-center`}
        >
            <div className="relative flex h-full w-full flex-row items-center ">
                <input
                    type="text"
                    id="search-input"
                    // onChange={search}
                    placeholder="Search for items"
                    className="z-[3] placeholder:text-s"
                    onChange={(e) => handleOnChange(e)}
                    ref={inputRef}
                    onClick={openSearch}
                />
                <span className="search-icons absolute right-0 top-0 z-[3] flex  h-full flex-row items-center ">
                    {searchText && (
                        <CloseRounded
                            onClick={clearInput}
                            className="mr-2 !text-xl sm:!hidden"
                        />
                    )}
                    <SearchRounded
                        // onClick={() =>
                        //     // screenSize.width < 480 && setMobileOverlay(true)
                        // }
                        className={`${
                            searchText && 'filter lg:bg-orange-400'
                        } h-full rounded-full p-1 sm:!text-[40px] sm:invert lg:!text-3xl`}
                    />
                </span>

                {open && searchText && (
                    <div className="absolute left-0 top-2/4 z-[2] flex h-fit min-h-[100px] w-full flex-col  gap-2 !self-center rounded-b-xl bg-white  px-6 pb-3 pt-8">
                        {suggestions.length > 0 &&
                            suggestions.map((suggestion) => {
                                return (
                                    <a
                                        href={`/product/${suggestion._id}`}
                                        key={suggestion._id}
                                        className="flex flex-row items-center gap-3"
                                    >
                                        <img
                                            src={suggestion.images[0]}
                                            alt=""
                                            className="h-14 w-10 rounded-lg object-cover object-center"
                                        />
                                        <p className="text-xs">
                                            {suggestion.title}
                                        </p>
                                    </a>
                                );
                            })}
                    </div>
                )}
            </div>

            {mobileOverlay && (
                <div className="search-overlay sm:!min-w-screen fixed left-0 top-0 z-10 flex !h-full !w-full flex-col !bg-[var(--light-grey)] sm:!min-h-screen">
                    <span className="mx-4 mt-3 flex flex-row items-center justify-between">
                        <p className="text-base font-bold text-[var(--grey)]">
                            SEARCH:
                        </p>
                        <CloseRounded
                            className=""
                            fontSize="large"
                            onClick={() => {
                                setMobileOverlay(false);
                            }}
                        />
                    </span>
                    <div className="mobile-search relative mt-2 flex w-[90%] justify-center self-center">
                        <input
                            type="text"
                            className="w-full  rounded-full py-2 pl-3 pr-[72px]"
                            onChange={handleOnChange}
                            ref={mobileInputRef}
                        />
                        <span className="absolute right-0 flex h-full flex-row items-center gap-2">
                            <CloseRounded onClick={clearInput} />
                            <SearchRounded
                                className="rounded-full bg-orange-400 p-1 filter"
                                fontSize="large"
                            />
                        </span>
                    </div>
                    <section className="suggestions-wrapper mx-4 mt-4 flex flex-col gap-y-3 overflow-scroll pb-20">
                        {suggestions.length > 0 &&
                            suggestions.map((suggestion) => {
                                return (
                                    <a
                                        href={`/product/${suggestion._id}`}
                                        key={suggestion._id}
                                        className="flex flex-row items-center gap-3"
                                        onClick={() => setMobileOverlay(false)}
                                    >
                                        <img
                                            src={suggestion.images[0]}
                                            alt=""
                                            className="h-14 w-10  object-cover object-center"
                                        />
                                        <p className="text-xs">
                                            {suggestion.title}
                                        </p>
                                    </a>
                                );
                            })}
                    </section>
                </div>
            )}
            <div
                className={`backdrop ${open && 'backdrop-open'}`}
                onClick={closeSearch}
            ></div>
        </section>
    );
}

export default Search;
