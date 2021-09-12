import { UPDATE_PAGE_CONTENT_STATE } from '../actions/types';

const initialState = {
    page: 'projects',
    attrs: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_PAGE_CONTENT_STATE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}