import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Empty from '../Empty';
import ToggleSwitch from '../toggleSwitch/toggleSwitch';
import { useEffect, useState } from 'react';
import { useVariation } from '../../../../../../../context/variationContext';
import VariationItem from './variationItem.jsx';
import { useNewProduct } from '../../../../../../../context/newProductContext';
import '../../new_product.scss'
import _ from 'lodash';
function Manage({}) {
    const {
        variations,
        setVariations,
        temporaryVariation,
        setTemporaryVariation,
    } = useVariation();

    const {
        setPublish,
        publishErrorDispatch,
        setApply,
        combineDispatch,
        contentDispatch,
        setModalCheck,
    } = useNewProduct();
    const [priceSelection, setPriceSelection] = useState('');
    const [quantitySelection, setQuantitySelection] = useState('');
    const [disableApply, setDisableApply] = useState(true);
    const [priceState, setPriceState] = useState(
        checkHeader('priceHeader') || false
    );
    const [quantityState, setQuantityState] = useState(
        checkHeader('quantityHeader') || false
    );

    useEffect(() => {
        const isEqual = _.isEqual(variations, temporaryVariation);
        if (!isEqual) {
            ('not true');
            setDisableApply(() => false);
        }
    }, [temporaryVariation]);

    function checkHeader(property, arr) {
        let newTemporaryVariation;
        if (arr) {
            newTemporaryVariation = [...arr];
        } else {
            newTemporaryVariation = [...temporaryVariation];
        }

        return newTemporaryVariation.some((item) => {
            if (item?.[property].on == true) {
                return true;
            }
            return false;
        });
    }

    const deleteVariation = ({ id, name }) => {
        // updatedDefaultMap(name, id, true);

        let newArr = [...temporaryVariation];

        let update = newArr.map((item) => {
            if (item.id == id) {
                return { ...item, disabled: true };
            }
            return item;
        });
        setTemporaryVariation(update);
    };

    const editVariation = (item) => {
        const { name } = item;

        contentDispatch({
            type: 'select',
            currentVariation: item,
            title: name,
        });
    };

    const cancel = () => {
        setModalCheck(() => false);
    };

    const notDisableVariations = () => {
        let countPriceHeader = 0;
        let countQuantityHeader = 0;
        const filtered = temporaryVariation.filter((item) => {
            if (item.disabled == false) {
                if (item.priceHeader.on) {
                    countPriceHeader++;
                }

                if (item.quantityHeader.on) {
                    countQuantityHeader++;
                }
                return item;
            }
        });

        let newObj = {
            countPriceHeader,
            countQuantityHeader,
            arr: filtered,
        };
        return newObj;
    };

    const notDisableVariation = notDisableVariations();
    const { countPriceHeader, countQuantityHeader, arr } = notDisableVariation;
    const notDisabled = arr.length;

    const apply = () => {
        const newArr = [...arr];
        debugger;
        if (countPriceHeader > 1 || countQuantityHeader > 1) {
            const update = newArr.map((item) => {
                return {
                    ...item,
                    priceHeader: { on: true },
                    quantityHeader: { on: true },
                    combine: true,
                };
            });

            setVariations(() => update);
            combineDispatch({ type: 'combineVariations', variations: update });
            setModalCheck(() => false);
        } else {
            combineDispatch('clear');
            const newUpdate = newArr.map((item) => {
                const { options, quantityHeader, priceHeader } = item;

                const newOptions = new Map();

                for (const [key, value] of options.entries()) {
                    const newObj = { ...value };

                    if (!quantityHeader.on) {
                        delete newObj?.stock;
                    }
                    if (!priceHeader.on) {
                        delete newObj?.price;
                    }

                    newOptions.set(key, newObj);
                }

                return { ...item, combine: false, options: newOptions };
            });
            setVariations(() => newUpdate);

            setModalCheck(() => false);
        }
        publishErrorDispatch('clearValidateInput');
        setPublish((prevState) => ({ ...prevState, firstAttempt: false }));
    };

    const priceToggleProps = {
        property: 'priceHeader',
        label: 'Prices',
        state: priceState,
        setState: setPriceState,
        notDisabled,

        selection: priceSelection,
        setSelection: setPriceSelection,
    };
    const quantityToggleProps = {
        property: 'quantityHeader',
        label: 'Quantities',
        state: quantityState,
        selection: quantitySelection,
        setSelection: setQuantitySelection,
        setState: setQuantityState,
        notDisabled,
    };
    return (
        <section className="variation-manage relative flex min-h-full w-full flex-col bg-white">
            <h2 className="mb-2 text-left text-2xl font-semibold">
                Manage variations
            </h2>

            <VariationItem
                deleteVariation={deleteVariation}
                editVariation={editVariation}
                variations={temporaryVariation}
            />
            {notDisabled < 2 && (
                <button
                    onClick={() => contentDispatch({ type: 'main' })}
                    className="mb-4 mt-3 box-border flex max-w-fit flex-row flex-nowrap items-center justify-start self-start rounded-full border-[2px] border-black p-2 transition-all ease-in-out hover:!px-4"
                >
                    <AddRoundedIcon className="bg-transparent" />
                    <span className="bg-transparent text-sm font-semibold">
                        Add a variation
                    </span>
                </button>
            )}
            <section className="manage-body mb-10 flex min-h-full w-full flex-col items-center gap-y-3">
                {temporaryVariation.every((item) => item.disabled == true) && (
                    <Empty />
                )}
                {!temporaryVariation.every((item) => item.disabled == true) && (
                    <div className="mt-2 flex h-full w-full flex-col gap-y-5 border-t-2 pt-10">
                        <ToggleSwitch {...priceToggleProps} />
                        <ToggleSwitch {...quantityToggleProps} />
                    </div>
                )}
                {notDisabled > 1 &&
                    (countPriceHeader > 1 || countQuantityHeader > 1) && (
                        <div className="border-1 mt-2 flex items-center gap-x-4 rounded-md border-slate-300 bg-[var(--light-grey)] p-3 ">
                            <span className="rounded-full bg-white p-1">
                                <img
                                    width="60"
                                    height="60"
                                    src="https://img.icons8.com/ios-glyphs/30/information.png"
                                    alt="information"
                                />
                            </span>

                            <p className="mr-8 text-sm ">
                                Because you are varying for each{' '}
                                <span className="font-semibold">
                                    {`${notDisableVariation.arr[0].name} and ${notDisableVariation.arr[1].name} `}
                                </span>
                                in at least one area,
                                <span className="font-semibold">
                                    {' '}
                                    {notDisableVariation.arr[0].options.size *
                                        notDisableVariation.arr[1].options
                                            .size}{' '}
                                    option combinations
                                </span>{' '}
                                will be created automatically.
                            </p>
                        </div>
                    )}
            </section>
            <footer className="variation-footer ">
                <button
                    type="button"
                    className="cancel-btn rounded-full px-3 py-2"
                    onClick={cancel}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="apply-btn"
                    onClick={apply}
                    disabled={disableApply}
                >
                    Apply
                </button>
            </footer>
        </section>
    );
}

export default Manage;
