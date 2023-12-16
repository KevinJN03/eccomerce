export function AdminReducer(state, action) {
    if (action.type == 'select') {
        return {
            ...state,
            type: action.type,
            currentVariation: action.currentVariation,
            title: action.title,
            default: action.default,
        };
    }

    if (action.type == 'update') {
        return {
            ...state,
            type: action.type,
            category: action.category,
            selected: action.selected,
            setUpdate: action.setUpdate,
            update: action.update,
            setCheckAll: action.setCheckAll,
        };
    }

    if (action.type == 'main' || action.type == 'manage' || action.type == 'order') {
        return { ...state, ...action, currentVariation: null };
    }

    throw new Error('Invalid type for Variation Reducer');
}
