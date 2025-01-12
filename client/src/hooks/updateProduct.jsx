import { useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';
import {
    EditorState,
    ContentState,
    ContentBlock,
    convertFromRaw,
    genKey,
    characterList,
} from 'draft-js';
import dayjs from 'dayjs';
import _ from 'lodash';
function UpdateProduct(props, value) {
    const {
        setTitle,
        setCategory,
        setFiles,
        setGender,
        setProfile,
        setVariations,
        setPriceValue,
        setStockValue,
        combineDispatch,
        contentDispatch,
        setDescription,
        setTemporaryVariation,
    } = value;
    props?.singleValue &&
        useEffect(() => {
            const { singleValue } = props;
            setTitle(() => singleValue?.title);
            // setPriceValue((prev) => ({
            //     ...prev,
            //     value: _.get(singleValue, 'price.current') || 0,
            // }));
            setPriceValue(() => _.get(singleValue, 'price.current'));
            setStockValue(() => _.get(singleValue, 'stock'));

            // setStockValue((prev) => ({ ...prev, value: singleValue?.stock }));
            setCategory(() => singleValue?.category?._id || '');

            setGender(() => singleValue?.gender || null);

            setProfile(() => singleValue?.delivery);

            // format options array into a map
            // if combined variation, create a 2 seperate variation type 1 and 2
            const formatVariationOptions = (variations) => {
                const newCombinedVariation = {};
                const newVariations = [];
                variations.forEach((variation) => {
                    if (variation.combine) {
                        const defaultObj = {
                            combine: false,
                            quantityHeader: {
                                on: true,
                            },
                            priceHeader: {
                                on: true,
                            },
                        };
                        const newVariationTypes = {
                            1: {
                                _id: uuidV4(),
                                name: variation.name,
                                options: [],
                                set: new Set(),
                                ...defaultObj,
                            },
                            2: {
                                _id: uuidV4(),
                                name: variation.name2,
                                options: [],
                                set: new Set(),
                                ...defaultObj,
                            },
                        };

                        const variationOption1Set = new Set();
                        const variationOption2Set = new Set();
                        variation.options.forEach(([_id, option]) => {
                            const id_1 = uuidV4();
                            const id_2 = uuidV4();

                            [1, 2].forEach((number) => {
                                const variationProp =
                                    number == 2 ? 'variation2' : 'variation';
                                if (
                                    !newVariationTypes[number].set.has(
                                        option[variationProp]
                                    )
                                ) {
                                    newVariationTypes[number].options.push([
                                        id_1,
                                        {
                                            // _id: id_1,
                                            _id: id_1,
                                            visible: true,
                                            variation: option[variationProp],
                                        },
                                    ]);
                                    newVariationTypes[number].set.add(
                                        option[variationProp]
                                    );
                                }
                            });
                        });
                        newVariationTypes['1'].options = new Map(
                            newVariationTypes['1'].options
                        );
                        newVariationTypes['2'].options = new Map(
                            newVariationTypes['2'].options
                        );
                        newVariations.push(
                            newVariationTypes['1'],
                            newVariationTypes['2']
                        );

                        variation.options = new Map(variation.options);
                        Object.assign(newCombinedVariation, variation);
                    } else {
                        variation.options = new Map(variation.options);
                        newVariations.push(variation);
                    }
                });

                // const newVariations = (variations).map(
                //     (data) => {
                //         debugger
                //         const optionArr = Object.entries(data?.options).map(
                //             (item) => [item[0], item[1]]
                //         );

                //         data.options = new Map(optionArr);
                //         data.disabled = false;
                //         return data;
                //     }
                // );

                setVariations(() => newVariations);
                setTemporaryVariation(() => newVariations);
                if (!_.isEmpty(newCombinedVariation)) {
                    combineDispatch({
                        type: 'set',
                        combine: newCombinedVariation,
                    });
                }
                return;
            };

            formatVariationOptions(singleValue?.variations || []);
            // const newVariations = (singleValue?.variations || []).map(
            //     (data) => {
            //         debugger;
            //         const optionArr = Object.entries(data?.options).map(
            //             (item) => [item[0], item[1]]
            //         );

            //         data.options = new Map(optionArr);
            //         data.disabled = false;
            //         return data;
            //     }
            // );

            // if (newVariations.length > 2) {
            //     const combinedVariations = newVariations.slice(2)[0];
            //     combineDispatch({
            //         type: 'set',
            //         combine: combinedVariations,
            //     });

            //     contentDispatch({ type: 'manage' });
            // }
            // setVariations(() => newVariations.slice(0, 2));

            setDescription(
                () => singleValue?.description || singleValue?.detail?.join('')
            );

            const generateFiles = () => {
                const newFiles = (singleValue?.fileResult || [])?.map(
                    ({ ContentType, fileName, buffer }) => {
                        const newBuffer = Uint8Array.from(atob(buffer), (c) =>
                            c.charCodeAt(0)
                        );

                        const blob = new Blob([newBuffer], {
                            type: ContentType,
                        });

                        console.log({ fileName });

                        const file = new File([blob], fileName, {
                            type: ContentType || 'image/png',
                        });

                        const obj = {
                            file: file,
                            img: URL.createObjectURL(blob),
                            isDragDisabled: false,
                            id: uuidV4(),
                        };

                        return obj;
                    }
                );

                for (let i = newFiles.length; i < 6; i++) {
                    newFiles.push({ id: uuidV4(), isDragDisabled: true });
                }

                setFiles(() => newFiles);
            };

            generateFiles();
            // createFiles();
        }, [props?.singleValue]);
}

export default UpdateProduct;
