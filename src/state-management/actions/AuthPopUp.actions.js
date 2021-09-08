import { UPDATE_LOGIN_POPUP_STATE, UPDATE_SIGNUP_POPUP_STATE } from "./types";

export const updateLoginPopUpState = (payload) => dispatch => {
    dispatch({
        type: UPDATE_LOGIN_POPUP_STATE,
        payload
    });
}

export const updateSignUpPopUpState = (payload) => dispatch => {
    dispatch({
        type: UPDATE_SIGNUP_POPUP_STATE,
        payload
    });
}