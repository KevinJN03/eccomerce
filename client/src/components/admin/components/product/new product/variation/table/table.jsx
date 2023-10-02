import { useVariation } from '../../../../../../../context/variationContext';
import Row from './row';
import { useEffect, useState } from 'react';
function Table({ variationList }) {
    const [checkAll, setCheckAll] = useState(false);
    const { selected, setSelected } = useVariation();
    const { variations } = useVariation();

    useEffect(() => {
        let count = 0;
        variations.forEach((element) => {
            count += element.options.length;
        });

        if (checkAll) {
            const spreadList = [];
            variations.map((item) => {
                const { options } = item;

                const arr = options.map((obj) => {
                    return obj;
                });
                spreadList.push(...arr);
                return;
            });
            debugger;
            setSelected(spreadList);
        } else if (!checkAll && selected.length == count) {
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
                 <th className="">{ variationList.priceHeader.on && 'Price'}</th>
                <th>{ variationList.quantityHeader.on && 'Quantity'}</th>
                <th className="!text-right ">Visible </th>
            </tr>
            {variations.length > 0 &&
                variationList.options.map((item) => {
                    // return list.options.map((item) => {
                    return (
                        <Row
                            setCheckAll={setCheckAll}
                            checkAll={checkAll}
                            variation={item}
                            // variationId={list.id}
                            variationList={variationList}
                            priceOn={variationList.priceHeader.on}
                            quantityOn={variationList.quantityHeader.on}
                        />
                    );
                    // });
                })}
        </table>
    );
}

export default Table;
