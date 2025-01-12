import _ from 'lodash';
function publishError_Reducer(state, action) {
    if (action.type == 'SET') {
        // action?.data?.forEach((element) => {
        //     const { path } = element;
        //     map.set(path, element);
        // });
        return action.data;
    }

    if (action.type == 'ADD') {
        const newState = _.cloneDeep(state);
        _.set(newState, action.path, action.msg);

        return newState;
    }

    if (action.type == 'default') {
        return { ...state, default: _.get(action, 'data.msg.0') };
    }

    if (action.type == 'CLEAR') {
        const newState = _.cloneDeep(state);

        _.unset(newState, action.path);
        if (_.includes(action.path, 'variationoption')) {
            if (_.isEmpty(newState?.variationoption)) {
                _.unset(newState, 'variationoption');
            }
        }

        return newState;
    }

    if (action.type == 'CLEARAll') {
        return {};
    }

    throw new Error(`please enter a valid action. ${action} is not valid.`);
}

export default publishError_Reducer;
