import { UPDATE_RELEASES } from "./types";

export const updateReleases = (payload) => dispatch => {
    dispatch({
        type: UPDATE_RELEASES,
        payload
    });
}
