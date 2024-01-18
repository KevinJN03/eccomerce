export function contentReducer(state, action) {
    const acceptedTypes = new Set([
        'main',
        ' update',
        'manage',
        'delivery_main',
        'delivery_new',
        'delivery_edit',
    ]);

    if (action.type == 'select' || action.type == 'update') {
        return {
            ...state,
            ...action,
            // type: action.type,
            // currentVariation: action.currentVariation,
            // title: action.title,
            // default: action.default,
        };
    }

    // if (action.type == 'update') {
    //     return {
    //         ...state,
    //         type: action.type,
    //         category: action.category,
    //         selected: action.selected,
    //         setUpdate: action.setUpdate,
    //         update: action.update,
    //         setCheckAll: action.setCheckAll,
    //     };
    // }

    if (acceptedTypes.has(action?.type)) {

        return { ...state, ...action, currentVariation: null };
    }

   

    throw new Error(
        `Invalid type for Variation Reducer ${JSON.stringify(action)}`
    );
}
