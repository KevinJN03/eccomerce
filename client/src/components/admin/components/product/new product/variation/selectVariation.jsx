import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Manage from './manage/manage';
import {
    generateVariation,
    generateCustomVariation,
    filteredVariation,
    defaultMap,
} from './variationData';
import ErrorAlert from './error/errorAlert';
import VariationResults from './searchResults';
import { useVariation } from '../../../../../../context/variationContext';
import OptionError from './error/optionError';

function SelectVariation({}) {
    const {
        content,
        dispatch,
        setTemporaryVariation,
        temporaryVariation,
     
    } = useVariation();
    const currentVariation = content.currentVariation;
    const [option, setOption] = useState(
        currentVariation ? currentVariation.options : []
    );
    const [variation, setVariation] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [name, setName] = useState(content.title || '');
    const [defaultVariation, setDefaultVariation] = useState(
        content.default ? true : false
    );
    const [error, setError] = useState();
    const [exist, setExist] = useState(false);

    useEffect(() => {
        try {
            if (currentVariation) {
                const result = filteredVariation(name, option);
                setDefaultVariation(currentVariation.default);
                setVariation(result);
                return;
            } else if (defaultVariation) {
                let list = generateVariation(name);

                setVariation(list);
            }
        } catch (error) {
            console.log('error at select: ', error);
        }
    }, []);

    const onNameChange = (value) => {
        setName(value);
        const newArr = [...temporaryVariation];
        const variationExist = newArr.some(
            ({ name }) => name.toLowerCase() == value.toLowerCase()
        );
        if (variationExist) {
            console.log('exist:', value);
            return setExist(true);
        }

        return setExist(false);
    };
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

    const deleteVariation = () => {
        try {
            if (content.currentVariation) {
                const newArr = [...temporaryVariation];
                const updateArr = newArr.map((item) => {
                    if (item.id === content.currentVariation.id) {
                        return { ...item, disabled: true };
                    }
                    return item;
                });
                setTemporaryVariation(updateArr);
            }

            return dispatch({ type: 'manage' });
        } catch (error) {
            console.log(error);
            setError('Fail to delete variation. Please try again.');
        }
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

                setTemporaryVariation(
                    temporaryVariation.map((item) => {
                        if (item.id == id) {
                            return { ...item, options: option, name: name };
                        } else {
                            return item;
                        }
                    })
                );
            } else {
                const findName = temporaryVariation.some((item) => {
                    if (
                        item.name.toLowerCase() == name.toLowerCase() &&
                        item.disabled == false
                    ) {
                        return true;
                    }
                    return false;
                });

                if (findName)
                    throw new Error(
                        'Variation name already exists. Please try again.'
                    );
                const newVariation = {
                    name,
                    options: option,
                    id: defaultVariation ? defaultMap.get(name).id : uuidv4(),
                    default: defaultVariation,
                    disabled: false,
                    quantityHeader: { on: false },
                    priceHeader: { on: false },
                };

                setTemporaryVariation((prevState) => [
                    ...prevState,
                    newVariation,
                ]);
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
        <section className="select-variation relative  h-full w-full">
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
                {exist && (
                    <OptionError
                        msg={`Variation ${name} already exist. Please try different a name.`}
                    />
                )}
            </header>

            <section className="options my-4  flex !min-h-full flex-grow flex-col">
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
                        className="searchOption relative flex !w-full  flex-row items-center"
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

                <div className="options-wrapper mt-3 flex basis-full flex-col gap-y-2 min-h-[200px]  ">
                    {option &&
                        option.length > 0 &&
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
            {/* //variation-footer !mt-auto !bottom-[-25px] py-4 */}
            <section className="variation-footer !bottom-[-25px] !mt-auto pt-4">
                <button
                    onClick={deleteVariation}
                    type="button"
                    className="no-wrap first-letter: mr-auto flex flex-row items-center justify-center rounded-full !bg-[var(--light-grey)] px-3  py-[10px] transition-all  ease-in-out hover:scale-[1.02] hover:!bg-gray-300"
                >
                    <DeleteRoundedIcon className="!bg-transparent !fill-red-800" />
                    <span className=" !bg-transparent font-medium tracking-tight text-red-800">
                        Delete variation
                    </span>
                </button>
                <div className="flex h-full flex-row flex-nowrap items-center gap-x-4">
                    {(exist && (
                        <ErrorMessage message={'Variation already exist'} />
                    )) ||
                        (name.length < 1 && (
                            <ErrorMessage message={'Enter a variation name'} />
                        )) ||
                        (option && option.length < 1 && (
                            <ErrorMessage message={'Add at least 1 option'} />
                        ))}

                    <button
                        type="button"
                        className=" rounded-full !bg-black px-3 py-[10px]  text-white disabled:opacity-40"
                        disabled={
                            (option && option.length < 1) ||
                            name.length < 1 ||
                            exist ||
                            error
                        }
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
