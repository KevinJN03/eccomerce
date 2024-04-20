import { useVariation } from '../../../../../../../context/variationContext';
import Row from './row';
import { useEffect, useMemo, useState } from 'react';
import { tableLayout } from './tableLayout';
import { getValuesFromMap } from '../variationData';
import TableProvider, {
    useTableContext,
} from '../../../../../../../context/tableContext';
import BubbleButton from '../../../../../../buttons/bubbleButton';
import _ from 'lodash';
function Table({}) {
    const {
        checkSet,
        setCheckSet,
        handleCheckAllVariations,
        variationOptions,
        isCombine,
        layout,
        variationList,
        showAllVariants,
        setShowAllVariants,
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
                            className="daisy-checkbox no-animation daisy-checkbox-sm !rounded-[3px] border-2 border-dark-gray"
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
                [
                    ...(showAllVariants
                        ? variationOptions
                        : _.slice(variationOptions, 0, 9)),
                ].map((item, idx) => {
                    return (
                        <Row
                            key={item.id}
                            singleVariation={item}
                            lastIndex={idx == 8 ? true : false}
                        />
                    );
                })}
            {!showAllVariants && variationOptions?.length >= 10 && (
                <tr className="w-full">
                    <td colSpan={'100%'} className="relative !py-0">
                        <div className="w-full ">
                            <BubbleButton
                                className={'w-full min-w-full py-3'}
                                handleClick={() => {
                                    setShowAllVariants(() => true);
                                }}
                            >
                                <p className="whitespace-nowrap text-base font-medium">{`Show all ${variationOptions?.length} variants`}</p>
                            </BubbleButton>
                        </div>
                    </td>
                </tr>
            )}
        </table>
    );
}

export default Table;
