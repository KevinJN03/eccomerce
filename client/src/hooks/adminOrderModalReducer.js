export function adminOrderModalReducer(state, action) {
    if (action.type == 'printOrder') {
        return action;
    }

    throw new Error(`invalid reducer for orderadminmodalreducer ${JSON.stringify(action)}`)
}
