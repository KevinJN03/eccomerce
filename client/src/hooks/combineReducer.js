import ObjectID from 'bson-objectid';
export default function combineReducer(state, action) {
    if (action.type == 'UPDATE_OPTIONS') {
return {...state, options: action.options}

    }
    if (action.type == 'set') {
        const data = { ...action.combine };
        const newData = { ...data, on: true };

        return { ...newData, combine: true };
    }
    if (action.type == 'clear') {
        return { ...state, options: new Map(), on: false };
    }

    if (action?.type == 'update') {
        const newOptionsMap = new Map(state.options).set(
            action.id,
            action.newObj
        );

        return { ...state, options: newOptionsMap, combine: true };
    }

    if (action.type === 'combineVariations') {
        const variations = [...action.variations];
        const onlyOptions = variations.map(({ options }) => {
            return options;
        });

        const [firstOptions, secondOptions] = onlyOptions;

        const newOptions = new Map();
        for (const variationItem of firstOptions.values()) {
            for (const item of secondOptions.values()) {
                const { variation } = item;

                const new_Id = ObjectID().toHexString();
                const newObj = {
                    id: new_Id,
                    _id: new_Id,
                    variation: variationItem.variation,
                    variation2: variation,
                    visible: true,
                };

                newOptions.set(new_Id, newObj);
            }
        }

        const newVariation = {
            ...state,
            on: true,
            options: newOptions,
            name: variations[0].name,
            name2: variations[1].name,
            quantityHeader: { on: true },
            priceHeader: { on: true },
            combine: true,
        };

        return newVariation;
    }
    throw new Error(`Invalid action in combineReducer ${action.type}`);
}
