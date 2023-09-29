import AddRoundedIcon from '@mui/icons-material/AddRounded';
import OptionError from './optionError';

function VariationResults({
    variation,
    searchText,
    addRemainingColors,
    addOption,
    handleCustom,
    option,
}) {
console.log({searchText})
    
    return (
        <div className="dropdown-menu dropdown-menu-bottom-center mt-2 max-h-[200px] w-full overflow-y-scroll border-none bg-white p-0">
            <ul className="rounded-inherit border-2">
                {variation.map((item) => {
                    const { variation } = item;
                    let variationStr = variation.toLowerCase();
                    let searchTextStr = searchText.toLowerCase();
                    if (
                        variationStr.substring(0, searchTextStr.length) ==
                        searchTextStr
                    ) {
                        return (
                            <li
                                className="flex flex-row flex-nowrap justify-between px-3 py-3 text-sm hover:bg-[var(--light-grey)]"
                                onClick={() => addOption(item)}
                            >
                                <p className="bg-transparent text-sm">
                                    {item.variation}
                                </p>
                                <AddRoundedIcon className="bg-transparent" />
                            </li>
                        );
                    }
                })}

                {searchText == '' && variation.length > 0 && (
                    <li
                        className="px-3 py-3 hover:bg-[var(--light-grey)]"
                        onClick={addRemainingColors}
                    >
                        Add all options{' '}
                        <span className="text-sm font-semibold">
                            ({variation.length})
                        </span>{' '}
                        left
                    </li>
                )}

                {   (searchText.length > 0) &&( searchText.length < 20) &&
                    !variation.some(
                        (item) =>
                            item.variation.toLowerCase() ===
                            searchText.toLowerCase()
                    ) &&
                   !option.some((item) => 
                        item.variation.toLowerCase() === searchText.toLowerCase()
                    ) && (
                        <li
                            onClick={handleCustom}
                            className="flex flex-row justify-between px-3 py-3 hover:bg-[var(--light-grey)]"
                        >
                            <p className="bg-transparent text-sm max-w-full ">
                                Custom Option:{' '}
                                <span className="bg-transparent font-medium">
                                    {searchText}
                                </span>
                            </p>
                            <AddRoundedIcon className="bg-transparent" />
                        </li>
                    )}
                    {
                        searchText.length > 20 && <OptionError/>
                    }
            </ul>
        </div>
    );
}

export default VariationResults;
