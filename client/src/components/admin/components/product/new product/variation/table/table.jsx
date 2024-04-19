import { useVariation } from '../../../../../../../context/variationContext';
import Row from './row';
import { useEffect, useMemo, useState } from 'react';
import { tableLayout } from './tableLayout';
import { getValuesFromMap } from '../variationData';
import TableProvider, {
    useTableContext,
} from '../../../../../../../context/tableContext';
function Table({}) {
    const {
        checkSet,
        setCheckSet,
        handleCheckAllVariations,
        variationOptions,
        isCombine,
        layout,
        variationList,
    } = useTableContext();
    return (
        <table className="result-table w-full !bg-white">
            <colgroup>{tableLayout[layout]}</colgroup>
            <tr className="!w-full ">
                {(variationList.priceHeader.on ||
                    variationList.quantityHeader.on) && (
                    <th>
                        <input
                            type="checkbox"
                            className="daisy-checkbox daisy-checkbox-sm no-animation !rounded-[3px] border-2 border-dark-gray"
                            checked={checkSet.size > 0}
                            onChange={handleCheckAllVariations}
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
                    return <Row key={item.id} singleVariation={item} />;
                    // });
                })}
        </table>
    );
}

export default Table;
