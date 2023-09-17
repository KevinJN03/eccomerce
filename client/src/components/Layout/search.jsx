import { Fragment, useRef, useState } from 'react';
import search_icon from '../../assets/search.svg';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import useBodyScollLock from '../../hooks/useBodyScollLock';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
function Search({ search }) {
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isLocked, toggle] = useBodyScollLock();
const inputRef = useRef()
    const openSearch = () => {
        setOpen(true);
        toggle();
    };
console.log("searchtext: ", searchText)
    const closeSearch = () => {
        setOpen(false);
        toggle();
    };

    const clearInput = () => {
        setSearchText(prevState => prevState = "")
       inputRef.current.value = ""
    }
    return (
        <section className="search flex- flex w-full justify-center">
            <div className="relative flex h-full w-full flex-row items-center ">
                <input
                    type="text"
                    id="search-input"
                    // onChange={search}
                    placeholder="Search for items"
                    className="z-[3] placeholder:text-s"
                    onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                    ref={inputRef}
                    onClick={openSearch}
                />
                <span className="search-icons absolute right-4 top-0 z-[3] flex h-full flex-row items-center">
                  { searchText && <CloseRoundedIcon onClick={clearInput} />}
                    <SearchSharpIcon className="" />
                </span>

                {open && searchText && (
                    <div className="absolute left-0 top-2/4 z-[2] flex min-h-fit w-full flex-col !self-center bg-white  px-6 pt-8">
                        <p>testText</p>
                        <p>testText</p>
                        <p>testText</p>
                        <p>testText</p>
                    </div>
                )}
                {/* <div id="search-icon-section">
                <img src={search_icon} alt="search icon" id="search-icon" />
            </div> */}
            </div>

            <div
                className={`backdrop ${open && 'backdrop-open'}`}
                onClick={closeSearch}
            ></div>
        </section>
    );
}

export default Search;
