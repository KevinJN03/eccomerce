import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Empty from '../Empty';
import ToggleSwitch from '../toggleSwitch/toggleSwitch';
import {  useState } from 'react';
import { useVariation } from '../../../../../../../context/variationContext';
import VariationItem from './variationItem.jsx';
function Manage({}) {
    const {
        dispatch,
        setVariations,
        setCheck,
        temporaryVariation,
        setTemporaryVariation,
    } = useVariation();

    const [priceSelect, setPriceSelect] = useState('');
    const [quantitySelect, setQuantitySelect] = useState('');
    const [priceState, setPriceState] = useState(
        checkHeader('priceHeader') || false
    );
    const [quantityState, setQuantityState] = useState(
        checkHeader('quantityHeader') || false
    );

    function checkHeader(property) {
        const newTemporaryVariation = [...temporaryVariation];
        return newTemporaryVariation.some((item) => {
            if (item[property].on == true) {
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

        dispatch({ type: 'select', currentVariation: item, title: name });
    };

    const cancel = () => {
        setCheck(false);
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

        if (
            (countPriceHeader > 1 || countQuantityHeader > 1 ) 
        ) {
            debugger
            const update = newArr.map((item) => {
                return {
                    ...item,
                    priceHeader: { on: true },
                    quantityHeader: { on: true },
                    combine: true,
                };
            });

            setVariations(update);
            setCheck(false);
            return
        } else {
            const newUpdate = newArr.map((item) => {
                return { ...item, combine: false };
            });
            setVariations(newUpdate);
            setCheck(false);
            return
        }
    };
    return (
        <section className="variation-manage relative flex min-h-full w-full flex-col">
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
                    onClick={() => dispatch({ type: 'main' })}
                    className="border-1 mb-4 mt-3 box-border flex max-w-fit flex-row flex-nowrap items-center justify-start self-start rounded-full border-black px-2 py-2 transition-all ease-in-out hover:!px-[12.5px]"
                >
                    <AddRoundedIcon className="bg-transparent" />
                    <span className="bg-transparent text-sm">
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
                        <ToggleSwitch
                            property={'priceHeader'}
                            label={'Prices'}
                            select={priceSelect}
                            state={priceState}
                            setState={setPriceState}
                            notDisabled={notDisabled}
                            setSelect={setPriceSelect}
                            notDisabledVariation={notDisableVariation.arr}
                        />
                        <ToggleSwitch
                            property={'quantityHeader'}
                            label="Quantities"
                            select={quantitySelect}
                            setSelect={setQuantitySelect}
                            state={quantityState}
                            setState={setQuantityState}
                            notDisabled={notDisabled}
                            notDisabledVariation={notDisableVariation.arr}
                        />
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
                                    {notDisableVariation.arr[0].options.length *
                                        notDisableVariation.arr[1].options
                                            .length}{' '}
                                    option combinations
                                </span>
                                {' '}will be created automatically.
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
                <button type="button" className="apply-btn" onClick={apply}>
                    Apply
                </button>
            </footer>
        </section>
    );
}

export default Manage;
