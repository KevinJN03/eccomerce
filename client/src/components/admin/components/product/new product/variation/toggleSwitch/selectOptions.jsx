import { useEffect } from 'react';
import { useVariation } from '../../../../../../../context/variationContext';
import { v4 as uuidv4 } from 'uuid';
function SelectOptions({ handleSelect, select, setSelect }) {
    const { variations } = useVariation();


    let bothVariations;
    if(variations.length >= 2){
         bothVariations = `${variations[0].name} and ${variations[1].name}`;
    }
    
    useEffect(() => {
        console.log('mount')
    }, []);
    return (
        <select
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

            {variations &&
                variations.map((variation) => {
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
