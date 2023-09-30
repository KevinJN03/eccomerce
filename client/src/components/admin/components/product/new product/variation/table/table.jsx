import { useVariation } from '../../../../../../../context/variationContext';
import Row from './row';
import { useEffect, useState } from 'react';
function Table({ variations}) {
    const [checkAll, setCheckAll] = useState(false);
    const { selected, setSelected } = useVariation();
    let count = 0;
    variations.forEach((element) => {
        count += element.options.length;
    });

    useEffect(() => {
        if (checkAll) {
           

                const newList = variations.map((item) => {
                    const { options } = item;

                   const arr = options.map((obj) => {
                        return obj
                    });

                    return arr
                });

    

                const spreadList =  [...newList[0], ...newList[1]];
               
                setSelected(spreadList)
            
        } else if (!checkAll && selected.length == count)  {
            setSelected([])
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
                    <input
                        type="checkbox"
                        className="checkbox"
                        defaultChecked={checkAll}
                        checked={checkAll}
                        onChange={handleCheckAll}
                    />
                </th>
                <th>{variations[0].name}</th>
                <th className="">Price</th>
                <th>Quantity</th>
                <th className="!text-right">Visible </th>
            </tr>
            {variations.map((list) => {
                return list.options.map((item) => {
                    return (
                        <Row
                            setCheckAll={setCheckAll}
                            checkAll={checkAll}
                            variation={item}
                            variationId={list.id}
                            variations={variations}
                           
                        />
                    );
                });
            })}
        </table>
    );
}

export default Table;
