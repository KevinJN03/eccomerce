import { useVariation } from '../../../../../../context/variationContext';
import { useEffect, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import Table from './table/table.jsx';
import SingleList from './singleList';

function TestVariationList({}) {
    const { variations, dispatch, setCheck } = useVariation();
    const [combine, setCombine] = useState({id: uuidV4(), options: []});
    const handleUpdate = (category, selected, setUpdate, update) => {
        setCheck(true);
        dispatch({ type: 'update', category, selected, setUpdate, update });
    };

    useEffect(() => {
        console.log('variationList mount');
        const everyVariation = variations.every((item) => item.combine == true);
        if (everyVariation) {
            console.log('variationList combine');
            const onlyOptions = [...variations].map(({ options }) => {
                console.log({ options });
                return options;
            });

            console.log('onlyOptions: ', onlyOptions);
            /* {variation: 'Small (S)', id: '3e257f61-c557-45e4-8b20-479fd7eb5fb6'} */
            const [firstOptions, secondOptions] = onlyOptions;

            const newOptions = [];
            for (const variationItem of firstOptions) {
                for (const item of secondOptions) {
                    const { variation } = item;
                   

                    const newObj = {id: uuidV4(), variation: variationItem.variation, variation2: variation }
                    newOptions.push(newObj);
                }
            }

            console.log('newOptions: ', newOptions);

            const newVariation = {
            ...combine,
                options: newOptions,
                name: variations[0].name,
                name2: variations[1].name,
                quantityHeader: {on:true},
                priceHeader: {on: true}
            };

            setCombine(newVariation);
        }else {
            setCombine({...combine , options: []})
        }
    }, [variations]);

    return (
        <>

        { combine.options.length > 0 && <SingleList variation={combine} key={combine.id} handleUpdate={handleUpdate} combine={true}/>}
            { combine.options.length <  1 && variations.length > 0 &&
                variations.map((variation) => {
                    return (
                        <>
                            <SingleList
                                variation={variation}
                                key={variation.id}
                                handleUpdate={handleUpdate}
                                combine={false}
                            />
                        </>
                    );
                })}
        </>
    );
}
export default TestVariationList;
