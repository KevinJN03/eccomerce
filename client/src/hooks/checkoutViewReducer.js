const checkoutViewReducer = (state, action) => {
    if (
        action.type == 'book' ||
        action.type == 'edit' ||
        action.type == 'main' ||
        action.type == 'add'
    ) {
        return action.type;
    } else {
        throw new Error(
            `invalid action for viewReducer, you action is ${JSON.stringify(
                action
            )}}. please check the reducer to check it accepted actions.`
        );
    }
};

export default checkoutViewReducer;
