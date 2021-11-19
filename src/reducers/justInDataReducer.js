import { isAfter, parseISO } from "date-fns"

function bubbleSort(arr) {
    const input = arr
    console.log(input)
    //Outer pass
    for (let i = 0; i < input.length; i++) {

        //Inner pass
        for (let j = 0; j < input.length - i - 1; j++) {

            //Value comparison using ascending order

            if (!isAfter(parseISO(input[j].created_at), parseISO(input[j + 1].created_at))) {
                // console.log(!isAfter(parseISO(input[j].created_at),parseISO(input[j+1].created_at)))
                //console.log("swapping", input[j + 1],input[j])
                //Swapping
                //[input[j + 1],input[j]] = [input[j],input[j + 1]]
                //console.log("swapping", input[j + 1],input[j])
                const hold = input[j]
                input[j] = input[j + 1]
                input[j + 1] = hold
                //console.log("swapped", input[j + 1],input[j])
                //console.log("swap done")
            }
        }
    };
    console.log(input)
    return input;
}

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
        case 'REMOVE_PROFILE':
            const removeProfile = action.value
            const data = state.data
            delete data[removeProfile]
            return {
                ...state,
                data,
            };
        case 'ADD_PAYLOAD':
            return {
                ...state,
                payload: bubbleSort(action.value)
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
        case 'ADD_NEW_PERSON':
            const newPerson = action.value
            console.log(newPerson)
            console.log(state.data[state.currentProfile])
            return {
                ...state,
                data: {
                    ...state.data,
                   // [state.currentProfile]: state.data[state.currentProfile][newPerson.twitter_name](newPerson)
                }
            };
        default:
            return {
                ...state
            };
    }
}

export default justinDataReducer