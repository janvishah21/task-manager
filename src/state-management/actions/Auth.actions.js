import { UPDATE_AUTH } from "./types";

export const updateAuth = (payload) => dispatch => {
    dispatch({
        type: UPDATE_AUTH,
        payload
    });
}