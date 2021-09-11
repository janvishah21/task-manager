import { UPDATE_USERS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USERS:
            return {
                ...action.payload
            }
        default:
            return state
    }
}