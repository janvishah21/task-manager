import { UPDATE_LOADER_STATE } from "../actions/types";

const initialState = false;

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_LOADER_STATE:
            return action.payload
        default:
            return state
    }
}