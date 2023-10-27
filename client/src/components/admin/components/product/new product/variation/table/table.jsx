import { useVariation } from '../../../../../../../context/variationContext';
import Row from './row';
import { useEffect, useState } from 'react';
import { tableLayout } from './tableLayout';
import { getValuesFromMap } from '../variationData';
function Table({
    variationList,
    selected,
    setSelected,
    update,
    isCombine,
    setCheckAll,
    checkAll,
    layout,
    setCombine,
}) {
    const count = variationList.options.size;

    const [variationOptions, setVariationOptions] = useState([]);

    useEffect(() => {
        const result = getValuesFromMap(variationList.options);

        setVariationOptions(result);
    }, [variationList]);

    useEffect(() => {
        if (checkAll == false && selected.size == count) {
            setSelected(new Map());
        }
    }, [checkAll]);
    useEffect(() => {
    

        if (selected.size == count) {
            setCheckAll(true);
        }

        if (selected.size == 0) {
            setCheckAll(false);
        }
    }, [selected]);

    const handleCheckAll = () => {
        setCheckAll(!checkAll);
    };

    return (
        <table className="result-table w-full !bg-white">
            <colgroup>{tableLayout[layout]}</colgroup>
            <tr className="!w-full ">
                {(variationList.priceHeader.on ||
                    variationList.quantityHeader.on) && (
                    <th>
                        <input
                            type="checkbox"
                            className="checkbox no-animation !rounded-[3px]"
                            // defaultChecked={checkAll}
                            checked={checkAll}
                            onChange={handleCheckAll}
                        />
                    </th>
                )}

                <th className="">{variationList.name}</th>
                {isCombine == true && <th>{variationList.name2}</th>}
                {variationList.priceHeader.on && <th>Price</th>}
                {variationList.quantityHeader.on && <th>Quantity</th>}
                <th className=" !text-right ">Visible </th>
            </tr>
            {variationOptions &&
                variationOptions.map((item) => {
                    return (
                      
                        <Row
                        key={item.id}
                            setCheckAll={setCheckAll}
                            checkAll={checkAll}
                            singleVariation={item}
                            variationList={variationList}
                            isQuantityHeaderOn={variationList.quantityHeader.on}
                            isPriceHeaderOn={variationList.priceHeader.on}
                            selected={selected}
                            setSelected={setSelected}
                            update={update}
                            isCombine={isCombine}
                            setCombine={setCombine}
                        />
                    );
                    // });
                })}
        </table>
    );
}

export default Table;
