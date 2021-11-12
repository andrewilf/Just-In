const justinDataReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_CURRENT_PROFILE':
            return {
                ...state,
                currentProfile: action.value
            };
        default:
            return {
                ...state
            };
    }
}

export default justinDataReducer