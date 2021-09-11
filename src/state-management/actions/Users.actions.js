import { UPDATE_USERS } from "./types";

export const updateUsers = (payload) => dispatch => {
    dispatch({
        type: UPDATE_USERS,
        payload
    });
}
