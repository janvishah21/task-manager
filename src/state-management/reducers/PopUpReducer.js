import { UPDATE_POPUP_STATE } from "../actions/types";

const initialState = {
    login: false,
    signUp: false,
    editProject: {},
    editAccessRequest: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_POPUP_STATE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}