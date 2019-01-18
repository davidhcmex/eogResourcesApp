import axios from "axios";
//import "isomorphic-fetch";
export const FETCH_WEATHER = "COMMAND/FETCH_WEATHER_FOR_LAT_LNG";
export const API_ERROR = "EVENT/API_ERROR_RECEIVED";
export const WEATHER_DATA_RECEIVED = "EVENT/WEATHER_DATA_RECEIVED";
export const WEATHER_ID_RECEIVED = "EVENT/WEATHER_ID_RECEIVED";

export const REQUEST_DRONEDATA_OK = "REQUEST_DRONEDATA_OK"
export const REQUEST_DRONEDATA_PENDING = "REQUEST_DRONEDATA_PENDING"

export const loadData = () => {
    return dispatch => {
        dispatch(requestStarted())
        axios.get("https://react-assessment-api.herokuapp.com/api/drone")
            .then((res) => {
                dispatch(requestSucceded(res))
            })
    }
};

const requestStarted = () => ({
    type: REQUEST_DRONEDATA_PENDING
})

const requestSucceded = (data) => ({
    type: REQUEST_DRONEDATA_OK,
    payload: data.data
})
