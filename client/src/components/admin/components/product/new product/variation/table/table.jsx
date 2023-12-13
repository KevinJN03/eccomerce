import { useVariation } from '../../../../../../../context/variationContext';
import Row from './row';
import { useEffect, useMemo, useState } from 'react';
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
}) {
    const count = variationList.options?.size;

    const variationOptions = getValuesFromMap(variationList.options);

    // useEffect(() => {
    //     const result = getValuesFromMap(variationList.options);

    //     setVariationOptions(result);
    // }, [variationList]);

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
                            className="daisy-checkbox no-animation !rounded-[3px]"
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
            {variationOptions.length > 0 &&
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
                        />
                    );
                    // });
                })}
        </table>
    );
}

export default Table;
