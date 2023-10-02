import { useVariation } from '../../../../../../../context/variationContext';
import Row from './row';
import { useEffect, useState } from 'react';
function Table({ variationList, selected, setSelected, update }) {
    const [checkAll, setCheckAll] = useState(false);

    useEffect(() => {
        let count = variationList.options.length;

        if (checkAll) {
            setSelected(variationList.options);
        }
         else if (!checkAll && selected.length == count) {
            setSelected([]);
        }
    }, [checkAll]);

    const handleCheckAll = () => {
        setCheckAll(!checkAll);


      
    };
    return (
        <table className="result-table w-full">
            <colgroup>
                <col span="1" width={'10%'} />
                <col span="1" width={'15%'} />
                <col span="1" width={'25%'} />
                <col span="1" width={'25%'} />
                <col span="1" width={'25%'} />
            </colgroup>
            <tr>
                <th>
                    {(variationList.priceHeader.on ||
                        variationList.quantityHeader.on) && (
                        <input
                            type="checkbox"
                            className="checkbox"
                            defaultChecked={checkAll}
                            checked={checkAll}
                            onChange={handleCheckAll}
                        />
                    )}
                </th>
                <th>{variationList.name}</th>
                <th className="">{variationList.priceHeader.on && 'Price'}</th>
                <th>{variationList.quantityHeader.on && 'Quantity'}</th>
                <th className="!text-right ">Visible </th>
            </tr>
            {variationList &&
                variationList.options.map((item) => {
                    // return list.options.map((item) => {
                    return (
                        <Row
                            setCheckAll={setCheckAll}
                            checkAll={checkAll}
                            variation={item}

                            variationList={variationList}
                            priceOn={variationList.priceHeader.on}
                            quantityOn={variationList.quantityHeader.on}
                            selected={selected}
                            setSelected={setSelected}
                            update = {update}
                        />
                    );
                    // });
                })}
        </table>
    );
}

export default Table;
