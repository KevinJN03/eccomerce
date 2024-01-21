import { SearchRounded } from "@mui/icons-material";

function SearchInput({searchText, setSearchText, handleClick, placeHolder}){
  return (
    <div className=" search-box border- flex w-full flex-row items-center rounded border-[1px] z-[inherit] border-dark-gray pl-3 ">
    <SearchRounded className="mr-1 !text-xl" />
    <input
    
        value={searchText}
        onKeyDown={(e) => {
            if (e.key == 'Enter') {
                handleClick();
            }
        }}
        onChange={(e) => {
            setSearchText(e.target.value);
        }}
        type="text"
        tabIndex="0"
        className="mr-5 w-full border-none py-2 z-[inherit] text-s outline-none"
        placeholder={placeHolder}
    />
    {searchText && (
        <button
            onClick={handleClick}
            className="  flex h-full items-center justify-center  rounded-r-inherit border-l-[1px] border-dark-gray px-3 text-s font-medium hover:bg-light-grey/50"
        >
            Search
        </button>
    )}
</div>
  )
};

export default SearchInput
