import { SearchRounded } from '@mui/icons-material';

function SearchInput({
    searchText,
    handleClick,
    placeHolder,
    handleOnchange,
    className,
}) {
    return (
        <div
            className={`search-box border- z-[inherit] flex w-full flex-row items-center rounded border-[1px] border-dark-gray pl-3 ${className || ''} `}
        >
            <SearchRounded className="mr-1 !text-xl" />
            <input
                value={searchText}
                onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                        handleClick();
                    }
                }}
                onChange={handleOnchange}
                type="text"
                tabIndex="0"
                className={`z-[inherit] mr-5 w-full border-none text-s outline-none`}
                placeholder={placeHolder}
            />
            {searchText && (
                <button
                    onClick={handleClick}
                    className="  flex min-h-full items-center justify-center rounded-r-inherit border-l border-dark-gray px-3 text-s font-medium hover:bg-light-grey/50"
                >
                    Search
                </button>
            )}
        </div>
    );
}

export default SearchInput;
