import data from "../sampleData";

const justinDataReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_CURRENT_PROFILE':
            return {
                ...state,
                currentProfile: action.value
            };
        case 'ADD_NEW_PROFILE':
            const newProfile = action.value
            if (Object.keys(state.data).indexOf(newProfile) != -1) {
                console.log("repeat detected")
                return {
                    ...state
                }
            }
            else {
                return {
                    ...state,
                    data: {
                        ...data,
                        [newProfile]: {}
                    }
                }
            }
            
                ;
        default:
            return {
                ...state
            };
    }
}

export default justinDataReducer