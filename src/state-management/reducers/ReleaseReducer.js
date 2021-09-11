import { UPDATE_RELEASES } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_RELEASES:
            return [
                ...action.payload
            ]
        default:
            return state
    }
}