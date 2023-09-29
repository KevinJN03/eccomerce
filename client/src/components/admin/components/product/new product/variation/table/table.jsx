import Row from './row';
import { useState } from 'react';
function Table({ variations }) {
    const [checkAll, setCheckAll] = useState(false);

    const selectAllOff = () => {
        setCheckAll(false);
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
                        onChange={() => setCheckAll(!checkAll)}
                    />
                </th>
                <th>{variations[0].name}</th>
                <th className="">Price</th>
                <th>Quantity</th>
                <th className="!text-right">Visible </th>
            </tr>
            {variations[0].options.map(({ variation }) => {
                return <Row variation={variation} checkAll={checkAll} selectAllOff={selectAllOff} />;
            })}
        </table>
    );
}

export default Table;
