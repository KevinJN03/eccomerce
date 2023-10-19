import { useVariation } from '../../../../../../context/variationContext';
import { Fragment, useEffect, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import Table from './table/table.jsx';
import SingleList from './singleList';

function VariationList({}) {
    const { variations, dispatch, setCheck } = useVariation();
    const [combine, setCombine] = useState({
        id: uuidV4(),
        options: new Map(),
    });

    useEffect(() => {
        const everyVariation = variations.every((item) => item.combine == true);

        if (everyVariation && variations.length > 1) {
            console.log('variationList combine');
            const onlyOptions = [...variations].map(({ options }) => {
                console.log({ options });
                return options;
            });

            console.log('onlyOptions: ', onlyOptions);
            /* {variation: 'Small (S)', id: '3e257f61-c557-45e4-8b20-479fd7eb5fb6'} */
            const [firstOptions, secondOptions] = onlyOptions;

            const newOptions = new Map();
            for (const variationItem of firstOptions.values()) {
                for (const item of secondOptions.values()) {
                    const { variation } = item;
                    const id = uuidV4();
                    const newObj = {
                        id,
                        variation: variationItem.variation,
                        variation2: variation,
                    };

                    newOptions.set(id, newObj);
                }
            }

            console.log('newOptions: ', newOptions);

            const newVariation = {
                ...combine,
                options: newOptions,
                name: variations[0].name,
                name2: variations[1].name,
                quantityHeader: { on: true },
                priceHeader: { on: true },
            };

            setCombine(newVariation);
        } else {
            setCombine((prevState) => {
                return { ...prevState, options: new Map() };
            });
        }
    }, [variations]);

    return (
        <>
            {combine?.options.size >= 1 && (
                <SingleList
                    key={combine.id}
                    variation={combine}
                    combine={combine}
                    isCombine={true}
                    setCombine={setCombine}
                />
            )}
            {combine?.options.size < 1 &&
                variations.length > 0 &&
                variations.map((variation) => {
                    return (
                        <>
                            <SingleList
                                key={variation.id}
                                variation={variation}
                                isCombine={false}
                                combine={combine}
                                setCombine={setCombine}
                            />
                        </>
                    );
                })}
        </>
    );
}
export default VariationList;
