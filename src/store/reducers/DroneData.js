import * as actions from "../actions";

let initialState = {
    data: [],
    loading: false
}

const droneDataReducer = (state = initialState, action) => {

    if (action.type === actions.REQUEST_DRONEDATA_PENDING)
        return {
            ...state,
            loading: true,
        }

    if (action.type === actions.REQUEST_DRONEDATA_OK)
        return {
            ...state,
            loading: false,
            data: action.payload.data
        }
    return state;
}

export default droneDataReducer