import { UPDATE_LOADER_STATE } from "./types";

export const updateLoaderState = (payload) => dispatch => {
    dispatch({
        type: UPDATE_LOADER_STATE,
        payload
    });
}
