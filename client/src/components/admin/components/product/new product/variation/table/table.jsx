import { useVariation } from '../../../../../../../context/variationContext';
import Row from './row';
import { useEffect, useState } from 'react';
import { tableLayout } from './tableLayout';
function Table({
    variationList,
    selected,
    setSelected,
    update,
    combine,
    setCheckAll,
    checkAll,
    layout,
}) {
    const count = variationList.options.length;
    useEffect(() => {
        if (checkAll == false && selected.size == count) {
            setSelected((prevState) => prevState = new Set());
        }
    }, [checkAll]);
    useEffect(() => {
        console.log('selected', selected);

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
                {combine == true && <th>{variationList.name2}</th>}
                {variationList.priceHeader.on && <th>Price</th>}
                {variationList.quantityHeader.on && <th>Quantity</th>}
                <th className=" !text-right ">Visible </th>
            </tr>
            {variationList &&
                variationList.options.map((item) => {
                    // return list.options.map((item) => {

                    const [singleVariation, setSingleVariation] =
                        useState(item);
                    return (
                        <Row
                            setCheckAll={setCheckAll}
                            checkAll={checkAll}
                            singleVariation={singleVariation}
                            setSingleVariation={setSingleVariation}
                            setSingleVariation={setSingleVariation}
                            variationList={variationList}
                            priceOn={variationList.priceHeader.on}
                            quantityOn={variationList.quantityHeader.on}
                            selected={selected}
                            setSelected={setSelected}
                            update={update}
                            combine={combine}
                        />
                    );
                    // });
                })}
        </table>
    );
}

export default Table;
