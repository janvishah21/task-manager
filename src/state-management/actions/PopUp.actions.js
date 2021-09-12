import { UPDATE_POPUP_STATE } from "./types";

export const updatePopUpState = (payload) => dispatch => {
    dispatch({
        type: UPDATE_POPUP_STATE,
        payload
    });
}