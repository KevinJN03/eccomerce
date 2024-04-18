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
    getValuesFromMap,
} from './variationData';
import ErrorAlert from './error/errorAlert';
import SearchResult from './searchResults';
import { useVariation } from '../../../../../../context/variationContext';
import OptionError from './error/optionError';
import { useNewProduct } from '../../../../../../context/newProductContext';
import _ from 'lodash';
import ObjectID from 'bson-objectid';
import ThemeBtn from '../../../../../buttons/themeBtn';
import BubbleButton from '../../../../../buttons/bubbleButton';
import { Menu, MenuItem } from '@mui/material';

function SelectVariation({}) {
    const { setTemporaryVariation, temporaryVariation } = useVariation();

    const { contentDispatch, modalContent } = useNewProduct();
    const currentVariation = modalContent.currentVariation;
    const [option, setOption] = useState(
        currentVariation ? currentVariation.options : new Map()
    );
    const [variation, setVariation] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [name, setName] = useState(modalContent.title || '');
    const [defaultVariation, setDefaultVariation] = useState(
        modalContent.default ? true : false
    );
    const [error, setError] = useState();
    const [exist, setExist] = useState(false);
    const [optionArray, setOptionArray] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    useEffect(() => {
        const result = getValuesFromMap(option);
        setOptionArray(result);
    }, [option]);
    useEffect(() => {
        try {
            if (currentVariation) {
                const result = filteredVariation(
                    name,
                    currentVariation.options
                );
                setDefaultVariation(() => currentVariation.default);
                setVariation(() => result);
            } else if (defaultVariation) {
                let list = generateVariation(name, { array: true });

                setVariation(() => list);
            }
        } catch (error) {}
    }, []);

    const onNameChange = (value) => {
        setName(value);
        const newArr = [...temporaryVariation];
        const variationExist = newArr.some(
            ({ name }) => name.toLowerCase() == value.toLowerCase()
        );
        if (variationExist) {
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
        setOption((prevState) => {
            const newMap = new Map(prevState);
            newMap.set(variationOption.id, variationOption);
            return newMap;
        });
        filterColor(variationOption.id);
    };

    const deleteOption = (variationOption) => {
        setOption((prevState) => {
            const newOptionMap = new Map(prevState);
            newOptionMap.delete(variationOption.id);

            return newOptionMap;
        });
        if (variationOption && variationOption.type != 'custom') {
            setVariation([variationOption, ...variation]);
        }
    };

    const deleteVariation = () => {
        try {
            if (modalContent.currentVariation) {
                const newArr = [...temporaryVariation];
                const updateArr = newArr.map((item) => {
                    if (item.id === modalContent.currentVariation.id) {
                        return { ...item, disabled: true };
                    }
                    return item;
                });
                setTemporaryVariation(updateArr);
            }

            return contentDispatch({ type: 'manage' });
        } catch (error) {
            setError('Fail to delete variation. Please try again.');
        }
    };

    const handleCustom = () => {
        const customVariation = generateCustomVariation(searchText);
        setOption((prevState) =>
            new Map(prevState).set(customVariation.id, customVariation)
        );
        setSearchText('');
    };

    const createVariation = () => {
        try {
            if (modalContent?.currentVariation) {
                const newTemporaryVariation = _.cloneDeep(
                    temporaryVariation
                ).map((item) => {
                    if (
                        item._id == _.get(modalContent, 'currentVariation._id')
                    ) {
                        return { ...item, options: option, name: name };
                    } else {
                        return item;
                    }
                });
                setTemporaryVariation(() => newTemporaryVariation);
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

                if (findName) {
                    setError(
                        () => 'Variation name already exists. Please try again.'
                    );

                    return;
                }

                const newVariation = {
                    name,
                    options: option,
                    _id: ObjectID()?.toString(),
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

            contentDispatch({ type: 'manage' });
        } catch (error) {
            setError(error.message);
        }
    };
    const clearError = () => {
        setError(null);
    };

    const addRemainingColors = () => {
        setOption((prevState) => {
            const newMap = new Map(prevState);
            variation.map((item) => {
                newMap.set(item.id, item);
            });
            return newMap;
        });
        setVariation([]);
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
                            className="input-bordered input min-w-full max-w-xs !rounded-md"
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
                            {option.size}
                        </span>
                    </h2>
                    <p className="text-s">
                        Buyers can choose from the following options. Use the
                        options listed here for peak discoverability. Buyers
                        won’t see custom options in filters.
                    </p>
                </div>

                <section
                    className={` ${defaultVariation} w-[400px] border-none`}
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
                            onClick={(e) => {
                                setAnchorEl(e.currentTarget);

                                console.log(e.currentTarget);
                            }}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                        />
                        <ArrowDropDownIcon className="absolute right-3" />
                    </div>{' '}
                    {!defaultVariation && searchText.length > 20 && (
                        <OptionError
                            msg={
                                'Option Name must be between 1 and 20 characters.'
                            }
                        />
                    )}
                    <Menu
                        open={anchorEl}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        PaperProps={{
                            style: {
                                maxHeight: '20ch',
                                width: '100%',
                                maxWidth: '400px',
                                marginTop: '10px',
                                borderRadius: '10px',
                            },
                        }}
                    >
                        {!defaultVariation && (
                            <MenuItem>
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
                            </MenuItem>
                        )}

                        <SearchResult
                            addRemainingColors={addRemainingColors}
                            searchText={searchText}
                            variation={variation}
                            addOption={addOption}
                            handleCustom={handleCustom}
                            option={optionArray}
                        />
                    </Menu>
                </section>
                <div className="options-wrapper mt-3 flex min-h-[200px] w-full  basis-full flex-col gap-y-2  ">
                    {optionArray.map(({ variation, id, ...item }) => {
                        return (
                            <div
                                className="border-1 flex w-full w-full cursor-pointer  flex-row items-center justify-between rounded-lg p-2"
                                key={id}
                            >
                                <span className="flex flex-row items-center gap-3">
                                    <MenuRoundedIcon fontSize="small" />
                                    <p className="text-sm">{variation}</p>
                                </span>
                                <span
                                    onClick={() =>
                                        deleteOption({
                                            ...item,
                                            id,
                                            variation,
                                        })
                                    }
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
                <ThemeBtn handleClick={deleteVariation} bg={'bg-light-grey'}>
                    <div>
                        <DeleteRoundedIcon className="!bg-transparent !fill-red-800" />
                        <span className=" !bg-transparent font-medium tracking-tight text-red-800">
                            Delete variation
                        </span>
                    </div>
                </ThemeBtn>

                <div className="flex min-h-full flex-row flex-nowrap items-center gap-x-4">
                    {(exist && (
                        <ErrorMessage message={'Variation already exist'} />
                    )) ||
                        (name.length < 1 && (
                            <ErrorMessage message={'Enter a variation name'} />
                        )) ||
                        (option && option.length < 1 && (
                            <ErrorMessage message={'Add at least 1 option'} />
                        ))}

                    <ThemeBtn
                        text={'Done'}
                        handleClick={createVariation}
                        disabled={
                            option.size < 1 || name.length < 1 || exist || error
                        }
                    />
                </div>
            </section>
        </section>
    );
}

function ErrorMessage({ message }) {
    return <span className="text-sm text-gray-500">{message}</span>;
}

export default SelectVariation;
