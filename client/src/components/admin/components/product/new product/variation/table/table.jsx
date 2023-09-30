import { useVariation } from '../../../../../../../context/variationContext';
import Row from './row';
import { useEffect, useState } from 'react';
function Table({ variations, }) {
    const [checkAll, setCheckAll] = useState(false);
  const { setSelected, selected} = useVariation()
  let count = 0
    variations.forEach(element => {
        count += element.options.length 
    });

useEffect(() => {
    

    setCheckAll(checkAll)


}, [selected])

const handleCheckAll = () => {
    setCheckAll(!checkAll)
}
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
            {
                variations.map((list)=> {
                    return list.options.map((item) => {
                        return <Row setCheckAll = {setCheckAll} variation={item} variationId={list.id} variations={variations} checkAll={checkAll} setSelected={setSelected} selected={selected} />;
                    })
                })
            }
         
        </table>
    );
}

export default Table;
