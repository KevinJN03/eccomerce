import { useVariation } from '../../../../../../../context/variationContext';
import Row from './row';
import { useEffect, useState } from 'react';
function Table({ variationList, selected, setSelected, update, combine }) {
    const [checkAll, setCheckAll] = useState(false);

    useEffect(() => {
        let count = variationList.options.length;
        
const {options} = variationList
        if (checkAll) {
         
                    setSelected(options); 
            
             
         
          
        } else if (checkAll == false && selected.length == count) {
            setSelected([]);
        }


       
    }, [checkAll]);

    useEffect(() => {
        // let count = variationList.options.length;
        // if (selected.length == count) {
        //     setCheckAll(true);
        // }else if(selected.length == 0){
        //     setCheckAll(false)
        // }

    }, [selected]);

    const handleCheckAll = () => {
        setCheckAll(!checkAll);
    };

    return (
        <table className="result-table w-full">
            <colgroup>
                <col span="1" width={'10%'} />
                <col span="1" width={combine ? '10%' : '15%'} />
                {combine && <col span="1" width={'10%'} />}
                <col span="1" width={'25%'} />
                <col span="1" width={'25%'} />
                <col span="1" width={combine ? '20%' : '25%'} />
            </colgroup>
            <tr>
                <th>
                    {(variationList.priceHeader.on ||
                        variationList.quantityHeader.on) && (
                        <input
                            type="checkbox"
                            className="checkbox no-animation !rounded-[3px]"
                            defaultChecked={checkAll}
                            checked={checkAll}
                            onChange={handleCheckAll}
                        />
                    )}
                </th>
                <th>{variationList.name}</th>
                {combine == true && <th>{variationList.name2}</th>}
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
