import { UPDATE_NOTIFICATION_STATE } from "../actions/types";

const initialState = {
    isOpen: false,
    message: '',
    type: 'info'
};

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_NOTIFICATION_STATE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}