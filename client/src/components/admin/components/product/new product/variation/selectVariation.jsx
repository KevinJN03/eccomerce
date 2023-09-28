import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useEffect, useState } from 'react';

import Manage from './manage';
import { colorList,sizeList, generateVariation, generateCustomVariation } from './variationData';

function SelectVariation({ title, setContent }) {
    console.log('select Variation', title);
    const [option, setOption] = useState([]);
    const [variation, setVariation] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        if (title == 'Colour') {
            const generatedVariations = generateVariation(colorList);
            console.log('gennerated', generatedVariations);
            setVariation(generatedVariations);
        }
        if (title == 'Size') {
            const generatedVariations = generateVariation(sizeList);
            console.log('gennerated', generatedVariations);
            setVariation(generatedVariations);
        }

    }, []);
    const filterColor = (id) => {
        let newArr = [...variation];
        const newColor = newArr.filter((item) => item.id != id);

        setVariation(newColor);
    };

    const addOption = (variationOption) => {
        if (searchText.length > 0) {
            setSearchText('');
        }
        setOption([...option, variationOption]);
        filterColor(variationOption.id);
    };

    const deleteColor = (variationOption) => {
        const newArr = [...option];
        const filterOption = newArr.filter(
            (item) => item.id != variationOption.id
        );
        setOption(filterOption);

        // if(newArr.find((item) => item.id == variationOption.id) == false){

        if (variationOption && variationOption.type != 'custom') {
            setVariation([variationOption, ...variation]);
        }

        // }
    };

    const addRemainingColors = () => {
        setOption([...option, ...variation]);
        setVariation([]);
    };

    const handleCustom = () => {
       const customVariation = generateCustomVariation(searchText)
        setOption([...option, customVariation]);
        setSearchText('');
    };
    return (
        <section className="select-variation h-full w-full">
            <header className="flex w-full flex-col border-b-2 pb-10 !text-left">
                <h1 className=" font-semibold">{title || 'Custom variation'} </h1>
                { title && <p>Variation</p>}
            </header>

            <section className="options mt-4">
                <div className="mb-6">
                    <h2 className="font-Poppin flex items-center text-lg font-semibold">
                        Options{' '}
                        <span className="ml-1 flex h-4 items-center rounded-full bg-black px-2 text-xxs text-white">
                            {option.length}
                        </span>
                    </h2>
                    <p className="text-s">
                        Buyers can choose from the following options. Use the
                        options listed here for peak discoverability. Buyers
                        won’t see custom options in filters.
                    </p>
                </div>

                <section className="dropdown w-[400px]">
                    <div
                        className="searchOption flex !w-full flex-row items-center"
                        tabIndex={0}
                    >
                        <input
                            type="text"
                            value={searchText}
                            className="input input-lg !min-w-full rounded-md"
                            placeholder="Enter an option..."
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <ArrowDropDownIcon className="absolute right-3" />
                    </div>

                    <div className="dropdown-menu dropdown-menu-bottom-center mt-2 max-h-[200px] w-full overflow-y-scroll p-0">
                        <ul>
                            {variation.map((item) => {
                                const { variation } = item;
                                let variationStr = variation.toLowerCase();
                                let searchTextStr = searchText.toLowerCase();
                                if (
                                    variationStr.substring(
                                        0,
                                        searchTextStr.length
                                    ) == searchTextStr
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

                            {searchText == '' && variation.length > 0 &&  (
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

                            {searchText.length > 1 &&
                                !variation.find(
                                    (item) =>
                                        item.variation.toLowerCase() ===
                                        searchText.toLowerCase()
                                ) && (
                                    <li
                                        onClick={() => handleCustom()}
                                        className="flex flex-row justify-between px-3 py-3 hover:bg-[var(--light-grey)]"
                                    >
                                        <p className="bg-transparent text-sm">
                                            Custom Option:{' '}
                                            <span className="bg-transparent font-medium">
                                                {searchText}
                                            </span>
                                        </p>
                                        <AddRoundedIcon className="bg-transparent" />
                                    </li>
                                )}
                        </ul>
                    </div>
                </section>

                <div className="options-wrapper mt-3 flex flex-col gap-y-2">
                    {option.length > 0 &&
                        option.map((item) => {
                            const { variation, id } = item;
                            return (
                                <div
                                    className="border-1 flex flex-row items-center justify-between rounded-lg p-2"
                                    key={id}
                                >
                                    <span className="flex flex-row items-center gap-3">
                                        <MenuRoundedIcon fontSize="small" />
                                        <p className="text-sm">{variation}</p>
                                    </span>
                                    <span className="rounded-full !bg-[var(--light-grey)] p-2 transition-all hover:!bg-gray-300">
                                        <DeleteRoundedIcon
                                            fontSize="small"
                                            onClick={() => deleteColor(item)}
                                            className="bg-transparent"
                                        />
                                    </span>
                                </div>
                            );
                        })}
                </div>
            </section>

            <section className="variation-select-footer  bottom-0 left-0 flex w-full flex-row flex-nowrap pt-5">
                <button
                    onClick={() => setContent({ type: 'manage' })}
                    type="button"
                    className="no-wrap first-letter: mr-auto flex flex-row items-center rounded-full !bg-[var(--light-grey)] px-3  py-[10px]  "
                >
                    <DeleteRoundedIcon className="!bg-transparent !fill-red-800" />
                    <span className=" !bg-transparent font-medium tracking-tight text-red-800">
                        Delete variation
                    </span>
                </button>
                <div className="flex h-full flex-row flex-nowrap items-center gap-x-4">
                    {option.length < 1 && (
                        <span className="text-sm text-gray-500">
                            Add at least 1 option
                        </span>
                    )}
                    <button
                        type="button"
                        className=" rounded-full !bg-black px-3 py-[10px]  text-white disabled:opacity-40"
                        disabled={option.length < 1}
                    >
                        Done
                    </button>
                </div>
            </section>
        </section>
    );
}

export default SelectVariation;
