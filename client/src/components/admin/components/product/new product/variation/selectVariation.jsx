import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Manage from './manage';
import { generateVariation, generateCustomVariation, filteredVariation } from './variationData';
import ErrorAlert from './errorAlert';
import VariationResults from './searchResults';
import { useVariation } from '../../../../../../context/variationContext';
import OptionError from './optionError';

function SelectVariation({}) {
    const { content, dispatch, setVariations, variations } = useVariation();
    const [option, setOption] = useState([]);
    const [variation, setVariation] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [name, setName] = useState(content.title || '');
    const [defaultVariation, setDefaultVariation] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (content.currentVariation != null) {
            const currentVariation = content.currentVariation;

            const { name, options } = currentVariation;
            console.log({ name, options })

            const result = filteredVariation(name, options)
            console.log('result', result)
            setOption(options);
            setVariation(result)

            if (name == 'Colour' || name == 'Size') {
                setDefaultVariation(true);
            }

        } else {

            if (name == 'Colour' || name == 'Size') {
                
            console.log('else Block')
                const generatedVariations = generateVariation(name, option);
                console.log('generateOptions', option);
                setDefaultVariation(true);
                setVariation(generatedVariations);
            }
        }
    }, []);


    const onNameChange = (value) => {
setName(value)
    }
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
        const customVariation = generateCustomVariation(searchText);
        setOption([...option, customVariation]);
        setSearchText('');
    };

    const createVariation = () => {
        try {
            if (content.currentVariation) {
                const { id } = content.currentVariation;
                console.log('here')
                setVariations(
                    variations.map((item) => {
                        if (item.id == id) {
                            return { ...item, options: option, name: name };
                        } else {
                            return item;
                        }
                    })
                );
            } else {
                const newVariation = {
                    name,
                    options: option,
                    id: uuidv4(),
                };

                setVariations((prevState) => [...prevState, newVariation]);
            }

            dispatch({ type: 'manage' });
        } catch (error) {
            console.log('error at singleVariation:', error.message);
            setError(error.message);
        }
    };
    const clearError = () => {
        setError(null);
    };

    return (
        <section className="select-variation min-h-full w-full">
            {error && <ErrorAlert msg={error} clearError={clearError} />}
            <header className="flex w-full flex-col border-b-2 pb-4 !text-left">
                <h1 className=" font-semibold">
                    {defaultVariation ? name : 'Custom variation'}
                </h1>
                {defaultVariation && <p>Variation</p>}
                {!defaultVariation && (
                    <div className=" flex, m-0 min-w-full max-w-xs flex-col gap-0 p-0">
                        <label className="py-2 text-lg font-medium">
                            Name <span className="asterisk">*</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered min-w-full max-w-xs !rounded-md"
                            required
                            value={name}
                            onChange={(e) => onNameChange(e.target.value)}
                        />
                    </div>
                )}
            </header>

            <section className="options my-4 min-h-full">
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

                <section
                    className={` ${
                        defaultVariation && 'dropdown'
                    } w-[400px] border-none`}
                >
                    <div
                        className="searchOption relative flex !w-full flex-row items-center"
                        tabIndex={0}
                    >
                        <input
                            type="text"
                            value={searchText}
                            className="input input-lg !min-w-full rounded-md pr-10"
                            placeholder="Enter an option..."
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <ArrowDropDownIcon className="absolute right-3" />
                        {!defaultVariation && (
                            <button
                                type="button"
                                className="ml-2 rounded-3xl px-3 py-2 font-medium hover:bg-[var(--light-grey)] disabled:opacity-40"
                                onClick={handleCustom}
                                disabled={
                                    searchText.length < 1 ||
                                    searchText.length > 20
                                }
                            >
                                Add
                            </button>
                        )}
                    </div>
                    {!defaultVariation && searchText.length > 20 && (
                        <OptionError />
                    )}
                    <VariationResults
                        addRemainingColors={addRemainingColors}
                        searchText={searchText}
                        variation={variation}
                        addOption={addOption}
                        handleCustom={handleCustom}
                        option={option}
                    />
                </section>

                <div className="options-wrapper mt-3 flex flex-col gap-y-2 ">
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
                                    <span
                                        onClick={() => deleteColor(item)}
                                        className="rounded-full !bg-[var(--light-grey)] p-2 transition-all hover:!bg-gray-300"
                                    >
                                        <DeleteRoundedIcon
                                            fontSize="small"
                                            className="bg-transparent"
                                        />
                                    </span>
                                </div>
                            );
                        })}
                </div>
            </section>

            <section className="variation-footer">
                <button
                    onClick={() => dispatch({ type: 'manage' })}
                    type="button"
                    className="no-wrap first-letter: mr-auto flex flex-row items-center justify-center rounded-full !bg-[var(--light-grey)] px-3  py-[10px] transition-all  ease-in-out hover:scale-[1.02] hover:!bg-gray-300"
                >
                    <DeleteRoundedIcon className="!bg-transparent !fill-red-800" />
                    <span className=" !bg-transparent font-medium tracking-tight text-red-800">
                        Delete variation
                    </span>
                </button>
                <div className="flex h-full flex-row flex-nowrap items-center gap-x-4">
                    {(name.length < 1 && (
                        <ErrorMessage message={'Enter a variation name'} />
                    )) ||
                        (option.length < 1 && (
                            <ErrorMessage message={'Add at least 1 option'} />
                        ))}

                    <button
                        type="button"
                        className=" rounded-full !bg-black px-3 py-[10px]  text-white disabled:opacity-40"
                        disabled={option.length < 1 || name.length < 1}
                        onClick={createVariation}
                    >
                        Done
                    </button>
                </div>
            </section>
        </section>
    );
}

function ErrorMessage({ message }) {
    return <span className="text-sm text-gray-500">{message}</span>;
}

export default SelectVariation;
