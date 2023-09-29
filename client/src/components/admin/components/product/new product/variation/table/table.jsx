import Row from './row';
import { useEffect, useState } from 'react';
function Table({ variations, setSelected, selected }) {
    const [checkAll, setCheckAll] = useState(false);
  
useEffect(() => {
const count = variations[0].options.length;
if(selected != count){
    setCheckAll(false)
}else {
    setCheckAll(true) 
}

}, [selected])
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
                        onChange={() => setCheckAll(!checkAll)}
                    />
                </th>
                <th>{variations[0].name}</th>
                <th className="">Price</th>
                <th>Quantity</th>
                <th className="!text-right">Visible </th>
            </tr>
            {variations[0].options.map(({ variation }) => {
                return <Row variation={variation} variations={variations} checkAll={checkAll} setSelected={setSelected} selected={selected} />;
            })}
        </table>
    );
}

export default Table;
