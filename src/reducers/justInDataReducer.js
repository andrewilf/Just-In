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
                const hold = input[j]
                input[j] = input[j + 1]
                input[j + 1] = hold
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
                localStorage.setItem('justindata', JSON.stringify(
                    {
                        ...state.data,
                        [newProfile]: {}
                    }
                ))
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
            localStorage.setItem('justindata', JSON.stringify(data))
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
            delete state.data[state.currentProfile][newPerson]
            localStorage.setItem('justindata', JSON.stringify(
                {
                    ...state.data,
                    [state.currentProfile]: {
                        ...state.data[state.currentProfile],
                        [newPerson.twitter_name]: newPerson
                    }
                }

            ))
            return {
                ...state,
                data: {
                    ...state.data,
                    [state.currentProfile]: {
                        ...state.data[state.currentProfile],
                        [newPerson.twitter_name]: newPerson
                    }
                }
            };
        case 'REMOVE_PERSON':
            const removePerson = action.value
            delete state.data[state.currentProfile][removePerson]
            localStorage.setItem('justindata', JSON.stringify(
                {
                    ...state.data,
                }
            ))
            return {
                ...state,
            };
        default:
            return {
                ...state
            };
    }
}

export default justinDataReducer