import { UPDATE_LOGIN_POPUP_STATE, UPDATE_SIGNUP_POPUP_STATE } from "../actions/types";

const initialState = {
    loginPopUp: false,
    signUpPopUp: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_LOGIN_POPUP_STATE:
            return {
                ...state,
                loginPopUp: action.payload
            }
        case UPDATE_SIGNUP_POPUP_STATE:
            return {
                ...state,
                signUpPopUp: action.payload
            }
        default:
            return state
    }
}