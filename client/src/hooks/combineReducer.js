import ObjectID from 'bson-objectid';
import { v4 } from 'uuid';
export default function combineReducer(state, action) {
    if (action.type == 'UPDATE_OPTIONS') {
        return { ...state, options: action.options };
    }
    // take provided data and set the combinevariation
    if (action.type == 'set') {
        const newData = { ...action.combine, on: true, _id: v4() };

        return { ...newData, combine: true };
    }
    if (action.type == 'clear') {
        // empty Map

        return { _id: v4() };
        // return { ...state, options: new Map(), on: false };
    }

    if (action?.type == 'update') {
        // create a new map will updated proprties
    
        const newOptionsMap = new Map(state.options).set(
            action._id,
            action.newObj
        );

        return { ...state, options: newOptionsMap, combine: true };
    }

    if (action.type === 'combineVariations') {
        // combine variation type 1 and 2 into 1
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
