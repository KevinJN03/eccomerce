import { useEffect } from 'react';
import { useVariation } from '../../../../../../../context/variationContext';
import { v4 as uuidv4 } from 'uuid';
function SelectOptions({ handleSelect, select, setSelect }) {
    const { temporaryVariation } = useVariation();


    let bothVariations;

    const filterDisabled = [...temporaryVariation].filter(item => item.disabled == false)
    if(filterDisabled.length >= 2){
         bothVariations = `${filterDisabled[0].name} and ${filterDisabled[1].name}`;
    }
    
    useEffect(() => {
        console.log('mount')
    }, []);
    return (
        <select
        id='options'
        name='options'
            className=" select max-h-min max-w-[200px]"
            onChange={(e) =>
                handleSelect(
                    e.target.value,
                    e.target.options[e.target.selectedIndex].dataset.both
                )
            }
        >
            <option
                selected={select == bothVariations}
                data-both="true"
                value={bothVariations}
            >
                {bothVariations}
            </option>

            {temporaryVariation &&
                temporaryVariation.map((variation) => {
                    if (variation.disabled == false) {
                        return (
                            <option
                                key={uuidv4()}
                                selected={select == variation.name}
                                value={variation.name}
                                data-both="false"
                            >
                                {variation.name}
                            </option>
                        );
                    }
                })}
        </select>
    );
}

export default SelectOptions;
