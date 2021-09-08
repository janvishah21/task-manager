import { UPDATE_PAGE_CONTENT_STATE } from '../actions/types';

const initialState = {
    pageContentState: 'projects'
};

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_PAGE_CONTENT_STATE:
            return {
                pageContentState: action.payload
            }
        default:
            return state
    }
}