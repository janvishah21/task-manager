import { UPDATE_NOTIFICATION_STATE } from "./types";

export const updateNotificationState = (payload) => dispatch => {
    dispatch({
        type: UPDATE_NOTIFICATION_STATE,
        payload
    });
}