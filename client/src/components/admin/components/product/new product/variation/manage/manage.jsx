import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Empty from '../Empty';
import ToggleSwitch from '../toggleSwitch/toggleSwitch';
import { useEffect, useState } from 'react';
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
        // debugger
        dispatch({ type: 'select', currentVariation: item, title: name });
    };

    const apply = () => {
        const newArr = [...temporaryVariation];
        const filterArr = newArr.filter((item) => item.disabled != true);

        setVariations(filterArr);

        setCheck(false);
    };

    const cancel = () => {
        setCheck(false);
    };

    let notDisabled = 0;
    temporaryVariation.map((item) => {
        if (item.disabled == false) {
            notDisabled += 1;
        }
    });

    const toggleHeader = (state, property) => {
        const newTemporaryVariations = [...temporaryVariation];
        let updated;
        if (state == false) {
            updated = newTemporaryVariations.map((item) => {
                return { ...item, [property]: { on: false } };
            });
        } else if (state) {
            updated = newTemporaryVariations.map((item) => {
                return { ...item, [property]: { on: true } };
            });
        }

        setTemporaryVariation(updated);
    };

    useEffect(() => {
        toggleHeader(priceState, 'priceHeader');
    }, [priceState]);

    useEffect(() => {
        toggleHeader(quantityState, 'quantityHeader');
    }, [quantityState]);

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
            <section className="manage-body mb-10 flex h-full w-full flex-col items-center gap-y-3">
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
                        />
                        <ToggleSwitch
                            property={'quantityHeader'}
                            label="Quantities"
                            select={quantitySelect}
                            setSelect={setQuantitySelect}
                            state={quantityState}
                            setState={setQuantityState}
                            notDisabled={notDisabled}
                        />
                    </div>
                )}
            </section>
            <footer className="variation-footer">
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
