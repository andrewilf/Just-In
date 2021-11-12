const lightReducer = (state, action) => {
    let intitialState = {
        lightValues: [
            { name: 'off', color: 'rgba(0,0,0,1)', action: 'SET_OFF' },
            { name: 'low', color: 'rgba(0,0,0,0.6)', action: 'SET_LOW' },
            { name: 'med', color: 'rgba(0,0,0,0.4)', action: 'SET_MED' },
            { name: 'high', color: 'rgba(0,0,0,0.2)', action: 'SET_HIGH' }
        ],
        activeLight: { name: 'off', color: 'rgba(0,0,0,1)' },
        numberOfClicks: 0
    }
    console.log(state)
    switch (action.type) {
        case 'SET_OFF':
            return {
                ...state,
                activeLight: intitialState.lightValues[0],
                numberOfClicks: state.numberOfClicks += 1
            };
        case 'SET_LOW':
            return {
                ...state,
                activeLight: intitialState.lightValues[1],
                numberOfClicks: state.numberOfClicks += 1
            };
        case 'SET_MED':
            return {
                ...state,
                activeLight: intitialState.lightValues[2],
                numberOfClicks: state.numberOfClicks += 1
            };
        case 'SET_HIGH':
            return {
                ...state,
                activeLight: intitialState.lightValues[3],
                numberOfClicks: state.numberOfClicks += 1
            };
        case 'RESET':
            return {
                ...state,
                activeLight: intitialState.lightValues[0],
                numberOfClicks: state.numberOfClicks = 0
            };
        default:
            return {
                ...state,
                activeLight: state.activeLight,
                numberOfClicks: state.numberOfClicks
            };
    }
}

export default lightReducer