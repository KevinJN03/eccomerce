import AddRoundedIcon from '@mui/icons-material/AddRounded';
import OptionError from './error/optionError';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { MenuItem, MenuList } from '@mui/material';
function VariationResults({
    variation,
    searchText,
    addRemainingColors,
    addOption,
    handleCustom,
    option,
}) {
    return (
        // <div className="dropdown-menu dropdown-menu-bottom-center mt-2 max-h-[200px] w-full overflow-y-scroll border-none bg-white p-0">

        <MenuList>
            {variation.length > 0 &&
                variation.map((item) => {
                    const { variation } = item;
                    let variationStr = _.lowerCase(variation);
                    let searchTextStr = _.lowerCase(searchText);
                    if (
                        variationStr.substring(0, searchTextStr.length) ==
                        searchTextStr
                    ) {
                        return (
                            <MenuItem>
                                <div
                                    onClick={() => addOption(item)}
                                    className="flex w-full cursor-pointer flex-row flex-nowrap justify-between px-3 py-3 text-sm  "
                                >
                                    <p className="bg-transparent text-sm">
                                        {item.variation}
                                    </p>
                                    <AddRoundedIcon className="bg-transparent" />
                                </div>
                            </MenuItem>
                        );
                    }
                })}

            {searchText == '' && variation?.length > 0 && (
                <MenuItem onClick={addRemainingColors}>
                    <div className="cursor-pointer px-3 py-3 ">
                        Add all options{' '}
                        <span className="text-sm font-semibold">
                            ({variation.length})
                        </span>{' '}
                        left
                    </div>
                </MenuItem>
            )}

            {searchText.length > 0 &&
                searchText.length < 20 &&
                !variation.some(
                    (item) =>
                        _.lowerCase(item?.variation) === _.lowerCase(searchText)
                ) &&
                !option.some(
                    (item) =>
                        _.lowerCase(item?.variation) === _.lowerCase(searchText)
                ) && (
                    <MenuItem onClick={handleCustom}>
                        <div className="flex  cursor-pointer flex-row justify-between px-3 py-3">
                            <p className="max-w-full bg-transparent text-sm ">
                                Custom Option:{' '}
                                <span className="bg-transparent font-medium">
                                    {searchText}
                                </span>
                            </p>
                            <AddRoundedIcon className="bg-transparent" />
                        </div>
                    </MenuItem>
                )}
            {searchText.length > 20 && <OptionError />}
        </MenuList>
    );
}

export default VariationResults;
