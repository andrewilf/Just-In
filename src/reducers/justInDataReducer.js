//import data from "../sampleData";

const justinDataReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_CURRENT_PROFILE':
            return {
                ...state,
                currentProfile: action.value
            };
        case 'ADD_NEW_PROFILE':
            const newProfile = action.value
            if (Object.keys(state.data).indexOf(newProfile) !== -1) {
                console.log("repeat profile detected")
                return {
                    ...state
                }
            }
            else {
                return {
                    ...state,
                    data: {
                        ...state.data,
                        [newProfile]: {}
                    }
                }
            };
            case 'ADD_PAYLOAD':
            return {
                ...state,
                payload: action.value
            };
            case 'SHUFFLE_PAYLOAD':
            return {
                ...state,
            };
            
            case 'FILTER_PAYLOAD':
            return {
                ...state,
            };
            case 'TOGGLE_MODAL':
            return {
                ...state,
                basicModal: !state.basicModal
            };
            case 'SET_MODAL':
            return {
                ...state,
                basicModal: action.value
            };
            // case 'ADD_NEW_PERSON':
            // const newPerson = action.value
            // if (Object.keys(state.data[state.currentProfile]).indexOf(newPerson) != -1) {
            //     console.log("repeat person detected")
            //     return {
            //         ...state
            //     }
            // }
            // else {
            //     return {
            //         ...state,
            //         data: {
            //             ...data,
            //             [newProfile]: {}
            //         }
            //     }
            // };
        default:
            return {
                ...state
            };
    }
}

export default justinDataReducer