import { UPDATE_PAGE_CONTENT_STATE } from '../actions/types';

const initialState = 'projects';

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_PAGE_CONTENT_STATE:
            return action.payload
        default:
            return state
    }
}